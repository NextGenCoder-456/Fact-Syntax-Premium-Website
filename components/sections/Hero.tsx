'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Youtube, ChevronDown } from 'lucide-react';

const LOGO_URL =
  'https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s800-c-k-c0x00ffffff-no-rj';

const BANNER_URL =
  'https://yt3.googleusercontent.com/ZJqUXkLONzKGXbFfyt8n9Woo9jGCSLWckwx-W46qT0yhwegy4o6_bCNd4NPHz8G2uXsvfIwyqA=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05070B]">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00D9FF]/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/[0.04] blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,217,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
          {/* ── Left: Text content ── */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Channel badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#00D9FF]/40 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                <Image src={LOGO_URL} alt="Fact Syntax" fill className="object-cover" unoptimized />
              </div>
              <div>
                <p className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">
                  Fact Syntax
                </p>
                <p className="text-[#64748B] text-xs font-inter">YouTube Channel</p>
              </div>
            </motion.div>

            {/* "REALITY ISN'T REAL" — banner tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black leading-[0.9] tracking-tighter select-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {/* REALITY ISN'T */}
                <div className="relative inline-block">
                  <span
                    className="text-white"
                    style={{
                      fontStyle: 'italic',
                      textShadow: '0 0 30px rgba(255,255,255,0.15)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    REALITY{' '}
                  </span>
                  <span
                    className="text-white"
                    style={{
                      fontStyle: 'italic',
                      textShadow: '0 0 30px rgba(255,255,255,0.15)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    ISN&apos;T{' '}
                  </span>
                </div>
                {/* REAL — red, bold */}
                <div
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626, #B91C1C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontStyle: 'italic',
                    letterSpacing: '-0.04em',
                    filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.5))',
                  }}
                >
                  REAL
                </div>
              </div>

              {/* Glitch line accent under tagline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-px bg-gradient-to-r from-[#00D9FF] via-[#00D9FF]/50 to-transparent mt-4"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#94A3B8] text-lg font-inter leading-relaxed max-w-lg"
            >
              Mind-bending facts about science, space, psychology, and history —
              delivered in a cinematic style that questions everything you thought you knew.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/videos"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D9FF] hover:bg-[#00C4E8] text-[#05070B] font-semibold font-space text-sm transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,217,255,0.4)] hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Watch Videos
              </Link>
              <a
                href="https://www.youtube.com/@factsyntax?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-400/60 font-semibold font-space text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4" />
                Subscribe
              </a>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { value: '500K+', label: 'Subscribers' },
                { value: '80M+', label: 'Total Views' },
                { value: '87+', label: 'Videos' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-white font-space font-bold text-xl">{stat.value}</div>
                  <div className="text-[#64748B] text-xs font-inter">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Banner visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D9FF]/10 via-transparent to-[#8B5CF6]/10 blur-2xl" />

            {/* Banner card */}
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              {/* The YouTube channel banner image */}
              <div className="relative aspect-video">
                <Image
                  src={BANNER_URL}
                  alt="Reality Isn't Real — Fact Syntax Channel Banner"
                  fill
                  className="object-cover object-right"
                  unoptimized
                  priority
                />
                {/* Subtle left-edge gradient so it blends into the dark bg */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070B]/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/40 via-transparent to-transparent" />
              </div>

              {/* Bottom info strip */}
              <div className="bg-[#0B111B]/90 backdrop-blur-sm px-5 py-3 flex items-center gap-3 border-t border-white/[0.06]">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#00D9FF]/30">
                  <Image src={LOGO_URL} alt="Fact Syntax" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-white text-sm font-space font-semibold leading-none">Fact Syntax</p>
                  <p className="text-[#64748B] text-xs font-inter mt-0.5">Reality Isn&apos;t Real</p>
                </div>
                <a
                  href="https://www.youtube.com/@factsyntax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-400 text-white text-xs font-semibold font-space transition-colors"
                >
                  <Youtube className="w-3 h-3" />
                  Visit Channel
                </a>
              </div>
            </div>

            {/* Floating decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#00D9FF]/10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-[#8B5CF6]/10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#64748B]"
      >
        <span className="text-xs font-inter tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
