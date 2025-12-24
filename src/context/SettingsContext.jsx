import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('quran_settings');
        return saved ? JSON.parse(saved) : {
            arabicFontSize: 28,
            arabicFont: 'Amiri',
            showTajweed: false,
            arabicNumbering: true,
            showLatin: true,
            latinFontSize: 16,
            showTranslation: true,
            translationFontSize: 16,
            theme: 'system'
        };
    });

    useEffect(() => {
        localStorage.setItem('quran_settings', JSON.stringify(settings));

        // Apply theme using class-based approach for Tailwind v4
        const root = window.document.documentElement;

        // Apply Arabic Font
        const fontMap = {
            'Amiri': "'Amiri', serif",
            'Scheherazade New': "'Scheherazade New', serif",
            'Lateef': "'Lateef', cursive",
            'Noto Naskh Arabic': "'Noto Naskh Arabic', serif",
            'IBM Plex Sans Arabic': "'IBM Plex Sans Arabic', sans-serif",
            'Almarai': "'Almarai', sans-serif"
        };
        root.style.setProperty('--font-arabic', fontMap[settings.arabicFont] || "'Amiri', serif");

        if (settings.theme === 'dark') {
            root.classList.add('dark');
        } else if (settings.theme === 'light') {
            root.classList.remove('dark');
        } else {
            // System preference
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', isDark);

            // Listen for system theme changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (e) => root.classList.toggle('dark', e.matches);
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        }
    }, [settings]);

    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
