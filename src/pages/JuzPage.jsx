import { useQuran } from '../context/QuranContext';
import JuzCard from '../components/Surah/JuzCard';
import SEOHead from '../components/SEO/SEOHead';

export default function JuzPage() {
    const { juzMapping, loading, error } = useQuran();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Memuat Juz...</p>
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

    return (
        <div className="max-w-4xl mx-auto">
            <SEOHead
                title="Daftar Juz Al-Quran Online - QuranBro"
                description="Baca Al-Quran online berdasarkan Juz. Akses cepat ke 30 Juz Al-Quran dengan tampilan modern dan terjemahan Indonesia."
                keywords="Juz Al-Quran, 30 Juz, Baca Al-Quran Juz, Quran Indonesia"
                canonical={window.location.origin + "/juz"}
            />

            <div className="px-6 py-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                    Pilih Juz
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    Akses cepat ke 30 Juz Al-Quran untuk mempermudah rutinitas membaca Anda.
                </p>
            </div>

            <div className="md:mx-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-700/50 bg-white dark:bg-[#1a1f2e] md:shadow-xl md:shadow-slate-200/50 md:dark:shadow-slate-900/50 overflow-hidden mb-12">
                {juzMapping.map(juz => (
                    <JuzCard key={juz.juz} juz={juz} />
                ))}
            </div>
        </div>
    );
}
