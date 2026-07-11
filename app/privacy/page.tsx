'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as when you subscribe to our newsletter, contact us, or engage with our content. This may include your name, email address, and any message you send.',
  },
  {
    title: 'How We Use Your Information',
    content: 'We use the information we collect to send newsletters and updates, respond to your inquiries, improve our content and website, and comply with legal obligations. We never sell your personal data to third parties.',
  },
  {
    title: 'YouTube and Third-Party Services',
    content: 'Our website embeds YouTube content and links. YouTube\'s privacy policy governs your interactions with YouTube. We also use analytics tools to understand how visitors interact with our site.',
  },
  {
    title: 'Cookies',
    content: 'We use essential cookies to maintain your session and preferences. Analytics cookies help us understand traffic patterns. You can control cookies through your browser settings.',
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, update, or delete your personal information. You may unsubscribe from our newsletter at any time. Contact us at hello@factsyntax.com for any privacy-related requests.',
  },
  {
    title: 'Contact',
    content: 'For questions about this Privacy Policy, please contact us at hello@factsyntax.com.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="section-heading text-white mb-4">Privacy <span className="text-gradient-cyan">Policy</span></h1>
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
