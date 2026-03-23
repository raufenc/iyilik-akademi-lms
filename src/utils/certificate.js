/**
 * Generate a certificate image using Canvas API
 * Returns a data URL (PNG)
 */
export async function generateCertificate({ name, type = 'completion', date }) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 850
  const ctx = canvas.getContext('2d')

  // Background
  const grad = ctx.createLinearGradient(0, 0, 1200, 850)
  grad.addColorStop(0, '#FFFDF7')
  grad.addColorStop(1, '#FFF8E1')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1200, 850)

  // Gold border
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 6
  ctx.strokeRect(30, 30, 1140, 790)
  ctx.strokeStyle = '#E8C547'
  ctx.lineWidth = 2
  ctx.strokeRect(45, 45, 1110, 760)

  // Corner ornaments (simple gold dots)
  const corners = [[60, 60], [1140, 60], [60, 790], [1140, 790]]
  corners.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fillStyle = '#D4AF37'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#FFFDF7'
    ctx.fill()
  })

  // Title icon
  ctx.font = '60px serif'
  ctx.textAlign = 'center'
  ctx.fillText('🌟', 600, 130)

  // Header
  ctx.font = 'bold 18px Inter, sans-serif'
  ctx.fillStyle = '#6C5CE7'
  ctx.fillText('İYİLİK AKADEMİ', 600, 175)

  // Certificate title
  ctx.font = 'bold 42px Poppins, Inter, sans-serif'
  ctx.fillStyle = '#2D3436'
  ctx.fillText(type === 'halfway' ? 'YARI YOL SERTİFİKASI' : 'MEZUNİYET SERTİFİKASI', 600, 250)

  // Decorative line
  const lineGrad = ctx.createLinearGradient(350, 270, 850, 270)
  lineGrad.addColorStop(0, 'transparent')
  lineGrad.addColorStop(0.2, '#D4AF37')
  lineGrad.addColorStop(0.8, '#D4AF37')
  lineGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(350, 275)
  ctx.lineTo(850, 275)
  ctx.stroke()

  // "Bu belge..." text
  ctx.font = '18px Inter, sans-serif'
  ctx.fillStyle = '#636E72'
  ctx.fillText('Bu belge,', 600, 330)

  // Name
  ctx.font = 'bold 48px Poppins, Inter, sans-serif'
  ctx.fillStyle = '#6C5CE7'
  ctx.fillText(name, 600, 400)

  // Underline for name
  const nameWidth = ctx.measureText(name).width
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(600 - nameWidth / 2 - 20, 415)
  ctx.lineTo(600 + nameWidth / 2 + 20, 415)
  ctx.stroke()

  // Description
  ctx.font = '18px Inter, sans-serif'
  ctx.fillStyle = '#636E72'
  if (type === 'halfway') {
    ctx.fillText("adlı öğrencinin İyilik Akademi'de 20 dersi başarıyla", 600, 470)
    ctx.fillText('tamamladığını onaylar.', 600, 498)
  } else {
    ctx.fillText("adlı öğrencinin İyilik Akademi'nin tüm 40 dersini", 600, 470)
    ctx.fillText('başarıyla tamamlayarak mezun olduğunu onaylar.', 600, 498)
  }

  // Achievement badge
  const badge = type === 'halfway' ? '🎖️' : '🏆'
  ctx.font = '50px serif'
  ctx.fillText(badge, 600, 580)

  // Achievement text
  ctx.font = 'bold 16px Inter, sans-serif'
  ctx.fillStyle = type === 'halfway' ? '#00B894' : '#D4AF37'
  ctx.fillText(
    type === 'halfway' ? 'AZIMLI ÖĞRENCİ' : 'İYİLİK ELÇİSİ',
    600, 620
  )

  // Date
  ctx.font = '16px Inter, sans-serif'
  ctx.fillStyle = '#B2BEC3'
  ctx.fillText(`Tarih: ${date || new Date().toLocaleDateString('tr-TR')}`, 600, 700)

  // Footer
  ctx.font = '13px Inter, sans-serif'
  ctx.fillStyle = '#B2BEC3'
  ctx.fillText('Birlikte İyilik Akademi — Güzel Ahlak Eğitim Platformu', 600, 770)

  return canvas.toDataURL('image/png')
}

export function downloadCertificate(dataUrl, filename = 'iyilik-akademi-sertifika.png') {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
