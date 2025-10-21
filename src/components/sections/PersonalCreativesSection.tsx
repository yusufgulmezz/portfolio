'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TabKey = 'photos' | 'drawings' | 'blog';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'photos', label: 'Photos' },
  { key: 'drawings', label: 'Drawing' },
  { key: 'blog', label: 'Blog' }
];

const PersonalCreativesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('photos');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  type Item = { title: string; description: string; src: string; width: number; height: number; category?: string; location?: string; date?: string };
  const contentByTab: Record<TabKey, Item[]> = {
    photos: [
      { title: 'Sveti Stefan Island View', description: 'View of Sveti Stefan Island from the St. Sava Church', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_1.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Đenaši, Montenegro', date: '16/07/2025' },
      { title: 'Slansko Lake', description: 'Beautiful view of Slansko Lake', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_2.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Slansko Lake, Montenegro', date: '18/07/2025' },
      { title: 'Viewpoint of Kotor', description: 'Viewpoint of Kotor from the top of the mountain', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_3.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'Sunset in Kotor', description: 'Sunset in Dobrota, Kotor', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_4.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '15/07/2025' },
      { title: 'Horizont Bar', description: 'Sunset in Horizont Bar, Kotor', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_5.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'View of Kotor Bay', description: 'View of Kotor Bay from the Serpentine Road', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_6.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Kotor, Montenegro', date: '17/07/2025' },
      { title: 'Turkey to Montenegro', description: 'Flying over the clouds from Turkey to Montenegro', src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/montenegro/MNE_image_7.webp`, width: 1740, height: 1160, category: 'Montenegro', location: 'Montenegro', date: '15/07/2025' }, ],
    drawings: [
      { title: 'Portrait Study', description: 'Quick sketch with pencil.', src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Space Perspective', description: 'Two-point perspective practice.', src: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Figure Studies', description: 'Selections from short poses.', src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 }
    ],
    blog: [
      { title: 'Workflow Notes', description: 'Design → prototype → development pipeline.', src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Color & Typography', description: 'Daily picks and references.', src: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Toolbox', description: 'Tools I use and quick remarks.', src: 'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 }
    ]
  };

  const items = contentByTab[activeTab];
  const activeItem = useMemo(() => items[Math.min(activeIndex, items.length - 1)] ?? items[0], [items, activeIndex]);
  const [selectedPhoto, setSelectedPhoto] = useState<Item | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const rowRefs = useRef<Record<TabKey, HTMLDivElement | null>>({ photos: null, drawings: null, blog: null });
  
  // Horizontal scroll için state'ler
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  

  const scrollToTab = (key: TabKey) => {
    const el = rowRefs.current[key];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const headerEl = document.querySelector('header') as HTMLElement | null;
    const headerHeight = headerEl?.offsetHeight ?? 80;
    const targetY = currentY + rect.top - headerHeight - 16;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Horizontal scroll handlers (mouse ve touch)
  const handleScrollStart = (clientX: number) => {
    if (!photosContainerRef.current) return;
    setIsScrolling(true);
    setStartX(clientX);
    setScrollLeft(photosContainerRef.current.scrollLeft);
    photosContainerRef.current.style.cursor = 'grabbing';
    photosContainerRef.current.style.userSelect = 'none';
  };

  const handleScrollMove = (clientX: number) => {
    if (!isScrolling || !photosContainerRef.current) return;
    const x = clientX;
    const walk = (x - startX) * 2; // Scroll hızı
    photosContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
    if (photosContainerRef.current) {
      photosContainerRef.current.style.cursor = 'grab';
      photosContainerRef.current.style.userSelect = 'auto';
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScrollStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleScrollMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleScrollEnd();
  };

  const handleMouseLeave = () => {
    handleScrollEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleScrollStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleScrollMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleScrollEnd();
  };

  // Yardımcı: diziyi n parçaya böl
  const chunk = <T,>(arr: T[], parts: number): T[][] => {
    if (arr.length === 0) return Array.from({ length: parts }, () => []);
    const out: T[][] = Array.from({ length: parts }, () => []);
    arr.forEach((it, idx) => out[idx % parts].push(it));
    return out;
  };

  // Photos filtre chip'leri (Figma'daki gibi)
  type PhotoFilterKey = 'all' | 'montenegro' | 'street' | 'nature' | 'architecture' | 'landscape' | 'portrait' | 'night';
  const [activePhotoFilter, setActivePhotoFilter] = useState<PhotoFilterKey>('all');

  const photoFilters: { key: PhotoFilterKey; label: string }[] = [
    { key: 'all', label: 'All Photos' },
    { key: 'montenegro', label: 'Montenegro' },
    { key: 'street', label: 'Street' },
    { key: 'nature', label: 'Nature' },
    { key: 'architecture', label: 'Architecture' },
    { key: 'landscape', label: 'Landscape' },
    { key: 'portrait', label: 'Portrait' },
    { key: 'night', label: 'Night' }
  ];

  const filteredPhotos = useMemo(() => {
    if (activePhotoFilter === 'all') return contentByTab.photos;
    const map: Record<PhotoFilterKey, string> = {
      all: '',
      montenegro: 'Montenegro',
      street: 'Street',
      nature: 'Nature',
      architecture: 'Architecture',
      landscape: 'Landscape',
      portrait: 'Portrait',
      night: 'Night'
    };
    const want = map[activePhotoFilter];
    return contentByTab.photos.filter((p) => (p.category || '').toLowerCase() === want.toLowerCase());
  }, [activePhotoFilter, contentByTab.photos]);

  // Photos ticker ölçüm ve kontrolü (mobilde az öğe varken loop kapansın, butonla gezinilsin)
  const photosContainerRef = useRef<HTMLDivElement | null>(null);
  const photosRowRef = useRef<HTMLDivElement | null>(null);
  const [photoStepPx, setPhotoStepPx] = useState<number>(280);
  const [shouldAnimatePhotos, setShouldAnimatePhotos] = useState<boolean>(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const [photosCurrentIdx, setPhotosCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const measure = () => {
      setIsMobileViewport(window.innerWidth < 640);
      const row = photosRowRef.current;
      const container = photosContainerRef.current;
      if (!row || !container) return;
      const children = Array.from(row.children) as HTMLElement[];
      if (children.length >= 2) {
        const dx = children[1].offsetLeft - children[0].offsetLeft;
        if (dx > 0) setPhotoStepPx(dx);
      } else if (children.length === 1) {
        setPhotoStepPx(children[0].getBoundingClientRect().width);
      }
      const photos = filteredPhotos;
      const totalWidth = photoStepPx * photos.length;
      const containerWidth = container.clientWidth;
      setShouldAnimatePhotos(totalWidth > containerWidth + 4);
      // current index sınırla
      setPhotosCurrentIdx((idx) => Math.min(idx, Math.max(0, photos.length - 1)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (photosContainerRef.current) ro.observe(photosContainerRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [filteredPhotos, photoStepPx]);


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
    <section id="personal-creatives" className="pt-4 pb-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            PERSONAL WORKS
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Beyond professional projects, I share photos, drawings, and short notes.
          </motion.p>
        </motion.div>

        {/* CategoriesSection başlık stili ile akordeon */}
        <div className="mb-6">
          {TABS.map((tab) => {
            const itemsOfTab = contentByTab[tab.key];
            const isActive = activeTab === tab.key;
            return (
              <div key={`pc-head-${tab.key}`} ref={(el) => { rowRefs.current[tab.key] = el; }} className="py-6">
                <button
                  onClick={() => {
                    const willOpen = activeTab !== tab.key;
                    setActiveTab(tab.key);
                    requestAnimationFrame(() => scrollToTab(tab.key));
                    if (willOpen) setTimeout(() => scrollToTab(tab.key), 60);
                  }}
                  className="w-full text-left group"
                >
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
                </button>
                {/* İçerik sadece aktif başlıkta gösterilir */}
                {isActive && (
                  <div className="mt-6">
                    {tab.key === 'photos' ? (
                      <div>
                        {/* Filter chips */}
                        <div className="mb-6 flex flex-wrap items-center gap-2">
                          {photoFilters.map((f) => {
                            const active = f.key === activePhotoFilter;
                            return (
                              <button
                                key={f.key}
                                type="button"
                                onClick={() => setActivePhotoFilter(f.key)}
                                className={`px-4 py-2 rounded-md border text-sm capitalize transition-colors ${
                                  active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white/70 text-gray-700 border-gray-300 hover:bg-white'
                                }`}
                              >
                                {f.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Width-aware Photos Ticker */}
                        <div 
                          ref={photosContainerRef} 
                          className="relative overflow-x-auto overflow-y-hidden px-4 cursor-grab select-none scrollbar-hide"
                          style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                          }}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseLeave}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                          {(() => {
                            const photos = activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos;
                            
                            return (
                              <div
                                ref={photosRowRef}
                                className="flex gap-6"
                                style={{ 
                                  width: 'max-content',
                                  minWidth: '100%'
                                }}
                              >
                            {/* İlk set */}
                            {(activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos).map((item, idx) => (
                              <div
                                key={`photo-1-${idx}`}
                                className="group flex-shrink-0 w-64 sm:w-72 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-0 overflow-hidden cursor-pointer hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-shadow"
                                onClick={() => {
                                  if (!isScrolling) {
                                    const photos = activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos;
                                    const index = photos.findIndex(p => p.src === item.src);
                                    setSelectedPhoto(item);
                                    setSelectedPhotoIndex(index);
                                  }
                                }}
                              >
                                <div className="relative w-full aspect-[4/5] overflow-hidden">
                                  <Image src={item.src} alt={item.title} fill sizes="288px" className="object-cover" />
                                  
                                  {/* Category badge - top left */}
                                  {item.category && (
                                    <span className="absolute left-3 top-3 z-10 inline-block rounded-md bg-black/60 text-white px-2 py-1 text-xs font-medium backdrop-blur-sm">
                                      {item.category}
                                    </span>
                                  )}
                                  
                                  {/* Image counter - top right */}
                                  <span className="absolute right-3 top-3 z-10 inline-block rounded-md bg-black/60 text-white px-2 py-1 text-xs font-medium backdrop-blur-sm">
                                    {idx + 1}/{(activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos).length}
                                  </span>
                                  
                                  {/* Title - Fixed position */}
                                  <div className="absolute bottom-10 left-3 right-3 z-10">
                                    <h4 className="text-white text-sm sm:text-base font-medium leading-tight">{item.title}</h4>
                                  </div>
                                  
                                  {/* Gradient overlay with info - bottom */}
                                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/100 via-black/50 to-transparent">
                                    {/* Date and Location */}
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                      {/* Date */}
                                      {item.date && (
                                        <div className="flex items-center gap-1.5 text-white text-xs">
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>{item.date}</span>
                                        </div>
                                      )}
                                      
                                      {/* Location */}
                                      {item.location && (
                                        <div className="flex items-center gap-1.5 text-white text-xs">
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                          <span>{item.location}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                              </div>
                            );
                          })()}
                          
                          {/* Mobil navigasyon butonları */}
                          {filteredPhotos.length > 1 && (
                            <div className="sm:hidden absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                              <button
                                onClick={() => setPhotosCurrentIdx(Math.max(0, photosCurrentIdx - 1))}
                                disabled={photosCurrentIdx === 0}
                                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Previous photo"
                              >
                                ‹
                              </button>
                              <button
                                onClick={() => setPhotosCurrentIdx(Math.min(filteredPhotos.length - 1, photosCurrentIdx + 1))}
                                disabled={photosCurrentIdx === filteredPhotos.length - 1}
                                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Next photo"
                              >
                                ›
                              </button>
                            </div>
                          )}
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
                                    const photos = activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos;
                                    const hasPrevious = selectedPhotoIndex > 0;
                                    const hasNext = selectedPhotoIndex < photos.length - 1;
                                    
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
                )}
              </div>
            );
          })}
        </div>
        {/* İçerikler başlık altında render edildiği için ayrıca genel grid yok */}
      </div>
    </section>
  );
};

export default PersonalCreativesSection;


