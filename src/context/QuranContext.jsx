import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { juzMapping } from '../data/juz-data';
import { surahInfo } from '../data/surah-info';

const QuranContext = createContext();

export const useQuran = () => useContext(QuranContext);

export const QuranProvider = ({ children }) => {
    const [allSurahs, setAllSurahs] = useState(surahInfo);
    const [surahCache, setSurahCache] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadSurahVerses = useCallback(async (number) => {
        const surahNumber = parseInt(number);
        if (surahCache[surahNumber]) return surahCache[surahNumber];

        try {
            const { verses } = await import(`../data/surahs/${surahNumber}.js`);
            setSurahCache(prev => ({ ...prev, [surahNumber]: verses }));
            return verses;
        } catch (err) {
            console.error(`Error loading verses for surah ${surahNumber}:`, err);
            return null;
        }
    }, [surahCache]);

    const getSurah = (number) => {
        const surah = allSurahs.find(s => s.nomor === parseInt(number));
        if (!surah) return null;
        return {
            ...surah,
            ayat: surahCache[surah.nomor] || null
        };
    };

    const getJuz = (number) => {
        return juzMapping.find(j => j.juz === parseInt(number));
    };

    const getVersesByJuz = (juzNumber) => {
        const juz = getJuz(juzNumber);
        if (!juz) return [];

        let verses = [];
        let allAvailable = true;

        for (let sNomor = juz.start.surah; sNomor <= juz.end.surah; sNomor++) {
            const surah = getSurah(sNomor);
            if (!surah || !surah.ayat) {
                allAvailable = false;
                continue;
            }

            let startIdx = 0;
            let endIdx = surah.ayat.length;

            if (sNomor === juz.start.surah) {
                startIdx = juz.start.ayat - 1;
            }
            if (sNomor === juz.end.surah) {
                endIdx = juz.end.ayat;
            }

            const surahVerses = surah.ayat.slice(startIdx, endIdx).map(v => ({
                ...v,
                surahNomor: sNomor,
                surahName: surah.nama_latin
            }));
            verses = [...verses, ...surahVerses];
        }
        return allAvailable ? verses : null;
    };

    const loadJuzVerses = useCallback(async (juzNumber) => {
        const juz = getJuz(juzNumber);
        if (!juz) return;

        const promises = [];
        for (let sNomor = juz.start.surah; sNomor <= juz.end.surah; sNomor++) {
            if (!surahCache[sNomor]) {
                promises.push(loadSurahVerses(sNomor));
            }
        }
        await Promise.all(promises);
    }, [getJuz, loadSurahVerses, surahCache]);

    return (
        <QuranContext.Provider value={{
            allSurahs,
            getSurah,
            getJuz,
            getVersesByJuz,
            loadSurahVerses,
            loadJuzVerses,
            juzMapping,
            loading,
            error
        }}>
            {children}
        </QuranContext.Provider>
    );
};

