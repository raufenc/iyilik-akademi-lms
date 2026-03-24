# raufenc.com Ana Sayfa İyileştirme Planı

## Mevcut Durum
- Favicon: Sadece inline SVG yıldız (✦) var — Google'da küçük ve belirsiz görünüyor
- Open Graph / Twitter Card meta tag'leri YOK — sosyal medyada paylaşınca düz link görünüyor
- Apple touch icon YOK
- Theme color meta YOK
- Canonical URL YOK

## Yapılacaklar

### 1. Favicon & Google Görünümü
- **favicon.ico** (32x32, 16x16) oluştur — "RE" monogram veya kişisel logo
- **favicon-192.png** (192x192) — Android Chrome için
- **favicon-512.png** (512x512) — PWA splash için
- **apple-touch-icon.png** (180x180) — iPhone/iPad için
- **site.webmanifest** dosyası oluştur
- `<link rel="icon">` tag'lerini güncelle
- Google'da favicon görünmesi için gerçek .ico/.png dosyası gerekli (inline SVG Google tarafından her zaman alınmaz)

### 2. SEO & Sosyal Medya Meta Tag'leri
- Open Graph tag'leri ekle (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tag'leri ekle
- Canonical URL ekle
- Theme color meta ekle (dark/light)
- og:image için 1200x630 boyutunda bir sosyal paylaşım görseli oluştur

### 3. Structured Data (Schema.org)
- Person schema ekle (Google bilgi paneli için)
- Website schema ekle

### 4. Ana Sayfa Tasarım İyileştirmeleri (Opsiyonel)
- Hero bölümüne profil fotoğrafı ekle (raufenc.jpeg zaten mevcut)
- Proje kartlarına küçük thumbnail/ikon görselleri
- Daha iyi bir "Hakkında" bölüm düzeni

## Teknik Notlar
- Site vanilla HTML/CSS/JS — npm/node YOK
- Deploy: GitHub push → Vercel otomatik
- Görseller `/images/` klasöründe
- Favicon/ikon dosyaları Python ile oluşturulabilir (Pillow kütüphanesi)
