'use client';

import LogoLoop from '@/components/ui/LogoLoop';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiGithub,
  SiFirebase,
  SiAdobephotoshop,
  SiBlender,
  SiAseprite,
  SiNotion,
  SiFramer
} from 'react-icons/si';

const TechLogosSection = () => {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiFramer />, title: "Framer Motion", href: "https://framer.com/motion" },
    { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
    { node: <SiAdobephotoshop />, title: "Adobe Photoshop", href: "https://adobe.com/products/photoshop" },
    { node: <SiBlender />, title: "Blender 3D", href: "https://blender.org" },
    { node: <SiAseprite />, title: "Aseprite", href: "https://aseprite.org" },
    { node: <SiNotion />, title: "Notion", href: "https://notion.so" },
  ];

  // Responsive sizes for mobile vs desktop
  const [viewportWidth, setViewportWidth] = useState<number>(1024);
  useEffect(() => {
    const handle = () => setViewportWidth(window.innerWidth);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const isMobile = viewportWidth < 640; // Tailwind sm breakpoint
  const logoHeight = isMobile ? 32 : 48;
  const gap = isMobile ? 36 : 60;
  const containerHeight = isMobile ? 84 : 120;

  return (
    <section id="tech-logos" className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            Technologies I Work With
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Modern tools and technologies I use to create exceptional digital experiences.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ height: `${containerHeight}px`, position: 'relative', overflow: 'hidden' }}
        >
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={logoHeight}
            gap={gap}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#edede9"
            ariaLabel="Technology partners"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TechLogosSection;
