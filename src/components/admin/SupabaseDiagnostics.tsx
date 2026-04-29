import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface DiagnosticResult {
    name: string;
    status: 'pending' | 'success' | 'error';
    message: string;
}

export function SupabaseDiagnostics() {
    const [results, setResults] = useState<DiagnosticResult[]>([
        { name: 'Connectivity', status: 'pending', message: 'Checking Supabase connection...' },
        { name: 'Auth Session', status: 'pending', message: 'Verifying active session...' },
        { name: 'Storage Bucket', status: 'pending', message: 'Searching for "media" bucket...' },
        { name: 'Database Tables', status: 'pending', message: 'Checking gallery/programs tables...' },
    ]);
    const [isRunning, setIsRunning] = useState(false);

    const runTests = async () => {
        setIsRunning(true);
        const newResults: DiagnosticResult[] = [...results];

        // 1. Connectivity
        try {
            const { error } = await supabase.from('gallery').select('count', { count: 'exact', head: true });
            if (error && error.message.includes('failed to fetch')) throw error;
            newResults[0] = { name: 'Connectivity', status: 'success', message: 'Connected to Supabase project.' };
        } catch (e: any) {
            newResults[0] = { name: 'Connectivity', status: 'error', message: `Cannot reach Supabase: ${e.message}` };
        }
        setResults([...newResults]);

        // 2. Auth
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            newResults[1] = { name: 'Auth Session', status: 'success', message: `Logged in as ${session.user.email}` };
        } else {
            newResults[1] = { name: 'Auth Session', status: 'error', message: 'No active session found. Please log out and back in.' };
        }
        setResults([...newResults]);

        // 3. Storage
        try {
            const { data: buckets, error: bError } = await supabase.storage.listBuckets();
            if (bError) throw bError;

            const mediaBucket = buckets.find(b => b.name.toLowerCase() === 'media');
            if (mediaBucket) {
                newResults[2] = {
                    name: 'Storage Bucket',
                    status: 'success',
                    message: `Found bucket "${mediaBucket.name}" (Public: ${mediaBucket.public ? 'Yes' : 'No'})`
                };
            } else {
                newResults[2] = {
                    name: 'Storage Bucket',
                    status: 'error',
                    message: `Bucket "media" not found. Found: ${buckets.map(b => b.name).join(', ') || 'None'}`
                };
            }
        } catch (e: any) {
            newResults[2] = { name: 'Storage Bucket', status: 'error', message: `Failed to check buckets: ${e.message}` };
        }
        setResults([...newResults]);

        // 4. Tables
        try {
            const { error: gError } = await supabase.from('gallery').select('id').limit(1);
            const { error: pError } = await supabase.from('programs').select('id').limit(1);

            const problems: string[] = [];
            if (gError) problems.push(`gallery: ${gError.message}`);
            if (pError) problems.push(`programs: ${pError.message}`);

            if (problems.length === 0) {
                newResults[3] = { name: 'Database Tables', status: 'success', message: 'Required tables are present and accessible.' };
            } else {
                newResults[3] = { name: 'Database Tables', status: 'error', message: `Issues: ${problems.join(', ')}` };
            }
        } catch (e: any) {
            newResults[3] = { name: 'Database Tables', status: 'error', message: `Critical table error: ${e.message}` };
        }
        setResults([...newResults]);
        setIsRunning(false);
    };

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Supabase System Health
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                    {results.map((res, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                            <div className="mt-0.5">
                                {res.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                {res.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                {res.status === 'pending' && <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-700">{res.name}</h4>
                                <p className={`text-xs mt-0.5 ${res.status === 'error' ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                                    {res.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={runTests}
                        disabled={isRunning}
                        className="bg-slate-800 hover:bg-slate-900 text-white h-11"
                    >
                        {isRunning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Run Health Check'}
                    </Button>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                        This tool verifies your connection to Supabase and ensures all required features (Storage & Database) are correctly configured.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
