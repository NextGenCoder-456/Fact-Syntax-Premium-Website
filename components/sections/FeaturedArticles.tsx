'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { articles } from '@/lib/data';

const categoryColors: Record<string, string> = {
  Space: '#8B5CF6',
  Science: '#00D9FF',
  History: '#F59E0B',
  Psychology: '#EC4899',
  Mysteries: '#10B981',
  Technology: '#3B82F6',
  Nature: '#22C55E',
};

function ArticleCard({ article, index, featured }: { article: typeof articles[0]; index: number; featured?: boolean }) {
  const color = categoryColors[article.category] ?? '#00D9FF';

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative col-span-1 lg:col-span-2 row-span-2 bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B111B] via-[#0B111B]/40 to-transparent" />
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-semibold font-space"
            style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
            {article.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-space font-bold text-white text-xl leading-snug mb-3 group-hover:text-[#00D9FF] transition-colors">
            {article.title}
          </h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-3 font-inter">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#64748B] text-xs font-inter">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1 text-[#00D9FF] text-xs font-space group-hover:gap-2 transition-all">
              Read
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[#0B111B] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D9FF]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row gap-4"
    >
      <div className="relative w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B111B]/30" />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <div className="px-2 py-0.5 rounded-md text-[10px] font-semibold font-space w-fit mb-2"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
          {article.category}
        </div>
        <h3 className="font-space font-semibold text-white text-sm leading-snug mb-2 group-hover:text-[#00D9FF] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-[#64748B] text-xs font-inter">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedArticles() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#00D9FF]" />
              </div>
              <span className="text-[#94A3B8] text-sm font-inter">From the Lab</span>
            </div>
            <h2 className="section-heading text-white">
              Featured{' '}
              <span className="text-gradient-cyan">Articles</span>
            </h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:flex items-center gap-2 text-[#94A3B8] hover:text-[#00D9FF] text-sm font-inter transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured large */}
          <div className="lg:col-span-1">
            <ArticleCard article={articles[0]} index={0} featured />
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {articles.slice(1, 5).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
