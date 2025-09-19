'use client';

import LogoLoop from '@/components/ui/LogoLoop';
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
  SiNotion
} from 'react-icons/si';

const TechLogosSection = () => {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
    { node: <SiAdobephotoshop />, title: "Adobe Photoshop", href: "https://adobe.com/products/photoshop" },
    { node: <SiBlender />, title: "Blender 3D", href: "https://blender.org" },
    { node: <SiAseprite />, title: "Aseprite", href: "https://aseprite.org" },
    { node: <SiNotion />, title: "Notion", href: "https://notion.so" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            Technologies I Work With
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern tools and technologies I use to create exceptional digital experiences
          </p>
        </div>
        
        <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={48}
            gap={60}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#edede9"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
};

export default TechLogosSection;
