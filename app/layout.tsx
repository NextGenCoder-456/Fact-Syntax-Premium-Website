'use client';

import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import CommandMenu from '@/components/ui-custom/CommandMenu';
import BackToTop from '@/components/ui-custom/BackToTop';
import LoadingScreen from '@/components/ui-custom/LoadingScreen';
import ReadingProgress from '@/components/ui-custom/ReadingProgress';
import CustomCursor from '@/components/ui-custom/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Fact Syntax — Reality isn&apos;t Real. Facts Are.</title>
        <meta name="description" content="Exploring science, psychology, mysteries, history, space and the hidden stories shaping our universe. Premium documentary-style YouTube content." />
        <meta name="keywords" content="fact syntax, science, space, psychology, history, mysteries, technology, nature, documentary, youtube" />
        <meta property="og:title" content="Fact Syntax — Reality isn't Real. Facts Are." />
        <meta property="og:description" content="Exploring science, psychology, mysteries, history, space and the hidden stories shaping our universe." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fact Syntax — Reality isn't Real. Facts Are." />
        <link rel="icon" href="https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s96-c-k-c0x00ffffff-no-rj" />
        <link rel="apple-touch-icon" href="https://yt3.ggpht.com/X_P-HZHvXxyvF_KV36OyzQQrA6qgj3wjienzzf3W3pjhKO5F9BZ_R0n6NQL51yovlCJMK4dK2g=s180-c-k-c0x00ffffff-no-rj" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-[#05070B] text-white antialiased`}>
        <CustomCursor />
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        {!loading && (
          <>
            <ReadingProgress />
            <Navigation onCommandOpen={() => setCommandOpen(true)} />
            <main>{children}</main>
            <Footer />
            <BackToTop />
            <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />
            <div className="noise-overlay" aria-hidden="true" />
          </>
        )}
      </body>
    </html>
  );
}
