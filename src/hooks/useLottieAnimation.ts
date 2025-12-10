import { useEffect, useState } from 'react';

// Lottie animasyonları için global cache
const lottieCache = new Map<string, any>();

/**
 * Lottie animasyon hook'u - cache mekanizması ile
 * Aynı animasyon birden fazla kez fetch edilmez
 */
export const useLottieAnimation = (path: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Cache'den kontrol et
    if (lottieCache.has(path)) {
      setData(lottieCache.get(path));
      setLoading(false);
      return;
    }

    // Fetch et
    setLoading(true);
    setError(null);

    fetch(path)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load Lottie animation: ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        lottieCache.set(path, json);
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lottie animation yüklenirken hata:', err);
        setError(err);
        setLoading(false);
      });
  }, [path]);

  return { data, loading, error };
};

