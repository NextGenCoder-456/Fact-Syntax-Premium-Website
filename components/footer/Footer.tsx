'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Twitter, Instagram } from 'lucide-react';

const LOGO_URL =
  'https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s800-c-k-c0x00ffffff-no-rj';

const navGroups = [
  {
    label: 'Explore',
    links: [
      { href: '/videos', label: 'Videos' },
      { href: '/articles', label: 'Articles' },
      { href: '/projects', label: 'Projects' },
    ],
  },
  {
    label: 'About',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

const socials = [
  {
    Icon: Youtube,
    href: 'https://www.youtube.com/@factsyntax',
    label: 'YouTube',
    color: '#EF4444',
  },
  {
    Icon: Twitter,
    href: 'https://twitter.com/factsyntax',
    label: 'Twitter',
    color: '#1DA1F2',
  },
  {
    Icon: Instagram,
    href: 'https://instagram.com/factsyntax',
    label: 'Instagram',
    color: '#E1306C',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#05070B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#00D9FF]/30 group-hover:ring-[#00D9FF]/60 transition-all shadow-[0_0_16px_rgba(0,217,255,0.15)]">
                <Image src={LOGO_URL} alt="Fact Syntax" fill className="object-cover" unoptimized />
              </div>
              <span className="font-space font-bold text-lg text-white group-hover:text-[#00D9FF] transition-colors">
                Fact <span className="text-[#00D9FF]">Syntax</span>
              </span>
            </Link>

            <p className="text-[#64748B] text-sm font-inter leading-relaxed max-w-xs">
              Mind-bending facts about science, space, psychology, and history.{' '}
              <em className="text-[#94A3B8] not-italic">Reality Isn&apos;t Real.</em>
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#64748B] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'inherit' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="text-white font-space font-semibold text-sm mb-4">{group.label}</p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#64748B] hover:text-[#00D9FF] text-sm font-inter transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs font-inter text-center sm:text-left">
            &copy; {new Date().getFullYear()} Fact Syntax. All rights reserved.
          </p>
          <p className="text-[#64748B] text-xs font-inter italic">
            Reality Isn&apos;t Real — Question Everything
          </p>
        </div>
      </div>
    </footer>
  );
}
