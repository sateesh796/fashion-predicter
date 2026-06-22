/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { User, Clothing, Recommendation, SavedOutfit, DashboardAnalytics } from '../src/types';

const DB_FILE_PATH = path.join(process.cwd(), 'db.json');

// Interface for database structure
export interface DBStructure {
  users: User[];
  clothing: Clothing[];
  recommendations: Recommendation[];
  saved_outfits: SavedOutfit[];
  activity_logs: { id: string; userEmail: string; action: string; time: string }[];
}

// Function to get initial/seed database state
function getSeedState(): DBStructure {
  const now = new Date().toISOString();
  
  const seedUser: User = {
    id: 'user_satish_1',
    name: 'Satish',
    email: 'avsatish389@gmail.com',
    gender: 'Men',
    body_type: 'Medium',
    created_at: now
  };

  const seedClothes: Clothing[] = [
    {
      id: 'cloth_white_shirt',
      user_id: 'user_satish_1',
      image_url: 'https://images.unsplash.com/photo-1620012253295-c05518e99351?w=500&auto=format&fit=crop&q=60',
      clothing_type: 'Shirt',
      color: 'White',
      hex_code: '#ffffff',
      pattern: 'Plain',
      gender_category: 'Men',
      created_at: now
    },
    {
      id: 'cloth_navy_suit',
      user_id: 'user_satish_1',
      image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=60',
      clothing_type: 'Shirt',
      color: 'Navy Blue',
      hex_code: '#002060',
      pattern: 'Plain',
      gender_category: 'Men',
      created_at: now
    },
    {
      id: 'cloth_checked_flannel',
      user_id: 'user_satish_1',
      image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60',
      clothing_type: 'Shirt',
      color: 'Olive Green',
      hex_code: '#556b2f',
      pattern: 'Checked',
      gender_category: 'Men',
      created_at: now
    }
  ];

  const seedSavedOutfits: SavedOutfit[] = [
    {
      id: 'saved_outfit_1',
      user_id: 'user_satish_1',
      clothing_id: 'cloth_white_shirt',
      recommended_item: 'Navy Blue Chinos',
      match_score: {
        overall: 98,
        color: 98,
        style: 97,
        occasion: 99
      },
      occasion: 'Office',
      fashion_tips: 'A timeless combination. Roll up the sleeves and pair with brown leather loafers. Your Medium physical proportions offer excellent versatility.',
      clothing_details: {
        clothing_type: 'Shirt',
        color: 'White',
        hex_code: '#ffffff',
        pattern: 'Plain',
        image_url: 'https://images.unsplash.com/photo-1620012253295-c05518e99351?w=500&auto=format&fit=crop&q=60'
      },
      created_at: now
    },
    {
      id: 'saved_outfit_2',
      user_id: 'user_satish_1',
      clothing_id: 'cloth_navy_suit',
      recommended_item: 'Beige Chinos',
      match_score: {
        overall: 99,
        color: 99,
        style: 98,
        occasion: 99
      },
      occasion: 'Casual',
      fashion_tips: 'The absolute gold standard in style. Tailored, sophisticated and warm. Best suited with clean sneakers.',
      clothing_details: {
        clothing_type: 'Shirt',
        color: 'Navy Blue',
        hex_code: '#002060',
        pattern: 'Plain',
        image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=60'
      },
      created_at: now
    }
  ];

  const seedActivityLogs = [
    { id: 'act_1', userEmail: 'avsatish389@gmail.com', action: 'Created account', time: '10 minutes ago' },
    { id: 'act_2', userEmail: 'avsatish389@gmail.com', action: 'Uploaded White Shirt', time: '8 minutes ago' },
    { id: 'act_3', userEmail: 'avsatish389@gmail.com', action: 'Analyzed Navy Blue Shirt', time: '6 minutes ago' },
    { id: 'act_4', userEmail: 'avsatish389@gmail.com', action: 'Favourited Navy & Beige combination', time: '4 minutes ago' }
  ];

  return {
    users: [seedUser, {
      id: 'user_demo_female',
      name: 'Priya',
      email: 'priya.demo@gmail.com',
      gender: 'Women',
      body_type: 'Medium',
      created_at: now
    }],
    clothing: seedClothes,
    recommendations: [],
    saved_outfits: seedSavedOutfits,
    activity_logs: seedActivityLogs
  };
}

export function readDB(): DBStructure {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const seed = getSeedState();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(seed, null, 2), 'utf-8');
      return seed;
    }
    const dataStr = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(dataStr);
  } catch (error) {
    console.error('Error reading db.json, returning seed state:', error);
    return getSeedState();
  }
}

export function writeDB(data: DBStructure): boolean {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to db.json:', error);
    return false;
  }
}

export function logActivity(userEmail: string, action: string) {
  const db = readDB();
  const newActivity = {
    id: `act_${Date.now()}`,
    userEmail,
    action,
    time: 'Just now'
  };
  db.activity_logs.unshift(newActivity);
  // Cap activity logs to latest 40 items
  if (db.activity_logs.length > 40) {
    db.activity_logs = db.activity_logs.slice(0, 40);
  }
  writeDB(db);
}
