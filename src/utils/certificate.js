/**
 * Enhanced Certificate Generator with Islamic Geometric Patterns
 * Generates high-quality PNG certificates using Canvas API (2x resolution for print)
 */

const SCALE = 2 // 2x resolution for printing
const W = 1200
const H = 850
const CW = W * SCALE
const CH = H * SCALE

/**
 * Draw Islamic geometric pattern border
 */
function drawIslamicBorder(ctx) {
  ctx.save()
  const s = SCALE
  const borderWidth = 35 * s
  const margin = 20 * s

  // Outer gold frame
  ctx.strokeStyle = '#C9A84C'
  ctx.lineWidth = 4 * s
  ctx.strokeRect(margin, margin, CW - margin * 2, CH - margin * 2)

  // Inner gold frame
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 2 * s
  ctx.strokeRect(margin + borderWidth, margin + borderWidth, CW - (margin + borderWidth) * 2, CH - (margin + borderWidth) * 2)

  // Draw geometric pattern between frames
  const patternColor = '#D4AF37'
  const patternAlpha = 0.5

  ctx.strokeStyle = patternColor
  ctx.lineWidth = 1.5 * s
  ctx.globalAlpha = patternAlpha

  // Top border pattern
  drawPatternStrip(ctx, margin + 4 * s, margin + 4 * s, CW - margin * 2 - 8 * s, borderWidth - 8 * s, 'horizontal')
  // Bottom border pattern
  drawPatternStrip(ctx, margin + 4 * s, CH - margin - borderWidth + 4 * s, CW - margin * 2 - 8 * s, borderWidth - 8 * s, 'horizontal')
  // Left border pattern
  drawPatternStrip(ctx, margin + 4 * s, margin + borderWidth, borderWidth - 8 * s, CH - margin * 2 - borderWidth * 2, 'vertical')
  // Right border pattern
  drawPatternStrip(ctx, CW - margin - borderWidth + 4 * s, margin + borderWidth, borderWidth - 8 * s, CH - margin * 2 - borderWidth * 2, 'vertical')

  ctx.globalAlpha = 1

  // Corner ornaments - 8-pointed stars
  const corners = [
    [margin + borderWidth / 2, margin + borderWidth / 2],
    [CW - margin - borderWidth / 2, margin + borderWidth / 2],
    [margin + borderWidth / 2, CH - margin - borderWidth / 2],
    [CW - margin - borderWidth / 2, CH - margin - borderWidth / 2],
  ]

  corners.forEach(([cx, cy]) => {
    drawEightPointStar(ctx, cx, cy, 18 * s, '#D4AF37', '#C9A84C')
  })

  ctx.restore()
}

/**
 * Draw a strip of Islamic geometric pattern (interlocking diamonds/hexagons)
 */
function drawPatternStrip(ctx, x, y, w, h, direction) {
  const s = SCALE
  const cellSize = 24 * s

  if (direction === 'horizontal') {
    const count = Math.floor(w / cellSize)
    const startX = x + (w - count * cellSize) / 2
    for (let i = 0; i < count; i++) {
      const cx = startX + i * cellSize + cellSize / 2
      const cy = y + h / 2
      drawDiamondCell(ctx, cx, cy, cellSize * 0.4)
    }
  } else {
    const count = Math.floor(h / cellSize)
    const startY = y + (h - count * cellSize) / 2
    for (let i = 0; i < count; i++) {
      const cx = x + w / 2
      const cy = startY + i * cellSize + cellSize / 2
      drawDiamondCell(ctx, cx, cy, cellSize * 0.4)
    }
  }
}

