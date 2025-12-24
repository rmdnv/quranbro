import { X, Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SearchModal({ isOpen, onClose, value, onChange, results, onSelectSurah }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 md:hidden">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X size={22} className="text-slate-700 dark:text-slate-300" />
                    </button>
                    <div className="flex-1 relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Cari surat..."
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {results.map(surah => (
                        <button
                            key={surah.nomor}
                            onClick={() => {
                                onSelectSurah(surah);
                                onClose();
                            }}
                            className="w-full flex items-center gap-3 p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors text-left"
                        >
                            <div className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-900 dark:text-white font-semibold text-sm shrink-0">
                                {surah.nomor}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-white text-sm">
                                    {surah.nama_latin}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {surah.tempat_turun} · {surah.jumlah_ayat} Ayat
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
