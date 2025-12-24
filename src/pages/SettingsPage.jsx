import { useSettings } from '../context/SettingsContext';
import { Moon, Sun, Monitor, ChevronDown, Check, X, Bell, Type, Layout, Globe, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function SettingsPage() {
    const { settings, updateSettings } = useSettings();
    const [openDropdown, setOpenDropdown] = useState(null); // 'font' | 'arabicSize' | 'latinSize' | 'translationSize'
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Prevent body scroll when bottom sheet is open
    useEffect(() => {
        if (openDropdown) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        };
    }, [openDropdown]);

    const themes = [
        { value: 'light', label: 'Terang', icon: Sun },
        { value: 'dark', label: 'Gelap', icon: Moon },
        { value: 'system', label: 'Sistem', icon: Monitor },
    ];

    const Toggle = ({ value, onChange }) => (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-12 h-6.5 rounded-full transition-all duration-400 ease-out flex items-center px-1 ${value ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
            <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1) ${value ? 'translate-x-[22px]' : 'translate-x-0'}`} />
        </button>
    );

    const CustomSelect = ({ label, value, options, onSelect, type, previewFont, icon: Icon }) => {
        const isOpen = openDropdown === type;
        const selectedOption = options.find(opt => opt.value === value);

        return (
            <div className="w-full">
                <button
                    onClick={() => setOpenDropdown(isOpen ? null : type)}
                    className={`w-full group flex items-center justify-between p-4.5 bg-white dark:bg-slate-900/50 border transition-all duration-300 rounded-2xl ${isOpen ? 'border-blue-500 shadow-sm ring-4 ring-blue-500/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}
                >
                    <div className="flex items-center gap-3.5 min-w-0">
                        {Icon && (
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                <Icon size={18} strokeWidth={2} />
                            </div>
                        )}
                        <div className="flex flex-col items-start min-w-0">
                            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">{label}</span>
                            <span className={`text-slate-700 dark:text-slate-200 font-semibold truncate w-full text-left ${previewFont ? 'text-lg' : 'text-base'}`} style={previewFont ? { fontFamily: previewFont } : {}}>
                                {selectedOption?.displayLabel || selectedOption?.label || value}
                            </span>
                        </div>
                    </div>
                    <ChevronDown size={18} className={`text-slate-300 transition-transform duration-500 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-slate-400'}`} />
                </button>

                {/* Bottom Sheet / Modal Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
                        <div
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                            onClick={() => setOpenDropdown(null)}
                        />

                        <div className="relative w-full max-w-xl bg-white dark:bg-[#111827] rounded-t-3xl md:rounded-3xl shadow-xl animate-slide-up md:animate-scale-in flex flex-col max-h-[80vh] border-t dark:border-slate-800">
                            <div className="md:hidden flex justify-center py-4">
                                <div className="w-10 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                            </div>

                            <div className="px-7 pb-5 pt-1 md:pt-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{label}</h3>
                                <button
                                    onClick={() => setOpenDropdown(null)}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="overflow-y-auto px-3 py-1 hide-scrollbar">
                                <div className="space-y-1 mb-6">
                                    {options.map((option) => {
                                        const isSelected = value === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    onSelect(option.value);
                                                    setOpenDropdown(null);
                                                }}
                                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${isSelected
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                                                    }`}
                                            >
                                                <div className="flex flex-col min-w-0">
                                                    <span className={`text-lg font-semibold tracking-tight ${option.className || ''}`} style={option.style}>{option.label}</span>
                                                </div>
                                                {isSelected && <Check size={18} className="shrink-0 ml-3" strokeWidth={3} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const fontOptions = [
        { value: 'Amiri', label: 'Amiri - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'Amiri', style: { fontFamily: "'Amiri', serif" } },
        { value: 'Scheherazade New', label: 'Scheherazade - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'Scheherazade New', style: { fontFamily: "'Scheherazade New', serif" } },
        { value: 'Lateef', label: 'Lateef - بِسْم. اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'Lateef', style: { fontFamily: "'Lateef', cursive" } },
        { value: 'Noto Naskh Arabic', label: 'Noto Naskh - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'Noto Naskh Arabic', style: { fontFamily: "'Noto Naskh Arabic', serif" } },
        { value: 'IBM Plex Sans Arabic', label: 'IBM Plex - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'IBM Plex Sans Arabic', style: { fontFamily: "'IBM Plex Sans Arabic', sans-serif" } },
        { value: 'Almarai', label: 'Almarai - بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', displayLabel: 'Almarai', style: { fontFamily: "'Almarai', sans-serif" } }
    ];

    const sizeOptions = (min, max, step = 2) => {
        const options = [];
        for (let i = min; i <= max; i += step) {
            options.push({ value: i, label: `${i}px`, displayLabel: `${i}px` });
        }
        return options;
    };

    return (
        <div className="max-w-xl mx-auto px-6 pb-32 pt-8 animate-fade-in">
            <header className="mb-12">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Pengaturan</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Sesuaikan pengalaman membaca Al-Quran Anda.</p>
            </header>

            <div className="space-y-12">
                {/* Tampilan Section */}
                <section>
                    <h2 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 ml-1">Tampilan</h2>
                    <div className="grid grid-cols-3 gap-3.5">
                        {themes.map((theme) => {
                            const isActive = settings.theme === theme.value;
                            return (
                                <button
                                    key={theme.value}
                                    onClick={() => updateSettings('theme', theme.value)}
                                    className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border transition-all duration-300 ${isActive
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900/30'
                                        }`}
                                >
                                    <theme.icon size={22} className="mb-2.5" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">{theme.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Arabic Section */}
                <section className="space-y-6">
                    <h2 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 ml-1">Arabic</h2>
                    <CustomSelect
                        label="Font Arabic"
                        value={settings.arabicFont}
                        options={fontOptions}
                        onSelect={(v) => updateSettings('arabicFont', v)}
                        type="font"
                        icon={Globe}
                        previewFont={fontOptions.find(f => f.value === settings.arabicFont)?.style.fontFamily}
                    />

                    <CustomSelect
                        label="Ukuran Huruf Arabic"
                        value={settings.arabicFontSize}
                        options={sizeOptions(20, 60)}
                        onSelect={(v) => updateSettings('arabicFontSize', v)}
                        type="arabicSize"
                        icon={Type}
                    />

                    <div className="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-blue-500">
                                <span className="text-base font-bold">١</span>
                            </div>
                            <div>
                                <span className="text-[13px] text-slate-800 dark:text-slate-200 font-semibold block leading-tight mb-0.5">Nomor Ayat Arabic</span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Gunakan penomoran asli Arabic</span>
                            </div>
                        </div>
                        <Toggle value={settings.arabicNumbering} onChange={(v) => updateSettings('arabicNumbering', v)} />
                    </div>
                </section>

                {/* Content Section */}
                <section className="space-y-6">
                    <h2 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5 ml-1">Transliterasi & Terjemahan</h2>

                    <div className="space-y-4">
                        {/* Latin */}
                        <div className="p-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-transparent transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400">
                                        <Globe size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[13px] text-slate-800 dark:text-slate-200 font-semibold block leading-tight mb-0.5">Tampilkan Latin</span>
                                        <span className="text-[11px] text-slate-500 font-medium">Transliterasi teks Arabic</span>
                                    </div>
                                </div>
                                <Toggle value={settings.showLatin} onChange={(v) => updateSettings('showLatin', v)} />
                            </div>

                            {settings.showLatin && (
                                <div className="pt-4 border-t border-slate-200/40 dark:border-slate-700/40">
                                    <CustomSelect
                                        label="Ukuran Huruf Latin"
                                        value={settings.latinFontSize}
                                        options={sizeOptions(12, 30)}
                                        onSelect={(v) => updateSettings('latinFontSize', v)}
                                        type="latinSize"
                                        icon={Layout}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Translation */}
                        <div className="p-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-transparent transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400">
                                        <Bell size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[13px] text-slate-800 dark:text-slate-200 font-semibold block leading-tight mb-0.5">Tampilkan Terjemahan</span>
                                        <span className="text-[11px] text-slate-500 font-medium">Bahasa Indonesia</span>
                                    </div>
                                </div>
                                <Toggle value={settings.showTranslation} onChange={(v) => updateSettings('showTranslation', v)} />
                            </div>

                            {settings.showTranslation && (
                                <div className="pt-4 border-t border-slate-200/40 dark:border-slate-700/40">
                                    <CustomSelect
                                        label="Ukuran Huruf Terjemahan"
                                        value={settings.translationFontSize}
                                        options={sizeOptions(12, 30)}
                                        onSelect={(v) => updateSettings('translationFontSize', v)}
                                        type="translationSize"
                                        icon={Layout}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Minimal footer info */}
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800/50 text-center">
                <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">QuranBro v2.0</p>
            </div>
        </div>
    );
}