function drawDiamondCell(ctx, cx, cy, size) {
  // Diamond shape
  ctx.beginPath()
  ctx.moveTo(cx, cy - size)
  ctx.lineTo(cx + size, cy)
  ctx.lineTo(cx, cy + size)
  ctx.lineTo(cx - size, cy)
  ctx.closePath()
  ctx.stroke()

  // Inner diamond
  const inner = size * 0.5
  ctx.beginPath()
  ctx.moveTo(cx, cy - inner)
  ctx.lineTo(cx + inner, cy)
  ctx.lineTo(cx, cy + inner)
  ctx.lineTo(cx - inner, cy)
  ctx.closePath()
  ctx.stroke()
}

/**
 * Draw an 8-pointed star (classic Islamic motif)
 */
function drawEightPointStar(ctx, cx, cy, r, fillColor, strokeColor) {
  ctx.save()
  ctx.globalAlpha = 0.9

  // Two overlapping squares rotated 45 degrees
  for (let rotation = 0; rotation < 2; rotation++) {
    ctx.beginPath()
    const angle = (rotation * Math.PI) / 4
    for (let i = 0; i < 4; i++) {
      const a = angle + (i * Math.PI) / 2
      const x = cx + r * Math.cos(a)
      const y = cy + r * Math.sin(a)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 1.5 * SCALE
    ctx.stroke()
  }

  // Center circle
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2)
  ctx.fillStyle = '#FFFDF7'
  ctx.fill()

  ctx.restore()
}

/**
 * Draw decorative seal/stamp
 */
function drawSeal(ctx, cx, cy, r) {
  const s = SCALE
  ctx.save()

  // Outer ring
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 3 * s
  ctx.stroke()

  // Scalloped edge
  const points = 24
  ctx.beginPath()
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2
    const scallop = r + Math.sin(i * 6) * 4 * s
    const x = cx + scallop * Math.cos(angle)
    const y = cy + scallop * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = '#C9A84C'
  ctx.lineWidth = 1.5 * s
  ctx.stroke()

  // Inner ring
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2)
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 1.5 * s
  ctx.stroke()

  // Star in center
  drawEightPointStar(ctx, cx, cy, r * 0.5, '#D4AF3720', '#D4AF37')

  // Text around the seal
  ctx.font = `bold ${9 * s}px Inter, sans-serif`
  ctx.fillStyle = '#C9A84C'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const text = 'IYILIK AKADEMI'
  const textRadius = r * 0.87
  const startAngle = -Math.PI / 2 - (text.length * 0.07)
  for (let i = 0; i < text.length; i++) {
    const angle = startAngle + i * 0.14
    const x = cx + textRadius * Math.cos(angle)
    const y = cy + textRadius * Math.sin(angle)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle + Math.PI / 2)
    ctx.fillText(text[i], 0, 0)
    ctx.restore()
  }

  ctx.restore()
}

/**
 * Draw a decorative QR code placeholder
 */
function drawQRPlaceholder(ctx, x, y, size) {
  const s = SCALE
  ctx.save()

  ctx.strokeStyle = '#D4AF3780'
  ctx.lineWidth = 1.5 * s
  ctx.strokeRect(x, y, size, size)

  // QR-style pattern (decorative)
  const cellSize = size / 7
  const pattern = [
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,0,0],
    [1,0,1,0,0,1,0],
    [1,1,1,0,1,0,1],
  ]

  ctx.fillStyle = '#D4AF3740'
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      if (pattern[row][col]) {
        ctx.fillRect(x + col * cellSize + 1, y + row * cellSize + 1, cellSize - 2, cellSize - 2)
      }
    }
  }

  ctx.restore()
}

/**
 * Generate a certificate image using Canvas API
 * Returns a data URL (PNG) at 2x resolution
 */
