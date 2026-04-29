import React from 'react';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, BookOpen, Image as ImageIcon, Flag, LogOut, Leaf, ChevronRight, ShieldCheck } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
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
            <aside className="w-[260px] bg-[#0f172a] flex flex-col fixed inset-y-0 z-20">
                {/* Brand */}
                <div className="h-[72px] px-6 flex items-center gap-3 border-b border-white/[0.06]">
                    <div className="w-9 h-9 relative overflow-hidden rounded-lg">
                        <img 
                            src="/gallery/logo.jpeg" 
                            alt="Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-[15px] font-bold text-white leading-tight">Green Thumb</h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin Console</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-5 space-y-1">
                    <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Management</p>
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-white/[0.08] text-white shadow-sm'
                                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'
                                    }`}>
                                    <item.icon className="w-[18px] h-[18px]" />
                                </div>
                                <span className="text-[14px] font-medium flex-1 text-left">{item.label}</span>
                                {isActive && <ChevronRight className="w-4 h-4 text-slate-500" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/[0.06]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium text-[14px] group"
                    >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center">
                            <LogOut className="w-[18px] h-[18px]" />
                        </div>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="h-[72px] bg-white border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-slate-400 font-medium">Admin</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                        <span className="text-[13px] text-slate-700 font-semibold capitalize">{activeTab}</span>
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
