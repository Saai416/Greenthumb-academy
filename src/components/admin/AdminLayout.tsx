import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, BookOpen, Image as ImageIcon, Flag, LogOut, Leaf, ChevronRight, ShieldCheck, Menu } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'programs', label: 'Courses', icon: BookOpen },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'banners', label: 'Announcements', icon: Flag },
        { id: 'health', label: 'System Health', icon: ShieldCheck },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f9fb] w-full font-sans">
            {/* Sidebar */}
            <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[260px]'} bg-[#0f172a] flex flex-col fixed inset-y-0 z-20 transition-all duration-300 ease-in-out`}>
                {/* Brand */}
                <div className="h-[72px] px-4 flex items-center gap-3 border-b border-white/[0.06] overflow-hidden whitespace-nowrap">
                    <div className="w-9 h-9 relative overflow-hidden rounded-lg flex-shrink-0">
                        <img 
                            src="/gallery/logo.jpeg" 
                            alt="Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className={`${isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-300 origin-left`}>
                        <h1 className="text-[15px] font-bold text-white leading-tight">Green Thumb</h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin Console</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-5 space-y-1 overflow-hidden">
                    <p className={`px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                        Management
                    </p>
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                                    ? 'bg-white/[0.08] text-white shadow-sm'
                                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'
                                    }`}>
                                    <item.icon className="w-[18px] h-[18px]" />
                                </div>
                                <span className={`text-[14px] font-medium flex-1 text-left transition-all duration-300 ${isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                                    {item.label}
                                </span>
                                {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-slate-500" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/[0.06] overflow-hidden">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-2 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium text-[14px] group"
                    >
                        <div className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center">
                            <LogOut className="w-[18px] h-[18px]" />
                        </div>
                        <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 ${isCollapsed ? 'ml-[72px]' : 'ml-[260px]'} flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
                {/* Top Bar */}
                <header className="h-[72px] bg-white border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] text-slate-400 font-medium">Admin</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                            <span className="text-[13px] text-slate-700 font-semibold capitalize">{activeTab}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="text-[13px] text-slate-500 hover:text-emerald-600 font-medium transition-colors px-3 py-1.5 rounded-md hover:bg-emerald-50"
                        >
                            View Site ↗
                        </a>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
                            A
                        </div>
                    </div>
                </header>

                <main className="p-8 max-w-[1400px] w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
