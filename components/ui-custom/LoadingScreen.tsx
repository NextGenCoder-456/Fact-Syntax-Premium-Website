'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LOGO_URL =
  'https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s800-c-k-c0x00ffffff-no-rj';

interface Props {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#05070B] flex flex-col items-center justify-center gap-6"
    >
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00D9FF]/[0.06] blur-[80px]" />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#00D9FF]/40 shadow-[0_0_40px_rgba(0,217,255,0.3)]">
          <Image
            src={LOGO_URL}
            alt="Fact Syntax"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2 rounded-full border-2 border-transparent border-t-[#00D9FF]/60"
        />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center relative z-10"
      >
        <p className="font-space font-bold text-xl text-white tracking-tight">
          Fact <span className="text-[#00D9FF]">Syntax</span>
        </p>
        <p className="text-[#64748B] text-xs font-inter mt-1 tracking-widest uppercase">
          Reality Isn&apos;t Real
        </p>
      </motion.div>

      {/* Loading shimmer bar */}
      <div className="relative w-40 h-px bg-white/10 overflow-hidden rounded-full z-10">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"
        />
      </div>
    </motion.div>
  );
}
