import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parseDuration, detectCategory, CACHE_TTL_MS } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

function err(msg: string, configured = false) {
  return NextResponse.json({ error: msg, configured }, { status: 200 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const maxResults = Math.min(parseInt(url.searchParams.get('maxResults') || '12'), 20);
  const forceRefresh = url.searchParams.get('refresh') === '1';

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return err('YouTube API key or channel ID not configured in environment variables.');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Check cache
  if (!forceRefresh) {
    const { data: latest } = await supabase
      .from('youtube_videos')
      .select('fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latest && Date.now() - new Date(latest.fetched_at).getTime() < CACHE_TTL_MS) {
      const { data: cached } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(maxResults);
      return NextResponse.json({ data: cached, cached: true });
    }
  }

  // Fetch uploads playlist ID
  const chanRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!chanRes.ok) return err(`YouTube channels API error: ${chanRes.status}`, true);
  const chanData = await chanRes.json();
  if (!chanData.items?.length) return err('Channel not found. Check YOUTUBE_CHANNEL_ID.', true);

  const uploadsPlaylistId = chanData.items[0].contentDetails.relatedPlaylists.uploads;

  // Fetch latest videos from playlist
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
  );
  if (!playlistRes.ok) return err(`YouTube playlist API error: ${playlistRes.status}`, true);
  const playlistData = await playlistRes.json();
  if (!playlistData.items?.length) return NextResponse.json({ data: [], cached: false });

  const videoIds = playlistData.items
    .map((item: any) => item.contentDetails.videoId)
    .join(',');

  // Fetch detailed stats (duration, views, likes)
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
  );
  if (!detailsRes.ok) return err(`YouTube videos API error: ${detailsRes.status}`, true);
  const detailsData = await detailsRes.json();

  const videos = detailsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: (item.snippet.description || '').substring(0, 300),
    thumbnail_url:
      item.snippet.thumbnails?.maxres?.url ||
      item.snippet.thumbnails?.high?.url ||
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.default?.url || '',
    duration: parseDuration(item.contentDetails.duration),
    view_count: parseInt(item.statistics.viewCount || '0'),
    like_count: parseInt(item.statistics.likeCount || '0'),
    published_at: item.snippet.publishedAt,
    category: detectCategory(item.snippet.title, item.snippet.description || ''),
    fetched_at: new Date().toISOString(),
  }));

  // Cache in Supabase (fire and forget — don't block response)
  supabase.from('youtube_videos').upsert(videos, { onConflict: 'id' }).then(() => {});

  return NextResponse.json({ data: videos, cached: false });
}
