'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Palette } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Developrimbor' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/yusufglmz/' },
    { name: 'Behance', icon: Palette, href: 'https://behance.net/designeverythink' },
    { name: 'Email', icon: Mail, href: 'mailto:designeverythink.co@gmail.com' },
  ];

  return (
    <footer className="bg-[#edede9] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#1A1A1A]">DesignEveryThink</h3>
            <p className="text-[#1A1A1A] mb-4">
              A portfolio website showcasing creative solutions in design and development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-[#1A1A1A]">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#1A1A1A] hover:opacity-70 transition-opacity">Home</Link></li>
              <li><Link href="/projects" className="text-[#1A1A1A] hover:opacity-70 transition-opacity">Projects</Link></li>
              <li><Link href="/about" className="text-[#1A1A1A] hover:opacity-70 transition-opacity">About</Link></li>
              <li><Link href="/contact" className="text-[#1A1A1A] hover:opacity-70 transition-opacity">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-[#1A1A1A]">Social Media</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#1A1A1A] hover:opacity-70 transition-opacity"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-[#AFAFAF] mt-8 pt-8 text-center"
        >
          <p className="text-[#1A1A1A]">
            © 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;