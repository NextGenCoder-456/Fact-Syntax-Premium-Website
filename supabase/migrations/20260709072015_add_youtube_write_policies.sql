/*
# Add Write Policies for YouTube Cache Tables

YouTube data is public information fetched from the YouTube API.
The Next.js server-side API routes need to upsert (write) this data into
the cache tables using the anon key. Since the data is public YouTube info
(not user-private data), allowing anon writes is safe here.

## Changes
- Add INSERT policy for anon + authenticated on `youtube_videos`
- Add UPDATE policy for anon + authenticated on `youtube_videos`
- Add INSERT policy for anon + authenticated on `youtube_channel_stats`
- Add UPDATE policy for anon + authenticated on `youtube_channel_stats`
*/

DROP POLICY IF EXISTS "anon_insert_videos" ON youtube_videos;
CREATE POLICY "anon_insert_videos" ON youtube_videos
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_videos" ON youtube_videos;
CREATE POLICY "anon_update_videos" ON youtube_videos
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_stats" ON youtube_channel_stats;
CREATE POLICY "anon_insert_stats" ON youtube_channel_stats
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_stats" ON youtube_channel_stats;
CREATE POLICY "anon_update_stats" ON youtube_channel_stats
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
