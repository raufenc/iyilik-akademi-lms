import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ToastProvider } from './components/ui/Toast'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import LessonsPage from './pages/LessonsPage'
import LessonPage from './pages/LessonPage'
import ProfilePage from './pages/ProfilePage'
import LeaderboardPage from './pages/LeaderboardPage'
import ForumPage from './pages/ForumPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminLessons from './pages/admin/AdminLessons'
import AdminReports from './pages/admin/AdminReports'
import ChallengePage from './pages/ChallengePage'
import DailyQuizPage from './pages/DailyQuizPage'
import ParentReportPage from './pages/ParentReportPage'
import ProgressMapPage from './pages/ProgressMapPage'
import PracticeModePage from './pages/PracticeModePage'
import StudyNotesPage from './pages/StudyNotesPage'
import AchievementsPage from './pages/AchievementsPage'
import ShopPage from './pages/ShopPage'
import InstallPrompt from './components/pwa/InstallPrompt'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-text-muted">Yükleniyor...</p></div>
  if (!user) return <Navigate to="/giris" />
  return children
}

function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-text-muted">Yükleniyor...</p></div>
  if (!isAdmin) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Auth pages (no layout) */}
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit" element={<LoginPage />} />

        {/* Main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dersler" element={<LessonsPage />} />
          <Route path="/siralama" element={<LeaderboardPage />} />
          <Route path="/meydan-okuma" element={<ChallengePage />} />

          {/* Protected */}
          <Route path="/panel" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/ders/:id" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
          <Route path="/gunluk-quiz" element={<ProtectedRoute><DailyQuizPage /></ProtectedRoute>} />
          <Route path="/ebeveyn-raporu" element={<ProtectedRoute><ParentReportPage /></ProtectedRoute>} />
          <Route path="/harita" element={<ProtectedRoute><ProgressMapPage /></ProtectedRoute>} />
          <Route path="/tekrar" element={<ProtectedRoute><PracticeModePage /></ProtectedRoute>} />
          <Route path="/notlarim" element={<ProtectedRoute><StudyNotesPage /></ProtectedRoute>} />
          <Route path="/basarilar" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
          <Route path="/magaza" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/kullanicilar" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/dersler" element={<AdminRoute><AdminLessons /></AdminRoute>} />
          <Route path="/admin/raporlar" element={<AdminRoute><AdminReports /></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-text-muted mb-2">404</h1>
              <p className="text-text-muted">Sayfa bulunamadı</p>
            </div>
          } />
        </Route>
      </Routes>
      <InstallPrompt />
    </ToastProvider>
  )
}
