export type FlavorProfile = 'sour' | 'sweet' | 'bitter' | 'balanced';
export type RoastLevel = 'light' | 'medium' | 'dark';
export type Process = 'washed' | 'natural' | 'honey';

export interface Bean {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
  altitude_m: number | null;
  process: Process;
  variety: string | null;
  tasting_notes: string[];
  flavor_profile: FlavorProfile;
  roast_level: RoastLevel;
  price_250g: number;
  price_1kg: number;
  description: string | null;
  story: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}
