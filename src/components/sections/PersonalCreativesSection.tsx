'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TabKey = 'photos' | 'drawings' | 'blog';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'photos', label: 'Photos' },
  { key: 'drawings', label: 'Drawings' },
  { key: 'blog', label: 'Blog Posts' }
];

const PersonalCreativesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('photos');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  type Item = { title: string; description: string; src: string; width: number; height: number };
  const contentByTab: Record<TabKey, Item[]> = {
    photos: [
      { title: 'City Lights', description: 'Night shot, street photography.', src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Morning Hike', description: 'Forest scenery in morning fog.', src: 'https://images.unsplash.com/photo-1500534314209-a26db0f5d8f0?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Minimal Shadow', description: 'Composition with light and shadow.', src: 'https://images.unsplash.com/photo-1529625050350-2f8b1bfcdd55?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Soft Portrait', description: 'Available light portrait.', src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Urban Walk', description: 'Muted tones, vertical frame.', src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 },
      { title: 'Golden Leaf', description: 'Close-up, warm light.', src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1080&h=1620&q=80', width: 1080, height: 1620 }
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

  // Yardımcı: diziyi n parçaya böl
  const chunk = <T,>(arr: T[], parts: number): T[][] => {
    if (arr.length === 0) return Array.from({ length: parts }, () => []);
    const out: T[][] = Array.from({ length: parts }, () => []);
    arr.forEach((it, idx) => out[idx % parts].push(it));
    return out;
  };

  // 3 sütun için foto içeriklerini gruplandır
  const photoGroups = useMemo(() => chunk(contentByTab.photos, 3), [contentByTab.photos]);

  const VerticalGalleryCard = ({ data }: { data: Item[] }) => {
    const [idx, setIdx] = useState<number>(0);
    const current = data[Math.min(idx, data.length - 1)] ?? data[0];
    return (
      <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-w-[260px] lg:max-w-[280px] xl:max-w-[300px] rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative w-full aspect-[3/5] bg-gray-100">
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

          {/* Alt overlay thumbnail şeridi */}
          <div className="absolute inset-x-0 bottom-0 p-2">
            <div className="mx-auto flex w-full items-center gap-2 rounded-xl bg-black/30 backdrop-blur-md px-2 py-1.5">
              {data.map((it, i) => {
                const active = i === idx;
                return (
                  <button
                    key={`thumb-${it.src}-${i}`}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`relative flex-shrink-0 overflow-hidden rounded-md transition-all ${
                      active ? 'ring-2 ring-white/80 ring-offset-[2px] ring-offset-black/10' : 'opacity-90 hover:opacity-100'
                    }`}
                    style={{ width: 36, height: 36 }}
                    aria-label={`Show ${it.title}`}
                  >
                    <Image src={it.src} alt={it.title} width={72} height={72} className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="personal-creatives" className="pt-4 pb-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-left mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            PERSONAL WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Beyond professional projects, I share photos, drawings, and short notes.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Photo sekmesi: 3 dikey kart yan yana */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoGroups.map((group, i) => (
              <VerticalGalleryCard key={`col-${i}`} data={group} />
            ))}
          </div>
        )}

        {/* Diğer sekmeler için basit grid (geçici) */}
        {activeTab !== 'photos' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, idx) => (
              <div
                key={`${activeTab}-${idx}`}
                className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 mb-4 overflow-hidden" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PersonalCreativesSection;


