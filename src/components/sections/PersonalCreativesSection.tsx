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
      { title: 'Swiss Alpine Lake', description: '', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Travel', location: 'Interlaken, Switzerland', date: '15/08/2025' },
      { title: 'Street Life in Prague', description: '', src: 'https://images.unsplash.com/photo-1556196148-1fb724238998?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Street', location: 'Prague, Czech Republic', date: '22/07/2025' },
      { title: 'Mystical Forest Path', description: '', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Nature', location: 'Black Forest, Germany', date: '05/09/2025' },
      { title: 'Modern Barcelona', description: '', src: 'https://images.unsplash.com/photo-1486324466559-0226613b4a43?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Architecture', location: 'Barcelona, Spain', date: '12/06/2025' },
      { title: 'Aegean Sunset', description: '', src: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Landscape', location: 'Aegean Sea, Türkiye', date: '28/06/2025' },
      { title: 'Venice Canals', description: '', src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1740&auto=format&fit=crop', width: 1740, height: 1160, category: 'Travel', location: 'Venice, Italy', date: '03/05/2025' }
    ],
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
  const rowRefs = useRef<Record<TabKey, HTMLDivElement | null>>({ photos: null, drawings: null, blog: null });
  
  // Horizontal scroll için state'ler
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Horizontal scroll fonksiyonları
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    // Kart genişliği + gap (24px) = tek kart için gerekli scroll miktarı
    // Mobil: w-80 (320px) + gap-6 (24px) = 344px
    // Desktop: w-96 (384px) + gap-6 (24px) = 408px
    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? 320 : 384; // w-80 vs w-96
    const gap = 24; // gap-6
    const scrollAmount = cardWidth + gap;
    
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Scroll tamamlandıktan sonra buton durumunu güncelle
    setTimeout(updateScrollButtons, 300);
  };

  // Yardımcı: diziyi n parçaya böl
  const chunk = <T,>(arr: T[], parts: number): T[][] => {
    if (arr.length === 0) return Array.from({ length: parts }, () => []);
    const out: T[][] = Array.from({ length: parts }, () => []);
    arr.forEach((it, idx) => out[idx % parts].push(it));
    return out;
  };

  // Photos filtre chip'leri (Figma'daki gibi)
  type PhotoFilterKey = 'all' | 'travel' | 'street' | 'nature' | 'architecture' | 'landscape' | 'portrait' | 'night';
  const [activePhotoFilter, setActivePhotoFilter] = useState<PhotoFilterKey>('all');

  const photoFilters: { key: PhotoFilterKey; label: string }[] = [
    { key: 'all', label: 'All Photos' },
    { key: 'travel', label: 'Travel' },
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
      travel: 'Travel',
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

  // Scroll durumunu kontrol et
  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activePhotoFilter, filteredPhotos]);

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
                    <h3 className={`font-bold transition-colors ${isActive ? 'text-4xl sm:text-5xl lg:text-6xl text-[#4E4E4E]' : 'text-3xl sm:text-4xl lg:text-5xl text-[#4E4E4E] group-hover:text-gray-900'}`}>{tab.label}</h3>
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

                        {/* Horizontal Scrollable Gallery */}
                        <div className="relative">
                          {/* Scroll Container */}
                          <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            onScroll={updateScrollButtons}
                          >
                            {(activePhotoFilter === 'all' ? contentByTab.photos : filteredPhotos).map((item, idx) => (
                              <div
                                key={`photo-card-${idx}`}
                                className="group flex-shrink-0 w-80 sm:w-96 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-0 overflow-hidden cursor-pointer hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-shadow"
                                onClick={() => setSelectedPhoto(item)}
                              >
                                <div className="relative w-full aspect-[4/5] overflow-hidden">
                                  <Image src={item.src} alt={item.title} fill sizes="320px" className="object-cover" />
                                  
                                  {/* Category badge - top left */}
                                  {item.category && (
                                    <span className="absolute left-3 top-3 z-10 inline-block rounded-md bg-black/60 text-white px-2 py-1 text-xs font-medium backdrop-blur-sm">
                                      {item.category}
                                    </span>
                                  )}
                                  
                                  {/* Title - Fixed position */}
                                  <div className="absolute bottom-12 left-3 right-3 z-10">
                                    <h4 className="text-white text-sm sm:text-base font-medium leading-tight">{item.title}</h4>
                                  </div>
                                  
                                  {/* Gradient overlay with info - bottom */}
                                  <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/100 via-black/50 to-transparent">
                                    {/* Date and Location */}
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                      {/* Date */}
                                      {item.date && (
                                        <div className="flex items-center gap-1.5 text-white text-xs">
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>{item.date}</span>
                                        </div>
                                      )}
                                      
                                      {/* Location */}
                                      {item.location && (
                                        <div className="flex items-center gap-1.5 text-white text-xs">
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                          {/* Navigation Buttons */}
                          <div className="flex justify-center gap-4 mt-6">
                            <motion.button
                              onClick={() => scrollToDirection('left')}
                              disabled={!canScrollLeft}
                              whileHover={{ scale: canScrollLeft ? 1.02 : 1 }}
                              whileTap={{ scale: canScrollLeft ? 0.98 : 1 }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                canScrollLeft 
                                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              aria-label="Previous photos"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </motion.button>
                            <motion.button
                              onClick={() => scrollToDirection('right')}
                              disabled={!canScrollRight}
                              whileHover={{ scale: canScrollRight ? 1.02 : 1 }}
                              whileTap={{ scale: canScrollRight ? 0.98 : 1 }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                canScrollRight 
                                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              aria-label="Next photos"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
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
                                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="relative aspect-[16/10]">
                                  <Image src={selectedPhoto.src} alt={selectedPhoto.title} fill className="object-cover" />
                                  <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Close"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedPhoto.title}</h3>
                                      {selectedPhoto.location && <p className="text-gray-600 mb-1">{selectedPhoto.location}</p>}
                                      {selectedPhoto.date && <p className="text-sm text-gray-600">{selectedPhoto.date}</p>}
                                    </div>
                                    {selectedPhoto.category && (
                                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg capitalize border border-gray-200">
                                        {selectedPhoto.category}
                                      </span>
                                    )}
                                  </div>
                                  {selectedPhoto.description && (
                                    <p className="text-gray-700 leading-relaxed">{selectedPhoto.description}</p>
                                  )}
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


