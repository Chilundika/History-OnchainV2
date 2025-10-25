import { supabase } from './supabaseClient';

export interface UserProfile {
  level: number;
  points: number;
  discoveries: number;
}

export async function fetchUserProfile(wallet: string): Promise<UserProfile | null> {
  if (!wallet || !supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('wallet', wallet.toLowerCase())
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return { level: 1, points: 0, discoveries: 0 };
  }
  
  return data || { level: 1, points: 0, discoveries: 0 };
}

export async function updateDiscovery(
  wallet: string | null,
  imageData: string
): Promise<UserProfile | null> {
  if (!wallet || !supabase) return null;

  try {
    // Fetch current profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('wallet', wallet.toLowerCase())
      .single();

    if (fetchError) {
      console.error('Error fetching profile for update:', fetchError);
      return null;
    }

    // Calculate new values
    const newDiscoveries = (profile?.discoveries || 0) + 1;
    const newPoints = (profile?.points || 0) + 25;
    const newLevel = Math.floor(newPoints / 100) + 1;

    const updated = {
      ...profile,
      level: newLevel,
      points: newPoints,
      discoveries: newDiscoveries,
    };

    // Update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updated)
      .eq('wallet', wallet.toLowerCase());

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return null;
    }

    // Store discovery record
    await supabase.from('discoveries').insert({
      wallet: wallet.toLowerCase(),
      image: imageData,
      timestamp: new Date().toISOString(),
    });

    return updated;
  } catch (error) {
    console.error('Error in updateDiscovery:', error);
    return null;
  }
}
