'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Eye } from 'lucide-react';

export default function CreatorSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8B5CF6]/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative mx-auto w-80 h-96 lg:w-full lg:h-[500px]">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#8B5CF6]/10 rounded-3xl blur-xl" />

              {/* Main image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/[0.1]"
                style={{ background: 'linear-gradient(145deg, rgba(0,217,255,0.05), rgba(139,92,246,0.05))' }}>
                <Image
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fact Syntax Creator"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '500K+', label: 'Subscribers' },
                      { val: '80M+', label: 'Views' },
                      { val: '4+', label: 'Years' },
                    ].map(s => (
                      <div key={s.label} className="text-center glass rounded-xl py-2">
                        <p className="font-space font-bold text-[#00D9FF] text-sm">{s.val}</p>
                        <p className="text-[#64748B] text-[10px]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass border border-[#00D9FF]/30 rounded-2xl px-5 py-3"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#00D9FF]" />
                  <span className="font-space font-bold text-white text-sm">Fact Syntax</span>
                </div>
                <p className="text-[#64748B] text-xs mt-0.5">Creator & Storyteller</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 mb-6">
              <span className="text-[#8B5CF6] text-xs font-semibold tracking-widest uppercase font-space">The Creator</span>
            </div>
            <h2 className="section-heading text-white mb-6">
              Who is{' '}
              <span className="text-gradient-cyan">Fact Syntax?</span>
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6 font-inter">
              Fact Syntax is a passion-driven documentary YouTube channel built to challenge how people see the world. Through cinematic storytelling and rigorous research, we turn complex topics into captivating journeys.
            </p>
            <p className="text-[#94A3B8] leading-relaxed mb-8 font-inter">
              What started as a solo project in a small room has grown into a global community of over 500,000 curious minds. Every video is crafted with the philosophy: <em className="text-white">"Reality isn&apos;t real. Facts are."</em>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Zap, title: 'Mission', desc: 'Make the world more curious, one fact at a time.' },
                { icon: Eye, title: 'Vision', desc: 'Become the go-to platform for documentary-style education.' },
                { icon: Target, title: 'Values', desc: 'Accuracy, curiosity, and cinematic storytelling above all.' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00D9FF]/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center mb-3">
                    <item.icon className="w-4 h-4 text-[#00D9FF]" />
                  </div>
                  <p className="font-space font-semibold text-white text-sm mb-1">{item.title}</p>
                  <p className="text-[#64748B] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all hover:-translate-y-0.5 group"
            >
              Full Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
