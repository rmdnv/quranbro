import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SurahCard({ surah }) {
    return (
        <Link
            to={`/surah/${surah.nomor}`}
            className="group flex items-center gap-4 p-5 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 active:bg-blue-50 dark:active:bg-blue-900/20 transition-all border-b border-slate-100 dark:border-slate-800/50 last:border-0"
        >
            <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative font-bold text-lg bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {surah.nomor}
                </span>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {surah.nama_latin}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {surah.tempat_turun} · {surah.jumlah_ayat} Ayat · {surah.arti}
                </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <span className="font-arabic text-xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {surah.nama}
                </span>
                <ChevronRight size={20} className="text-slate-400 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
        </Link>
    );
}
