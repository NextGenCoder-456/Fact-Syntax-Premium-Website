'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqs } from '@/lib/data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5 mb-5">
            <HelpCircle className="w-3 h-3 text-[#00D9FF]" />
            <span className="text-[#00D9FF] text-xs font-semibold tracking-widest uppercase font-space">FAQ</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            Frequently Asked{' '}
            <span className="text-gradient-cyan">Questions</span>
          </h2>
          <p className="text-[#94A3B8] font-inter">
            Everything you need to know about Fact Syntax.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'border-[#00D9FF]/30 bg-[#00D9FF]/[0.03]'
                  : 'border-white/[0.08] bg-[#0B111B] hover:border-white/[0.15]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-space font-semibold text-sm leading-snug transition-colors ${openIndex === i ? 'text-[#00D9FF]' : 'text-white'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${openIndex === i ? 'bg-[#00D9FF]/20' : 'bg-white/[0.04]'}`}>
                  {openIndex === i
                    ? <Minus className="w-4 h-4 text-[#00D9FF]" />
                    : <Plus className="w-4 h-4 text-[#64748B]" />
                  }
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-[#00D9FF]/10 mb-4" />
                      <p className="text-[#94A3B8] text-sm leading-relaxed font-inter">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
