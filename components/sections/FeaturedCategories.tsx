'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Atom, Globe, Landmark, Brain, Eye, Cpu, Leaf } from 'lucide-react';
import { categories } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Atom,
  Orbit: Globe,
  Landmark,
  Brain,
  Eye,
  Cpu,
  Leaf,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function FeaturedCategories() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">Explore</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            Browse by{' '}
            <span className="text-gradient-cyan">Category</span>
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto font-inter">
            From the depths of space to the mysteries of the human mind — pick your curiosity and dive deep.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Atom;
            return (
              <motion.div key={cat.name} variants={cardVariants}>
                <Link href={`/videos?category=${cat.name.toLowerCase()}`} className="group block">
                  <div
                    className="relative p-5 rounded-2xl border border-white/[0.08] bg-[#0B111B] hover:border-[#00D9FF]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,217,255,0.08)] text-center overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-transform group-hover:scale-110 duration-300"
                        style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: cat.color }} />
                      </div>
                      <div>
                        <p className="font-space font-semibold text-white text-sm">{cat.name}</p>
                        <p className="text-[#64748B] text-xs mt-0.5">{cat.count} videos</p>
                      </div>
                    </div>

                    {/* Glow on hover */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)` }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
