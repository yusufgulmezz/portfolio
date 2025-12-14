'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const ContactMeSection = () => {
  const [contactLottieData, setContactLottieData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/animations/contact_us.json`)
      .then(res => res.json())
      .then(data => setContactLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, []);

  return (
    <section id="contact" className="py-20 bg-[#edede9]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Lottie Animation */}
        {contactLottieData && (
          <div className="flex justify-center py-8 md:py-12 mb-12 md:mb-16">
            <div className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[300px] mx-auto">
              <Lottie
                animationData={contactLottieData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Contact Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 md:py-24 lg:py-32"
        >
          {/* Main Heading */}
          <h2
            className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[8rem] 2xl:text-[10rem] font-regular text-[#1A1A1A] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em', lineHeight: '0.95' }}
          >
            HAVE AN IDEA?
          </h2>

          {/* Subtext */}
          <p
            className="text-base sm:text-lg md:text-xl text-[#4E4E4E] mb-2 md:mb-2"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            Drop me an email:
          </p>

          {/* Email Address */}
          <a
            href="mailto:designeverythink.co@gmail.com"
            className="inline-block text-base sm:text-lg md:text-xl text-[#1A1A1A] font-medium transition-opacity duration-200 relative group"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            DESIGNEVERYTHINK.CO@GMAIL.COM
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1A1A1A] group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMeSection;
