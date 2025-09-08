'use client';

import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

const VerticalNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', targetId: 'design-every-think' },
    { id: 'about', label: 'About', targetId: 'hero' },
    { id: 'works', label: 'Works', targetId: 'categories' },
    { id: 'contact', label: 'Contact', targetId: 'footer' }
  ];

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(navItems.find(item => item.targetId === targetId)?.id || 'home');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = navItems.find(item => item.targetId === entry.target.id)?.id;
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: [0.5], // Bölümün %50'si görünür olduğunda aktif olacak
        rootMargin: '-20% 0px -20% 0px' // Üst ve alt %20'lik marj bırakıyoruz
      }
    );

    // Tüm bölümleri observer'a ekle
    navItems.forEach((item) => {
      const element = document.getElementById(item.targetId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup: observer'ı kaldır
      navItems.forEach((item) => {
        const element = document.getElementById(item.targetId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-6 items-end w-32">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => scrollToSection(item.targetId)}
            >
              <span
                className={`transition-all duration-200 text-right ${
                  isActive
                    ? 'text-[#1A1A1A] font-medium text-base'
                    : 'text-[#AFAFAF] font-normal text-xs hover:text-[#1A1A1A]'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {item.label}
              </span>
              <div
                className={`bg-current transition-all duration-200 ml-auto ${
                  isActive
                    ? 'w-16 h-0.5'
                    : 'w-10 h-0.5 group-hover:w-12'
                }`}
                style={{
                  backgroundColor: isActive ? '#1A1A1A' : '#AFAFAF'
                }}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default VerticalNav;
