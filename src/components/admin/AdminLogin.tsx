import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Leaf } from 'lucide-react';

export function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 font-sans relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
            </div>

            <Card className="relative w-full max-w-[400px] shadow-2xl border-0 rounded-2xl bg-white/[0.97] backdrop-blur">
                <CardContent className="p-8 space-y-7">
                    {/* Logo */}
                    <div className="text-center space-y-3">
                        <div className="mx-auto w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Leaf className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Admin Console</h1>
                            <p className="text-sm text-slate-400 mt-0.5">Sign in to manage your academy</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-600">Email</label>
                                <Input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-[14px]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-600">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-[14px]"
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="rounded-lg border-red-100 bg-red-50 py-2.5">
                                <AlertDescription className="text-[13px] font-medium text-red-600">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[14px] rounded-lg shadow-sm transition-all active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
