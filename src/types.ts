/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared Type Definitions for Fashion Finder

export type Gender = 'Men' | 'Women' | 'Unisex';

export type BodyTypeMen = 'Slim' | 'Medium' | 'Athletic' | 'Heavy';
export type BodyTypeWomen = 'Slim' | 'Medium' | 'Curvy' | 'Plus Size';
export type BodyType = BodyTypeMen | BodyTypeWomen;

export type ClothingType = 
  | 'Shirt' 
  | 'T-Shirt' 
  | 'Pant' 
  | 'Jeans' 
  | 'Trouser' 
  | 'Kurta' 
  | 'Dress' 
  | 'Hoodie' 
  | 'Jacket';

export type Pattern = 'Plain' | 'Checked' | 'Striped' | 'Printed' | 'Floral' | 'Textured';

export type Occasion = 
  | 'College' 
  | 'Office' 
  | 'Interview' 
  | 'Party' 
  | 'Wedding' 
  | 'Casual' 
  | 'Travel';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  body_type: BodyType;
  created_at: string;
}

export interface Clothing {
  id: string;
  user_id: string;
  image_url: string;
  clothing_type: ClothingType;
  color: string;
  hex_code: string;
  pattern: Pattern;
  gender_category: Gender;
  created_at: string;
}

export interface Recommendation {
  id: string;
  clothing_id: string;
  recommended_item: string;
  match_score: number;
  occasion: Occasion;
  created_at: string;
}

export interface SavedOutfit {
  id: string;
  user_id: string;
  clothing_id: string;
  recommended_item: string;
  match_score: {
    overall: number;
    color: number;
    style: number;
    occasion: number;
  };
  occasion: Occasion;
  fashion_tips: string;
  clothing_details: {
    clothing_type: ClothingType;
    color: string;
    hex_code: string;
    pattern: Pattern;
    image_url: string;
  };
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface DashboardAnalytics {
  totalUsers: number;
  totalUploads: number;
  mostUploadedColors: { color: string; hex: string; count: number }[];
  popularMatches: { source: string; recommendation: string; score: number; count: number }[];
  recentActivity: { id: string; userEmail: string; action: string; time: string }[];
  dailyUsers: { date: string; count: number }[];
  clothingTrends: { type: string; count: number }[];
  genderDistribution: { gender: string; count: number }[];
}
