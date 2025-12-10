'use client';

import { useState, useEffect } from 'react';
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
        {contactLottieData && (
          <div className="flex justify-center py-8 md:py-12">
            <div className="w-full max-w-[180px] md:max-w-[2400px] lg:max-w-[300px] mx-auto">
              <Lottie
                animationData={contactLottieData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactMeSection;
