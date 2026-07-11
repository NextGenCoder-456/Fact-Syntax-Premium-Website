'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, Zap } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B111B] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#00D9FF]/[0.04] blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[#8B5CF6]/[0.04] blur-[80px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-1"
          style={{
            background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(139,92,246,0.1), rgba(0,217,255,0.05))',
          }}
        >
          <div className="bg-[#0A0F1A] rounded-[22px] p-10 sm:p-14 text-center relative overflow-hidden">
            {/* Stars */}
            {[...Array(20)].map((_, i) => {
              const lx = (i * 47.3 + 11) % 100;
              const ty = (i * 83.7 + 23) % 100;
              const dur = 2 + (i % 4);
              const delay = (i % 8) * 0.3;
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: (1 + i % 2) + 'px',
                    height: (1 + i % 2) + 'px',
                    left: lx + '%',
                    top: ty + '%',
                    opacity: 0.1 + (i % 5) * 0.08,
                    animation: `twinkle ${dur}s ease-in-out infinite`,
                    animationDelay: delay + 's',
                  }}
                />
              );
            })}

            {/* Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(0,217,255,0.3)',
                boxShadow: '0 0 30px rgba(0,217,255,0.2)',
              }}
            >
              <Mail className="w-8 h-8 text-[#00D9FF]" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-6">
              <Zap className="w-3 h-3 text-[#00D9FF]" />
              <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">Newsletter</span>
            </div>

            <h2 className="section-heading text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              Never Miss An{' '}
              <span className="text-gradient-cyan">Amazing Fact</span>
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto mb-10 font-inter leading-relaxed">
              Join 50,000+ curious minds who get the most fascinating facts, new video alerts, and exclusive insights delivered to their inbox every week.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Check className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="font-space font-semibold text-white">You&apos;re subscribed!</p>
                <p className="text-[#64748B] text-sm font-inter">Welcome to the community of curious minds.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/40 focus:bg-white/[0.07] transition-all font-inter"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#05070B]/30 border-t-[#05070B] animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {!submitted && (
              <p className="text-[#475569] text-xs mt-4 font-inter">
                We respect your privacy. Unsubscribe anytime.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
