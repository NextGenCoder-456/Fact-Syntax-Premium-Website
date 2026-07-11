'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Instagram, Twitter, Github, MessageSquare, ArrowRight, Zap, Target, Eye, Heart } from 'lucide-react';
import { timeline, stats } from '@/lib/data';
import Timeline from '@/components/sections/Timeline';

const socials = [
  { icon: Youtube, label: 'YouTube', handle: '@factsyntax', color: '#FF0000', href: 'https://youtube.com' },
  { icon: Instagram, label: 'Instagram', handle: '@factsyntax', color: '#E1306C', href: 'https://instagram.com' },
  { icon: Twitter, label: 'X (Twitter)', handle: '@factsyntax', color: '#1DA1F2', href: 'https://x.com' },
  { icon: MessageSquare, label: 'Discord', handle: 'Fact Syntax Community', color: '#5865F2', href: 'https://discord.gg' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-6">
              <Zap className="w-3 h-3 text-[#00D9FF]" />
              <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">The Story</span>
            </div>
            <h1 className="section-heading text-white mb-6">
              About{' '}
              <span className="text-gradient-cyan">Fact Syntax</span>
            </h1>
            <div className="space-y-4 text-[#94A3B8] font-inter leading-relaxed">
              <p>
                Fact Syntax started as a solo passion project in 2020 with one simple belief: the world becomes a better place when people understand it more deeply. Every video we create is an attempt to bridge the gap between complex reality and human curiosity.
              </p>
              <p>
                We cover science, space, psychology, history, nature, and technology — not just as dry facts, but as living stories that challenge everything you thought you knew. Our cinematic, documentary-style approach transforms information into an experience.
              </p>
              <p>
                <em className="text-white italic">&ldquo;Reality isn&apos;t real. Facts are.&rdquo;</em> — This isn&apos;t just a tagline. It&apos;s the philosophy that drives every frame we create.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/videos" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all">
                Watch Videos <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-white font-space text-sm hover:border-[#00D9FF]/30 transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden border border-white/[0.1]">
              <Image
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fact Syntax Creator"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl glass border border-[#00D9FF]/20">
              <p className="font-space font-bold text-[#00D9FF] text-2xl">{stats[0].display}</p>
              <p className="text-[#64748B] text-xs">Subscribers</p>
            </div>
            <div className="absolute -top-4 -right-4 p-4 rounded-2xl glass border border-[#8B5CF6]/20">
              <p className="font-space font-bold text-[#8B5CF6] text-2xl">{stats[1].display}</p>
              <p className="text-[#64748B] text-xs">Total Views</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-space font-bold text-white text-3xl mb-10 text-center"
        >
          Our Core <span className="text-gradient-cyan">Values</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: 'Accuracy', desc: 'Every fact is verified from credible sources. We never compromise on truth.', color: '#00D9FF' },
            { icon: Eye, title: 'Curiosity', desc: 'We ask the questions others are afraid to ask and go where the facts lead.', color: '#8B5CF6' },
            { icon: Target, title: 'Clarity', desc: 'Complex ideas deserve simple, powerful explanations without dumbing them down.', color: '#F59E0B' },
            { icon: Heart, title: 'Community', desc: 'Half a million curious minds, united by the pursuit of understanding.', color: '#EC4899' },
          ].map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#0B111B] border border-white/[0.08] hover:border-white/[0.15] transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${val.color}15`, border: `1px solid ${val.color}30` }}>
                <val.icon className="w-6 h-6" style={{ color: val.color }} />
              </div>
              <h3 className="font-space font-bold text-white text-lg mb-2">{val.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed font-inter">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <Timeline />

      {/* Social Links */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-space font-bold text-white text-3xl mb-3">Find Us Online</h2>
          <p className="text-[#94A3B8] font-inter">Join the conversation across all our platforms.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#0B111B] border border-white/[0.08] hover:border-white/[0.2] transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <div>
                <p className="font-space font-semibold text-white">{s.label}</p>
                <p className="text-[#64748B] text-sm">{s.handle}</p>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 text-[#64748B] group-hover:text-[#00D9FF] group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
