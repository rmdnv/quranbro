import { Link, useLocation } from 'react-router-dom';
import { BookOpen, History, Settings, Home } from 'lucide-react';

export default function BottomNav() {
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/40 shadow-2xl">
            <div className="flex items-center justify-around px-3 py-3 safe-bottom">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all active:scale-95 ${isActive(item.path) ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30' : ''
                            }`}
                    >
                        <item.icon
                            size={22}
                            className={`transition-colors ${isActive(item.path)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-500 dark:text-slate-400'
                                }`}
                            strokeWidth={isActive(item.path) ? 2.5 : 2}
                        />
                        <span className={`text-[11px] font-medium transition-colors ${isActive(item.path)
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
