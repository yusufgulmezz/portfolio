'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { useLottieAnimation } from '@/hooks/useLottieAnimation';

const CategoriesSection = () => {
  // WORK sticky header scroll control
  const workStickyRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workStickyRef,
    offset: ["start start", "end start"],
  });
  // Mobilde daha az küçülme: min scale 0.7
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const workScale = useTransform(workProgress, [0, 0.8], isMobile ? [1, 0.5] : [1, 0.4]);
  const workHeadingRef = useRef<HTMLSpanElement | null>(null);
  const [workTopOffset, setWorkTopOffset] = useState<number>(0);
  const [workStartY, setWorkStartY] = useState<number>(0);
  const [workFontSize, setWorkFontSize] = useState<string>('clamp(96px, 32vw, 420px)');
  useEffect(() => {
    const update = () => {
      const headerEl = document.querySelector('header') as HTMLElement | null;
      const headerH = headerEl?.offsetHeight ?? 0;
      setWorkTopOffset(headerH + 8);
      const viewportH = window.innerHeight;
      const headingH = workHeadingRef.current?.offsetHeight ?? 0;
      const startY = Math.max(0, (viewportH - headerH - headingH) / 2);
      setWorkStartY(startY);

      // Font size hesaplama - Parent div'in (h-[160vh]) genişliğine göre
      const viewportW = window.innerWidth;
      const isDesktop = viewportW >= 1024;

      if (isDesktop && workStickyRef.current) {
        // Desktop'ta: Parent div'in genişliğine göre dinamik hesaplama
        const parentDivWidth = workStickyRef.current.offsetWidth;
        
        // WORK yazısı için genişlik hesabı: font-size * 2.5 (4 karakter, letter spacing dahil)
        const safeWidth = parentDivWidth * 0.9; // %90 kullan (güvenli margin)
        const calculatedSize = safeWidth / 2.5;
        
        const minSize = 96;
        const maxSize = 420;
        const finalSize = Math.max(minSize, Math.min(calculatedSize, maxSize));
        setWorkFontSize(`${finalSize}px`);
      } else {
        // Mobil/Tablet: clamp kullan
        setWorkFontSize('clamp(96px, 32vw, 420px)');
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const workY = useTransform(workProgress, [0, 1], [workStartY, 0]);

  // Lottie animation data
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  const { data: musicLottieData } = useLottieAnimation(`${basePath}/animations/Music.json`);
  useEffect(() => {
    fetch(`${basePath}/animations/Work.json`)
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, [basePath]);

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
          tags: ['F1', 'Poster']
        },
        {
          id: 2,
          title: 'Max Verstappen',
          date: '12/09/2025',
          description: 'The poster for F1 figure Verstappen of Red Bull Racing is highly noticeable. It features three driver images on a textured white background, utilizing the brands dominant red and orange tones for maximum impact.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/b816cb235880157.68e1995cd1b62.jpg',
          tags: ['F1', 'Poster']
        },
        {
          id: 3,
          title: 'The Witcher 3 Eredin',
          date: '12/09/2025',
          description: 'Poster design of Eredin Bréacc Glas, king of the Wild Hunt, the main villain in The Witcher universe. The background features different images of Geralt, Ciri, and Eredin. Content is supported by some texts from the in-game lore.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/edad57197406813.68e44ba1ca748.jpg',
          tags: ['Witcher', 'Poster']
        },
        {
          id: 4,
          title: 'Charles Leclerc',
          date: '12/09/2025',
          description: 'This poster design for Charles Leclerc, another Ferrari F1 driver, uses the "Threshold" method. It predominantly features shades of red, white, and black. The Ferrari logo stands out among the textures used in the background. The font used is again "Formula1."',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/fd0b2e232152585.68964e11b1ccc.png',
          tags: ['F1', 'Poster']
        },
        {
          id: 5,
          title: 'Butterfly Effect',
          date: '15/09/2025',
          description: 'Contemporary poster design featuring modern aesthetics and clean composition. This design showcases innovative visual elements with a focus on typography and layout.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/32ac63236326711.68e92b5558330.jpg',
          tags: ['Butterfly', 'Poster']
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
          description: 'Pixel art animation of a camp fire with a flickering effect.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/4c5350173548789.649217fa63368.gif',
          tags: ['Animation', 'Camp Fire']
        },
        {
          id: 5,
          title: 'Lethal Company',
          date: '08/09/2025',
          description: 'Pixel art game scene of Lethal Company.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/6c0699191220265.65c7a14f5ad97.png',
          tags: ['Game', 'Lethal Company']
        },
        {
          id: 16,
          title: 'Demon Slayer Zenitsu',
          date: '05/09/2025',
          description: 'Pixel art character design of Demon Slayer Zenitsu.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/bfb9f8153649027.633386fc1b0a6.png',
          tags: ['Anime', 'Demon Slayer']
        },
        {
          id: 17,
          title: 'Banana For Every Taste',
          date: '03/09/2025',
          description: 'Nine detailed pixel art bananas with different colors and textures.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/e6e3c0201088071.666d9d6546b2e.png',
          tags: ['Banana', 'Food']
        },
        {
          id: 18,
          title: 'Star Wars: Jedi Fallen Order',
          date: '01/09/2025',
          description: 'Pixel art scene of Star Wars: Jedi Fallen Order game.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/10393c158503857.638d2b93e0ed1.png',
          tags: ['Game', 'Star Wars']
        },
        {
          id: 19,
          title: 'Cat Punch',
          date: '29/08/2025',
          description: 'Cat punch meme with pixel art style.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e0dee5181781743.6521cca9d06d7.png',
          tags: ['Meme', 'Cat']
        },
        {
          id: 20,
          title: 'Jon Snow',
          date: '27/08/2025',
          description: 'Pixel art character design of Game of Thrones Jon Snow and Ghost.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/3e4d56201862729.667c0a739ea40.jpg',
          tags: ['Series', 'Game of Thrones']
        },
        {
          id: 21,
          title: 'Xbox Controller',
          date: '25/08/2025',
          description: 'Pixel art design of Xbox Controller.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/68a907191056269.65c4c74d29a2c.png',
          tags: ['Game', 'Xbox']
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
          description: '3D lamb model with realistic textures and materials.',
          image: 'https://mir-cdn.behance.net/v1/rendition/project_modules/hd_webp/3378c9195317861.68cc44e3d42fe.png',
          tags: ['3D', 'Architecture']
        },
        {
          id: 7,
          title: 'Mini TV',
          date: '01/09/2025',
          description: 'Mini TV model with nice lighting and materials.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/93eed3192858185.68cc45e2f0d38.png',
          tags: ['3D', 'TV']
        },
        {
          id: 12,
          title: 'Shotgun',
          date: '30/08/2025',
          description: 'Realistic 3D shotgun model.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/bae6aa187036695.68cc43844c8e1.jpg',
          tags: ['3D', 'Gun']
        },
        {
          id: 13,
          title: 'Guitar',
          date: '28/08/2025',
          description: 'Guitar model with Blender.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/37d30f234905769.68cc3e70f0c0c.jpg',
          tags: ['3D', 'Guitar']
        },
        {
          id: 14,
          title: 'Paperclips',
          date: '25/08/2025',
          description: 'Interlocking paperclips modeling with Blender.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/66b26f207669509.68cc45a6dea73.jpg',
          tags: ['3D', 'Paperclip']
        },
        {
          id: 15,
          title: 'Vase Plate Cup',
          date: '22/08/2025',
          description: '3D vase, plate and cup model with Blender.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e75e98207675585.68cc412ba6a1c.png',
          tags: ['3D', 'Cups']
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
          title: 'Green World',
          date: '28/08/2025',
          description: 'Green World is a location-based mobile application developed to raise awareness about environmental pollution, support the voluntary trash collection process, and increase social environmental awareness.',
          image: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ui_ux/Mockup.png`,
          gallery: [
            `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ui_ux/Screens_Page.png`,
            `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ui_ux/Typography_Page.png`,
            `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ui_ux/Components_Page.png`,
            `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ui_ux/Wireframe_Page.png`
          ],
          tags: ['UI/UX', 'Mobile']
        },
        {
          id: 9,
          title: 'Hepsiburada Product Card',
          date: '28/08/2025',
          description: 'Product card design featured on Hepsiburada, an e-commerce site.Colors, texts, icons, and other elements were incorporated into the design as a whole.',
          image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/7068ac238680707.6919e90f93502.png',
          tags: ['UI/UX', 'Mobile'],
          reversed: true
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
      count: 2,
      projects: [
        {
          id: 16,
          title: 'Green World',
          date: '2025-08-20',
          description: 'A location-based mobile application developed with React Native and TypeScript, featuring Firebase integration. Green World aims to raise environmental awareness by facilitating voluntary trash collection activities, connecting users through location services, and promoting community-driven environmental action.',
          image: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/coding/GreenWorldApp.png`,
          tags: ['Mobile', 'React Native','TypeScript', 'Firebase']
        },
        {
          id: 29,
          title: 'Portfolio Website',
          date: '2025-08-15',
          description: 'A modern, responsive portfolio website showcasing design and development work across multiple disciplines including UI/UX design, poster art, pixel art, 3D modeling, and web development projects. Built with Next.js and featuring smooth animations, interactive elements, and a clean, minimalist design that emphasizes attention to detail and user experience.',
          image: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/coding/DET_Mockup_2.png`,
          tags: ['Web', 'Portfolio', 'Next.js', 'Tailwind CSS', 'Framer Motion']
        }
      ]
    }
  ];

  // Tüm kategorileri başlangıçta açık olarak ayarla
  const [activeCategoryIds] = useState<Set<string>>(
    new Set(categories.map(cat => cat.id))
  );
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
    // Sadece scroll yap, kategoriyi kapatma
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
      reversed?: boolean;
    }>, 
    title: string, 
    count: number,
    collapsed: boolean,
    onHeaderClick: () => void
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isPixelArt = title.toLowerCase().includes('pixel');
    const is3D = title.toLowerCase().includes('3d');
    const isPoster = title.toLowerCase().includes('poster');
    const isCoding = title.toLowerCase().includes('coding');
    const isUIUX = title.toLowerCase().includes('ui/ux');
    const [openUiuxIds, setOpenUiuxIds] = useState<Set<number>>(new Set());
    const [openCodingId, setOpenCodingId] = useState<number | null>(null);
    // Green World App için thumbnail slider state
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<Record<number, number>>({});
    const baseDesigns = designs;
    const baseDesignsLength = baseDesigns.length;
    // Mobilde içerik yüksekliğine göre parent container'ı ayarlamak için
    const activeContentRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerHeight, setContainerHeight] = useState<number>(600);

    // Aktif içeriğin yüksekliğine göre container yüksekliğini ayarla (mobilde boşluk sorununu çözmek için)
    useEffect(() => {
      if (isUIUX) return;
      const updateHeight = () => {
        if (activeContentRef.current) {
          // Tag'ler dahil tüm içeriğin yüksekliğini ölç
          const height = activeContentRef.current.offsetHeight;
          // Mobilde tag'ler için ekstra padding ekle, desktop'ta normal
          const isMobile = window.innerWidth < 1024;
          const extraPadding = isMobile ? 40 : 0;
          setContainerHeight(Math.max(height + extraPadding + 24, isMobile ? 500 : 600)); // Minimum yükseklik
        }
      };
      updateHeight();
      const resizeObserver = activeContentRef.current 
        ? new ResizeObserver(updateHeight) 
        : null;
      if (activeContentRef.current && resizeObserver) {
        resizeObserver.observe(activeContentRef.current);
      }
      window.addEventListener('resize', updateHeight);
      const timer = setTimeout(updateHeight, 150);
      const currentRef = activeContentRef.current;
      return () => {
        if (resizeObserver && currentRef) {
          resizeObserver.unobserve(currentRef);
        }
        window.removeEventListener('resize', updateHeight);
        clearTimeout(timer);
      };
    }, [currentIndex, isUIUX, baseDesignsLength]);

    // UI/UX açıldığında tüm projeler varsayılan açık gelsin
    useEffect(() => {
      if (isUIUX && !collapsed && openUiuxIds.size === 0 && designs.length > 0) {
        setOpenUiuxIds(new Set(designs.map(d => d.id)));
      }
    }, [isUIUX, collapsed, designs, openUiuxIds.size]);

    // Green World App açıldığında gallery index'ini sıfırla
    useEffect(() => {
      if (isUIUX && openUiuxIds.size > 0) {
        designs.forEach(design => {
          if (openUiuxIds.has(design.id) && design.gallery && design.gallery.length > 0) {
            setCurrentGalleryIndex(prev => ({
              ...prev,
              [design.id]: 0
            }));
          }
        });
      }
    }, [isUIUX, openUiuxIds, designs]);

    // Coding açıldığında üstteki proje varsayılan açık gelsin
    useEffect(() => {
      if (isCoding && !collapsed && openCodingId === null && baseDesigns.length > 0) {
        setOpenCodingId(baseDesigns[0].id);
      }
    }, [isCoding, collapsed, baseDesigns, openCodingId]);
    const [galleryImageByDesignId] = useState<Record<number, string>>({});
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
      console.log('Tıklanan tasarım index:', index, 'Toplam tasarım sayısı:', baseDesignsLength);
      if (index >= 0 && index < baseDesignsLength) {
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
        className="py-4"
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
            ref={containerRef}
            className={`relative ${isUIUX ? 'h-auto' : ''} overflow-hidden`}
            style={!isUIUX ? { minHeight: containerHeight } : undefined}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {isUIUX ? (
              <div className="flex flex-col gap-16 mt-6">
                {designs.map((design) => (
                  <div key={`${title}-${design.id}`} className="p-0">
                    <AnimatePresence initial={false}>
                      {openUiuxIds.has(design.id) && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className={`mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ${design.reversed ? 'lg:grid-flow-col-dense' : ''}`}
                        >
                          {/* Açıklama kısmı - reversed ise solda, değilse sağda */}
                          <div className={`w-full lg:max-w-xl text-left ${design.reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{design.title}</h3>
                            {/* <p className="text-gray-500 text-sm mb-3">{design.date}</p> */}
                            <p className="text-gray-700 leading-relaxed mb-4">{design.description}</p>
                            <div className="flex gap-2 flex-wrap items-start">
                              {design.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          {/* Görsel kısmı - reversed ise sağda, değilse solda */}
                          <div className={`w-full flex ${design.reversed ? 'lg:order-2 lg:justify-end' : 'lg:order-1 lg:justify-start'} justify-center`}>
                            <div className={`relative ${design.title.toLowerCase().includes('green world') ? 'max-w-[600px] md:max-w-[500px] lg:max-w-none bg-black rounded-lg overflow-hidden' : 'max-w-[600px] md:max-w-[500px] lg:max-w-none' } overflow-hidden`}
                            >
                              {/* Ana görsel alanı */}
                              <div 
                                className="relative w-full cursor-zoom-in"
                                onClick={() => {
                                  const images = design.gallery && design.gallery.length > 0 ? design.gallery : [design.image];
                                  const currentIdx = currentGalleryIndex[design.id] ?? 0;
                                  setExpandedDesign({
                                    image: images[currentIdx],
                                    title: design.title,
                                    pixel: false,
                                    currentIndex: currentIdx,
                                    designs: images.map((img, idx) => ({
                                      id: idx,
                                      title: `${design.title} - ${idx + 1}`,
                                      date: design.date,
                                      description: design.description,
                                      image: img,
                                      tags: design.tags
                                    }))
                                  });
                                }}
                              >
                                {(design.gallery && design.gallery.length > 0 ? design.gallery : [design.image]).map((img, idx) => {
                                  const currentIdx = currentGalleryIndex[design.id] ?? 0;
                                  if (idx === currentIdx) {
                                    return (
                                      <div
                                        key={`${design.id}-${idx}`}
                                        className="relative w-full"
                                      >
                                        <Image
                                          src={img}
                                          alt={`${design.title} - ${idx + 1}`}
                                          width={800}
                                          height={600}
                                          className={`w-full h-auto max-h-[50vh] md:max-h-[45vh] lg:max-h-none ${design.title.toLowerCase().includes('green world') ? 'object-contain' : 'object-cover'}`}
                                        />
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </div>

                              {/* Thumbnail'ler - Sadece Green World App için ve gallery varsa */}
                              {design.title.toLowerCase().includes('green world') && design.gallery && design.gallery.length > 0 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 sm:gap-3 px-4">
                                  {design.gallery.map((img, idx) => {
                                    const currentIdx = currentGalleryIndex[design.id] ?? 0;
                                    return (
                                      <button
                                        key={`thumb-${design.id}-${idx}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`relative w-12 h-9 sm:w-20 sm:h-14 overflow-hidden rounded-md shadow-md transition-all duration-300 ring-1 ring-white/10 ${
                                          idx === currentIdx 
                                            ? 'ring-2 ring-white/70 scale-[1.03]' 
                                            : 'opacity-80 hover:opacity-100 hover:scale-[1.02]'
                                        }`}
                                        onMouseEnter={() => {
                                          setCurrentGalleryIndex(prev => ({
                                            ...prev,
                                            [design.id]: idx
                                          }));
                                        }}
                                        onClick={() => {
                                          setCurrentGalleryIndex(prev => ({
                                            ...prev,
                                            [design.id]: idx
                                          }));
                                        }}
                                      >
                                        <Image
                                          src={img}
                                          alt={`thumbnail ${idx + 1}`}
                                          width={80}
                                          height={56}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ) : isCoding ? (
              <div className="flex flex-col gap-16 mt-6">
                {designs.map((design) => {
                  // Portfolio Website için reversed düzen (görsel sağda, açıklama solda)
                  const isReversed = design.title.toLowerCase().includes('portfolio');
                  return (
                    <div key={`${title}-${design.id}`} className="p-0">
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
                      >
                        {/* Açıklama kısmı - reversed ise solda, değilse sağda */}
                        <div className={`w-full lg:max-w-xl text-left ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{design.title}</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{design.description}</p>
                          <div className="flex gap-2 flex-wrap items-start">
                            {design.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Görsel kısmı - reversed ise sağda, değilse solda */}
                        <div className={`w-full flex ${isReversed ? 'lg:order-2 lg:justify-end' : 'lg:order-1 lg:justify-start'} justify-center`}>
                          <div 
                            className="relative max-w-[600px] md:max-w-[500px] lg:max-w-none cursor-zoom-in rounded-lg overflow-hidden"
                            onClick={() => {
                              setExpandedDesign({
                                image: design.image,
                                title: design.title,
                                pixel: false,
                                currentIndex: 0,
                                designs: [{
                                  id: design.id,
                                  title: design.title,
                                  date: design.date,
                                  description: design.description,
                                  image: design.image,
                                  tags: design.tags
                                }]
                              });
                            }}
                          >
                            <Image
                              src={design.image}
                              alt={design.title}
                              width={800}
                              height={600}
                              className="w-full h-auto object-contain max-h-[50vh] md:max-h-[45vh] lg:max-h-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
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
                  className="absolute inset-0 mt-6"
                  style={{
                    transform: `translateX(${x}) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                >
                  <div
                    ref={isActive ? activeContentRef : undefined}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start w-full"
                  >
                    {/* Sol taraf - Tasarım görüntüsü */}
                    <motion.div 
                      className={`w-full max-w-full flex ${isPoster ? 'justify-center lg:justify-start' : 'justify-center'}`}
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
                        className={`${isCoding
                          ? 'w-full max-w-[360px] aspect-[9/19] max-h-[65vh] md:max-h-[60vh] lg:max-h-none'
                          : (isPixelArt || is3D || (isUIUX && design.title.toLowerCase().includes('green world app')))
                            ? 'w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] aspect-square max-h-[55vh] sm:max-h-[50vh] md:max-h-[45vh] lg:max-h-none'
                            : isPoster
                              ? 'w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[400px] xl:max-w-[440px] aspect-[4/5] max-h-[92vh] sm:max-h-[84vh] md:max-h-[70vh] lg:max-h-none'
                              : 'w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] aspect-[4/5] max-h-[100vh] sm:max-h-[100vh] md:max-h-[100vh] lg:max-h-none'
                        } bg-transparent rounded-lg overflow-hidden cursor-zoom-in relative group`}
                      >
                        {design.image ? (
                          <Image
                            src={(isUIUX && design.title === 'Green World App' && galleryImageByDesignId[design.id]) ? galleryImageByDesignId[design.id] : design.image}
                            alt={design.title}
                            width={400}
                            height={300}
                            className={`w-full h-full ${
                              isCoding
                                ? 'object-contain'
                                : (isPixelArt || is3D || (isUIUX && design.title.toLowerCase().includes('green world app')))
                                  ? 'object-contain'
                                  : 'object-cover'
                            } transition-transform duration-300 group-hover:scale-105`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-sm">Design Preview</div>
                          </div>
                        )}

                        {/* Thumbnail bar moved to Lightbox */}
                        
                        {/* Click control: Coding'de ikon butonu sağ üstte, diğerlerinde altta etiket */}
                        {isCoding ? (
                          <button
                            type="button"
                            aria-label={design.link ? 'Open detail' : 'Open fullsize'}
                            onClick={(e) => {
                              e.stopPropagation();
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
                            className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A]/60 text-[#edede9] backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30 hover:bg-[#edede9] lg:hidden"
                          >
                            {design.link ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            aria-label={design.link ? 'Open detail' : 'Open fullsize'}
                            onClick={(e) => {
                              e.stopPropagation();
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
                            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#edede9]/80 text-[#4E4E4E] backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30 hover:bg-[#edede9] lg:hidden"
                          >
                            {design.link ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            )}
                          </button>
                        )}
                        {/* Previous/Next controls on image sides (mobile + desktop) */}
                        {!isUIUX && (
                          <>
                            {/* Mobile (sm-md) */}
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); goToProject(currentIndex - 1); }}
                              disabled={currentIndex === 0}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#edede9]/80 text-[#4E4E4E] backdrop-blur-sm rounded-full items-center justify-center transition-all duration-200 border border-white/20 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Previous project"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </motion.button>
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); goToProject(currentIndex + 1); }}
                              disabled={currentIndex === baseDesignsLength - 1}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#edede9]/80 text-[#4E4E4E] backdrop-blur-sm rounded-full items-center justify-center transition-all duration-200 border border-white/20 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Next project"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>

                            {/* Desktop (lg+) */}
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); goToProject(currentIndex - 1); }}
                              disabled={currentIndex === 0}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#edede9]/80 text-[#4E4E4E] backdrop-blur-sm rounded-full items-center justify-center transition-all duration-200 border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Previous project"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </motion.button>
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); goToProject(currentIndex + 1); }}
                              disabled={currentIndex === baseDesignsLength - 1}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#edede9]/80 text-[#4E4E4E] backdrop-blur-sm rounded-full items-center justify-center transition-all duration-200 border border-white/30 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Next project"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Mobile/Tablet buttons moved to image sides */}

                    {/* Sağ taraf - İçerik */}
                    <motion.div 
                      className="w-full lg:w-full lg:max-w-full lg:mt-0 px-4 lg:px-0"
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
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4">{design.title}</h3>
                      {/* <p className="text-[#4E4E4E] text-sm mb-4 lg:mb-6">{design.date}</p> */}
                      <p className="text-[#4E4E4E] text-sm sm:text-base leading-relaxed mb-4">{design.description}</p>
                      {/* <p className="text-gray-700 text-base leading-relaxed mb-6">
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                      </p> */}
                      
                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap items-center">
                        {design.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-xl border border-gray-200"
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

            {!isUIUX && !isCoding && (
            <>
            {/* Sağda sadece 1 tane thumbnail - sonraki tasarım */}
            {currentIndex < (designs.length - 1) && (
              <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-4 z-10">
                <motion.button
                  onClick={() => {
                    console.log('Thumbnail tıklandı, sonraki tasarıma geçiliyor');
                    goToProject(currentIndex + 1);
                  }}
                  className={`${
                    isPixelArt || is3D
                      ? 'w-44 h-44'
                      : isPoster
                        ? 'w-auto h-56'
                        : 'w-[180px] h-[360px]'
                  } bg-transparent rounded-lg overflow-hidden flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 relative z-30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={designs[currentIndex + 1]?.image || ''}
                    alt={designs[currentIndex + 1]?.title || ''}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </motion.button>
              </div>
            )}

            {/* Navigation Controls moved onto image sides for desktop */}
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
                        // UI/UX için currentIndex güncellemesi gerekmiyor
                        if (!isUIUX) {
                          setCurrentIndex(newIndex);
                        }
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
                        // UI/UX için currentIndex güncellemesi gerekmiyor
                        if (!isUIUX) {
                          setCurrentIndex(newIndex);
                        }
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-[61] bg-white/90 text-gray-900 rounded-full w-12 h-12 shadow-md hover:bg-white flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  {/* Image */}
                  <Image
                    src={expandedDesign.image}
                    alt={expandedDesign.title}
                    width={1200}
                    height={800}
                    className={`max-w-[90vw] max-h-[75vh] w-auto h-auto ${expandedDesign.pixel ? 'object-contain' : 'object-contain'}`}
                    unoptimized
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
        {/* Sticky WORK header with scroll-scale effect */}
        <div ref={workStickyRef} className="relative h-[160vh] mb-6">
          <motion.h2
            style={{ scale: workScale, y: workY, top: workTopOffset as unknown as string }}
            className="sticky text-center font-bold text-[#1A1A1A]"
          >
            <span ref={workHeadingRef} className="block" style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em', fontSize: workFontSize }}>
              WORK
            </span>
          </motion.h2>
        </div>

        {/* Lottie Animation - WORK ve Poster arasında */}
        {lottieData && (
          <div className="flex justify-center py-8 md:py-12 mb-6">
            <div className="w-full max-w-[240px] md:max-w-[300px] lg:max-w-[420px] mx-auto">
              <Lottie
                animationData={lottieData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Animated Categories Sections */}
        {categories.map((category) => (
          <div key={category.id} ref={(el) => { sectionRefs.current[category.id] = el; }}>
            <AnimatedSection
              designs={category.projects || []}
              title={category.name}
              count={category.projects?.length || 0}
              collapsed={!activeCategoryIds.has(category.id)}
              onHeaderClick={() => handleCategoryOpen(category.id)}
            />
          </div>
        ))}

        {/* Playlist for Creativity - moved from Personal section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            {musicLottieData && (
              <div className="flex justify-center py-2">
                <div className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[300px] mx-auto">
                  <Lottie
                    animationData={musicLottieData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            )}
            <div className="mb-6 md:mb-8 text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3 md:mb-4">
                Playlist for Creativity
              </h3>
              <p className="text-base md:text-lg text-[#4E4E4E] leading-relaxed max-w-2xl mx-auto">
                If you&apos;re looking for a playlist to spark your creativity, these songs are perfect for you. Stay tuned!
              </p>
            </div>
            <div className="w-full">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/3MGkD3NGtGIbgferZfr8CE?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist - Soundtrack to Creativity"
              />
            </div>
          </div>
        </div>

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
