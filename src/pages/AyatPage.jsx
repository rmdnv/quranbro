import { useParams, useNavigate } from 'react-router-dom';
import { useQuran } from '../context/QuranContext';
import { ArrowLeft } from 'lucide-react';
import VerseItem from '../components/Surah/VerseItem';
import SEOHead from '../components/SEO/SEOHead';
import { useEffect, useState } from 'react';

export default function AyatPage() {
    const { nomor, ayat } = useParams();
    const navigate = useNavigate();
    const { getSurah, loadSurahVerses, loading: globalLoading } = useQuran();
    const [surahLoading, setSurahLoading] = useState(true);

    const surah = getSurah(nomor);
    const verse = surah?.ayat?.find(v => v.nomor_ayat === parseInt(ayat));

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
        window.scrollTo(0, 0);
    }, [nomor, ayat]);

    if (globalLoading || surahLoading) return (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Memuat ayat...</p>
        </div>
    );

    if (!surah) return <div className="p-8 text-center text-slate-600 dark:text-slate-400">Surat tidak ditemukan</div>;
    if (!verse) return <div className="p-8 text-center text-slate-600 dark:text-slate-400">Ayat tidak ditemukan</div>;

    // SEO - Dynamic data for this ayat
    const seoTitle = `QS ${surah.nama_latin} Ayat ${ayat} - Terjemahan & Tafsir | QuranBro`;
    const verseTranslation = verse.terjemahan || '';
    const seoDescription = verseTranslation.length > 155
        ? verseTranslation.substring(0, 155) + '...'
        : verseTranslation;
    const seoKeywords = `QS ${surah.nama_latin} ${ayat}, Surah ${surah.nama_latin}, Ayat ${ayat}, Terjemahan ${surah.nama_latin}, Tafsir Ayat ${ayat}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `QS ${surah.nama_latin} Ayat ${ayat}`,
        "description": seoDescription,
        "inLanguage": ["ar", "id"],
        "articleBody": verse.teks_arab,
        "about": {
            "@type": "Thing",
            "name": `${surah.nama_latin} Ayat ${ayat}`,
            "description": verseTranslation
        },
        "isPartOf": {
            "@type": "Book",
            "name": `Surah ${surah.nama_latin}`,
            "position": ayat,
            "bookFormat": "https://schema.org/EBook"
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
                    "item": `${window.location.origin}/surah/${nomor}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": `Ayat ${ayat}`,
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
                        onClick={() => navigate(`/surah/${nomor}`)}
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
                            <span className="font-medium text-blue-600 dark:text-blue-400">Ayat {ayat}</span>
                            {' · '}
                            {surah.arti}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bismillah for first verse of non-Tawbah surahs */}
            {parseInt(nomor) !== 9 && ayat === '1' && (
                <div className="mx-4 md:mx-6 mb-6 md:mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl blur-2xl"></div>
                    <div className="relative text-center py-12 md:py-16 font-arabic text-3xl md:text-4xl text-slate-700 dark:text-slate-300 border border-blue-200/30 dark:border-blue-800/20 rounded-3xl">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </div>
                </div>
            )}

            {/* Single Verse */}
            <div className="md:mx-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700/50 bg-white dark:bg-[#1a1f2e] md:shadow-xl md:shadow-slate-200/50 md:dark:shadow-slate-900/50 overflow-hidden">
                <VerseItem verse={verse} />
            </div>

            {/* Navigation to other verses */}
            <div className="mx-4 md:mx-6 mt-6 md:mt-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {parseInt(ayat) > 1 && (
                        <button
                            onClick={() => navigate(`/surah/${nomor}/${parseInt(ayat) - 1}`)}
                            className="group flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2 px-6 py-4">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="font-semibold text-sm sm:text-base">Ayat Sebelumnya</span>
                            </div>
                        </button>
                    )}

                    <button
                        onClick={() => navigate(`/surah/${nomor}`)}
                        className="group flex-shrink-0 sm:flex-1 relative overflow-hidden bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                        <div className="relative flex items-center justify-center gap-2 px-6 py-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="font-semibold text-sm sm:text-base">Lihat Semua Ayat</span>
                        </div>
                    </button>

                    {parseInt(ayat) < surah.jumlah_ayat && (
                        <button
                            onClick={() => navigate(`/surah/${nomor}/${parseInt(ayat) + 1}`)}
                            className="group flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2 px-6 py-4">
                                <span className="font-semibold text-sm sm:text-base">Ayat Selanjutnya</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    )}
                </div>

                {/* Verse counter info */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{ayat}</span> dari {surah.jumlah_ayat} ayat
                    </p>
                </div>
            </div>
        </div>
    );
}
