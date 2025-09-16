'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

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
      count: 15,
      projects: [
        {
          id: 6,
          title: 'Architectural Visualization',
          date: '03/09/2025',
          description: 'Modern building design with realistic lighting and materials.',
          image: 'https://mir-cdn.behance.net/v1/rendition/project_modules/fs_webp/cac3a2195317861.660bcb1df1365.png',
          tags: ['3D', 'Architecture']
        },
        {
          id: 7,
          title: 'Product Render',
          date: '01/09/2025',
          description: 'High-quality product visualization for e-commerce.',
          image: 'https://mir-cdn.behance.net/v1/rendition/project_modules/fs_webp/7416cf192858185.65e20fb417470.png',
          tags: ['3D', 'Product']
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

  // AnimatedSection component for each category
  const AnimatedSection = ({ designs, title, subtitle }: { 
    designs: Array<{
      id: number;
      title: string;
      date: string;
      description: string;
      image: string;
      tags: string[];
    }>, 
    title: string, 
    subtitle: string
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isPixelArt = title.toLowerCase().includes('pixel');


    // Tasarım değiştirme fonksiyonu
    const goToProject = (index: number) => {
      console.log('Tıklanan tasarım index:', index, 'Toplam tasarım sayısı:', designs.length);
      if (index >= 0 && index < designs.length) {
        setCurrentIndex(index);
      }
    };

    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4E4E4E] mb-4">{title}</h2>
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
                      <div className={`${isPixelArt ? 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]' : 'w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[420px] lg:w-[420px] lg:h-[520px]'} bg-gray-200 rounded-lg border border-gray-300 shadow-lg overflow-hidden`}>
                        {design.image ? (
                          <img
                            src={design.image}
                            alt={design.title}
                            className={`w-full h-full ${isPixelArt ? 'object-contain bg-black' : 'object-cover'}`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-sm">Design Preview</div>
                          </div>
                        )}
                      </div>
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
                  className={`${isPixelArt ? 'w-44 h-44' : 'w-44 h-60'} bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 relative z-30`}
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
          className="text-left mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            MY WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more
          </p>
        </motion.div>


        {/* Animated Categories Sections */}
        {categories.map((category, index) => (
          <AnimatedSection
            key={category.id}
            designs={category.projects || []}
            title={category.name}
            subtitle="Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more"
          />
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
