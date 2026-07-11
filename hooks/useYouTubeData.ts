'use client';

import { useState, useEffect } from 'react';
import { videos as mockVideos } from '@/lib/data';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  duration: string;
  view_count: number;
  like_count: number;
  published_at: string;
  category: string;
  fetched_at: string;
}

export interface YouTubeStats {
  channel_id: string;
  subscriber_count: number;
  view_count: number;
  video_count: number;
  fetched_at: string;
}

export interface NormalizedVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  category: string;
  youtubeId: string;
  description: string;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return Math.round(n / 1_000) + 'K';
  return String(n);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return '1 month ago';
  return `${Math.floor(days / 30)} months ago`;
}

function normalizeVideo(v: YouTubeVideo): NormalizedVideo {
  return {
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail_url,
    duration: v.duration,
    views: formatViews(v.view_count),
    uploadDate: timeAgo(v.published_at),
    category: v.category,
    youtubeId: v.id,
    description: v.description,
  };
}

// ── Videos Hook ──────────────────────────────────────────────────────────────

export function useYouTubeVideos(maxResults = 12) {
  const [videos, setVideos] = useState<NormalizedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/youtube/videos?maxResults=${maxResults}`);
        if (!res.ok) throw new Error('API error');
        const json = await res.json();

        if (!cancelled) {
          if (json.data && Array.isArray(json.data) && json.data.length > 0 && !json.error) {
            setVideos((json.data as YouTubeVideo[]).map(normalizeVideo));
            setIsLive(true);
          } else {
            // Fallback to mock data
            setVideos(mockVideos.slice(0, maxResults).map(v => ({ ...v, description: '' })));
          }
        }
      } catch {
        if (!cancelled) {
          setVideos(mockVideos.slice(0, maxResults).map(v => ({ ...v, description: '' })));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [maxResults]);

  return { videos, loading, isLive };
}

// ── Stats Hook ───────────────────────────────────────────────────────────────

export function useYouTubeStats() {
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/youtube/stats');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();

        if (!cancelled) {
          if (json.data && json.data.subscriber_count !== undefined && !json.error) {
            setStats(json.data as YouTubeStats);
            setIsLive(true);
          }
        }
      } catch {
        // silently fall back to mock stats in Statistics.tsx
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, isLive };
}
