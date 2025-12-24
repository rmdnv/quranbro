import { Link, useLocation } from 'react-router-dom';
import { BookOpen, History, Settings, Home } from 'lucide-react';

export default function Sidebar() {
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
        <aside className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:bottom-0 md:w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
            <div className="p-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="text-white" size={22} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">Al-Quran</span>
                </Link>
            </div>

            <nav className="flex-1 px-3">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-xl font-medium transition-all ${isActive(item.path)
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    © 2025 Al-Quran Digital
                </div>
            </div>
        </aside>
    );
}
