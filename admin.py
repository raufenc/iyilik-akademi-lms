#!/usr/bin/env python3
"""
Birlikte İyilik Akademi — Haber Admin Paneli
Çalıştır: python3 admin.py
Tarayıcı: http://localhost:8086
"""

import json
import os
import re
import shutil
import subprocess
import unicodedata
from datetime import datetime
from pathlib import Path

from flask import Flask, request, redirect, url_for, flash

BASE_DIR = Path(__file__).parent
CONTENT_DIR = BASE_DIR / "content"
NEWS_FILE = CONTENT_DIR / "news.json"
DIST_DIR = BASE_DIR / "dist"
RAUFENC_DIR = Path("/Users/raufenc/Library/Mobile Documents/com~apple~CloudDocs/Muhtelif/Claude/raufenc.com")

TR_MAP = str.maketrans({
    'ş': 's', 'Ş': 's', 'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o', 'ü': 'u', 'Ü': 'u',
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g',
})

def slugify(text):
    text = text.lower().translate(TR_MAP)
    text = unicodedata.normalize('NFKD', text)
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text[:80]

def load_news():
    with open(NEWS_FILE, encoding='utf-8') as f:
        return json.load(f)

def save_news(items):
    items.sort(key=lambda x: x.get('date', ''), reverse=True)
    with open(NEWS_FILE, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

app = Flask(__name__, template_folder=None)
app.secret_key = 'biaadmin2026'

CATEGORIES = [
    ('duyuru', 'Duyuru'),
    ('haber', 'Haber'),
    ('etkinlik', 'Etkinlik'),
    ('icerik', 'İçerik / Makale'),
]

def html_page(body, title="Admin"):
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — BİA Admin</title>
<style>
  *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; color: #222; }}
  .topbar {{ background: #E20439; color: #fff; padding: 12px 24px; display: flex; align-items: center; gap: 16px; }}
  .topbar a {{ color: #fff; text-decoration: none; font-weight: 600; font-size: 1.1rem; }}
  .topbar nav a {{ font-weight: 400; font-size: .9rem; opacity: .85; }}
  .topbar nav a:hover {{ opacity: 1; }}
  .container {{ max-width: 960px; margin: 32px auto; padding: 0 16px; }}
  h1 {{ font-size: 1.4rem; margin-bottom: 24px; color: #111; }}
  h2 {{ font-size: 1.1rem; margin-bottom: 16px; }}
  .card {{ background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.1); padding: 20px; margin-bottom: 16px; }}
  table {{ width: 100%; border-collapse: collapse; }}
  th, td {{ text-align: left; padding: 10px 12px; border-bottom: 1px solid #eee; font-size: .9rem; }}
  th {{ background: #fafafa; font-weight: 600; color: #555; }}
  tr:hover td {{ background: #fafafa; }}
  .badge {{ display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: .75rem; font-weight: 600; }}
  .badge-duyuru {{ background: #dbeafe; color: #1d4ed8; }}
  .badge-haber {{ background: #dcfce7; color: #15803d; }}
  .badge-etkinlik {{ background: #fef9c3; color: #854d0e; }}
  .badge-icerik {{ background: #f3e8ff; color: #7e22ce; }}
  .btn {{ display: inline-block; padding: 8px 16px; border-radius: 6px; font-size: .85rem; font-weight: 600; cursor: pointer; border: none; text-decoration: none; }}
  .btn-primary {{ background: #E20439; color: #fff; }}
  .btn-primary:hover {{ background: #B00030; }}
  .btn-secondary {{ background: #f1f5f9; color: #334155; }}
  .btn-secondary:hover {{ background: #e2e8f0; }}
  .btn-danger {{ background: #fff; color: #dc2626; border: 1px solid #fca5a5; }}
  .btn-danger:hover {{ background: #fef2f2; }}
  .btn-green {{ background: #16a34a; color: #fff; }}
  .btn-green:hover {{ background: #15803d; }}
  .btn-sm {{ padding: 4px 10px; font-size: .8rem; }}
  .actions {{ display: flex; gap: 8px; }}
  form label {{ display: block; font-size: .85rem; font-weight: 600; color: #555; margin-bottom: 4px; }}
  form input, form select, form textarea {{ width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: .9rem; font-family: inherit; }}
  form textarea {{ min-height: 200px; resize: vertical; }}
  form input:focus, form select:focus, form textarea:focus {{ outline: none; border-color: #E20439; }}
  .field {{ margin-bottom: 16px; }}
  .field-row {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
  .flash {{ padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: .9rem; }}
  .flash-ok {{ background: #dcfce7; color: #15803d; }}
  .flash-err {{ background: #fee2e2; color: #dc2626; }}
  .publish-box {{ background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }}
  .publish-box p {{ font-size: .9rem; color: #92400e; }}
  .filter-bar {{ display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }}
  .filter-bar a {{ padding: 5px 12px; border-radius: 20px; font-size: .8rem; text-decoration: none; background: #f1f5f9; color: #475569; }}
  .filter-bar a.active {{ background: #E20439; color: #fff; }}
  .truncate {{ max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }}
</style>
</head>
<body>
<div class="topbar">
  <a href="/admin">BİA Admin</a>
  <nav style="margin-left:auto;display:flex;gap:20px;">
    <a href="/admin">Haberler</a>
    <a href="/admin/yeni">+ Yeni Haber</a>
    <a href="/admin/yayinla">Yayınla</a>
  </nav>
</div>
<div class="container">
{body}
</div>
</body>
</html>"""

@app.route('/admin')
def index():
    news = load_news()
    cat_filter = request.args.get('cat', '')
    filtered = [n for n in news if not cat_filter or n.get('category') == cat_filter] if cat_filter else news

    filter_links = '<div class="filter-bar">'
    filter_links += f'<a href="/admin" class="{"active" if not cat_filter else ""}">Tümü ({len(news)})</a>'
    for cat_key, cat_label in CATEGORIES:
        count = sum(1 for n in news if n.get('category') == cat_key)
        filter_links += f'<a href="/admin?cat={cat_key}" class="{"active" if cat_filter == cat_key else ""}">{cat_label} ({count})</a>'
    filter_links += '</div>'

    rows = ''
    for i, item in enumerate(filtered):
        orig_idx = news.index(item)
        badge_class = f'badge-{item.get("category","haber")}'
        cat_label = dict(CATEGORIES).get(item.get('category',''), item.get('category',''))
        featured_star = '⭐ ' if item.get('featured') else ''
        rows += f"""<tr>
            <td>{item.get('date','')}</td>
            <td class="truncate">{featured_star}{item.get('title','')}</td>
            <td><span class="badge {badge_class}">{cat_label}</span></td>
            <td><div class="actions">
                <a href="/admin/duzenle/{orig_idx}" class="btn btn-secondary btn-sm">Düzenle</a>
                <a href="/admin/sil/{orig_idx}" class="btn btn-danger btn-sm" onclick="return confirm('Silmek istediğinize emin misiniz?')">Sil</a>
            </div></td>
        </tr>"""

    flashes = ''
    for cat, msg in (request.args.get('_flash', '').split('|') if '|' in request.args.get('_flash', '') else []):
        pass

    body = f"""
    <div class="publish-box">
      <p>Değişiklikler sadece bu panelde kaydedildi. Siteye yansıtmak için <strong>Yayınla</strong>'ya tıklayın.</p>
      <a href="/admin/yayinla" class="btn btn-green">🚀 Yayınla</a>
    </div>
    <h1>Haberler & İçerikler</h1>
    {filter_links}
    <div class="card">
      <table>
        <thead><tr><th>Tarih</th><th>Başlık</th><th>Kategori</th><th>İşlem</th></tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
    <a href="/admin/yeni" class="btn btn-primary">+ Yeni Haber Ekle</a>
    """
    return html_page(body, "Haberler")

def item_form(item=None, action="/admin/kaydet", idx=None):
    v = item or {}
    title = v.get('title', '')
    slug = v.get('slug', '')
    date = v.get('date', datetime.now().strftime('%Y-%m-%d'))
    category = v.get('category', 'haber')
    excerpt = v.get('excerpt', '')
    content = v.get('content', '')
    image = v.get('image', '')
    featured = 'checked' if v.get('featured') else ''
    source_url = v.get('source_url', '')

    cat_options = ''
    for cat_key, cat_label in CATEGORIES:
        selected = 'selected' if cat_key == category else ''
        cat_options += f'<option value="{cat_key}" {selected}>{cat_label}</option>'

    idx_input = f'<input type="hidden" name="idx" value="{idx}">' if idx is not None else ''

    return f"""
    <form method="post" action="{action}">
      {idx_input}
      <div class="field">
        <label>Başlık *</label>
        <input name="title" value="{title}" required placeholder="Haber başlığı">
      </div>
      <div class="field-row">
        <div class="field">
          <label>Slug (URL)</label>
          <input name="slug" value="{slug}" placeholder="otomatik-olusturulur">
        </div>
        <div class="field">
          <label>Tarih *</label>
          <input name="date" type="date" value="{date}" required>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Kategori</label>
          <select name="category">{cat_options}</select>
        </div>
        <div class="field">
          <label>Görsel URL</label>
          <input name="image" value="{image}" placeholder="https://...">
        </div>
      </div>
      <div class="field">
        <label>Özet (kart önizlemesi için)</label>
        <textarea name="excerpt" rows="3">{excerpt}</textarea>
      </div>
      <div class="field">
        <label>İçerik (HTML destekler)</label>
        <textarea name="content">{content}</textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Kaynak URL (Blogger vb.)</label>
          <input name="source_url" value="{source_url}" placeholder="https://...">
        </div>
        <div class="field" style="display:flex;align-items:center;gap:8px;padding-top:24px;">
          <input type="checkbox" name="featured" id="featured" {featured} style="width:auto;">
          <label for="featured" style="margin:0;">Öne çıkar ⭐</label>
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:8px;">
        <button type="submit" class="btn btn-primary">Kaydet</button>
        <a href="/admin" class="btn btn-secondary">İptal</a>
      </div>
    </form>"""

@app.route('/admin/yeni')
def yeni():
    body = f'<h1>Yeni Haber Ekle</h1><div class="card">{item_form(action="/admin/kaydet")}</div>'
    return html_page(body, "Yeni Haber")

@app.route('/admin/kaydet', methods=['POST'])
def kaydet():
    news = load_news()
    title = request.form.get('title', '').strip()
    slug = request.form.get('slug', '').strip() or slugify(title)
    item = {
        'title': title,
        'slug': slug,
        'date': request.form.get('date', ''),
        'category': request.form.get('category', 'haber'),
        'excerpt': request.form.get('excerpt', '').strip(),
        'content': request.form.get('content', '').strip(),
        'image': request.form.get('image', '').strip(),
        'featured': 'featured' in request.form,
        'source_url': request.form.get('source_url', '').strip(),
    }
    idx = request.form.get('idx')
    if idx is not None:
        news[int(idx)] = item
    else:
        news.append(item)
    save_news(news)
    return redirect('/admin?saved=1')

@app.route('/admin/duzenle/<int:idx>')
def duzenle(idx):
    news = load_news()
    item = news[idx]
    body = f'<h1>Düzenle</h1><div class="card">{item_form(item, action="/admin/kaydet", idx=idx)}</div>'
    return html_page(body, "Düzenle")

@app.route('/admin/sil/<int:idx>')
def sil(idx):
    news = load_news()
    del news[idx]
    save_news(news)
    return redirect('/admin')

@app.route('/admin/yayinla')
def yayinla():
    log = []
    try:
        # 1. Build
        result = subprocess.run(
            ['python3', 'build.py', '--base', '/birlikteiyilik-v2'],
            cwd=str(BASE_DIR),
            capture_output=True, text=True, timeout=60
        )
        log.append(result.stdout)
        if result.returncode != 0:
            log.append(f'HATA: {result.stderr}')
            raise Exception("Build hatası")

        # 2. Copy to raufenc.com
        dest = RAUFENC_DIR / 'birlikteiyilik-v2'
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(DIST_DIR, dest)
        log.append(f"dist/ → {dest} kopyalandı")

        # 3. Git push
        GIT = "/Users/raufenc/pinokio/bin/miniconda/bin/git"
        # Token: .admin_token dosyasından veya GITHUB_TOKEN env değişkeninden oku
        token_file = BASE_DIR / '.admin_token'
        TOKEN = token_file.read_text().strip() if token_file.exists() else os.environ.get('GITHUB_TOKEN', '')
        git_env = os.environ.copy()

        subprocess.run([GIT, 'add', 'birlikteiyilik-v2/'], cwd=str(RAUFENC_DIR), env=git_env)
        now_str = datetime.now().strftime('%Y-%m-%d %H:%M')
        commit_result = subprocess.run(
            [GIT, 'commit', '-m', f'BIA v2 güncelleme — {now_str}'],
            cwd=str(RAUFENC_DIR), capture_output=True, text=True, env=git_env
        )
        log.append(commit_result.stdout or commit_result.stderr)

        push_result = subprocess.run(
            [GIT, 'push', f'https://raufenc:{TOKEN}@github.com/raufenc/raufenc.com.git', 'main'],
            cwd=str(RAUFENC_DIR), capture_output=True, text=True, env=git_env
        )
        log.append(push_result.stdout or push_result.stderr)

        log_text = '\n'.join(log)
        body = f"""
        <h1>✅ Yayınlandı!</h1>
        <div class="card">
          <p style="margin-bottom:16px;">Site başarıyla güncellendi ve GitHub'a push edildi. Vercel birkaç dakika içinde canlıya alır.</p>
          <a href="https://raufenc.com/birlikteiyilik-v2/" target="_blank" class="btn btn-primary">Siteyi Gör →</a>
          <pre style="margin-top:20px;background:#f8f8f8;padding:16px;border-radius:6px;font-size:.8rem;overflow:auto;">{log_text}</pre>
        </div>
        <a href="/admin" class="btn btn-secondary" style="margin-top:16px;">← Admin Paneline Dön</a>
        """
    except Exception as e:
        log_text = '\n'.join(log)
        body = f"""
        <h1>❌ Hata</h1>
        <div class="card">
          <p style="color:#dc2626;margin-bottom:16px;">{e}</p>
          <pre style="background:#fef2f2;padding:16px;border-radius:6px;font-size:.8rem;overflow:auto;">{log_text}</pre>
        </div>
        <a href="/admin" class="btn btn-secondary" style="margin-top:16px;">← Geri Dön</a>
        """
    return html_page(body, "Yayınla")

@app.route('/')
def root():
    return redirect('/admin')

if __name__ == '__main__':
    print("BİA Admin Paneli → http://localhost:8086/admin")
    app.run(port=8086, debug=False)
