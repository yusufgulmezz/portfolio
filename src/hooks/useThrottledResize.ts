import { useEffect, useCallback, useRef } from 'react';

/**
 * Throttled resize event listener hook
 * Performans için resize event'lerini throttle eder
 */
export const useThrottledResize = (
  callback: () => void,
  delay: number = 100
) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef(0);

  // Callback'i güncel tut
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleResize = () => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      if (timeSinceLastCall >= delay) {
        callbackRef.current();
        lastCallRef.current = now;
      } else {
        // Kalan süre kadar bekle
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callbackRef.current();
          lastCallRef.current = Date.now();
        }, delay - timeSinceLastCall);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);
};

