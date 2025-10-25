'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const CategoriesSection = () => {

  const categories = [
    {
      id: 'poster',
      name: 'Poster',
      description: 'Creative and impressive poster designs',
      number: '01',
      color: 'from-red-500 to-pink-500',
      count: 12,
      projects: [
        {
          id: 1,
          title: 'Lewis Hamilton',
          date: '12/09/2025',
          description: 'Poster design for Formula 1 Ferrari driver Lewis Hamilton. The “Glassy Effect” was chosen for this design created for Hamilton, a seven-time world champion. The font used is “Formula1”.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/b282c2233024129.68ea40f709d99.png',
          tags: ['Poster', 'Design']
        },
        {
          id: 2,
          title: 'Max Verstappen',
          date: '12/09/2025',
          description: 'The poster design for Red Bull Racing driver Verstappen, a key F1 figure, uses three driver images against a white background enhanced with textures for greater impact. The dominant colors are the red and orange tones characteristic of the Red Bull Racing brand, making the poster exceptionally noticeable.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/b816cb235880157.68e1995cd1b62.jpg',
          tags: ['Poster', 'Design']
        },
        {
          id: 3,
          title: 'The Witcher 3 Eredin',
          date: '12/09/2025',
          description: 'Poster design of Eredin Bréacc Glas, king of the Wild Hunt, the main villain in The Witcher universe. The background features different images of Geralt, Ciri, and Eredin. Content is supported by some texts from the in-game lore.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/edad57197406813.68e44ba1ca748.jpg',
          tags: ['Poster', 'Design']
        },
        {
          id: 4,
          title: 'Charles Leclerc',
          date: '12/09/2025',
          description: 'This poster design for Charles Leclerc, another Ferrari F1 driver, uses the "Threshold" method. It predominantly features shades of red, white, and black. The Ferrari logo stands out among the textures used in the background. The font used is again "Formula1."',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/fd0b2e232152585.68964e11b1ccc.png',
          tags: ['Poster', 'Design']
        },
        {
          id: 5,
          title: 'Butterfly Effect',
          date: '15/09/2025',
          description: 'Contemporary poster design featuring modern aesthetics and clean composition. This design showcases innovative visual elements with a focus on typography and layout.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/32ac63236326711.68e92b5558330.jpg',
          tags: ['Poster', 'Modern']
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
        },
        {
          id: 16,
          title: 'Demon Slayer Zenitsu',
          date: '05/09/2025',
          description: 'Nostalgic pixel art city with neon lights and retro atmosphere.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/bfb9f8153649027.633386fc1b0a6.png',
          tags: ['Pixel Art', 'Cityscape']
        },
        {
          id: 17,
          title: 'Banana For Every Taste',
          date: '03/09/2025',
          description: 'Detailed pixel art character with medieval fantasy theme.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/e6e3c0201088071.666d9d6546b2e.png',
          tags: ['Pixel Art', 'Fantasy']
        },
        {
          id: 18,
          title: 'Star Wars: Jedi Fallen Order',
          date: '01/09/2025',
          description: 'Sci-fi pixel art scene with spaceships and alien planets.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/10393c158503857.638d2b93e0ed1.png',
          tags: ['Pixel Art', 'Sci-Fi']
        },
        {
          id: 19,
          title: 'Cat Punch',
          date: '29/08/2025',
          description: 'Smooth pixel art animation with fluid character movement.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e0dee5181781743.6521cca9d06d7.png',
          tags: ['Pixel Art', 'Animation']
        },
        {
          id: 20,
          title: 'Jon Snow',
          date: '27/08/2025',
          description: 'Classic game interface design with pixel art elements.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/3e4d56201862729.667c0a739ea40.jpg',
          tags: ['Pixel Art', 'UI']
        },
        {
          id: 21,
          title: 'Xbox Controller',
          date: '25/08/2025',
          description: 'Peaceful pixel art nature landscape with trees and mountains.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/68a907191056269.65c4c74d29a2c.png',
          tags: ['Pixel Art', 'Nature']
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
          title: 'Lamb',
          date: '03/09/2025',
          description: 'Modern building design with realistic lighting and materials.',
          image: 'https://mir-cdn.behance.net/v1/rendition/project_modules/hd_webp/3378c9195317861.68cc44e3d42fe.png',
          tags: ['3D', 'Architecture']
        },
        {
          id: 7,
          title: 'Mini TV',
          date: '01/09/2025',
          description: 'High-quality product visualization for e-commerce.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/93eed3192858185.68cc45e2f0d38.png',
          tags: ['3D', 'Product']
        },
        {
          id: 12,
          title: 'Shotgun',
          date: '30/08/2025',
          description: 'Detailed character modeling with realistic textures and animations.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/bae6aa187036695.68cc43844c8e1.jpg',
          tags: ['3D', 'Character']
        },
        {
          id: 13,
          title: 'Guitar',
          date: '28/08/2025',
          description: 'Modern interior space with photorealistic lighting and materials.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/37d30f234905769.68cc3e70f0c0c.jpg',
          tags: ['3D', 'Interior']
        },
        {
          id: 14,
          title: 'Paperclips',
          date: '25/08/2025',
          description: 'High-poly vehicle model with detailed textures and realistic materials.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/66b26f207669509.68cc45a6dea73.jpg',
          tags: ['3D', 'Vehicle']
        },
        {
          id: 15,
          title: 'Vase Plate Cup',
          date: '22/08/2025',
          description: 'Creative abstract 3D composition with experimental lighting.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e75e98207675585.68cc412ba6a1c.png',
          tags: ['3D', 'Abstract']
        }
      ]
    },
    {
      id: 'ui-ux',
      name: 'UI/UX',
      description: 'User experience focused interface designs',
      number: '04',
      color: 'from-purple-500 to-pink-500',
      count: 20,
      projects: [
        {
          id: 8,
          title: 'Green World App',
          date: '28/08/2025',
          description: 'Clean and intuitive mobile app design with modern UI patterns.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9aa126229631387.68e57c6e5c355.jpg',
          gallery: [
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/58b4f6229631387.68e3ed896f619.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/192d40229631387.68e3ed896ec5f.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/6f2eed229631387.68e3ed896fd83.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/40bf2a229631387.68e3ed897089f.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/135097229631387.68e3ed896f163.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9aa7a0229631387.68e3ed8970f08.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/20bf19229631387.68e3ed89713d6.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/4fe56a229631387.68e3f468ac446.png'
          ],
          tags: ['UI/UX', 'Mobile']
        },
        // {
        //   id: 9,
        //   title: 'Dashboard Design',
        //   date: '25/08/2025',
        //   description: 'Modern dashboard interface with clean data visualization and intuitive user experience.',
        //   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
        //   tags: ['UI/UX', 'Dashboard']
        // }
      ]
    },
    {
      id: 'coding',
      name: 'Coding',
      description: 'Web and mobile application development projects',
      number: '05',
      color: 'from-orange-500 to-red-500',
      count: 25,
      projects: [
        {
          id: 10,
          title: 'Green World',
          date: '20/08/2025',
          description: 'Location-based mobile app to report, track and clean waste with community-driven actions. The mobile application was fundamentally built using React Native and Expo Go, supported by Firebase Authentication, Firestore, and Cloud Messaging for user services and notifications, and the Google Maps API for location-based features.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9aa126229631387.68e57c6e5c355.jpg',
          tags: ['Mobile', 'React Native', 'Firebase'],
          link: 'https://github.com/yusufgulmezz/GreenWorld'
        },
        {
          id: 11,
          title: 'Portfolio Website',
          date: '15/08/2025',
          description: 'A personal portfolio website showcasing my designs and projects, created to bring together my work in one place. The key technologies utilized in the project are the Next.js 14 React framework, TypeScript for type safety, Tailwind CSS for styling, Framer Motion for smooth animations, and Lucide React for icons, all combined to create a modern, responsive, SEO-optimized, and fast-loading site.',
          image: 'https://raw.githubusercontent.com/yusufgulmezz/yusufgulmezz/refs/heads/main/DET_Mockup-2.jpg',
          tags: ['Web', 'Portfolio'],
          link: 'https://github.com/yusufgulmezz/portfolio'
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
  const AnimatedSection = ({ designs, title, count, collapsed, onHeaderClick }: { 
    designs: Array<{
      id: number;
      title: string;
      date: string;
      description: string;
      image: string;
      tags: string[];
      link?: string;
      gallery?: string[];
    }>, 
    title: string, 
    count: number,
    collapsed: boolean,
    onHeaderClick: () => void
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isPixelArt = title.toLowerCase().includes('pixel');
    const is3D = title.toLowerCase().includes('3d');
    const isUIUX = title.toLowerCase().includes('ui/ux');
    const [openUiuxId, setOpenUiuxId] = useState<number | null>(null);

    // UI/UX açıldığında üstteki proje (Green World App) varsayılan açık gelsin
    useEffect(() => {
      if (isUIUX && !collapsed && openUiuxId === null && designs.length > 0) {
        setOpenUiuxId(designs[0].id);
      }
    }, [isUIUX, collapsed, designs, openUiuxId]);
    const [galleryImageByDesignId, setGalleryImageByDesignId] = useState<Record<number, string>>({});
    const [expandedDesign, setExpandedDesign] = useState<null | { 
      image: string; 
      title: string; 
      pixel: boolean; 
      currentIndex: number;
      designs: Array<{
        id: number;
        title: string;
        date: string;
        description: string;
        image: string;
        tags: string[];
        gallery?: string[];
      }>;
    }>(null);

    // Lightbox açıkken sayfa kaydırmasını kilitle (html ve body + position: fixed tekniği)
    useEffect(() => {
      const body = document.body;
      const html = document.documentElement;
      if (expandedDesign) {
        const scrollY = window.scrollY;
        html.classList.add('no-scroll');
        body.classList.add('no-scroll');
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
      } else {
        const top = body.style.top;
        html.classList.remove('no-scroll');
        body.classList.remove('no-scroll');
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        if (top) {
          const y = Math.abs(parseInt(top, 10)) || 0;
          window.scrollTo(0, y);
        }
      }
      return () => {
        const top = body.style.top;
        html.classList.remove('no-scroll');
        body.classList.remove('no-scroll');
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        if (top) {
          const y = Math.abs(parseInt(top, 10)) || 0;
          window.scrollTo(0, y);
        }
      };
    }, [expandedDesign]);


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
              className="w-full text-left group relative"
            >
              <div className="flex items-end justify-between">
                <div className="relative">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4E4E4E] group-hover:text-gray-900 transition-colors relative z-10">
                    {title}
                  </h2>
                  {/* Corner brackets */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-sm sm:text-base text-gray-500">{count}</span>
              </div>
              <div className="w-full h-px bg-gray-300 mt-4" />
            </button>
          </div>
        </section>
      );
    }

    return (
      <motion.section
        className="py-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-end justify-between">
              <div className="relative group cursor-pointer" onClick={onHeaderClick}>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4E4E4E] relative z-10 group-hover:text-gray-900 transition-colors">
                    {title}
                  </h2>
                {/* Corner brackets */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm text-gray-500 mb-2">{designs.length}</span>
            </div>
            <div className="w-full h-px bg-gray-300 mt-6"></div>
            {/* Design counter */}
            <div className="text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {designs.length}
            </div>
          </motion.div>

          <motion.div
            className={`relative ${isUIUX ? 'h-auto' : 'h-[700px] sm:h-[600px]'} overflow-hidden`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {isUIUX ? (
              <div className="flex flex-col gap-8 mt-6">
                {designs.map((design) => (
                  <div key={`${title}-${design.id}`} className="p-0">
                    <button
                      onClick={() => setOpenUiuxId(openUiuxId === design.id ? null : design.id)}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{design.title}</h3>
                    </button>
                    <div className="w-full h-px bg-gray-300 mt-3" />
                    <AnimatePresence initial={false}>
                      {openUiuxId === design.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                          <div className="w-full">
                            <div className={`relative ${design.title.toLowerCase().includes('green world') ? 'aspect-[3/4] bg-black max-w-sm' : 'aspect-[3/4]' } overflow-hidden`}
                            >
                              <Image
                                src={design.image}
                                alt={design.title}
                                fill
                                className={`${design.title.toLowerCase().includes('green world') ? 'object-contain' : 'object-cover'}`}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:max-w-xl text-left">
                            <p className="text-gray-500 text-sm mb-3">{design.date}</p>
                            <p className="text-gray-700 leading-relaxed mb-4">{design.description}</p>
                            <div className="flex gap-2 flex-wrap items-start">
                              {design.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ) : (
            designs.map((design, index) => {
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
                  key={`${title}-${design.id}`}
                  className="absolute inset-0 flex flex-col lg:flex-row items-start mt-6"
                  style={{
                    transform: `translateX(${x}) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-6 w-full min-h-[500px] lg:min-h-auto">
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
                            if (d.link) {
                              window.open(d.link, '_blank', 'noopener,noreferrer');
                            } else {
                              setExpandedDesign({ 
                                image: d.image, 
                                title: d.title, 
                                pixel: isPixelArt || is3D,
                                currentIndex: currentIndex,
                                designs: designs
                              });
                            }
                          }
                        }}
                        className={`${isPixelArt || is3D || (isUIUX && design.title.toLowerCase().includes('green world app'))
                          ? 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]'
                          : 'w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[420px] lg:w-[420px] lg:h-[520px]'
                        } bg-gray-200 rounded-lg border border-gray-300 shadow-lg overflow-hidden cursor-zoom-in relative group`}
                      >
                        {design.image ? (
                          <Image
                            src={(isUIUX && design.title === 'Green World App' && galleryImageByDesignId[design.id]) ? galleryImageByDesignId[design.id] : design.image}
                            alt={design.title}
                            width={400}
                            height={300}
                            className={`w-full h-full ${
                              (isPixelArt || is3D || (isUIUX && design.title.toLowerCase().includes('green world app')))
                                ? 'object-contain bg-black'
                                : 'object-cover'
                            } transition-transform duration-300 group-hover:scale-105`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-sm">Design Preview</div>
                          </div>
                        )}

                        {/* Thumbnail bar moved to Lightbox */}
                        
                        {/* Click to Expand Message - Inside design, at bottom */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-white/60 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-2 shadow-lg border border-white/30">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[#4E4E4E] font-medium text-xs sm:text-sm whitespace-nowrap">
                              {design.link ? (
                                // Coding Projects için external link icon
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              ) : (
                                // Diğer projeler için zoom icon
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              )}
                              {design.link ? 'Click For Detail' : 'Click For Fullsize'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Mobile/Tablet buttons - under image */}
                    <div className="lg:hidden mt-4 flex justify-center gap-4 w-full">
                      <motion.button
                        onClick={() => goToProject(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous project"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <motion.button
                        onClick={() => goToProject(currentIndex + 1)}
                        disabled={currentIndex === designs.length - 1}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next project"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Sağ taraf - İçerik */}
                    <motion.div 
                      className="flex-1 w-full lg:max-w-md mt-6 lg:mt-0 px-4 lg:px-0"
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
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{design.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 lg:mb-6">{design.date}</p>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{design.description}</p>
                      {/* <p className="text-gray-700 text-base leading-relaxed mb-6">
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                      </p> */}
                      
                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap items-center">
                        {design.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full border border-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
            )}

            {!isUIUX && (
            <>
            {/* Sağda sadece 1 tane thumbnail - sonraki tasarım */}
            {currentIndex < designs.length - 1 && (
              <div className="hidden lg:block absolute top-32 right-4 z-10">
                <motion.button
                  onClick={() => {
                    console.log('Thumbnail tıklandı, sonraki tasarıma geçiliyor');
                    goToProject(currentIndex + 1);
                  }}
                  className={`${isPixelArt || is3D ? 'w-44 h-44' : 'w-44 h-60'} bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 relative z-30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={designs[currentIndex + 1]?.image || ''}
                    alt={designs[currentIndex + 1]?.title || ''}
                    width={400}
                    height={300}
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
                className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => goToProject(currentIndex + 1)}
                disabled={currentIndex === designs.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            </>
            )}

            

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
          </motion.div>
          {/* Lightbox */}
          <AnimatePresence>
            {expandedDesign && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center px-4"
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
                  {/* Close button */}
                  <button
                    onClick={() => setExpandedDesign(null)}
                    aria-label="Close"
                    className="absolute -top-3 -right-3 z-[61] bg-white/90 text-gray-900 rounded-full w-9 h-9 shadow-md hover:bg-white"
                  >
                    <span className="block leading-none text-xl">×</span>
                  </button>

                  {/* Left arrow */}
                  {expandedDesign.currentIndex > 0 && (
                    <button
                      onClick={() => {
                        const newIndex = expandedDesign.currentIndex - 1;
                        const newDesign = expandedDesign.designs[newIndex];
                        setExpandedDesign({
                          ...expandedDesign,
                          currentIndex: newIndex,
                          image: newDesign.image,
                          title: newDesign.title
                        });
                        setCurrentIndex(newIndex);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-[61] bg-white/90 text-gray-900 rounded-full w-12 h-12 shadow-md hover:bg-white flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Right arrow */}
                  {expandedDesign.currentIndex < expandedDesign.designs.length - 1 && (
                    <button
                      onClick={() => {
                        const newIndex = expandedDesign.currentIndex + 1;
                        const newDesign = expandedDesign.designs[newIndex];
                        setExpandedDesign({
                          ...expandedDesign,
                          currentIndex: newIndex,
                          image: newDesign.image,
                          title: newDesign.title
                        });
                        setCurrentIndex(newIndex);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-[61] bg-white/90 text-gray-900 rounded-full w-12 h-12 shadow-md hover:bg-white flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  {/* Image */}
                  <img
                    src={expandedDesign.image}
                    alt={expandedDesign.title}
                    className={`max-w-[90vw] max-h-[75vh] w-auto h-auto ${expandedDesign.pixel ? 'object-contain' : 'object-contain'}`}
                  />

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {expandedDesign.currentIndex + 1} / {expandedDesign.designs.length}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
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
            Pixel Art, Poster Designs, UI/UX, 3D, Coding
          </p>
        </motion.div>


        {/* Animated Categories Sections */}
        {categories.map((category) => (
          <div key={category.id} ref={(el) => { sectionRefs.current[category.id] = el; }}>
            <AnimatedSection
              designs={category.projects || []}
              title={category.name}
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
          {/* <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
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
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
