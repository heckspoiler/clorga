import { createClient } from './client';

const supabase = createClient();

export const uploadFile = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('your-bucket-name')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return data;
};
