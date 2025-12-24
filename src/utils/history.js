import { useRef, useEffect } from 'react';

export const addToHistory = (surah, durationSeconds) => {
    if (durationSeconds < 5) return; // Don't save if less than 5 seconds

    const history = JSON.parse(localStorage.getItem('quran_history') || '[]');

    const newEntry = {
        surahNomor: surah.nomor,
        surahNama: surah.nama_latin,
        timestamp: Date.now(),
        duration: durationSeconds
    };

    // Add to beginning, limit to last 50
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    localStorage.setItem('quran_history', JSON.stringify(updatedHistory));
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('quran_history') || '[]');
};

export const clearHistory = () => {
    localStorage.removeItem('quran_history');
};
