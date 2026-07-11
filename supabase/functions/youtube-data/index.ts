import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// ISO 8601 duration (PT10M47S) → "10:47"
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const h = parseInt(match[1] || "0");
  const m = parseInt(match[2] || "0");
  const s = parseInt(match[3] || "0");
  const mm = String(m).padStart(h > 0 ? 2 : 1, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// Detect category from title
function detectCategory(title: string, description: string): string {
  const text = (title + " " + description).toLowerCase();
  if (/space|galaxy|black hole|planet|star|cosmos|universe|nasa|asteroid|nebula|solar|moon|mars/.test(text)) return "Space";
  if (/psychology|brain|mind|mental|emotion|behavior|memory|cognitive|consciousness/.test(text)) return "Psychology";
  if (/history|ancient|civilization|empire|war|king|queen|medieval|pyramid|egypti/.test(text)) return "History";
  if (/mystery|mystery|unknown|secret|conspiracy|unexplained|paranormal|alien|ufo/.test(text)) return "Mysteries";
  if (/technology|ai|robot|computer|quantum|future|tech|digital|cyber|internet/.test(text)) return "Technology";
  if (/nature|animal|ocean|sea|forest|plant|earth|climate|evolution|species/.test(text)) return "Nature";
  if (/physics|chemistry|biology|science|experiment|molecule|atom|dna|cell/.test(text)) return "Science";
  return "Science";
}

// Format large numbers
function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return Math.round(n / 1000) + "K";
  return String(n);
}

// Relative time
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "videos";
    const maxResults = parseInt(url.searchParams.get("maxResults") || "12");
    const forceRefresh = url.searchParams.get("refresh") === "1";

    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
    const YOUTUBE_CHANNEL_ID = Deno.env.get("YOUTUBE_CHANNEL_ID");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      return new Response(
        JSON.stringify({ error: "YouTube API key or channel ID not configured", configured: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // ─── CHANNEL STATS ───
    if (type === "stats") {
      // Check cache
      if (!forceRefresh) {
        const { data: cached } = await supabase
          .from("youtube_channel_stats")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (cached && Date.now() - new Date(cached.fetched_at).getTime() < CACHE_TTL_MS) {
          return new Response(JSON.stringify({ data: cached, cached: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      // Fetch from YouTube
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );
      if (!channelRes.ok) throw new Error(`YouTube API error: ${channelRes.status}`);
      const channelData = await channelRes.json();

      if (!channelData.items?.length) {
        return new Response(
          JSON.stringify({ error: "Channel not found. Check YOUTUBE_CHANNEL_ID." }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const stats = channelData.items[0].statistics;
      const record = {
        id: 1,
        channel_id: YOUTUBE_CHANNEL_ID,
        subscriber_count: parseInt(stats.subscriberCount || "0"),
        view_count: parseInt(stats.viewCount || "0"),
        video_count: parseInt(stats.videoCount || "0"),
        fetched_at: new Date().toISOString(),
      };

      await supabase.from("youtube_channel_stats").upsert(record);

      return new Response(JSON.stringify({ data: record, cached: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── VIDEOS ───
    // Check cache freshness
    if (!forceRefresh) {
      const { data: latestVideo } = await supabase
        .from("youtube_videos")
        .select("fetched_at")
        .order("fetched_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestVideo && Date.now() - new Date(latestVideo.fetched_at).getTime() < CACHE_TTL_MS) {
        const { data: cachedVideos } = await supabase
          .from("youtube_videos")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(maxResults);

        return new Response(
          JSON.stringify({ data: cachedVideos, cached: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Step 1: Get uploads playlist ID
    const chanRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    if (!chanRes.ok) throw new Error(`YouTube channels API error: ${chanRes.status}`);
    const chanData = await chanRes.json();

    if (!chanData.items?.length) {
      return new Response(
        JSON.stringify({ error: "Channel not found. Check YOUTUBE_CHANNEL_ID.", configured: true }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const uploadsPlaylistId = chanData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Get videos from uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    if (!playlistRes.ok) throw new Error(`YouTube playlistItems API error: ${playlistRes.status}`);
    const playlistData = await playlistRes.json();

    if (!playlistData.items?.length) {
      return new Response(
        JSON.stringify({ data: [], cached: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const videoIds = playlistData.items
      .map((item: any) => item.contentDetails.videoId)
      .join(",");

    // Step 3: Get video details (duration, view count, likes)
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    if (!detailsRes.ok) throw new Error(`YouTube videos API error: ${detailsRes.status}`);
    const detailsData = await detailsRes.json();

    const videos = detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: (item.snippet.description || "").substring(0, 300),
      thumbnail_url:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url ||
        "",
      duration: parseDuration(item.contentDetails.duration),
      view_count: parseInt(item.statistics.viewCount || "0"),
      like_count: parseInt(item.statistics.likeCount || "0"),
      published_at: item.snippet.publishedAt,
      category: detectCategory(item.snippet.title, item.snippet.description || ""),
      fetched_at: new Date().toISOString(),
    }));

    // Upsert into Supabase
    await supabase.from("youtube_videos").upsert(videos, { onConflict: "id" });

    // Return formatted
    return new Response(
      JSON.stringify({ data: videos, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("youtube-data error:", err);
    return new Response(
      JSON.stringify({ error: String(err), configured: false }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
