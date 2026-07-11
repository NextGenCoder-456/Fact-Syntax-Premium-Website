'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing or using the Fact Syntax website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.',
  },
  {
    title: 'Use of Content',
    content: 'All content on this website, including videos, articles, images, and written material, is owned by Fact Syntax or its content suppliers. You may not reproduce, redistribute, or create derivative works without explicit written permission.',
  },
  {
    title: 'User Conduct',
    content: 'You agree to use this website only for lawful purposes. You must not attempt to gain unauthorized access to any part of our website, disrupt our services, or engage in any activity that could harm other users or Fact Syntax.',
  },
  {
    title: 'Newsletter and Communications',
    content: 'When you subscribe to our newsletter, you consent to receive periodic emails from us. You may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.',
  },
  {
    title: 'Disclaimer',
    content: 'The content provided on Fact Syntax is for educational and entertainment purposes. While we strive for accuracy, we make no warranties regarding the completeness, accuracy, or reliability of any content.',
  },
  {
    title: 'Limitation of Liability',
    content: 'Fact Syntax shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any content provided.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Continued use of our website constitutes acceptance of the updated terms.',
  },
  {
    title: 'Contact',
    content: 'For questions about these Terms of Service, please contact us at hello@factsyntax.com.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="section-heading text-white mb-4">Terms of <span className="text-gradient-cyan">Service</span></h1>
          <p className="text-[#64748B] text-sm font-inter">Last updated: December 2024</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-[#0B111B] border border-white/[0.08]"
            >
              <h2 className="font-space font-bold text-white text-lg mb-3">{section.title}</h2>
              <p className="text-[#94A3B8] text-sm leading-relaxed font-inter">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
