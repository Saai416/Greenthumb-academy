import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsManager() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

    // Evaluate password strength
    useEffect(() => {
        if (!newPassword) {
            setStrength({ score: 0, text: '', color: 'bg-slate-200' });
            return;
        }
        let score = 0;
        if (newPassword.length >= 8) score += 1;
        if (/[A-Z]/.test(newPassword)) score += 1;
        if (/[0-9]/.test(newPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

        if (score === 0 || score === 1) setStrength({ score, text: 'Weak', color: 'bg-red-400' });
        else if (score === 2) setStrength({ score, text: 'Fair', color: 'bg-amber-400' });
        else if (score === 3) setStrength({ score, text: 'Good', color: 'bg-emerald-400' });
        else setStrength({ score, text: 'Strong', color: 'bg-emerald-600' });
    }, [newPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!currentPassword) {
            toast.error('Current password is required');
            return;
        }
        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            toast.error('New password must be at least 8 characters long, contain an uppercase letter and a number');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password must match');
            return;
        }

        setIsLoading(true);
        try {
            // 1. Get authenticated session user email
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.user?.email) {
                toast.error('Could not verify active session. Please log in again.');
                return;
            }

            const email = session.user.email;

            // 2. Re-authenticate using current password
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password: currentPassword,
            });

            if (signInError) {
                toast.error('Incorrect current password.');
                return;
            }

            // 3. Update password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) {
                toast.error(updateError.message || 'Failed to update password');
            } else {
                toast.success('Password updated successfully.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err: any) {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Admin Settings</h2>
                <p className="text-slate-500 text-[15px] mt-1">Manage your account security and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
                        <p className="text-[13px] text-slate-500">Ensure your account is using a long, random password.</p>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[15px] text-slate-800 bg-slate-50/50 focus:bg-white pr-10"
                                    placeholder="Enter current password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-slate-100 my-6"></div>

                        {/* New Password */}
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[15px] text-slate-800 bg-slate-50/50 focus:bg-white pr-10"
                                    placeholder="Enter new password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {newPassword && (
                                <div className="mt-3">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                                    level <= strength.score ? strength.color : 'bg-slate-100'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[12px] text-slate-500 font-medium">
                                        Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.text}</span>
                                    </p>
                                </div>
                            )}

                            <div className="mt-3 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <p className="text-[12px] text-slate-500 leading-relaxed">
                                    Password must be at least <strong>8 characters</strong> long and contain at least <strong>1 uppercase letter</strong> and <strong>1 number</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-[15px] text-slate-800 bg-slate-50/50 focus:bg-white pr-10"
                                    placeholder="Confirm new password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-red-500 text-[12px] font-medium mt-2">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold rounded-xl shadow-sm shadow-emerald-500/20 transition-all flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Update Password'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
