import { Link, useLocation } from 'react-router-dom';
import { BookOpen, History, Settings, Home } from 'lucide-react';

export default function Header() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/juz', label: 'Juz', icon: BookOpen },
        { path: '/riwayat', label: 'Riwayat', icon: History },
        { path: '/pengaturan', label: 'Pengaturan', icon: Settings },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1a1f2e]/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/40 shadow-sm">
            <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
                        <BookOpen className="text-white" size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                        QuranBro
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all text-sm ${isActive(item.path)
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            <item.icon size={18} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
