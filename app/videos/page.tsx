'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Clock, Eye, Calendar, Search, Filter, Wifi, WifiOff } from 'lucide-react';
import { useYouTubeVideos } from '@/hooks/useYouTubeData';

const allCategories = ['All', 'Space', 'Science', 'History', 'Psychology', 'Mysteries', 'Technology', 'Nature'];
const categoryColors: Record<string, string> = {
  Space: '#8B5CF6', Science: '#00D9FF', History: '#F59E0B',
  Psychology: '#EC4899', Mysteries: '#10B981', Technology: '#3B82F6', Nature: '#22C55E',
};

function VideoCardSkeleton() {
  return (
    <div className="bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.06] animate-pulse">
      <div className="aspect-video bg-white/[0.04]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/[0.06] rounded w-4/5" />
        <div className="h-3 bg-white/[0.06] rounded w-3/5" />
        <div className="flex gap-3 mt-2">
          <div className="h-2.5 bg-white/[0.04] rounded w-16" />
          <div className="h-2.5 bg-white/[0.04] rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { videos, loading, isLive } = useYouTubeVideos(20);

  const filtered = useMemo(() => {
    return videos.filter(v => {
      const matchCat = activeCategory === 'All' || v.category === activeCategory;
      const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [videos, activeCategory, search]);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">YouTube</span>
            {!loading && (
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ml-1 ${isLive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.04] text-[#64748B]'}`}>
                {isLive ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
                {isLive ? 'Live Channel Data' : 'Demo Data'}
              </div>
            )}
          </div>
          <h1 className="section-heading text-white mb-4">
            All <span className="text-gradient-cyan">Videos</span>
          </h1>
          <p className="text-[#94A3B8] font-inter max-w-xl">
            Cinematic documentary-style content covering the universe&apos;s most fascinating mysteries.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-[#64748B] flex-shrink-0" />
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-space transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00D9FF] text-[#05070B]'
                    : 'bg-white/[0.04] text-[#94A3B8] hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <VideoCardSkeleton key={i} />)
          ) : (
            filtered.map((video, i) => {
              const color = categoryColors[video.category] ?? '#00D9FF';
              return (
                <motion.a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B111B] via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#00D9FF]/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-[#05070B] fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />{video.duration}
                    </div>
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold font-space"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {video.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-space font-semibold text-white text-sm leading-snug mb-3 group-hover:text-[#00D9FF] transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[#64748B] text-xs">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{video.views}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{video.uploadDate}</span>
                    </div>
                  </div>
                </motion.a>
              );
            })
          )}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#64748B] font-inter">No videos found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
