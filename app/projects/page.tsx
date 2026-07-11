'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Live: { bg: 'rgba(16,185,129,0.1)', text: '#10B981', border: 'rgba(16,185,129,0.3)' },
  Beta: { bg: 'rgba(0,217,255,0.1)', text: '#00D9FF', border: 'rgba(0,217,255,0.3)' },
  'In Progress': { bg: 'rgba(245,158,11,0.1)', text: '#F59E0B', border: 'rgba(245,158,11,0.3)' },
  'Coming Soon': { bg: 'rgba(139,92,246,0.1)', text: '#8B5CF6', border: 'rgba(139,92,246,0.3)' },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 mb-5">
            <span className="text-[#8B5CF6] text-xs font-semibold tracking-widest uppercase font-space">Lab</span>
          </div>
          <h1 className="section-heading text-white mb-4">
            Creative <span className="text-gradient-accent">Projects</span>
          </h1>
          <p className="text-[#94A3B8] font-inter max-w-xl">
            Interactive experiences, tools, and platforms built to make knowledge more accessible and engaging.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const statusStyle = statusColors[project.status] ?? statusColors['Coming Soon'];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#8B5CF6]/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B111B] via-[#0B111B]/20 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold font-space"
                    style={{ background: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}` }}>
                    {project.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-space font-bold text-white text-xl mb-2 group-hover:text-[#8B5CF6] transition-colors">{project.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed font-inter mb-5">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[#94A3B8] text-xs font-inter border border-white/[0.06]">{tag}</span>
                      ))}
                    </div>
                    <a href={project.url} className="flex items-center gap-1 text-[#8B5CF6] text-sm font-space hover:gap-2 transition-all group-hover:text-[#00D9FF]">
                      View <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-10 rounded-2xl bg-[#0B111B] border border-white/[0.08]"
        >
          <h2 className="font-space font-bold text-white text-2xl mb-3">Have a project idea?</h2>
          <p className="text-[#94A3B8] mb-6 font-inter">We love collaborating with curious minds on educational tech projects.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
