import { useParams, useNavigate } from 'react-router-dom';
import { useQuran } from '../context/QuranContext';
import { ArrowLeft } from 'lucide-react';
import VerseItem from '../components/Surah/VerseItem';
import SEOHead from '../components/SEO/SEOHead';
import { useEffect, useState } from 'react';

export default function JuzDetailPage() {
    const { nomor } = useParams();
    const navigate = useNavigate();
    const { getJuz, getVersesByJuz, loadJuzVerses, loading: globalLoading, error } = useQuran();
    const [juzLoading, setJuzLoading] = useState(true);

    const juz = getJuz(nomor);
    const verses = getVersesByJuz(nomor);

    useEffect(() => {
        const fetchJuz = async () => {
            if (nomor) {
                setJuzLoading(true);
                await loadJuzVerses(nomor);
                setJuzLoading(false);
            }
        };
        fetchJuz();
    }, [nomor, loadJuzVerses]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [nomor]);

    if (globalLoading || juzLoading) return (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
            <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Memuat Juz...</p>
        </div>
    );

    if (error) return (
        <div className="m-4 text-center p-6 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50">
            <p className="font-medium">Error: {error}</p>
        </div>
    );

    if (!juz) return <div className="p-8 text-center text-slate-600 dark:text-slate-400">Juz tidak ditemukan</div>;

    return (
        <div className="max-w-4xl mx-auto pb-24 md:pb-12">
            <SEOHead
                title={`Juz ${juz.juz} (${juz.name}) Al-Quran - QuranBro`}
                description={`Baca Al-Quran Juz ${juz.juz} lengkap dengan terjemahan Indonesia. Mulai dari Surah ${juz.start.surah} ayat ${juz.start.ayat}.`}
                canonical={window.location.href}
            />

            <div className="sticky md:static top-16 md:top-0 z-30 bg-white/95 dark:bg-[#111827]/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b md:border-0 border-slate-200 dark:border-slate-700/40">
                <div className="flex items-center gap-4 p-5 md:py-8 md:px-6">
                    <button
                        onClick={() => navigate('/juz')}
                        className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
                    >
                        <ArrowLeft size={22} className="text-slate-700 dark:text-slate-300" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                            <h1 className="font-bold text-slate-900 dark:text-white text-xl md:text-3xl">
                                Juz {juz.juz}
                            </h1>
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-lg md:text-xl">
                                {juz.name}
                            </span>
                        </div>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                            Surah {juz.start.surah}:{juz.start.ayat} — {juz.end.surah}:{juz.end.ayat}
                        </p>
                    </div>
                </div>
            </div>

            <div className="md:mx-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700/50 bg-white dark:bg-[#1a1f2e] md:shadow-xl md:shadow-slate-200/50 md:dark:shadow-slate-900/50 overflow-hidden">
                {verses.map((verse, index) => {
                    const showSurahHeader = index === 0 || verses[index - 1].surahNomor !== verse.surahNomor;

                    return (
                        <div key={`${verse.surahNomor}-${verse.nomor_ayat}`}>
                            {showSurahHeader && (
                                <div className="bg-slate-50 dark:bg-slate-800/20 px-6 py-4 border-y border-slate-100 dark:border-slate-800/50 first:border-t-0 flex items-center justify-between">
                                    <h2 className="font-bold text-base text-slate-800 dark:text-slate-200">
                                        Surah {verse.surahName}
                                    </h2>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                                        Surat ke-{verse.surahNomor}
                                    </span>
                                </div>
                            )}
                            <VerseItem verse={verse} surahNumber={verse.surahNomor} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
