import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Loader2, Trash2, Plus, Image as ImageIcon, X, AlertCircle, FolderOpen, Files } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImage {
    id: string;
    url: string;
    category: string;
    position?: string;
}

const CATEGORIES = ['Learning Space', 'Academy', 'Celebrations'];

export function GalleryManager() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const [uploadData, setUploadData] = useState<{ category: string; files: File[] }>({
        category: CATEGORIES[0],
        files: [],
    });

    // Generate previews for selected files
    const previews = useMemo(() => {
        return uploadData.files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));
    }, [uploadData.files]);

    // Clean up object URLs to avoid memory leaks
    useEffect(() => {
        return () => previews.forEach(p => URL.revokeObjectURL(p.url));
    }, [previews]);

    const fetchImages = useCallback(async () => {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setImages(data);
        }
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchImages();
            setLoading(false);
        })();
    }, [fetchImages]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setUploadData(prev => ({
            ...prev,
            files: [...prev.files, ...newFiles]
        }));
        e.target.value = ''; // Reset input
    };

    const removeFile = (index: number) => {
        setUploadData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    const handleUpload = async () => {
        if (uploadData.files.length === 0) return;

        setIsUploading(true);
        let successCount = 0;
        let lastError = '';

        for (const file of uploadData.files) {
            try {
                const publicUrl = await uploadImage(file);
                const { error: dbError } = await supabase
                    .from('gallery')
                    .insert([{ url: publicUrl, category: uploadData.category, position: 'center' }]);

                if (dbError) throw dbError;
                successCount++;
            } catch (err: any) {
                lastError = err.message || 'Unknown error';
            }
        }

        if (successCount > 0) {
            toast.success(`${successCount} items added to gallery`);
            await fetchImages();
            setUploadData({ category: uploadData.category, files: [] });
            setDialogOpen(false);
        }

        if (lastError) {
            toast.error('Some uploads failed', { description: lastError });
        }

        setIsUploading(false);
    };

    const updatePosition = async (id: string, newPosition: string) => {
        const { error } = await supabase
            .from('gallery')
            .update({ position: newPosition })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update position');
        } else {
            setImages(prev => prev.map(img => img.id === id ? { ...img, position: newPosition } : img));
            toast.success('Focus point updated');
        }
    };

    const handleDelete = async (id: string, url: string) => {
        if (!confirm('Delete this image?')) return;
        setImages(prev => prev.filter(img => img.id !== id));

        const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
        if (dbError) {
            toast.error(`Delete failed: ${dbError.message}`);
            await fetchImages();
            return;
        }

        toast.success('Image removed');
    };

    const filteredImages = filterCategory === 'all'
        ? images
        : images.filter(img => img.category === filterCategory);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Gallery</h2>
                    <p className="text-slate-500 text-[14px] mt-1">
                        {images.length} photos published
                    </p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 h-10 px-6 rounded-lg gap-2 font-bold text-sm shadow-sm">
                            <Plus className="w-4 h-4" /> Add Photos
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] p-0 rounded-xl overflow-hidden shadow-2xl border-none">
                        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 bg-slate-50/80">
                            <DialogTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-emerald-600" />
                                Upload to Gallery
                            </DialogTitle>
                        </DialogHeader>

                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Target Category</label>
                                <Select
                                    value={uploadData.category}
                                    onValueChange={(v) => setUploadData({ ...uploadData, category: v })}
                                >
                                    <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-white text-slate-700">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Photos ({uploadData.files.length})</label>
                                    <label className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> Add More
                                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
                                    </label>
                                </div>

                                {uploadData.files.length === 0 ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 bg-slate-50/50 text-center hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all cursor-pointer relative group">
                                        <Files className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:text-emerald-400 transition-colors" />
                                        <p className="text-sm font-bold text-slate-500">Drag & drop or Click to browse</p>
                                        <p className="text-[11px] text-slate-400 mt-1">Select one or more images</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileSelect}
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-3 max-h-[220px] overflow-y-auto p-1 pr-2 no-scrollbar">
                                        {previews.map((preview, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                                                <img src={preview.url} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => removeFile(idx)}
                                                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => { setUploadData({ ...uploadData, files: [] }); setDialogOpen(false); }}
                                    className="flex-1 h-12 rounded-lg border-slate-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpload}
                                    disabled={isUploading || uploadData.files.length === 0}
                                    className="flex-[2] h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Uploading...
                                        </>
                                    ) : (
                                        `Upload ${uploadData.files.length} Item${uploadData.files.length !== 1 ? 's' : ''}`
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar">
                {['all', ...CATEGORIES].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-5 py-3 text-[13px] font-bold transition-all border-b-2 -mb-[1px] whitespace-nowrap ${filterCategory === cat
                                ? 'border-emerald-600 text-emerald-700 shadow-[0_2px_0_0_#059669]'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {cat === 'all' ? 'All Items' : cat}
                        <span className="ml-2 text-[11px] opacity-60 font-medium bg-slate-100 px-1.5 py-0.5 rounded-full">
                            {cat === 'all' ? images.length : images.filter(img => img.category === cat).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-100">
                    <FolderOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold italic">No photos found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <img 
                                src={image.url} 
                                alt="" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                style={{ objectPosition: image.position || 'center' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Admin Controls Overlay */}
                            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <div className="flex items-center justify-between">
                                    <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-800 shadow-sm">{image.category}</span>
                                    <button
                                        onClick={() => handleDelete(image.id, image.url)}
                                        className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                
                                <div className="flex bg-white/90 backdrop-blur p-1 rounded-lg shadow-sm border border-slate-100">
                                    {['top', 'center', 'bottom'].map((pos) => (
                                        <button
                                            key={pos}
                                            onClick={() => updatePosition(image.id, pos)}
                                            className={`flex-1 text-[9px] font-bold uppercase py-1 rounded transition-colors ${
                                                (image.position || 'center') === pos 
                                                    ? 'bg-emerald-600 text-white' 
                                                    : 'text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            {pos}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
