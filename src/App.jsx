import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import BottomNav from './components/Layout/BottomNav';

import Home from './pages/Home';
import SurahPage from './pages/SurahPage';
import AyatPage from './pages/AyatPage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';
import JuzPage from './pages/JuzPage';
import JuzDetailPage from './pages/JuzDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white transition-colors duration-300">
        <Header />
        <main className="pb-safe min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surah/:nomor/:ayat" element={<AyatPage />} />
            <Route path="/surah/:nomor" element={<SurahPage />} />
            <Route path="/juz" element={<JuzPage />} />
            <Route path="/juz/:nomor" element={<JuzDetailPage />} />
            <Route path="/riwayat" element={<HistoryPage />} />
            <Route path="/pengaturan" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
