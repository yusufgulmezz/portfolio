# Portfolio - Tasarım & Geliştirme

live => https://yusufgulmezz.github.io/portfolio/

Modern ve responsive bir portföy web sitesi. Poster tasarımları, pixel art, 3D çalışmalar, UI/UX tasarımları ve kodlama projelerini sergilemek için geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Temiz ve profesyonel görünüm
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Animasyonlar**: Framer Motion ile akıcı animasyonlar
- **Kategori Filtreleme**: Projeleri kategorilere göre filtreleme
- **SEO Optimized**: Arama motorları için optimize edilmiş
- **Hızlı Yükleme**: Next.js ile optimize edilmiş performans

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasyonlar
- **Lucide React** - İkonlar

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
│   ├── layout/           # Layout bileşenleri
│   │   ├── Header.tsx    # Navigasyon header
│   │   └── Footer.tsx    # Site footer
│   ├── sections/         # Sayfa bölümleri
│   │   ├── HeroSection.tsx
│   │   └── CategoriesSection.tsx
│   └── ui/               # Temel UI bileşenleri
├── data/                 # Veri dosyaları
└── lib/                  # Yardımcı fonksiyonlar
```

## 🚀 Kurulum

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/portfolio.git
   cd portfolio
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📝 Kullanım

### Yeni Proje Ekleme

1. `src/data/projects.ts` dosyasına yeni proje ekleyin
2. Proje görsellerini `public/images/` klasörüne yükleyin
3. Kategori bilgilerini güncelleyin

### Stil Değişiklikleri

- Tailwind CSS kullanarak stil değişiklikleri yapın
- `src/app/globals.css` dosyasında global stiller tanımlayın

## 🎨 Kategoriler

- **Poster Tasarımları** - Yaratıcı poster çalışmaları
- **Pixel Art** - Retro tarzda pixel art
- **3D Çalışmalar** - 3D modelleme ve render
- **UI/UX Tasarımları** - Kullanıcı arayüzü tasarımları
- **Kodlama Projeleri** - Web ve mobil uygulamalar

## 🌐 Deployment

### GitHub Pages

1. **Repository ayarlarına gidin**
2. **Pages** sekmesini seçin
3. **Source** olarak **GitHub Actions** seçin
4. `.github/workflows/deploy.yml` dosyası otomatik deployment sağlar

### Vercel

1. Vercel hesabınıza giriş yapın
2. **New Project** seçin
3. GitHub repository'nizi bağlayın
4. Otomatik deployment başlar

## 📱 Responsive Tasarım

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Gelecek Özellikler

- [ ] Dark mode desteği
- [ ] Proje detay sayfaları
- [ ] İletişim formu
- [ ] Blog bölümü
- [ ] Çoklu dil desteği
- [ ] Proje arama özelliği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- **Behance**: [Behance Profili](https://behance.net/designeverythink)
- **LinkedIn**: [LinkedIn Profili](https://linkedin.com/in/yusufgulmz)
- **Email**: designeverythink.co@gmail.com

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
