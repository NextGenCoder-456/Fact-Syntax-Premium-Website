'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Youtube, BookOpen, Layers, User, Mail, Atom, Orbit, Brain, Eye, Cpu, Leaf, Landmark } from 'lucide-react';
import Link from 'next/link';

const commands = [
  { label: 'Home', href: '/', icon: Layers, group: 'Navigation' },
  { label: 'Videos', href: '/videos', icon: Youtube, group: 'Navigation' },
  { label: 'Articles', href: '/articles', icon: BookOpen, group: 'Navigation' },
  { label: 'Projects', href: '/projects', icon: Layers, group: 'Navigation' },
  { label: 'About', href: '/about', icon: User, group: 'Navigation' },
  { label: 'Contact', href: '/contact', icon: Mail, group: 'Navigation' },
  { label: 'Science', href: '/videos?category=science', icon: Atom, group: 'Categories' },
  { label: 'Space', href: '/videos?category=space', icon: Orbit, group: 'Categories' },
  { label: 'Psychology', href: '/videos?category=psychology', icon: Brain, group: 'Categories' },
  { label: 'Mysteries', href: '/videos?category=mysteries', icon: Eye, group: 'Categories' },
  { label: 'Technology', href: '/videos?category=technology', icon: Cpu, group: 'Categories' },
  { label: 'Nature', href: '/videos?category=nature', icon: Leaf, group: 'Categories' },
  { label: 'History', href: '/videos?category=history', icon: Landmark, group: 'Categories' },
];

export default function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const groups = Array.from(new Set(filtered.map(c => c.group)));

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-[#0B111B] border border-white/[0.1] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-[#64748B] flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages, categories..."
                className="flex-1 bg-transparent text-white placeholder:text-[#64748B] text-sm outline-none font-inter"
              />
              <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.06] text-[#64748B] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-[#64748B] text-sm">No results found.</div>
              ) : (
                groups.map(group => (
                  <div key={group} className="mb-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-[#64748B] uppercase tracking-widest">
                      {group}
                    </div>
                    {filtered.filter(c => c.group === group).map(cmd => (
                      <Link
                        key={cmd.href}
                        href={cmd.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] group transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center flex-shrink-0">
                          <cmd.icon className="w-3.5 h-3.5 text-[#00D9FF]" />
                        </div>
                        <span className="flex-1 text-sm text-white/80 group-hover:text-white transition-colors">{cmd.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[#64748B] text-xs">Press ESC to close</span>
              <span className="text-[#64748B] text-xs">⌘K to open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
