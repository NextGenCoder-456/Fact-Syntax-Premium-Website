'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';
import { CheckCircle, Circle } from 'lucide-react';

export default function Timeline() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00D9FF]/[0.04] blur-[80px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">Our Journey</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            The Evolution of{' '}
            <span className="text-gradient-cyan">Fact Syntax</span>
          </h2>
          <p className="text-[#94A3B8] max-w-lg mx-auto font-inter">
            From zero subscribers to half a million — the story of building a documentary platform from scratch.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00D9FF]/30 to-transparent origin-top"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'}`}>
                  <div className={`inline-block p-5 rounded-2xl bg-[#0B111B] border transition-all hover:border-[#00D9FF]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${item.milestone ? 'border-[#00D9FF]/20' : 'border-white/[0.08]'}`}>
                    <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <span className="text-[#00D9FF] text-xs font-mono font-bold tracking-widest">{item.year}</span>
                      {item.milestone && (
                        <span className="px-2 py-0.5 rounded-md bg-[#00D9FF]/10 text-[#00D9FF] text-[10px] font-semibold border border-[#00D9FF]/20">
                          MILESTONE
                        </span>
                      )}
                    </div>
                    <h3 className="font-space font-bold text-white text-lg mb-1">{item.event}</h3>
                    <p className="text-[#94A3B8] text-sm font-inter leading-relaxed max-w-xs">{item.description}</p>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 flex items-center justify-center">
                  {item.milestone ? (
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="w-9 h-9 rounded-full bg-[#00D9FF]/15 border-2 border-[#00D9FF] flex items-center justify-center"
                      style={{ boxShadow: '0 0 20px rgba(0,217,255,0.4)' }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#00D9FF]" />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#0B111B] border border-white/20 flex items-center justify-center">
                      <Circle className="w-3 h-3 text-[#64748B]" />
                    </div>
                  )}
                </div>

                {/* Empty side (desktop) */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