export async function generateCertificate({ name, completedLessons = 0, type = 'completion', date }) {
  const canvas = document.createElement('canvas')
  canvas.width = CW
  canvas.height = CH
  const ctx = canvas.getContext('2d')
  const s = SCALE

  // Background gradient (subtle purple-to-gold)
  const grad = ctx.createLinearGradient(0, 0, CW, CH)
  grad.addColorStop(0, '#FFFDF7')
  grad.addColorStop(0.3, '#FEFCF0')
  grad.addColorStop(0.7, '#FFF8E1')
  grad.addColorStop(1, '#FDF6E3')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CW, CH)

  // Subtle radial glow in center
  const radGrad = ctx.createRadialGradient(CW / 2, CH * 0.4, 0, CW / 2, CH * 0.4, CW * 0.5)
  radGrad.addColorStop(0, 'rgba(108, 92, 231, 0.03)')
  radGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = radGrad
  ctx.fillRect(0, 0, CW, CH)

  // Islamic geometric border
  drawIslamicBorder(ctx)

  // Header star icon
  ctx.font = `${60 * s}px serif`
  ctx.textAlign = 'center'
  ctx.fillText('🌟', CW / 2, 130 * s)

  // "IYILIK AKADEMISI" header
  ctx.font = `bold ${20 * s}px Inter, sans-serif`
  ctx.fillStyle = '#6C5CE7'
  ctx.letterSpacing = `${4 * s}px`
  ctx.fillText('I Y I L I K   A K A D E M I S I', CW / 2, 178 * s)
  ctx.letterSpacing = '0px'

  // Certificate title
  const titleText = type === 'halfway' ? 'YARI YOL SERTIFIKASI' : 'MEZUNIYET SERTIFIKASI'
  ctx.font = `bold ${42 * s}px Poppins, Inter, sans-serif`
  ctx.fillStyle = '#2D3436'
  ctx.fillText(titleText, CW / 2, 250 * s)

  // Decorative line with gradient
  const lineGrad = ctx.createLinearGradient(300 * s, 0, 900 * s, 0)
  lineGrad.addColorStop(0, 'transparent')
  lineGrad.addColorStop(0.15, '#D4AF37')
  lineGrad.addColorStop(0.5, '#E8C547')
  lineGrad.addColorStop(0.85, '#D4AF37')
  lineGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 2 * s
  ctx.beginPath()
  ctx.moveTo(300 * s, 275 * s)
  ctx.lineTo(900 * s, 275 * s)
  ctx.stroke()

  // Small diamonds on the line
  const lineDiamonds = [400, 600, 800]
  lineDiamonds.forEach(dx => {
    drawDiamondCell(ctx, dx * s, 275 * s, 5 * s)
  })

  // "Bu sertifika..." text
  ctx.font = `${18 * s}px Inter, sans-serif`
  ctx.fillStyle = '#636E72'
  ctx.fillText('Bu sertifika,', CW / 2, 330 * s)

  // Student name (large, calligraphy-style)
  ctx.font = `bold ${52 * s}px Poppins, Inter, sans-serif`
  ctx.fillStyle = '#6C5CE7'

  // Shadow for name
  ctx.save()
  ctx.shadowColor = 'rgba(108, 92, 231, 0.15)'
  ctx.shadowBlur = 10 * s
  ctx.shadowOffsetY = 3 * s
  ctx.fillText(name, CW / 2, 400 * s)
  ctx.restore()

  // Gold underline for name
  const nameWidth = ctx.measureText(name).width
  const ulGrad = ctx.createLinearGradient(CW / 2 - nameWidth / 2 - 30 * s, 0, CW / 2 + nameWidth / 2 + 30 * s, 0)
  ulGrad.addColorStop(0, 'transparent')
  ulGrad.addColorStop(0.1, '#D4AF37')
  ulGrad.addColorStop(0.9, '#D4AF37')
  ulGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = ulGrad
  ctx.lineWidth = 2 * s
  ctx.beginPath()
  ctx.moveTo(CW / 2 - nameWidth / 2 - 30 * s, 418 * s)
  ctx.lineTo(CW / 2 + nameWidth / 2 + 30 * s, 418 * s)
  ctx.stroke()

  // Description text
  ctx.font = `${18 * s}px Inter, sans-serif`
  ctx.fillStyle = '#636E72'

  const lessonCount = type === 'halfway' ? 20 : 40
  const actualCount = completedLessons || lessonCount
  ctx.fillText(
    `adli ogrencinin İyilik Akademi'de ${actualCount} dersi başarıyla`,
    CW / 2,
    470 * s
  )
  ctx.fillText(
    type === 'halfway' ? 'tamamladığını onaylar.' : 'tamamlayarak mezun oldugunu onaylar.',
    CW / 2,
    498 * s
  )

  // Achievement badge area
  const badge = type === 'halfway' ? '🎖️' : '🏆'
  ctx.font = `${50 * s}px serif`
  ctx.fillText(badge, CW / 2, 575 * s)

  // Achievement text
  ctx.font = `bold ${16 * s}px Inter, sans-serif`
  ctx.fillStyle = type === 'halfway' ? '#00B894' : '#D4AF37'
  ctx.fillText(
    type === 'halfway' ? 'AZIMLI OGRENCI' : 'IYILIK ELCISI',
    CW / 2,
    615 * s
  )

  // Date
  ctx.font = `${15 * s}px Inter, sans-serif`
  ctx.fillStyle = '#9CA3AF'
  ctx.fillText(`Tarih: ${date || new Date().toLocaleDateString('tr-TR')}`, CW / 2, 675 * s)

  // Decorative seal (bottom-right)
  drawSeal(ctx, CW - 180 * s, CH - 170 * s, 55 * s)

  // QR placeholder (bottom-left)
  drawQRPlaceholder(ctx, 100 * s, CH - 210 * s, 80 * s)

  // Footer
  ctx.font = `${13 * s}px Inter, sans-serif`
  ctx.fillStyle = '#B2BEC3'
  ctx.fillText('Birlikte İyilik Akademi — Güzel Ahlak Eğitim Platformu', CW / 2, CH - 65 * s)

  return canvas.toDataURL('image/png', 1.0)
}

