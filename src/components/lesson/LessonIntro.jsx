import Button from '../ui/Button'
import Card from '../ui/Card'
import Icon from '../ui/Icon'

export default function LessonIntro({ lesson, onStart }) {
  const hasRichData = lesson.tema || lesson.kavramlar || lesson.guzelSoz

  if (!hasRichData) {
    onStart()
    return null
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-5">
      {/* Tema */}
      {lesson.tema && (
        <div className="text-center">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            {lesson.tema}
          </span>
        </div>
      )}

      {/* Öğrenme Hedefleri */}
      {lesson.ogrenmeHedefleri && lesson.ogrenmeHedefleri.length > 0 && (
        <Card className="border-secondary/20 bg-secondary/5 dark:bg-secondary/10">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-secondary-dark dark:text-secondary-light">
            <span className="text-lg">🎯</span> Bu Derste Öğreneceklerin
          </h3>
          <ul className="space-y-2">
            {lesson.ogrenmeHedefleri.map((hedef, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-sm text-text dark:text-dark-text">{hedef}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Kavramlar */}
      {lesson.kavramlar && lesson.kavramlar.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Icon name="book" size={20} className="text-primary" /> Öğrenilecek Kavramlar
          </h3>
          <div className="space-y-3">
            {lesson.kavramlar.map((k, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{k.kavram}</p>
                  <p className="text-xs text-text-muted dark:text-dark-text-muted">{k.anlam}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Güzel Söz */}
      {lesson.guzelSoz && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="text-center">
            <span className="mb-2 block">
              <Icon name="scroll" size={28} className="text-primary mx-auto" />
            </span>
            <p className="italic text-text dark:text-dark-text font-medium text-sm leading-relaxed">
              "{lesson.guzelSoz.metin}"
            </p>
            <p className="text-xs text-text-muted dark:text-dark-text-muted mt-2">{lesson.guzelSoz.kaynak}</p>
            {lesson.guzelSoz.aciklama && (
              <p className="text-xs text-text-light dark:text-dark-text-muted mt-3 bg-white/50 dark:bg-dark-card/50 rounded-lg p-2.5 text-left leading-relaxed">
                💡 {lesson.guzelSoz.aciklama}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Giriş Kancası */}
      {lesson.girisKancasi && (
        <Card className="border-accent/30 bg-accent/5 dark:bg-accent/10">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="bulb" size={20} className="text-accent-dark" /> Düşün
          </h3>
          <p className="text-sm font-medium mb-2">{lesson.girisKancasi.soru}</p>
          <p className="text-xs text-text-muted dark:text-dark-text-muted italic">{lesson.girisKancasi.ipucu}</p>
        </Card>
      )}

      {/* Başla Butonu */}
      <div className="text-center pt-2">
        <Button onClick={onStart} size="lg">
          Hazırım, Başlayalım!
        </Button>
      </div>
    </div>
  )
}
