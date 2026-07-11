import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CACHE_TTL_MS } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const forceRefresh = url.searchParams.get('refresh') === '1';

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return NextResponse.json({ error: 'YouTube API key or channel ID not configured', configured: false });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Check cache
  if (!forceRefresh) {
    const { data: cached } = await supabase
      .from('youtube_channel_stats')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (cached && Date.now() - new Date(cached.fetched_at).getTime() < CACHE_TTL_MS) {
      return NextResponse.json({ data: cached, cached: true });
    }
  }

  // Fetch from YouTube
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return NextResponse.json({ error: `YouTube API error: ${res.status}`, configured: true });
  const data = await res.json();
  if (!data.items?.length) return NextResponse.json({ error: 'Channel not found', configured: true });

  const s = data.items[0].statistics;
  const record = {
    id: 1,
    channel_id: YOUTUBE_CHANNEL_ID,
    subscriber_count: parseInt(s.subscriberCount || '0'),
    view_count: parseInt(s.viewCount || '0'),
    video_count: parseInt(s.videoCount || '0'),
    fetched_at: new Date().toISOString(),
  };

  // Cache in Supabase (fire and forget)
  supabase.from('youtube_channel_stats').upsert(record).then(() => {});

  return NextResponse.json({ data: record, cached: false });
}
