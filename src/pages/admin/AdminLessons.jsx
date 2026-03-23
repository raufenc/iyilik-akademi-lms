import { lessons } from '../../data/lessons'
import Card from '../../components/ui/Card'

export default function AdminLessons() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ders Yönetimi</h1>
        <span className="text-sm text-text-muted">{lessons.length} ders</span>
      </div>

      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt">
              <th className="text-left px-4 py-3 font-medium text-text-muted">ID</th>
              <th className="text-left px-4 py-3 font-medium text-text-muted">Ders</th>
              <th className="text-left px-4 py-3 font-medium text-text-muted">Alt Başlık</th>
              <th className="text-center px-4 py-3 font-medium text-text-muted">Ön Quiz</th>
              <th className="text-center px-4 py-3 font-medium text-text-muted">Son Quiz</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {lessons.map(l => (
              <tr key={l.id} className="hover:bg-surface-alt/50">
                <td className="px-4 py-3 text-text-muted">{l.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{l.icon}</span>
                    <span className="font-medium">{l.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-muted">{l.subtitle}</td>
                <td className="px-4 py-3 text-center">{l.preQuiz.length} soru</td>
                <td className="px-4 py-3 text-center">{l.postQuiz.length} soru</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
