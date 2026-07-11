'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Youtube, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL =
  'https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s800-c-k-c0x00ffffff-no-rj';

const links = [
  { href: '/', label: 'Home' },
  { href: '/videos', label: 'Videos' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface Props {
  onCommandOpen?: () => void;
}

export default function Navigation({ onCommandOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05070B]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#00D9FF]/30 group-hover:ring-[#00D9FF]/70 transition-all duration-300 shadow-[0_0_16px_rgba(0,217,255,0.2)] group-hover:shadow-[0_0_24px_rgba(0,217,255,0.4)]">
              <Image
                src={LOGO_URL}
                alt="Fact Syntax"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-space font-bold text-lg tracking-tight text-white group-hover:text-[#00D9FF] transition-colors">
              Fact <span className="text-[#00D9FF]">Syntax</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-inter font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'text-[#00D9FF]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-[#00D9FF]/10 rounded-lg"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Search / Command */}
            <button
              onClick={onCommandOpen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#64748B] hover:text-white hover:border-white/20 text-xs font-inter transition-all"
              title="Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline px-1 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono">⌘K</kbd>
            </button>

            {/* Subscribe */}
            <a
              href="https://www.youtube.com/@factsyntax?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold font-space transition-all duration-200 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
            >
              <Youtube className="w-4 h-4" />
              Subscribe
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#05070B]/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-inter font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#00D9FF]/10 text-[#00D9FF]'
                      : 'text-[#94A3B8] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.youtube.com/@factsyntax?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold font-space"
              >
                <Youtube className="w-4 h-4" />
                Subscribe on YouTube
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
