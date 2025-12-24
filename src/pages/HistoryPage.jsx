import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../utils/history';
import { Link } from 'react-router-dom';
import { Trash2, ChevronRight } from 'lucide-react';
import ConfirmModal from '../components/Common/ConfirmModal';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const [showConfirm, setShowConfirm] = useState(false);

    const handleClear = () => {
        clearHistory();
        setHistory([]);
    };

    const formatDuration = (seconds) => {
        if (seconds < 60) return `${seconds} detik`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} menit`;
        const hours = Math.floor(minutes / 60);
        return `${hours} jam ${minutes % 60} menit`;
    };

    const formatDate = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Hari ini';
        if (days === 1) return 'Kemarin';
        if (days < 7) return `${days} hari yang lalu`;

        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-2xl mx-auto pb-24 md:pb-8">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Riwayat</h1>
                {history.length > 0 && (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Belum ada riwayat baca</p>
                    <Link to="/" className="text-slate-900 dark:text-white font-medium">
                        Mulai Membaca →
                    </Link>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                    {history.map((item, index) => (
                        <Link
                            key={index}
                            to={`/surah/${item.surahNomor}`}
                            className="flex items-center gap-3 p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] mb-1">
                                    {item.surahNama}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {formatDate(item.timestamp)} · {formatDuration(item.duration)}
                                </p>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 dark:text-slate-600 shrink-0" />
                        </Link>
                    ))}
                </div>
            )}
            <ConfirmModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleClear}
                title="Hapus Riwayat"
                message="Semua riwayat baca Anda akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
            />
        </div>
    );
}
