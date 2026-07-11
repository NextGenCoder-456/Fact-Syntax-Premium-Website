'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => {
          const lx = (i * 53.7 + 17) % 100;
          const ty = (i * 79.1 + 31) % 100;
          const dur = 2 + (i % 4);
          const delay = (i % 10) * 0.25;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: (1 + i % 2) + 'px',
                height: (1 + i % 2) + 'px',
                left: lx + '%',
                top: ty + '%',
                opacity: 0.15 + (i % 6) * 0.08,
                animation: `twinkle ${dur}s ease-in-out infinite`,
                animationDelay: delay + 's',
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="font-space font-bold text-[180px] leading-none text-transparent mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(139,92,246,0.1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}>
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-space font-bold text-white text-3xl mb-4">Page Lost in Space</h1>
          <p className="text-[#94A3B8] font-inter mb-8 leading-relaxed">
            Like dark matter, this page seems to exist but can&apos;t be detected. Let us guide you back to the known universe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/videos"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-white font-space text-sm hover:border-[#00D9FF]/30 transition-all"
            >
              Watch Videos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
