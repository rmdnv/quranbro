import { useSettings } from '../../context/SettingsContext';
import { useNavigate } from 'react-router-dom';

export default function VerseItem({ verse, surahNumber }) {
    const { settings } = useSettings();
    const navigate = useNavigate();

    const handleClick = () => {
        if (surahNumber) {
            navigate(`/surah/${surahNumber}/${verse.nomor_ayat}`);
        }
    };

    return (
        <div
            id={`ayat-${verse.nomor_ayat}`}
            className={`py-6 px-4 border-b border-slate-100 dark:border-slate-800 last:border-0 ${surahNumber ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors' : ''}`}
            onClick={handleClick}
        >
            <div className="flex items-start gap-3 mb-5">
                <div className="flex items-center justify-center w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-900 dark:text-white font-semibold text-xs shrink-0">
                    {settings.arabicNumbering ? verse.nomor_ayat.toLocaleString('ar-EG') : verse.nomor_ayat}
                </div>
            </div>

            <div className="space-y-5">
                <p
                    className="font-arabic text-slate-900 dark:text-white leading-loose text-right"
                    style={{ fontSize: `${settings.arabicFontSize}px` }}
                >
                    {verse.teks_arab}
                </p>

                <div className="space-y-3">
                    {settings.showLatin && (
                        <p
                            className="text-slate-600 dark:text-slate-400 italic leading-relaxed"
                            style={{ fontSize: `${settings.latinFontSize}px` }}
                        >
                            {verse.teks_latin}
                        </p>
                    )}

                    {settings.showTranslation && (
                        <p
                            className="text-slate-700 dark:text-slate-300 leading-relaxed"
                            style={{ fontSize: `${settings.translationFontSize}px` }}
                        >
                            {verse.teks_indonesia}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
