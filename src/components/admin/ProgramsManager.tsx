import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Loader2, Plus, Edit2, Trash2, Image as ImageIcon, BookOpen, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

interface Program {
    id: string;
    title: string;
    description: string;
    image_url: string;
}

export function ProgramsManager() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editProgram, setEditProgram] = useState<Program | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null as File | null,
        imageUrl: '',
    });

    const fetchPrograms = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('programs')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            toast.error('Failed to fetch programs');
        } else {
            setPrograms(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleOpenDialog = (program?: Program) => {
        if (program) {
            setEditProgram(program);
            setFormData({
                title: program.title,
                description: program.description,
                image: null,
                imageUrl: program.image_url,
            });
        } else {
            setEditProgram(null);
            setFormData({ title: '', description: '', image: null, imageUrl: '' });
        }
        setDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let finalImageUrl = formData.imageUrl;
            if (formData.image) {
                finalImageUrl = await uploadImage(formData.image);
            }
            const programData = {
                title: formData.title,
                description: formData.description,
                image_url: finalImageUrl,
            };
            if (editProgram) {
                const { error } = await supabase.from('programs').update(programData).eq('id', editProgram.id);
                if (error) throw error;
                toast.success('Course updated');
            } else {
                const { error } = await supabase.from('programs').insert([programData]);
                if (error) throw error;
                toast.success('Course created');
            }
            setDialogOpen(false);
            fetchPrograms();
        } catch (error: any) {
            toast.error(error.message || 'Error saving course');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this course?')) return;
        const { error } = await supabase.from('programs').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete');
        } else {
            toast.success('Course deleted');
            fetchPrograms();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Courses</h2>
                    <p className="text-slate-500 text-[15px] mt-1">Manage courses displayed on the website.</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()} className="bg-emerald-600 hover:bg-emerald-700 h-10 px-5 rounded-lg gap-2 font-semibold text-[14px] shadow-sm">
                            <Plus className="w-4 h-4" /> Add Course
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[520px] p-0 rounded-xl overflow-hidden">
                        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                            <DialogTitle className="text-lg font-bold text-slate-800">
                                {editProgram ? 'Edit Course' : 'New Course'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-600">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Mathematics"
                                    className="h-10 rounded-lg text-[14px]"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-600">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Course highlights..."
                                    className="min-h-[100px] rounded-lg text-[14px]"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-600">Thumbnail</label>
                                <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 transition-colors cursor-pointer relative overflow-hidden group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                        style={{ display: 'none' }}
                                    />
                                    {formData.image || formData.imageUrl ? (
                                        <div className="absolute inset-0 w-full h-full p-2">
                                            <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-200 bg-white">
                                                <img
                                                    src={formData.image ? URL.createObjectURL(formData.image) : formData.imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-opacity backdrop-blur-[2px]">
                                                    <div className="flex flex-col items-center group/replace">
                                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover/replace:bg-white/30 group-hover/replace:scale-110 transition-all text-white">
                                                            <UploadCloud className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-white text-xs font-medium">Replace</p>
                                                    </div>
                                                    
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setFormData({ ...formData, image: null, imageUrl: '' });
                                                            const fileInput = e.currentTarget.closest('label')?.querySelector('input[type="file"]') as HTMLInputElement;
                                                            if (fileInput) fileInput.value = '';
                                                        }}
                                                        className="flex flex-col items-center group/delete"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2 group-hover/delete:bg-red-500/40 group-hover/delete:scale-110 transition-all text-red-100">
                                                            <Trash2 className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-red-100 text-xs font-medium">Delete</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-500 w-full">
                                            <div className="w-12 h-12 mb-4 rounded-full bg-emerald-50 shadow-sm flex items-center justify-center text-emerald-600 transition-colors">
                                                <UploadCloud className="w-6 h-6" />
                                            </div>
                                            <div className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[14px] shadow-sm transition-colors mb-2">
                                                Choose Image File
                                            </div>
                                            <p className="text-[12px] text-slate-400 mt-1">Recommended: 800×450px (16:9)</p>
                                        </div>
                                    )}
                                </label>
                                {formData.image && (
                                    <p className="text-[12px] text-emerald-600 font-medium px-1 flex items-center gap-1.5 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" />
                                        Selected: {formData.image.name}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-[14px]"
                                disabled={isSaving}
                            >
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : editProgram ? 'Save Changes' : 'Publish Course'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[320px] bg-slate-100 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : programs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                    <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">No courses yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Add your first course to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {programs.map((program) => (
                        <div key={program.id} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col group hover:shadow-md transition-all">
                            {/* Thumbnail */}
                            <div className="h-44 w-full overflow-hidden relative bg-white">
                                {program.image_url ? (
                                    <img
                                        src={program.image_url}
                                        alt={program.title}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <BookOpen className="w-10 h-10 text-slate-200" />
                                    </div>
                                )}
                            </div>
                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-[15px] font-bold text-slate-800 leading-tight mb-1.5 line-clamp-1">{program.title}</h4>
                                <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1">{program.description}</p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleOpenDialog(program)}
                                        className="flex-1 rounded-lg h-9 border-slate-200 hover:bg-slate-50 hover:text-emerald-700 gap-1.5 text-slate-600 font-medium text-[13px]"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" /> Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(program.id)}
                                        className="rounded-lg h-9 border-slate-200 text-red-500 hover:bg-red-50 hover:text-red-600 gap-1.5 font-medium text-[13px] px-3"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
