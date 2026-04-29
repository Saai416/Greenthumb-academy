import { supabase } from './supabase';

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * 
 * This version is HARDENED to handle:
 * 1. Bucket case-sensitivity ('media' vs 'MEDIA')
 * 2. Clearer error reporting for RLS vs Missing Bucket
 */
export async function uploadImage(file: File, bucketName: string = 'media'): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const safeName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-z0-9]/gi, '-')
        .toLowerCase()
        .substring(0, 40);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}-${safeName}.${ext}`;
    const filePath = `uploads/${fileName}`;

    // Helper to attempt upload
    const attemptUpload = async (bName: string) => {
        return await supabase.storage
            .from(bName)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
            });
    };

    // 1. Try with the provided bucket name (e.g., 'media')
    let { data, error: uploadError } = await attemptUpload(bucketName);

    // 2. If 'media' not found, try 'MEDIA' (common case issue)
    if (uploadError && (uploadError as any).status === 404 && bucketName === 'media') {
        process.env.NODE_ENV !== 'production' && console.warn(`Bucket "${bucketName}" not found. Trying "MEDIA"...`);
        const retry = await attemptUpload('MEDIA');
        if (!retry.error) {
            data = retry.data;
            uploadError = null;
            bucketName = 'MEDIA'; // Update for URL generation
        }
    }

    if (uploadError) {
        console.error('[Storage] Upload error detail:', uploadError);

        const msg = uploadError.message.toLowerCase();
        if (msg.includes('row-level security') || msg.includes('unauthorized')) {
            throw new Error(`Permission Denied: Please check Step 2 of the Supabase Fix Guide (RLS Policies).`);
        }
        if (msg.includes('not found') || (uploadError as any).status === 404) {
            throw new Error(`Bucket "${bucketName}" not found. Please create a public bucket named "media" in Supabase Storage.`);
        }

        throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // 3. Get the public URL
    const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
        throw new Error('Failed to generate public URL. Check if your bucket is set to PUBLIC.');
    }

    return urlData.publicUrl;
}
