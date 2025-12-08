'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Lottie from 'lottie-react';

type TabKey = 'photos' | 'drawings' | 'blog';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'photos', label: 'Photos' },
  { key: 'drawings', label: 'Drawing' },
  { key: 'blog', label: 'Blog' }
];

const PersonalCreativesSection = () => {
  // PERSONAL sticky header scroll control
  const personalStickyRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: personalProgress } = useScroll({
    target: personalStickyRef,
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
  const personalScale = useTransform(personalProgress, [0, 0.8], isMobile ? [1, 0.7] : [1, 0.4]);
  const personalHeadingRef = useRef<HTMLSpanElement | null>(null);
  const [personalTopOffset, setPersonalTopOffset] = useState<number>(0);
  const [personalStartY, setPersonalStartY] = useState<number>(0);
  useEffect(() => {
    const update = () => {
      const headerEl = document.querySelector('header') as HTMLElement | null;
      const headerH = headerEl?.offsetHeight ?? 0;
      setPersonalTopOffset(headerH + 8);
      const viewportH = window.innerHeight;
      const headingH = personalHeadingRef.current?.offsetHeight ?? 0;
      const startY = Math.max(0, (viewportH - headerH - headingH) / 2);
      setPersonalStartY(startY);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const personalY = useTransform(personalProgress, [0, 1], [personalStartY, 0]);

  // Lottie animation data
  const [polaroidLottieData, setPolaroidLottieData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/animations/Polaroid_Photo.json`)
      .then(res => res.json())
      .then(data => setPolaroidLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, []);

  const [blogLottieData, setBlogLottieData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/animations/Blog.json`)
      .then(res => res.json())
      .then(data => setBlogLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, []);

  const [musicLottieData, setMusicLottieData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/animations/Music.json`)
      .then(res => res.json())
      .then(data => setMusicLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, []);

  const [drawingLottieData, setDrawingLottieData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/animations/drawing.json`)
      .then(res => res.json())
      .then(data => setDrawingLottieData(data))
      .catch(err => console.error('Lottie animation yüklenirken hata:', err));
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  type Item = { title: string; description: string; src: string; width: number; height: number; category?: string; location?: string; date?: string; url?: string; readTime?: string };
  const contentByTab: Record<TabKey, Item[]> = {
    photos: [
      { title: 'Sveti Stefan Island View', description: 'View of Sveti Stefan Island from the St. Sava Church', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_1.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Đenaši, Montenegro', date: '16/07/2025' },
      { title: 'Slansko Lake', description: 'Beautiful view of Slansko Lake', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_2.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Slansko Lake, Montenegro', date: '18/07/2025' },
      { title: 'Viewpoint of Kotor', description: 'Viewpoint of Kotor from the top of the mountain', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_3.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'Sunset in Kotor', description: 'Sunset in Dobrota, Kotor', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_4.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '15/07/2025' },
      { title: 'Horizont Bar', description: 'Sunset in Horizont Bar, Kotor', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_5.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'View of Kotor Bay', description: 'View of Kotor Bay from the Serpentine Road', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_6.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'Turkey to Montenegro', description: 'Flying over the clouds from Turkey to Montenegro', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_7.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Montenegro', date: '15/07/2025' },
      { title: 'Budva Oldtown', description: 'Budva Oldtown streets.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_8.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Budva, Montenegro', date: '16/07/2025' },
      { title: 'Passports', description: 'Passports.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_9.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Budva, Montenegro', date: '16/07/2025' },
      // Camp kategorisi
      { title: 'Sunrise at Aslanlar Lake', description: 'Sunrise at Aslanlar Lake', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_1.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Aslanlar Göleti', date: '06/10/2024' },
      { title: 'Sunrise at Aslanlar Lake', description: 'Sunrise at Aslanlar Lake', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_2.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Aslanlar Göleti', date: '06/10/2024' },
      { title: 'Camping Bags, Axe etc.', description: 'Camping Bags, Axe etc.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_3.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Aslanlar Göleti', date: '05/10/2024' },
      { title: 'Aslanlar Göleti', description: 'Aslanlar Göleti', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_4.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Aslanlar Göleti', date: '05/10/2024' },
      { title: 'Campfire and Cup', description: 'Campfire and Cup', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_5.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Aslanlar Göleti', date: '05/10/2024' },
      { title: 'Camping and Fishing', description: 'Camping at Kerpe Cape', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_6.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Kerpe Cape', date: '24/05/2025' },
      { title: 'Sunset', description: 'Sunset at Kerpe Cape', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_7.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Kerpe Cape', date: '14/06/2023' },
      { title: 'Campfire', description: 'Campfire at Kerpe Cape', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_8.webp`, width: 1740, height: 1160, category: 'Camp', location: 'Kerpe Cape', date: '14/06/2023' },
      // Anatolia kategorisi
      { title: 'Paragliding', description: 'Paragliding in Sakarya.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_1.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '10/06/2023' },
      { title: 'Lake Gölcük', description: 'Gölcük Lake in Bolu.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_2.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Bolu, Türkiye', date: '17/05/2024' },
      { title: 'Kumcağız Beach', description: 'Kumcağız Beach in Kocaeli.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_3.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Kocaeli, Türkiye', date: '03/06/2024' },
      { title: 'Bicycle in Campus', description: 'Bicycle in SAU campus.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_4.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '06/06/2024' },
      { title: 'Butterfly', description: 'Butterfly in Poyrazlar Lake.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_5.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '08/06/2024' },
      { title: 'Sakarya University', description: 'Sakarya University in Sakarya.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_6.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '08/10/2024' },
      { title: 'Bursa Walls', description: 'Historic Bursa Walls.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_7.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Bursa, Türkiye', date: '26/10/2024' },
      { title: 'Winter at Sakarya University', description: 'Winter at Sakarya University.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_8.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '23/11/2024' },
      { title: 'Sakarya Nature Park', description: 'Sakarya Nature Park.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_9.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '01/01/2025' },
      { title: 'Tennis', description: 'Tennis Ball and Racket.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_10.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Sakarya, Türkiye', date: '31/07/2025' },
      { title: 'Rahmi Koç Museum', description: 'The Fiat car at the Rahmi Koç Museum.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_11.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Ankara, Türkiye', date: '02/08/2025' },
      { title: 'Isanbul Bosphorus', description: 'A seagull gliding over the Bosphorus.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_12.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Istanbul, Türkiye', date: '02/11/2025' },
      { title: 'Hummingbird-Hawkmoths', description: 'Hummingbird-Hawkmoths.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_13.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Çorum, Türkiye', date: '12/10/2025' },
      { title: 'Underground of Istanbul', description: 'Underground of Istanbul.', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_14.webp`, width: 1740, height: 1160, category: 'Mixed', location: 'Istanbul, Türkiye', date: '26/09/2025' },
    ],
    drawings: [
      { title: 'Portrait Study', description: 'Quick sketch with pencil.', src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Space Perspective', description: 'Two-point perspective practice.', src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Figure Studies', description: 'Selections from short poses.', src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 }
    ],
    blog: [
      { 
        title: 'Kullanıcı Odaklı İnovasyonun Rehberi: Design Thinking ve UX Tasarımı', 
        description: 'Design Thinking metodolojisinin temel prensiplerini ve beş aşamasını inceleyerek, karmaşık sorunları anlamak ve kullanıcı odaklı çözümler geliştirmek için kullanılan insan merkezli yaklaşımı keşfedin.', 
        src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&h=630&q=80', 
        width: 1200, 
        height: 630,
        url: 'https://yusufgulmezz.medium.com/kullan%C4%B1c%C4%B1-odakl%C4%B1-i%CC%87novasyonun-rehberi-design-thinking-ve-ux-tasar%C4%B1m%C4%B1-89a3d40dcab2',
        readTime: '4 min read',
        date: '21 Ekim 2025'
      },
      { 
        title: 'Herkes İçin Tasarım: UX\'te Eşitlik (Equality) ve Hakkaniyet (Equity) Farkı', 
        description: 'UX tasarımında sıkça karıştırılan iki önemli kavramı netleştiriyoruz: Eşitlik ve Hakkaniyet. Tasarımlarımızın sadece iyi değil, aynı zamanda adil olmasını sağlayan ince çizgiyi keşfedin.', 
        src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&h=630&q=80', 
        width: 1200, 
        height: 630,
        url: 'https://yusufgulmezz.medium.com/herkes-i%CC%87%C3%A7in-tasar%C4%B1m-uxte-e%C5%9Fitlik-equality-ve-hakkaniyet-equity-fark%C4%B1-d42458ee18bd',
        readTime: '2 min read',
        date: '12 Ekim 2025'
      },
      { 
        title: 'Amazon, Trendyol ve Hepsiburada\'nın Mobil Uygulamalarının Kullanıcı Arayüzü (UI) Analizi', 
        description: 'Türkiye\'nin önde gelen e-ticaret platformlarının mobil uygulamalarını kullanıcı arayüzü açısından detaylı bir şekilde inceliyoruz.', 
        src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Vlx-39CfVtjE3QcTi5miw.jpeg', 
        width: 1200, 
        height: 630,
        url: 'https://yusufgulmezz.medium.com/amazon-trendyol-ve-hepsiburadan%C4%B1n-mobil-uygulamalar%C4%B1n%C4%B1n-kullan%C4%B1c%C4%B1-aray%C3%BCz%C3%BC-ui-ve-0f9f9ecbc301',
        readTime: '5 min read',
        date: '15 Eylül 2025'
      }
    ]
  };

  const activeItem = useMemo(() => {
    const photos = contentByTab.photos;
    return photos[Math.min(activeIndex, photos.length - 1)] ?? photos[0];
  }, [activeIndex]);
  const [selectedPhoto, setSelectedPhoto] = useState<Item | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const rowRefs = useRef<Record<TabKey, HTMLDivElement | null>>({ photos: null, drawings: null, blog: null });
  
  
  



  // Yardımcı: diziyi n parçaya böl
  const chunk = <T,>(arr: T[], parts: number): T[][] => {
    if (arr.length === 0) return Array.from({ length: parts }, () => []);
    const out: T[][] = Array.from({ length: parts }, () => []);
    arr.forEach((it, idx) => out[idx % parts].push(it));
    return out;
  };

  // Photos kategorilere göre grupla
  const photosByCategory = useMemo(() => {
    const grouped: Record<string, Item[]> = {};
    contentByTab.photos.forEach((photo) => {
      const category = photo.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(photo);
    });
    return grouped;
  }, [contentByTab.photos]);



  const VerticalGalleryCard = ({ data, label }: { data: Item[]; label?: string }) => {
    const current = data[0];
    return (
      <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[240px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[260px] rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative w-full aspect-[3/5] bg-gray-100">
          {label && (
            <div className="absolute left-2 top-2 z-[1]">
              <span className="inline-block rounded-md bg-black/35 text-white px-2 py-1 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
                {label}
              </span>
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.src}
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.995 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {current && (
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 360px"
                  className="object-cover"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <section id="personal-creatives" className="bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spotify Playlist - Creativity & Inspiration */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-3xl mx-auto">
            {/* Music Lottie Animation - Soundtrack to Creativity başlığının üstüne */}
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

        {/* Sticky PERSONAL header with scroll-scale effect */}
        <div ref={personalStickyRef} className="relative h-[160vh] mb-12">
          <motion.h2
            style={{ scale: personalScale, y: personalY, top: personalTopOffset as unknown as string }}
            className="sticky text-center font-bold text-[#1A1A1A]"
          >
            <span ref={personalHeadingRef} className="block" style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em', fontSize: 'clamp(36px, 18vw, 248px)' }}>
              PERSONAL
            </span>
          </motion.h2>
        </div>

        {/* Polaroid Photo Lottie Animation - PERSONAL ve Photos arasında */}
        {polaroidLottieData && (
          <div className="flex justify-center py-8 md:py-12 mb-6">
            <div className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[300px] mx-auto">
              <Lottie
                animationData={polaroidLottieData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* CategoriesSection başlık stili */}
        <div className="mb-6">
          {TABS.map((tab, tabIndex) => {
            const itemsOfTab = contentByTab[tab.key];
            const isBlog = tab.key === 'blog';
            const prevTab = tabIndex > 0 ? TABS[tabIndex - 1] : null;
            const isAfterDrawings = prevTab?.key === 'drawings';
            
            return (
              <div key={`pc-head-${tab.key}`} ref={(el) => { rowRefs.current[tab.key] = el; }} className="py-6">
                {/* Drawing Lottie Animation - Drawing başlığının üstüne */}
                {tab.key === 'drawings' && drawingLottieData && (
                  <div className="flex justify-center py-16 md:py-20 lg:py-24">
                    <div className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[300px] mx-auto">
                      <Lottie
                        animationData={drawingLottieData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}
                {/* Blog Lottie Animation - Blog başlığının üstüne, Drawing kategorisinin altına */}
                {isBlog && isAfterDrawings && blogLottieData && (
                  <div className="flex justify-center py-8 md:py-12 mb-6">
                    <div className="w-full max-w-[180px] md:max-w-[240px] lg:max-w-[300px] mx-auto">
                      <Lottie
                        animationData={blogLottieData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}
                <div className="w-full text-left group">
                  <div className="flex items-end justify-between">
                    <div className="relative group">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4E4E4E] group-hover:text-gray-900 transition-colors relative z-10">
                        {tab.label}
                      </h3>
                      {/* Corner brackets */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-500">{itemsOfTab.length}</span>
                  </div>
                  <div className="w-full h-px bg-gray-300 mt-4" />
                </div>
                {/* İçerik her zaman gösterilir */}
                <div className="mt-6">
                  {tab.key === 'photos' ? (
                      <div className="space-y-8 md:space-y-12">
                        {/* Her kategori için ayrı scroll container */}
                        {Object.entries(photosByCategory).map(([categoryName, photos]) => {
                          // Özel layout gerektiren kategoriler
                          if ((categoryName === 'Montenegro' || categoryName === 'Camp' || categoryName === 'Mixed') && photos.length > 0) {
                            const isMontenegro = categoryName === 'Montenegro';
                            const isCamp = categoryName === 'Camp';
                            const featuredPhoto = isMontenegro
                              ? {
                                  title: 'Adriatic Sunrise',
                                  description: 'One evening, while sitting at Arada Coffee, a sudden idea sparked a series of events and plans that resulted in my first trip abroad, to Montenegro.',
                                  src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_main.jpg`,
                                  width: 1740,
                                  height: 1160,
                                  category: 'Montenegro',
                                  location: 'Montenegro',
                                  date: '15/07/2025'
                                }
                              : isCamp
                                ? {
                                    title: 'Campfire Echoes',
                                    description: 'A selection of camping memories and quiet outdoor moments.',
                                    src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/camp_main.jpg`,
                                    width: 1740,
                                    height: 1160,
                                    category: 'Camp',
                                    location: '—',
                                    date: undefined
                                  }
                                : {
                                    title: 'Echoes of Mixed',
                                    description: 'Fragments from travels across Anatolia, capturing textures of ancient towns and warm sunsets.',
                                    src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/anatolia/Anatolia_Image_1.webp`,
                                    width: 1740,
                                    height: 1160,
                                    category: 'Mixed',
                                    location: 'Anadolu, Türkiye',
                                    date: undefined
                                  };
                            const galleryPhotos = photos;
                            
                            return (
                              <div key={categoryName} className="space-y-6 md:space-y-8">
                                {isCamp && (
                                  <div className="flex justify-center py-16 md:py-20 lg:py-24">
                                    <Image
                                      src={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/camp/Fire_Anim.gif`}
                                      alt="Campfire animation"
                                      width={480}
                                      height={240}
                                      unoptimized
                                      className="w-full max-w-[240px] md:max-w-[260px] lg:max-w-[300px] mx-auto"
                                    />
                                  </div>
                                )}
                                {/* Featured görsel ve açıklama bölümü */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
                                  {/* Metin içeriği */}
                                  <div className={`space-y-4 lg:col-span-6 ${isCamp ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div>
                                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
                                        {categoryName}
                                      </h4>
                                      {featuredPhoto.date && (
                                        <p className="text-[#4E4E4E] text-base md:text-lg font-normal">
                                          {featuredPhoto.date}
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-3 text-[#1A1A1A]">
                                      <p className="text-sm md:text-base leading-relaxed">
                                        {featuredPhoto.description || 'A beautiful collection of photographs capturing the essence of this stunning destination.'}
                                      </p>
                                      {photos.length > 1 && (
                                        <p className="text-sm md:text-base leading-relaxed">
                                          Explore more images from this collection in the gallery below, each telling a unique story of the journey.
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Featured görsel - Yatay format */}
                                  <div className={`flex justify-center ${isCamp ? 'lg:justify-start lg:order-1' : 'lg:justify-end lg:order-2'} lg:col-span-6`}>
                                    <div
                                      className="relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] xl:h-[400px] group"
                                    >
                                      <div className="bg-[#FFFFFF] h-full w-full p-2 sm:p-3 lg:p-4 flex items-center justify-center">
                                        <div className="relative h-full w-full overflow-hidden bg-[#E6E0D4]">
                                          <Image 
                                            src={featuredPhoto.src} 
                                            alt={featuredPhoto.title} 
                                            fill 
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            quality={90}
                                            priority
                                            loading="eager"
                                            className="object-cover transition-transform duration-500 ease-out" 
                                          />
                                          <div className="absolute inset-0 pointer-events-none border border-white/35" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Yatay scroll galeri */}
                                {galleryPhotos.length > 0 && (
                                  <div className="relative overflow-hidden" style={{ width: '100%' }}>
                                    <div 
                                      className="flex gap-6 md:gap-9 scroll-animation-container"
                                      style={{
                                        width: 'max-content',
                                        animation: `scroll-left ${galleryPhotos.length * 5}s linear infinite`
                                      }}
                                    >
                                      {/* İki set görsel (loop için) */}
                                      {[...galleryPhotos, ...galleryPhotos].map((item, idx) => {
                                        const actualIndex = idx % galleryPhotos.length;
                                        const isFirstSet = idx < galleryPhotos.length;
                                        return (
                                          <div
                                            key={`${categoryName}-gallery-${idx}`}
                                            className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[372px] lg:w-[400px] cursor-pointer"
                                            onClick={() => {
                                              const photosList = photosByCategory[categoryName] || [];
                                              const index = photosList.findIndex(p => p.src === item.src);
                                              setSelectedPhoto(item);
                                              setSelectedPhotoIndex(index);
                                            }}
                                          >
                                            <div className="h-full bg-[#FFFFFF] px-4 pt-4 pb-6 flex flex-col gap-4">
                                              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#E6E0D4]">
                                                <Image 
                                                  src={item.src} 
                                                  alt={item.title} 
                                                  fill 
                                                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 372px"
                                                  quality={85}
                                                  priority={isFirstSet && idx < 3}
                                                  loading={isFirstSet && idx < 3 ? "eager" : "lazy"}
                                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform" 
                                                />
                                                <div className="absolute right-3 top-3 md:right-4 md:top-4">
                                                  <span 
                                                    className="inline-flex items-center justify-center bg-white/85 text-[#1A1A1A] text-xs md:text-sm font-medium shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
                                                    style={{
                                                      width: '42px',
                                                      height: '24px',
                                                      borderRadius: '6px'
                                                    }}
                                                  >
                                                    {actualIndex + 1}/{galleryPhotos.length}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="px-1">
                                                <h5 className="text-[#2E2A24] text-[18px] md:text-[20px] font-bold mb-2">{item.title}</h5>
                                                {item.date && (
                                                  <p className="text-[#6B6255] text-sm md:text-base font-normal">{item.date}</p>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }
                          
                          // Diğer kategoriler için mevcut tasarım
                          return (
                            <div key={categoryName} className="space-y-3 md:space-y-4">
                              {/* Kategori başlığı */}
                              <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">{categoryName}</h4>
                              
                              {/* Yatay scroll container - sonsuz loop */}
                              <div className="relative overflow-hidden" style={{ width: '100%' }}>
                                <div 
                                  className="flex gap-6 md:gap-9 scroll-animation-container"
                                  style={{
                                    width: 'max-content',
                                    animation: `scroll-left ${photos.length * 6}s linear infinite`
                                  }}
                                >
                                  {/* İki set görsel (loop için) */}
                                  {[...photos, ...photos].map((item, idx) => {
                                    const actualIndex = idx % photos.length;
                                    const isFirstSet = idx < photos.length;
                                    return (
                                      <div
                                        key={`${categoryName}-${idx}`}
                                        className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[372px] lg:w-[400px] cursor-pointer"
                                        onClick={() => {
                                          const photosList = photosByCategory[categoryName] || [];
                                          const index = photosList.findIndex(p => p.src === item.src);
                                          setSelectedPhoto(item);
                                          setSelectedPhotoIndex(index);
                                        }}
                                      >
                                        <div className="h-full bg-[#FFFFFF] rounded-[24px] shadow-[0_10px_30px_rgba(31,41,55,0.12)] px-4 pt-4 pb-6 flex flex-col gap-4">
                                          <div className="relative w-full aspect-[3/4] rounded-[18px] overflow-hidden bg-[#E6E0D4]">
                                            <Image 
                                              src={item.src} 
                                              alt={item.title} 
                                              fill 
                                              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 372px"
                                              quality={85}
                                              priority={isFirstSet && idx < 3}
                                              loading={isFirstSet && idx < 3 ? "eager" : "lazy"}
                                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform" 
                                            />
                                            <div className="absolute right-3 top-3 md:right-4 md:top-4">
                                              <span 
                                                className="inline-flex items-center justify-center bg-white/85 text-[#1A1A1A] text-xs md:text-sm font-medium border border-[#D6CCBD] shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
                                                style={{
                                                  width: '42px',
                                                  height: '24px',
                                                  borderRadius: '6px'
                                                }}
                                              >
                                                {actualIndex + 1}/{photos.length}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="px-1">
                                            <h5 className="text-[#2E2A24] text-[18px] md:text-[20px] font-bold mb-2">{item.title}</h5>
                                            {item.date && (
                                              <p className="text-[#6B6255] text-sm md:text-base font-normal">{item.date}</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : tab.key === 'blog' ? (
                      <div className="space-y-8 md:space-y-12">
                        {contentByTab[tab.key].map((item, idx) => (
                          <motion.article
                            key={`${tab.key}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="group"
                          >
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <div className="bg-[#FFFFFF] rounded-[24px] overflow-hidden hover:shadow-[0_12px_40px_rgba(31,41,55,0.18)] transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                  {/* Görsel */}
                                  <div className="relative h-[240px] md:h-auto md:col-span-1 overflow-hidden bg-[#E6E0D4]">
                                    <Image
                                      src={item.src}
                                      alt={item.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 pointer-events-none border border-white/35" />
                                  </div>
                                  
                                  {/* İçerik */}
                                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                      <h3 className="text-[18px] md:text-[20px] lg:text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#2E2A24] transition-colors duration-200 line-clamp-2">
                                        {item.title}
                                      </h3>
                                      <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed line-clamp-3 mb-4">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                      <div className="flex items-center gap-3">
                                        {item.readTime && (
                                          <span className="text-xs md:text-sm text-[#6B6255] font-medium bg-white/85 px-3 py-1 rounded-[6px] shadow-[0_4px_8px_rgba(0,0,0,0.06)]">
                                            {item.readTime}
                                          </span>
                                        )}
                                        {item.date && (
                                          <span className="text-xs md:text-sm text-[#6B6255] font-normal">
                                            {item.date}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 text-[#1A1A1A] font-medium text-sm md:text-base group-hover:gap-3 transition-all duration-200">
                                        <span>Read More</span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </motion.article>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        key={tab.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {contentByTab[tab.key].map((item, idx) => (
                          <div
                            key={`${tab.key}-${idx}`}
                            className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-shadow"
                          >
                            <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 mb-4 overflow-hidden" />
                            <h4 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
        {/* İçerikler başlık altında render edildiği için ayrıca genel grid yok */}
      </div>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="photo-modal"
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden"
              style={{
                maxWidth: '95vw',
                maxHeight: '95vh',
                width: 'auto',
                height: 'auto'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title} 
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                />
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
                
                {/* Navigation buttons */}
                {(() => {
                  const category = selectedPhoto.category || 'Other';
                  const photos = photosByCategory[category] || [];
                  const hasValidIndex = selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length;
                  const hasPrevious = hasValidIndex && selectedPhotoIndex > 0;
                  const hasNext = hasValidIndex && selectedPhotoIndex < photos.length - 1;
                  
                  return (
                    <>
                      {/* Previous button */}
                      {hasPrevious && (
                        <button
                          onClick={() => {
                            const prevPhoto = photos[selectedPhotoIndex - 1];
                            setSelectedPhoto(prevPhoto);
                            setSelectedPhotoIndex(selectedPhotoIndex - 1);
                          }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg"
                          aria-label="Previous photo"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Next button */}
                      {hasNext && (
                        <button
                          onClick={() => {
                            const nextPhoto = photos[selectedPhotoIndex + 1];
                            setSelectedPhoto(nextPhoto);
                            setSelectedPhotoIndex(selectedPhotoIndex + 1);
                          }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg"
                          aria-label="Next photo"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </>
                  );
                })()}
                
                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="flex items-start justify-between">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">{selectedPhoto.title}</h3>
                      {selectedPhoto.location && <p className="text-sm opacity-90 mb-1">{selectedPhoto.location}</p>}
                      {selectedPhoto.date && <p className="text-xs opacity-75">{selectedPhoto.date}</p>}
                      {selectedPhoto.description && (
                        <p className="text-sm opacity-90 mt-2 leading-relaxed max-w-md">{selectedPhoto.description}</p>
                      )}
                    </div>
                    {selectedPhoto.category && (
                      <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/30">
                        {selectedPhoto.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PersonalCreativesSection;


