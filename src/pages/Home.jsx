import { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { useNavigate } from 'react-router-dom';
import SurahCard from '../components/Surah/SurahCard';
import SearchModal from '../components/Search/SearchModal';
import SEOHead from '../components/SEO/SEOHead';
import { Sparkles } from 'lucide-react';

export default function Home() {
    const { allSurahs, loading, error } = useQuran();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Structured data for homepage
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "QuranBro",
        "description": "Baca Al-Quran online dengan terjemahan Indonesia. 114 Surah lengkap dengan audio, terjemahan per ayat, dan tampilan modern.",
        "url": window.location.origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${window.location.origin}/surah/{search_term_string}`
            },
            "query-input": "required name=search_term_string"
        },
        "inLanguage": "id-ID",
        "about": {
            "@type": "Thing",
            "name": "Al-Quran",
            "description": "Kitab suci umat Islam"
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin-slow opacity-50"></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Memuat Al-Quran...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-4 text-center p-6 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/50">
                <p className="font-medium">Error: {error}</p>
            </div>
        );
    }

    const filteredSurahs = search
        ? allSurahs.filter(surah =>
            surah.nama_latin.toLowerCase().includes(search.toLowerCase()) ||
            surah.arti.toLowerCase().includes(search.toLowerCase())
        )
        : allSurahs;

    return (
        <>
            <SEOHead
                title="QuranBro - Baca Al-Quran Online Lengkap 114 Surah"
                description="Baca Al-Quran online dengan terjemahan Indonesia. 114 Surah lengkap dengan audio, terjemahan per ayat, dan tampilan modern yang indah."
                keywords="Al-Quran, Quran, Al-Quran Online, Baca Quran, Quran Indonesia, Terjemahan Quran, Quran Digital, Islamic App, Muslim App, 114 Surah"
                canonical={window.location.origin}
                structuredData={structuredData}
            />
            <div className="max-w-4xl mx-auto">
                {/* Hero Section - Desktop */}
                <div className="hidden md:block px-6 py-10 mb-8">
                    <div className="text-center max-w-2xl mx-auto">

                        <h1 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                                QuranBro
                            </span>
                        </h1>

                        {/* Search for desktop */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Cari surat..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#1a1f2e] border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-hidden focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white transition-all shadow-sm hover:shadow-md"
                            />
                            <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Surah List */}
                <div className="md:mx-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700/50 bg-white dark:bg-[#1a1f2e] md:shadow-xl md:shadow-slate-200/50 md:dark:shadow-slate-900/50 overflow-hidden">
                    {filteredSurahs.map(surah => (
                        <SurahCard key={surah.nomor} surah={surah} />
                    ))}
                </div>

                {filteredSurahs.length === 0 && (
                    <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                        <p className="text-lg">Tidak ada surat yang ditemukan</p>
                    </div>
                )}
            </div>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                value={search}
                onChange={setSearch}
                results={filteredSurahs}
                onSelectSurah={(surah) => navigate(`/surah/${surah.nomor}`)}
            />

            {/* Trigger search modal on mobile */}
            <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden fixed bottom-20 right-5 w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center active:scale-95 transition-transform z-30 hover:shadow-blue-500/60"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </button>
        </>
    );
}
