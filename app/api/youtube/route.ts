export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = '@FactSyntax';

export async function GET() {
  try {
    if (!YOUTUBE_API_KEY) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 });
    }

    // Step 1: Handle se uploads playlist ID nikalo
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const channelData = await channelRes.json();

    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Playlist se latest videos nikalo
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const videosData = await videosRes.json();

    const videos = videosData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
