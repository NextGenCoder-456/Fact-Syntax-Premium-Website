/*
# YouTube API Cache Tables

Yeh migration YouTube Data API v3 ke responses ko cache karne ke liye tables banata hai.

## Purpose
YouTube API ke rate limits avoid karne aur fast loading ke liye API responses 
ko database mein store karte hain. Cache 1 ghante tak valid rehta hai.

## New Tables

### 1. `youtube_videos`
- `id` — YouTube video ID (primary key, e.g. "dQw4w9WgXcQ")
- `title` — Video title
- `description` — Video description (short)
- `thumbnail_url` — Best available thumbnail URL
- `duration` — Video duration in human-readable format (e.g. "10:47")
- `view_count` — Total views as number
- `like_count` — Total likes
- `published_at` — When the video was published on YouTube
- `category` — Auto-detected category based on title keywords
- `fetched_at` — When we last fetched this from YouTube API

### 2. `youtube_channel_stats`
- `id` — Always 1 (single row for the channel)
- `channel_id` — The YouTube channel ID
- `subscriber_count` — Current subscriber count
- `view_count` — Total channel views
- `video_count` — Total number of public videos
- `fetched_at` — When stats were last fetched

## Security
- RLS enabled on both tables
- Public read access (anon + authenticated) — data is public YouTube info
- No write access from frontend — only edge function (service role) writes
*/

CREATE TABLE IF NOT EXISTS youtube_videos (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail_url text NOT NULL,
  duration text DEFAULT '0:00',
  view_count bigint DEFAULT 0,
  like_count bigint DEFAULT 0,
  published_at timestamptz NOT NULL,
  category text DEFAULT 'Science',
  fetched_at timestamptz DEFAULT now()
);

ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_videos" ON youtube_videos;
CREATE POLICY "public_read_videos" ON youtube_videos
  FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS youtube_channel_stats (
  id integer PRIMARY KEY DEFAULT 1,
  channel_id text NOT NULL,
  subscriber_count bigint DEFAULT 0,
  view_count bigint DEFAULT 0,
  video_count integer DEFAULT 0,
  fetched_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE youtube_channel_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_stats" ON youtube_channel_stats;
CREATE POLICY "public_read_stats" ON youtube_channel_stats
  FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_published_at
  ON youtube_videos (published_at DESC);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_fetched_at
  ON youtube_videos (fetched_at DESC);
