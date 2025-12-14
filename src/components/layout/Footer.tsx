'use client';

import { motion } from 'framer-motion';
import { FaBehance, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiMedium } from 'react-icons/si';
import Image from 'next/image';

const Footer = () => {
  const socialLinks = [
    { name: 'Behance', icon: FaBehance, href: 'https://behance.net/designeverythink' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/yusufgulmezz' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/yusufglmz/' },
    { name: 'Medium', icon: SiMedium, href: 'https://medium.com/@yusufgulmezz' },
  ];

  return (
    <footer id="footer" className="bg-[#edede9] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Image
                src={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/DET_Logo.svg`}
                alt="DET Logo"
                width={48}
                height={48}
                className="w-[48px] h-[48px]"
              />
              <h3 className="text-lg sm:text-xl">
                <span className="font-regular text-[#4E4E4E]">DesignEvery</span>
                <span className="font-bold text-[#1A1A1A]">Think</span>
              </h3>
            </div>
            <p className="text-[#1A1A1A] mb-4">
              A portfolio website showcasing creative solutions in design and development.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-[#1A1A1A]">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#design-every-think" 
                  className="text-[#1A1A1A] hover:opacity-70 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('design-every-think');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#categories" 
                  className="text-[#1A1A1A] hover:opacity-70 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('categories');
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      const currentY = window.pageYOffset || document.documentElement.scrollTop;
                      window.scrollTo({ top: currentY + rect.top + 120, behavior: 'smooth' });
                    }
                  }}
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#personal-creatives" 
                  className="text-[#1A1A1A] hover:opacity-70 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('personal-creatives');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Personal
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-[#1A1A1A] hover:opacity-70 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Contact
                </a>
              </li>
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
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4e4e4e] hover:bg-[#1a1a1a] transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon size={20} className="text-[#edede9]" />
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