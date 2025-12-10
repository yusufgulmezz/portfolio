'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type Item = {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  category?: string;
  location?: string;
  date?: string;
  url?: string;
  readTime?: string;
};

interface HorizontalScrollGalleryProps {
  items: Item[];
  categoryName: string;
  onItemClick: (item: Item, index: number) => void;
  speed?: number;
  rounded?: boolean; // Diğer kategoriler için rounded border
}

/**
 * Optimize edilmiş yatay scroll galeri component'i
 * CSS animation ile otomatik loop yapar ve eager loading kullanır
 */
export const HorizontalScrollGallery = ({
  items,
  categoryName,
  onItemClick,
  speed = 0.5,
  rounded = false,
}: HorizontalScrollGalleryProps) => {
  // Görselleri preload et - otomatik loop için gerekli
  useEffect(() => {
    items.forEach((item, index) => {
      // Link preload
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = item.src;
      if (index < 5) {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);

      // Image preload - görselleri cache'e al
      const img = document.createElement('img');
      img.src = item.src;
      img.loading = 'eager';
      img.decoding = 'async';
    });
  }, [items]);

  // Animasyon süresini hesapla - görsel sayısına göre
  const animationDuration = items.length * 5; // Her görsel için 5 saniye

  // Tüm görselleri eager yükle
  const getLoadingStrategy = () => {
    return 'eager' as const;
  };

  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden" style={{ width: '100%' }}>
      <div
        className="flex gap-6 md:gap-9 scroll-animation-container"
        style={{
          width: 'max-content',
          animation: `scroll-left ${animationDuration}s linear infinite`,
        }}
      >
        {/* İki set görsel (loop için) */}
        {[...items, ...items].map((item, idx) => {
          const actualIndex = idx % items.length;
          const isFirstSet = idx < items.length;
          const loadingStrategy = getLoadingStrategy();

          return (
            <div
              key={`${categoryName}-gallery-${idx}`}
              className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[372px] lg:w-[400px] cursor-pointer"
              onClick={() => {
                const index = items.findIndex((p) => p.src === item.src);
                onItemClick(item, index);
              }}
            >
              <div className={`h-full bg-[#FFFFFF] px-4 pt-4 pb-6 flex flex-col gap-4 ${rounded ? 'rounded-[24px] shadow-[0_10px_30px_rgba(31,41,55,0.12)]' : ''}`}>
                <div className={`relative w-full aspect-[3/4] overflow-hidden bg-[#E6E0D4] ${rounded ? 'rounded-[18px]' : ''}`}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 372px"
                    quality={75}
                    loading={loadingStrategy}
                    priority={actualIndex < 10}
                    fetchPriority={actualIndex < 5 ? 'high' : actualIndex < 10 ? 'auto' : 'low'}
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 md:right-4 md:top-4">
                    <span
                      className={`inline-flex items-center justify-center bg-white/85 text-[#1A1A1A] text-xs md:text-sm font-medium shadow-[0_4px_8px_rgba(0,0,0,0.06)] ${rounded ? 'border border-[#D6CCBD]' : ''}`}
                      style={{
                        width: '42px',
                        height: '24px',
                        borderRadius: '6px',
                      }}
                    >
                      {actualIndex + 1}/{items.length}
                    </span>
                  </div>
                </div>
                <div className="px-1">
                  <h5 className="text-[#2E2A24] text-[18px] md:text-[20px] font-bold mb-2">
                    {item.title}
                  </h5>
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
  );
};

