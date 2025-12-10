import { useEffect, RefObject } from 'react';

/**
 * Yatay scroll animasyonu için requestAnimationFrame kullanır
 * CSS animation yerine daha performanslı bir çözüm
 */
export const useHorizontalScroll = (
  containerRef: RefObject<HTMLDivElement>,
  speed: number = 0.5,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;
    
    const container = containerRef.current;
    if (!container) return;

    let animationId: number | null = null;
    let scrollPosition = 0;
    let maxScroll = 0;
    let isRunning = false;

    // Container genişliğini hesapla
    const calculateWidth = (): number => {
      // Önce scrollWidth'i dene
      let width = container.scrollWidth;
      
      // Eğer scrollWidth 0 veya çok küçükse, child elementlerin genişliklerini topla
      if (width === 0 || width < 100) {
        const children = Array.from(container.children) as HTMLElement[];
        if (children.length === 0) return 0;
        
        width = children.reduce((sum, child) => {
          const rect = child.getBoundingClientRect();
          const childWidth = rect.width || child.offsetWidth;
          return sum + (childWidth || 0);
        }, 0);
        
        // Gap'leri ekle (gap-6 = 1.5rem = 24px, gap-9 = 2.25rem = 36px)
        const gap = window.innerWidth >= 768 ? 36 : 24;
        width += gap * Math.max(0, children.length - 1);
      }
      
      return width;
    };

    const initAnimation = () => {
      const width = calculateWidth();
      if (width > 0) {
        maxScroll = width / 2; // İki set görsel olduğu için yarısı
        if (maxScroll > 0 && !isRunning) {
          startAnimation();
        }
      }
    };

    const animate = () => {
      if (maxScroll === 0) {
        // maxScroll henüz hesaplanmadı, tekrar dene
        initAnimation();
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollPosition += speed;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0; // Loop için sıfırla
      }
      
      container.style.transform = `translate3d(-${scrollPosition}px, 0, 0)`;
      container.style.willChange = 'transform';
      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isRunning && maxScroll > 0) {
        isRunning = true;
        if (animationId === null) {
          animationId = requestAnimationFrame(animate);
        }
      }
    };

    const stopAnimation = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      isRunning = false;
    };

    // İlk hesaplama - görseller yüklenene kadar bekle
    let initAttempts = 0;
    const maxInitAttempts = 30; // 3 saniye (30 * 100ms)
    
    const tryInit = () => {
      initAttempts++;
      const width = calculateWidth();
      
      if (width > 0) {
        initAnimation();
      } else if (initAttempts < maxInitAttempts) {
        // Görseller henüz yüklenmemiş, tekrar dene
        setTimeout(tryInit, 100);
      } else {
        // Maksimum deneme sayısına ulaşıldı, yine de başlat
        initAnimation();
      }
    };

    // ResizeObserver ile container genişliği değişikliklerini izle
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = calculateWidth();
      const newMaxScroll = newWidth / 2;
      
      if (newMaxScroll > 0) {
        if (newMaxScroll !== maxScroll) {
          // Eğer maxScroll değiştiyse ve scrollPosition maxScroll'dan büyükse, sıfırla
          if (scrollPosition >= newMaxScroll) {
            scrollPosition = 0;
          }
          maxScroll = newMaxScroll;
        }
        
        if (!isRunning && enabled) {
          startAnimation();
        }
      }
    });

    resizeObserver.observe(container);

    // İlk başlatma
    tryInit();
    
    // Fallback: 1 saniye sonra tekrar dene
    const fallbackTimer = setTimeout(() => {
      if (maxScroll === 0) {
        initAnimation();
      }
    }, 1000);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [containerRef, speed, enabled]);
};
