import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Loader2, Trash2, Upload, Plus, Bell, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
    id: string;
    url: string;
    type: string;
    is_active: boolean;
}

export function BannerManager() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    const fetchBanners = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
        if (error) {
            toast.error('Failed to fetch banners');
        } else {
            setBanners(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const publicUrl = await uploadImage(file);
            const { error } = await supabase.from('banners').insert([{
                url: publicUrl,
                type,
                is_active: banners.length === 0
            }]);

            if (error) throw error;
            toast.success(`Banner uploaded successfully`);
            fetchBanners();
        } catch (error: any) {
            toast.error(error.message || 'Upload failed');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleToggle = async (id: string, currentlyActive: boolean) => {
        const { error } = await supabase.from('banners').update({ is_active: !currentlyActive }).eq('id', id);
        if (error) {
            toast.error('Failed to toggle banner');
        } else {
            toast.success('Banner status updated');
            fetchBanners();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this banner?')) return;
        const { error } = await supabase.from('banners').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete');
        } else {
            toast.success('Banner deleted');
            fetchBanners();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Announcements</h2>
                    <p className="text-slate-500 text-[15px] mt-1">Manage hero banners and activity notices.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Button disabled={isUploading} variant="outline" className="h-10 px-4 rounded-lg gap-2 font-medium text-[14px] border-slate-200">
                            <Plus className="w-4 h-4" /> Default Banner
                        </Button>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleUpload(e, 'default')} accept="image/*" />
                    </div>
                    <div className="relative">
                        <Button disabled={isUploading} className="bg-emerald-600 hover:bg-emerald-700 h-10 px-4 rounded-lg gap-2 font-semibold text-[14px] shadow-sm">
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Activity Banner
                        </Button>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleUpload(e, 'activity')} accept="image/*" />
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[1, 2].map(i => (
                        <div key={i} className="aspect-[16/7] bg-slate-100 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : banners.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                    <Bell className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">No banners uploaded yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Upload a banner to display on the hero section.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className={`bg-white rounded-xl border overflow-hidden transition-all ${banner.is_active ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200'
                                }`}
                        >
                            {/* Image */}
                            <div className="aspect-[16/7] relative group">
                                <img
                                    src={banner.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="175"><rect fill="%23f1f5f9" width="400" height="175"/><text x="200" y="95" text-anchor="middle" fill="%2394a3b8" font-size="14">Image not found</text></svg>';
                                    }}
                                />
                                {/* Type badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${banner.type === 'default' ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white'
                                        }`}>
                                        {banner.type}
                                    </span>
                                </div>
                                {/* Active badge */}
                                {banner.is_active && (
                                    <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> LIVE
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={banner.is_active}
                                        onCheckedChange={() => handleToggle(banner.id, banner.is_active)}
                                        className="data-[state=checked]:bg-emerald-600"
                                    />
                                    <div>
                                        <p className="text-[13px] font-semibold text-slate-700">
                                            {banner.is_active ? 'Active on site' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(banner.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg gap-1.5 text-[13px] font-medium h-9 px-3"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
