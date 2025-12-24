import { useParams, useNavigate } from 'react-router-dom';
import { useQuran } from '../context/QuranContext';
import { ArrowLeft, Bookmark } from 'lucide-react';
import VerseItem from '../components/Surah/VerseItem';
import SEOHead from '../components/SEO/SEOHead';
import { useState, useEffect, useRef } from 'react';
import { addToHistory } from '../utils/history';

export default function SurahPage() {
    const { nomor } = useParams();
    const navigate = useNavigate();
    const { getSurah, loadSurahVerses } = useQuran();
    const [surahLoading, setSurahLoading] = useState(true);

    const surah = getSurah(nomor);
    const startTime = useRef(Date.now());

    useEffect(() => {
        const fetchVerses = async () => {
            if (nomor) {
                setSurahLoading(true);
                await loadSurahVerses(nomor);
                setSurahLoading(false);
            }
        };
        fetchVerses();
    }, [nomor, loadSurahVerses]);

    useEffect(() => {
        startTime.current = Date.now();

        return () => {
            if (surah) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                addToHistory(surah, duration);
            }
        };
    }, [surah]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [nomor]);

    if (surahLoading) return (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Memuat surat...</p>
        </div>
    );
    if (!surah) return <div className="p-8 text-center text-slate-600 dark:text-slate-400">Surat tidak ditemukan</div>;
    if (!surah.ayat) return <div className="p-8 text-center text-slate-600 dark:text-slate-400">Gagal memuat ayat</div>;

    // SEO - Dynamic data for this surah
    const seoTitle = `Surah ${surah.nama_latin} (${surah.nama}) - ${surah.arti} | QuranBro`;
    const seoDescription = `Baca Surah ${surah.nama_latin} lengkap ${surah.jumlah_ayat} ayat dengan terjemahan Indonesia. Surah ${surah.tempat_turun}, termasuk bagian dari Al-Quran yang mulia.`;
    const seoKeywords = `Surah ${surah.nama_latin}, ${surah.nama}, ${surah.arti}, Quran ${surah.nama_latin}, Al-Quran Surah ${surah.nomor}, Terjemahan ${surah.nama_latin}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Surah ${surah.nama_latin} - ${surah.arti}`,
        "description": seoDescription,
        "inLanguage": "id-ID",
        "articleSection": "Al-Quran",
        "about": {
            "@type": "Thing",
            "name": surah.nama_latin,
            "alternateName": surah.nama,
            "description": surah.arti
        },
        "isPartOf": {
            "@type": "Book",
            "name": "Al-Quran",
            "bookFormat": "https://schema.org/EBook",
            "inLanguage": ["ar", "id"]
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": window.location.origin
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": `Surah ${surah.nama_latin}`,
                    "item": window.location.href
                }
            ]
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-24 md:pb-12">
            <SEOHead
                title={seoTitle}
                description={seoDescription}
                keywords={seoKeywords}
                canonical={window.location.href}
                ogType="article"
                structuredData={structuredData}
            />
            {/* Header */}
            <div className="sticky md:static top-16 md:top-0 z-30 bg-white/95 dark:bg-[#111827]/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b md:border-0 border-slate-200 dark:border-slate-700/40">
                <div className="flex items-center gap-4 p-5 md:py-8 md:px-6">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
                    >
                        <ArrowLeft size={22} className="text-slate-700 dark:text-slate-300" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                            <h1 className="font-bold text-slate-900 dark:text-white text-xl md:text-3xl">
                                {surah.nama_latin}
                            </h1>
                            <span className="font-arabic text-lg md:text-2xl font-normal text-slate-500 dark:text-slate-400">
                                {surah.nama}
                            </span>
                        </div>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                            <span className="font-medium text-blue-600 dark:text-blue-400">{surah.arti}</span>
                            {' · '}
                            {surah.tempat_turun} · {surah.jumlah_ayat} Ayat
                        </p>
                    </div>
                </div>
            </div>

            {/* Bismillah */}
            {parseInt(nomor) !== 9 && (
                <div className="mx-4 md:mx-6 mb-6 md:mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl blur-2xl"></div>
                    <div className="relative text-center py-12 md:py-16 font-arabic text-3xl md:text-4xl text-slate-700 dark:text-slate-300 border border-blue-200/30 dark:border-blue-800/20 rounded-3xl">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </div>
                </div>
            )}

            {/* Verses */}
            <div className="md:mx-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700/50 bg-white dark:bg-[#1a1f2e] md:shadow-xl md:shadow-slate-200/50 md:dark:shadow-slate-900/50 overflow-hidden">
                {surah.ayat.map(verse => (
                    <VerseItem key={verse.id} verse={verse} surahNumber={nomor} />
                ))}
            </div>
        </div>
    );
}
