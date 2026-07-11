'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, Eye, Calendar, ArrowRight, Youtube, Wifi, WifiOff } from 'lucide-react';
import { useYouTubeVideos } from '@/hooks/useYouTubeData';

const categoryColors: Record<string, string> = {
  Space: '#8B5CF6',
  Science: '#00D9FF',
  History: '#F59E0B',
  Psychology: '#EC4899',
  Mysteries: '#10B981',
  Technology: '#3B82F6',
  Nature: '#22C55E',
};

function VideoCardSkeleton() {
  return (
    <div className="bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.06] animate-pulse">
      <div className="aspect-video bg-white/[0.04]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/[0.06] rounded w-4/5" />
        <div className="h-3 bg-white/[0.06] rounded w-3/5" />
        <div className="flex gap-3">
          <div className="h-2.5 bg-white/[0.04] rounded w-16" />
          <div className="h-2.5 bg-white/[0.04] rounded w-20" />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index }: { video: ReturnType<typeof useYouTubeVideos>['videos'][0]; index: number }) {
  const color = categoryColors[video.category] ?? '#00D9FF';

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B111B] via-transparent to-transparent opacity-60" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-[#00D9FF]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.5)]">
            <Play className="w-6 h-6 text-[#05070B] fill-current ml-1" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-mono flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Category */}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold font-space"
          style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
        >
          {video.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-space font-semibold text-white text-sm leading-snug mb-3 group-hover:text-[#00D9FF] transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-[#64748B] text-xs font-inter">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {video.uploadDate}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function LatestVideos() {
  const { videos, loading, isLive } = useYouTubeVideos(8);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D9FF]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <Youtube className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-[#94A3B8] text-sm font-inter">Latest from YouTube</span>
              {/* Live / Mock indicator */}
              {!loading && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${isLive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/[0.04] text-[#64748B] border border-white/[0.06]'}`}>
                  {isLive ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
                  {isLive ? 'LIVE' : 'Demo'}
                </div>
              )}
            </div>
            <h2 className="section-heading text-white">
              Latest{' '}
              <span className="text-gradient-cyan">Videos</span>
            </h2>
          </div>
          <Link
            href="/videos"
            className="hidden sm:flex items-center gap-2 text-[#94A3B8] hover:text-[#00D9FF] text-sm font-inter transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <VideoCardSkeleton key={i} />)
            : videos.map((video, i) => <VideoCard key={video.id} video={video} index={i} />)
          }
        </div>

        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/videos"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-white text-sm font-space hover:border-[#00D9FF]/30 transition-colors"
          >
            View All Videos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
