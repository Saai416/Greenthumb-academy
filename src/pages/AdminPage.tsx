import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Loader2, BookOpen, Image as ImageIcon, Flag, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Toaster } from 'sonner';

import { ProgramsManager } from '../components/admin/ProgramsManager';
import { GalleryManager } from '../components/admin/GalleryManager';
import { BannerManager } from '../components/admin/BannerManager';
import { SupabaseDiagnostics } from '../components/admin/SupabaseDiagnostics';

export function AdminPage() {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ programs: 0, gallery: 0, banners: 0 });

    useEffect(() => {
        if (user) {
            const fetchStats = async () => {
                const { count: pCount } = await supabase.from('programs').select('*', { count: 'exact', head: true });
                const { count: gCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
                const { count: bCount } = await supabase.from('banners').select('*', { count: 'exact', head: true });
                setStats({
                    programs: pCount || 0,
                    gallery: gCount || 0,
                    banners: bCount || 0
                });
            };
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (!user) {
        return <AdminLogin />;
    }

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <Toaster position="top-right" richColors closeButton />
            {activeTab === 'dashboard' && (
                <div className="space-y-8">
                    {/* Welcome */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
                        <p className="text-slate-500 text-[15px] mt-1">Overview of your academy's content and assets.</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <StatCard
                            title="Published Courses"
                            count={stats.programs}
                            icon={<BookOpen className="w-5 h-5" />}
                            color="bg-blue-500"
                            onClick={() => setActiveTab('programs')}
                        />
                        <StatCard
                            title="Gallery Photos"
                            count={stats.gallery}
                            icon={<ImageIcon className="w-5 h-5" />}
                            color="bg-emerald-500"
                            onClick={() => setActiveTab('gallery')}
                        />
                        <StatCard
                            title="Announcements"
                            count={stats.banners}
                            icon={<Flag className="w-5 h-5" />}
                            color="bg-amber-500"
                            onClick={() => setActiveTab('banners')}
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ActionCard
                                title="Add New Course"
                                description="Publish a new program"
                                onClick={() => setActiveTab('programs')}
                            />
                            <ActionCard
                                title="Upload Photos"
                                description="Add to your gallery"
                                onClick={() => setActiveTab('gallery')}
                            />
                            <ActionCard
                                title="Manage Banners"
                                description="Update hero announcements"
                                onClick={() => setActiveTab('banners')}
                            />
                            <ActionCard
                                title="System Health"
                                description="Verify Supabase status"
                                onClick={() => setActiveTab('health')}
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'programs' && <ProgramsManager />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'banners' && <BannerManager />}
            {activeTab === 'health' && (
                <div className="max-w-2xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">System Health</h2>
                        <p className="text-slate-500 text-[15px] mt-1">Diagnostic tools to verify your cloud integration status.</p>
                    </div>
                    <SupabaseDiagnostics />
                </div>
            )}
        </AdminLayout>
    );
}

function StatCard({ title, count, icon, color, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${color} text-white flex items-center justify-center shadow-lg shadow-${color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
            <p className="text-[13px] font-semibold text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
        </button>
    );
}

function ActionCard({ title, description, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col p-4 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/10 transition-all text-left shadow-sm group"
        >
            <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{title}</h4>
            <p className="text-[12px] text-slate-500 mt-1">{description}</p>
        </button>
    );
}
