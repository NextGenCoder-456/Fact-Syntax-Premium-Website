'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Layers, ArrowRight } from 'lucide-react';
import { series } from '@/lib/data';

const categoryColors: Record<string, string> = {
  Space: '#8B5CF6',
  Science: '#00D9FF',
  History: '#F59E0B',
  Psychology: '#EC4899',
  Mysteries: '#10B981',
  Technology: '#3B82F6',
  Nature: '#22C55E',
};

export default function FeaturedSeries() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-[#94A3B8] text-sm font-inter">Ongoing Series</span>
            </div>
            <h2 className="section-heading text-white">
              Featured{' '}
              <span className="text-gradient-accent">Series</span>
            </h2>
          </div>
          <Link href="/videos" className="hidden sm:flex items-center gap-2 text-[#94A3B8] hover:text-[#8B5CF6] text-sm font-inter transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((s, i) => {
            const color = categoryColors[s.category] ?? '#00D9FF';
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={s.thumbnail}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, #0B111B 0%, rgba(11,17,27,0.3) 60%, transparent 100%)` }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: `${color}CC`, boxShadow: `0 0 30px ${color}60` }}>
                      <Play className="w-6 h-6 text-white fill-current ml-1" />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold font-space"
                    style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                    {s.category}
                  </div>

                  {/* Episode count */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-mono">
                    {s.episodeCount} eps
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-space font-bold text-white text-lg mb-2 group-hover:text-gradient-cyan transition-all">{s.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed font-inter line-clamp-2">{s.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#00D9FF] text-xs font-space group-hover:gap-3 transition-all">
                    Watch Series
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
