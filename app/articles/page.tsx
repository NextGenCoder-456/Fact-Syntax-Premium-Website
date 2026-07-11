'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Search, ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';

const allCategories = ['All', 'Space', 'Science', 'History', 'Psychology', 'Mysteries', 'Technology', 'Nature'];
const categoryColors: Record<string, string> = {
  Space: '#8B5CF6', Science: '#00D9FF', History: '#F59E0B',
  Psychology: '#EC4899', Mysteries: '#10B981', Technology: '#3B82F6', Nature: '#22C55E',
};

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">Knowledge</span>
          </div>
          <h1 className="section-heading text-white mb-4">
            All <span className="text-gradient-cyan">Articles</span>
          </h1>
          <p className="text-[#94A3B8] font-inter max-w-xl">
            Deep-dive written explorations of the facts that shape our understanding of reality.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-space transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00D9FF] text-[#05070B]'
                    : 'bg-white/[0.04] text-[#94A3B8] hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => {
            const color = categoryColors[article.category] ?? '#00D9FF';
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B111B] to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold font-space"
                    style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                    {article.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-space font-bold text-white text-base leading-snug mb-3 group-hover:text-[#00D9FF] transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed font-inter line-clamp-2 flex-1 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#64748B] text-xs">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#00D9FF] text-xs font-space">
                      Read <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#64748B] font-inter">No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
