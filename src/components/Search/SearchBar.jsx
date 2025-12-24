import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Cari Surat..." }) {
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl focus:outline-hidden focus:border-sky-400 dark:focus:border-sky-600 focus:ring-4 focus:ring-sky-500/10 dark:focus:ring-sky-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200"
            />
        </div>
    );
}
