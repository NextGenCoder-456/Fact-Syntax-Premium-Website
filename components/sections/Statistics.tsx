'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Users, Eye, Zap, Video, Globe, Calendar } from 'lucide-react';
import { useYouTubeStats } from '@/hooks/useYouTubeData';

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function formatDisplay(n: number, suffix?: string): string {
  if (n === 0) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  if (n >= 1_000) return Math.round(n / 1_000) + 'K+';
  return n + (suffix ?? '+');
}

interface StatItem {
  label: string;
  value: number;
  display: string;
  Icon: React.ElementType;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(stat.value, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-[#0B111B] border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/0 to-[#8B5CF6]/0 group-hover:from-[#00D9FF]/[0.03] group-hover:to-[#8B5CF6]/[0.03] transition-all duration-500 rounded-2xl" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center mx-auto mb-4 group-hover:border-[#00D9FF]/40 transition-colors">
          <stat.Icon className="w-6 h-6 text-[#00D9FF]" />
        </div>
        <div
          className="font-space font-bold text-4xl text-white mb-1"
          style={{
            background: 'linear-gradient(135deg, #00D9FF, #0EA5E9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {inView ? formatDisplay(count) : '0'}
        </div>
        <p className="text-[#94A3B8] text-sm font-inter">{stat.label}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/0 to-transparent group-hover:via-[#00D9FF]/30 transition-all" />
    </motion.div>
  );
}

export default function Statistics() {
  const { stats: ytStats, loading, isLive } = useYouTubeStats();

  // Build stat items — real if available, mock otherwise
  const statItems: StatItem[] = [
    {
      label: 'Subscribers',
      value: ytStats?.subscriber_count ?? 500_000,
      display: '',
      Icon: Users,
    },
    {
      label: 'Total Views',
      value: ytStats?.view_count ?? 80_000_000,
      display: '',
      Icon: Eye,
    },
    {
      label: 'Facts Covered',
      value: 120,
      display: '120+',
      Icon: Zap,
    },
    {
      label: 'Videos',
      value: ytStats?.video_count ?? 87,
      display: '',
      Icon: Video,
    },
    {
      label: 'Countries Reached',
      value: 148,
      display: '148+',
      Icon: Globe,
    },
    {
      label: 'Years of Curiosity',
      value: 4,
      display: '4+',
      Icon: Calendar,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D9FF]/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00D9FF]/[0.03] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">By The Numbers</span>
            {!loading && isLive && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                LIVE
              </span>
            )}
          </div>
          <h2 className="section-heading text-white mb-4">
            The Fact Syntax{' '}
            <span className="text-gradient-cyan">Universe</span>
          </h2>
          <p className="text-[#94A3B8] max-w-lg mx-auto font-inter">
            Numbers that reflect a growing community of curious minds from around the world.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-[#0B111B] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statItems.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
