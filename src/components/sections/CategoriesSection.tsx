'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

const CategoriesSection = () => {

  const categories = [
    {
      id: 'poster',
      name: 'Poster Designs',
      description: 'Creative and impressive poster designs',
      number: '01',
      color: 'from-red-500 to-pink-500',
      count: 12,
      projects: [
        {
          id: 1,
          title: 'Lewis Hamilton Poster Design',
          date: '12/09/2025',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c159ee233024129.68a77e3a9374c.png',
          tags: ['Poster', 'Design']
        },
        {
          id: 2,
          title: 'Charles Leclerc Poster Design',
          date: '12/09/2025',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/fd0b2e232152585.68964e11b1ccc.png',
          tags: ['Poster', 'Design']
        },
        {
          id: 3,
          title: 'The Witcher 3 Eredin Poster Design',
          date: '12/09/2025',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/3af7cb197406813.68ab11122767b.png',
          tags: ['Poster', 'Design']
        }
      ]
    },
    {
      id: 'pixel-art',
      name: 'Pixel Art',
      description: 'Retro-style pixel art works',
      number: '02',
      color: 'from-green-500 to-teal-500',
      count: 8,
      projects: [
        {
          id: 4,
          title: 'Camp Fire Gif',
          date: '10/09/2025',
          description: 'Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/4c5350173548789.649217fa63368.gif',
          tags: ['Pixel Art', 'Character']
        },
        {
          id: 5,
          title: 'Lethal Company',
          date: '08/09/2025',
          description: 'Maecenas eget condimentum velit, sit amet feugiat lectus.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/6c0699191220265.65c7a14f5ad97.png',
          tags: ['Pixel Art', 'Landscape']
        }
      ]
    },
    {
      id: '3d',
      name: '3D Works',
      description: 'Modern 3D modeling and rendering projects',
      number: '03',
      color: 'from-blue-500 to-indigo-500',
      count: 6,
      projects: [
        {
          id: 6,
          title: 'Architectural Visualization',
          date: '03/09/2025',
          description: 'Modern building design with realistic lighting and materials.',
          image: 'https://mir-cdn.behance.net/v1/rendition/project_modules/hd_webp/3378c9195317861.68cc44e3d42fe.png',
          tags: ['3D', 'Architecture']
        },
        {
          id: 7,
          title: 'Product Render',
          date: '01/09/2025',
          description: 'High-quality product visualization for e-commerce.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/93eed3192858185.68cc45e2f0d38.png',
          tags: ['3D', 'Product']
        },
        {
          id: 12,
          title: '3D Character Design',
          date: '30/08/2025',
          description: 'Detailed character modeling with realistic textures and animations.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/bae6aa187036695.68cc43844c8e1.jpg',
          tags: ['3D', 'Character']
        },
        {
          id: 13,
          title: 'Interior Design Visualization',
          date: '28/08/2025',
          description: 'Modern interior space with photorealistic lighting and materials.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/37d30f234905769.68cc3e70f0c0c.jpg',
          tags: ['3D', 'Interior']
        },
        {
          id: 14,
          title: 'Vehicle Modeling',
          date: '25/08/2025',
          description: 'High-poly vehicle model with detailed textures and realistic materials.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/66b26f207669509.68cc45a6dea73.jpg',
          tags: ['3D', 'Vehicle']
        },
        {
          id: 15,
          title: 'Abstract 3D Art',
          date: '22/08/2025',
          description: 'Creative abstract 3D composition with experimental lighting.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e75e98207675585.68cc412ba6a1c.png',
          tags: ['3D', 'Abstract']
        }
      ]
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Designs',
      description: 'User experience focused interface designs',
      number: '04',
      color: 'from-purple-500 to-pink-500',
      count: 20,
      projects: [
        {
          id: 8,
          title: 'Mobile App Interface',
          date: '28/08/2025',
          description: 'Clean and intuitive mobile app design with modern UI patterns.',
          image: '/api/placeholder/300/400',
          tags: ['UI/UX', 'Mobile']
        },
        {
          id: 9,
          title: 'Dashboard Design',
          date: '25/08/2025',
          description: 'Data visualization dashboard with interactive elements.',
          image: '/api/placeholder/300/400',
          tags: ['UI/UX', 'Dashboard']
        }
      ]
    },
    {
      id: 'coding',
      name: 'Coding Projects',
      description: 'Web and mobile application development projects',
      number: '05',
      color: 'from-orange-500 to-red-500',
      count: 25,
      projects: [
        {
          id: 10,
          title: 'E-commerce Website',
          date: '20/08/2025',
          description: 'Full-stack e-commerce solution with modern technologies.',
          image: '/api/placeholder/300/400',
          tags: ['Web', 'E-commerce']
        },
        {
          id: 11,
          title: 'Portfolio Website',
          date: '15/08/2025',
          description: 'Responsive portfolio website with smooth animations.',
          image: '/api/placeholder/300/400',
          tags: ['Web', 'Portfolio']
        }
      ]
    }
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>('poster');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (categoryId: string) => {
    const el = sectionRefs.current[categoryId];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const headerEl = document.querySelector('header') as HTMLElement | null;
    const headerHeight = headerEl?.offsetHeight ?? 80;
    const targetY = currentY + rect.top - headerHeight - 16; // 16px tampon
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleCategoryOpen = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    // Açılan içeriğin ölçüleri yerleşsin diye bir frame bekleyip kaydır
    requestAnimationFrame(() => {
      scrollToCategory(categoryId);
    });
  };

  // AnimatedSection component for each category
  const AnimatedSection = ({ designs, title, subtitle, count, collapsed, onHeaderClick }: { 
    designs: Array<{
      id: number;
      title: string;
      date: string;
      description: string;
      image: string;
      tags: string[];
    }>, 
    title: string, 
    subtitle: string,
    count: number,
    collapsed: boolean,
    onHeaderClick: () => void
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isPixelArt = title.toLowerCase().includes('pixel');
    const is3D = title.toLowerCase().includes('3d');
    const [expandedDesign, setExpandedDesign] = useState<null | { image: string; title: string; pixel: boolean }>(null);


    // Tasarım değiştirme fonksiyonu
    const goToProject = (index: number) => {
      console.log('Tıklanan tasarım index:', index, 'Toplam tasarım sayısı:', designs.length);
      if (index >= 0 && index < designs.length) {
        setCurrentIndex(index);
      }
    };

    if (collapsed) {
      return (
        <section className="py-6">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={onHeaderClick}
              className="w-full text-left group"
            >
              <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4E4E4E] group-hover:text-gray-900 transition-colors">
                  {title}
                </h2>
                <span className="text-sm sm:text-base text-gray-500">{count}</span>
              </div>
              <div className="w-full h-px bg-gray-300 mt-4" />
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <div className="flex items-end justify-between">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4E4E4E] mb-4 cursor-pointer" onClick={onHeaderClick}>{title}</h2>
              <span className="text-sm text-gray-500 mb-2">{designs.length}</span>
            </div>
            <div className="w-full h-px bg-gray-300 mt-6"></div>
            {/* Design counter */}
            <div className="text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {designs.length}
            </div>
          </div>

          <div className="relative h-[600px] overflow-hidden">
            {designs.map((design, index) => {
              // Ana tasarım için animasyon değerleri
              const isActive = index === currentIndex;
              const isNext = index === currentIndex + 1;
              const isPrevious = index === currentIndex - 1;

              let x = "100%";
              let scale = 0.6;
              let opacity = 0;
              let zIndex = 1;

              if (isActive) {
                x = "0%";
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (isNext) {
                // Ghost overlap'ı önlemek için sonraki slaytı gizle
                x = "100%";
                scale = 0.6;
                opacity = 0;
                zIndex = 1;
              } else if (isPrevious) {
                x = "-100%";
                scale = 0.6;
                opacity = 0;
                zIndex = 1;
              }

              return (
                <motion.div
                  key={design.id}
                  className="absolute inset-0 flex flex-col lg:flex-row items-start mt-6"
                  style={{ zIndex }}
                  animate={{
                    x,
                    scale,
                    opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 1
                  }}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
                    {/* Sol taraf - Tasarım görüntüsü */}
                    <motion.div 
                      className="flex-shrink-0 mx-auto lg:mx-0"
                      animate={{
                        scale: isActive ? 1 : 0.8
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 30
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          if (isActive) {
                            const d = designs[currentIndex];
                            setExpandedDesign({ image: d.image, title: d.title, pixel: isPixelArt || is3D });
                          }
                        }}
                        className={`${isPixelArt || is3D ? 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]' : 'w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[420px] lg:w-[420px] lg:h-[520px]'} bg-gray-200 rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-zoom-in`}
                      >
                        {design.image ? (
                          <img
                            src={design.image}
                            alt={design.title}
                            className={`w-full h-full ${isPixelArt ? 'object-contain bg-black' : is3D ? 'object-cover' : 'object-cover'}`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-sm">Design Preview</div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Mobile/Tablet buttons - under image */}
                    <div className="lg:hidden mt-4 flex justify-center gap-4 w-full">
                      <motion.button
                        onClick={() => goToProject(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </motion.button>
                      <motion.button
                        onClick={() => goToProject(currentIndex + 1)}
                        disabled={currentIndex === designs.length - 1}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </motion.button>
                    </div>

                    {/* Sağ taraf - İçerik */}
                    <motion.div 
                      className="flex-1 w-full lg:max-w-md mt-6 lg:mt-0"
                      animate={{
                        opacity: isActive ? 1 : 0.6,
                        x: isActive ? 0 : 50
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 30
                      }}
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{design.title}</h3>
                      <p className="text-gray-500 text-sm mb-6">{design.date}</p>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{design.description}</p>
                      {/* <p className="text-gray-700 text-base leading-relaxed mb-6">
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                      </p> */}
                      
                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {design.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            {/* Sağda sadece 1 tane thumbnail - sonraki tasarım */}
            {currentIndex < designs.length - 1 && (
              <div className="hidden lg:block absolute top-32 right-4 z-10">
                <motion.button
                  onClick={() => {
                    console.log('Thumbnail tıklandı, sonraki tasarıma geçiliyor');
                    goToProject(currentIndex + 1);
                  }}
                  className={`${isPixelArt || is3D ? 'w-44 h-44' : 'w-44 h-60'} bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 relative z-30`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 30
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={designs[currentIndex + 1]?.image}
                    alt={designs[currentIndex + 1]?.title}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              </div>
            )}

            {/* Navigation Controls */}
            {/* Desktop (lg+) buttons - absolute */}
            <div className="hidden lg:flex absolute bottom-24 left-1/2 -translate-x-1/2 gap-4 z-10">
              <motion.button
                onClick={() => goToProject(currentIndex - 1)}
                disabled={currentIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Previous
              </motion.button>
              <motion.button
                onClick={() => goToProject(currentIndex + 1)}
                disabled={currentIndex === designs.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Next
              </motion.button>
            </div>

            

            {/* Design indicators */}
            {/* <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {designs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-gray-900' 
                      : 'bg-gray-400/40 hover:bg-gray-500/60'
                  }`}
                  aria-label={`Go to design ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
          {/* Lightbox */}
          <AnimatePresence>
            {expandedDesign && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center px-4"
                onClick={() => setExpandedDesign(null)}
              >
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setExpandedDesign(null)}
                    aria-label="Close"
                    className="absolute -top-3 -right-3 z-[61] bg-white/90 text-gray-900 rounded-full w-9 h-9 shadow-md hover:bg-white"
                  >
                    <span className="block leading-none text-xl">×</span>
                  </button>
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={expandedDesign.image}
                      alt={expandedDesign.title}
                      className={`max-w-[90vw] max-h-[85vh] ${expandedDesign.pixel ? 'object-contain bg-black' : 'object-contain'}`}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  };


  return (
    <section id="categories" className="py-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            MY WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more
          </p>
        </motion.div>


        {/* Animated Categories Sections */}
        {categories.map((category) => (
          <div key={category.id} ref={(el) => { sectionRefs.current[category.id] = el; }}>
            <AnimatedSection
              designs={category.projects || []}
              title={category.name}
              subtitle="Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more"
              count={category.projects?.length || 0}
              collapsed={activeCategoryId !== category.id}
              onHeaderClick={() => handleCategoryOpen(category.id)}
            />
          </div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to work together?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Get in touch to discuss your project.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
