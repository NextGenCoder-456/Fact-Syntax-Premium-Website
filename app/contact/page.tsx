'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Youtube, Instagram, Twitter, MessageSquare, Send, Check, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">Contact</span>
          </div>
          <h1 className="section-heading text-white mb-4">
            Let&apos;s <span className="text-gradient-cyan">Connect</span>
          </h1>
          <p className="text-[#94A3B8] font-inter leading-relaxed">
            Have a question, collaboration idea, or just want to geek out about the universe? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-5"
          >
            {[
              { icon: Mail, label: 'Email', value: 'hello@factsyntax.com', color: '#00D9FF' },
              { icon: MapPin, label: 'Location', value: 'India', color: '#8B5CF6' },
              { icon: Clock, label: 'Response Time', value: 'Within 48 hours', color: '#F59E0B' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-[#0B111B] border border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs font-inter mb-0.5">{item.label}</p>
                  <p className="font-space font-semibold text-white text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="p-5 rounded-2xl bg-[#0B111B] border border-white/[0.08]">
              <p className="text-[#64748B] text-xs font-inter mb-4">Social Media</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Youtube, label: 'YouTube', color: '#FF0000', href: '#' },
                  { icon: Instagram, label: 'Instagram', color: '#E1306C', href: '#' },
                  { icon: Twitter, label: 'X', color: '#1DA1F2', href: '#' },
                  { icon: MessageSquare, label: 'Discord', color: '#5865F2', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    <span className="text-[#94A3B8] group-hover:text-white text-xs font-inter transition-colors">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#0B111B] rounded-2xl border border-white/[0.08] p-8">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 flex flex-col items-center gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-space font-bold text-white text-xl">Message Sent!</h3>
                  <p className="text-[#94A3B8] font-inter max-w-sm">
                    Thanks for reaching out. We&apos;ll get back to you within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#94A3B8] text-xs font-inter block mb-2">Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[#94A3B8] text-xs font-inter block mb-2">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/40 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#94A3B8] text-xs font-inter block mb-2">Subject</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#94A3B8] text-xs font-inter block mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#00D9FF]/40 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-[#05070B] font-semibold font-space text-sm hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#05070B]/30 border-t-[#05070B] animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
