'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8B5CF6]/[0.04] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 mb-5">
            <span className="text-[#8B5CF6] text-xs font-semibold tracking-widest uppercase font-space">Community</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            What Curious Minds{' '}
            <span className="text-gradient-accent">Say</span>
          </h2>
          <p className="text-[#94A3B8] max-w-lg mx-auto font-inter">
            Real words from our community of 500,000+ subscribers across 148 countries.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid group p-6 rounded-2xl bg-[#0B111B] border border-white/[0.08] hover:border-[#8B5CF6]/25 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.08)]"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#8B5CF6]/30 mb-4 group-hover:text-[#8B5CF6]/50 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              <p className="text-[#94A3B8] text-sm leading-relaxed font-inter mb-5 group-hover:text-white/80 transition-colors">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.1] flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-space font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-[#64748B] text-xs font-inter">{t.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