/**
 * Download certificate as PNG
 */
export function downloadCertificate(dataUrl, filename = 'iyilik-akademi-sertifika.png') {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

/**
 * Share certificate via Web Share API or WhatsApp
 */
export async function shareCertificate(dataUrl, name, type = 'completion') {
  const title = type === 'halfway'
    ? `${name} - İyilik Akademi Yari Yol Sertifikasi`
    : `${name} - İyilik Akademi Mezuniyet Sertifikasi`

  const text = type === 'halfway'
    ? `${name}, İyilik Akademi'de 20 dersi başarıyla tamamladi! 🌟`
    : `${name}, İyilik Akademi'nin tum 40 dersini basariyla tamamlayarak mezun oldu! 🏆`

  // Try Web Share API first (supports file sharing)
  if (navigator.share && navigator.canShare) {
    try {
      // Convert dataUrl to blob for sharing
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const file = new File([blob], 'sertifika.png', { type: 'image/png' })

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title,
          text,
          files: [file],
        })
        return true
      }
    } catch (e) {
      if (e.name === 'AbortError') return false
      // Fall through to WhatsApp
    }
  }

  // Fallback: WhatsApp share link (text only)
  const waText = encodeURIComponent(text + '\n\nhttps://iyilikakademi.com')
  window.open(`https://wa.me/?text=${waText}`, '_blank')
  return true
}

/**
 * Share via WhatsApp directly
 */
export function shareViaWhatsApp(name, type = 'completion') {
  const text = type === 'halfway'
    ? `${name}, İyilik Akademi'de 20 dersi başarıyla tamamladi! 🌟\n\nSen de katil: https://iyilikakademi.com`
    : `${name}, İyilik Akademi'nin tum 40 dersini basariyla tamamlayarak mezun oldu! 🏆\n\nSen de katil: https://iyilikakademi.com`

  const waText = encodeURIComponent(text)
  window.open(`https://wa.me/?text=${waText}`, '_blank')
}
