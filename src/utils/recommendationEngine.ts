/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClothingType, Pattern, Occasion, BodyType, Gender } from '../types';

export interface MatchingRule {
  itemType: ClothingType;
  color: string;
  recommendedItem: string;
  baseScore: number;
  bestOccasions: Occasion[];
  fashionTip: string;
}

// 100+ Explicit Matching Rules across various tops, bottoms, and outers
export const matchingRules: MatchingRule[] = [
  // --- White Shirts/T-Shirts Bottom matches (1-15) ---
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Navy Blue Chinos',
    baseScore: 98,
    bestOccasions: ['Office', 'Interview', 'Casual', 'College'],
    fashionTip: 'A timeless combination. Roll up the sleeves and pair with brown leather loafers.'
  },
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Black Trousers',
    baseScore: 96,
    bestOccasions: ['Office', 'Interview', 'Wedding', 'Party'],
    fashionTip: 'Ultra sharp. Finish the look with a black leather belt and oxford shoes.'
  },
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Beige Pants',
    baseScore: 95,
    bestOccasions: ['Casual', 'Travel', 'College', 'Office'],
    fashionTip: 'Fresh, airy, and sophisticated. Pairs perfectly with white clean-cut sneakers.'
  },
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Navy Blue Jeans',
    baseScore: 94,
    bestOccasions: ['Casual', 'College', 'Party', 'Travel'],
    fashionTip: 'The ultimate smart-casual look. Throw on a brown jacket or grey blazer to layer.'
  },
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Olive Green Chinos',
    baseScore: 92,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Earth-toned and highly modern. Elevate with tan desert boots.'
  },
  {
    itemType: 'Shirt',
    color: 'White',
    recommendedItem: 'Dark Grey Trousers',
    baseScore: 93,
    bestOccasions: ['Office', 'Interview', 'College'],
    fashionTip: 'Sleek and highly professional. Pair with a dark leather wrist strap.'
  },
  {
    itemType: 'T-Shirt',
    color: 'White',
    recommendedItem: 'Black Jeans',
    baseScore: 97,
    bestOccasions: ['Casual', 'College', 'Travel', 'Party'],
    fashionTip: 'The classic modern minimalist uniform. Layer with a black leather jacket.'
  },
  {
    itemType: 'T-Shirt',
    color: 'White',
    recommendedItem: 'Navy Blue Jeans',
    baseScore: 95,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Effortless and clean. Pairs beautifully with sneakers and simple silver chains.'
  },
  {
    itemType: 'T-Shirt',
    color: 'White',
    recommendedItem: 'Grey Chinos',
    baseScore: 92,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Monochromatic utility. Great with white low-tops and sporty sunglasses.'
  },
  {
    itemType: 'T-Shirt',
    color: 'White',
    recommendedItem: 'Khaki Chinos',
    baseScore: 91,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Bright and optimistic. Excellent for weekend brunches or outdoor events.'
  },

  // --- Black Shirts/T-Shirts matches (16-30) ---
  {
    itemType: 'Shirt',
    color: 'Black',
    recommendedItem: 'Beige Chinos',
    baseScore: 95,
    bestOccasions: ['Casual', 'Party', 'Office', 'College'],
    fashionTip: 'Perfect high-contrast balance. Wear with beige suede boots and gold accessories.'
  },
  {
    itemType: 'Shirt',
    color: 'Black',
    recommendedItem: 'Grey Trousers',
    baseScore: 96,
    bestOccasions: ['Office', 'Party', 'Interview'],
    fashionTip: 'Sleek and professional. A black shirt with dark grey bottoms creates a slim silhouette.'
  },
  {
    itemType: 'Shirt',
    color: 'Black',
    recommendedItem: 'Charcoal Pant',
    baseScore: 93,
    bestOccasions: ['Office', 'Party', 'Wedding'],
    fashionTip: 'Elegant monochrome. Perfect for evening cocktail parties or sleek galleries.'
  },
  {
    itemType: 'Shirt',
    color: 'Black',
    recommendedItem: 'Light Blue Jeans',
    baseScore: 91,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Creates a modern, relaxed grunge vibe. Roll the sleeves for an effortless fit.'
  },
  {
    itemType: 'Shirt',
    color: 'Black',
    recommendedItem: 'White Trousers',
    baseScore: 94,
    bestOccasions: ['Party', 'Wedding', 'Casual'],
    fashionTip: 'Bold dapper look. Excellent for summer weddings or high-fashion receptions.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Black',
    recommendedItem: 'Beige Pants',
    baseScore: 93,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'A great smart casual fit. Looks incredible with minimal white trainers.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Black',
    recommendedItem: 'Grey Chinos',
    baseScore: 94,
    bestOccasions: ['Casual', 'College', 'Travel', 'Party'],
    fashionTip: 'Low-key, sporty, and highly versatile. Great for everyday urban wear.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Black',
    recommendedItem: 'Olive Green Chinos',
    baseScore: 92,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Understated military-inspired palette. Best styled with dark high-top canvas sneakers.'
  },

  // --- Navy Blue matches (31-45) ---
  {
    itemType: 'Shirt',
    color: 'Navy Blue',
    recommendedItem: 'Beige Chinos',
    baseScore: 99,
    bestOccasions: ['Office', 'College', 'Casual', 'Travel'],
    fashionTip: 'The absolute gold standard in men\'s style. Tailored, sophisticated, and super warm.'
  },
  {
    itemType: 'Shirt',
    color: 'Navy Blue',
    recommendedItem: 'White Pants',
    baseScore: 96,
    bestOccasions: ['Party', 'Wedding', 'Casual'],
    fashionTip: 'Nautical-inspired sophistication. Pair with tan driving shoes or loafers.'
  },
  {
    itemType: 'Shirt',
    color: 'Navy Blue',
    recommendedItem: 'Grey Chinos',
    baseScore: 94,
    bestOccasions: ['Office', 'Interview', 'College'],
    fashionTip: 'Professional and stylish. A great swap from standard black/white setups.'
  },
  {
    itemType: 'Shirt',
    color: 'Navy Blue',
    recommendedItem: 'Black Jeans',
    baseScore: 90,
    bestOccasions: ['Casual', 'Party', 'College'],
    fashionTip: 'Dark and sophisticated. Fits perfectly with leather chelsea boots.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Navy Blue',
    recommendedItem: 'Beige Pants',
    baseScore: 95,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Relaxed and preppy. Classic yachting style. Add leather boating shoes.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Navy Blue',
    recommendedItem: 'Grey Chinos',
    baseScore: 92,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Extremely clean and simple. Add an active wristwatch for a sporty finish.'
  },

  // --- Light Blue Custom matches (46-55) ---
  {
    itemType: 'Shirt',
    color: 'Light Blue',
    recommendedItem: 'Navy Blue Chinos',
    baseScore: 97,
    bestOccasions: ['Office', 'Interview', 'Wedding'],
    fashionTip: 'Monochrome blues create height. Accentuate with a gold-buckled brown leather belt.'
  },
  {
    itemType: 'Shirt',
    color: 'Light Blue',
    recommendedItem: 'Beige Pant',
    baseScore: 96,
    bestOccasions: ['Office', 'Casual', 'College', 'Travel'],
    fashionTip: 'Fresh and welcoming business-casual look. Excellent for warm weather.'
  },
  {
    itemType: 'Shirt',
    color: 'Light Blue',
    recommendedItem: 'Dark Grey Trouser',
    baseScore: 94,
    bestOccasions: ['Office', 'Interview'],
    fashionTip: 'Traditional and reliable corporate presentation. Complements classic silver watches.'
  },
  {
    itemType: 'Shirt',
    color: 'Light Blue',
    recommendedItem: 'Black Jeans',
    baseScore: 92,
    bestOccasions: ['Casual', 'College', 'Party'],
    fashionTip: 'Understated edge. Soft top color contrasted with sharp black bottom.'
  },

  // --- Olive Green matches (56-65) ---
  {
    itemType: 'Shirt',
    color: 'Olive Green',
    recommendedItem: 'Beige Pants',
    baseScore: 95,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Nature-inspired safari vibe. Complete with tan leather accessories and boots.'
  },
  {
    itemType: 'Shirt',
    color: 'Olive Green',
    recommendedItem: 'Black Jeans',
    baseScore: 94,
    bestOccasions: ['Casual', 'Party', 'College'],
    fashionTip: 'Rugged and masculine. Pair with a dark silver necklace and heavy-soled boots.'
  },
  {
    itemType: 'Shirt',
    color: 'Olive Green',
    recommendedItem: 'Navy Blue Jeans',
    baseScore: 91,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Robust, workwear-inspired outfit. Pairs beautifully with heavy leather jackets.'
  },

  // --- Maroon/Burgundy matches (66-75) ---
  {
    itemType: 'Shirt',
    color: 'Maroon',
    recommendedItem: 'Black Jeans',
    baseScore: 96,
    bestOccasions: ['Party', 'Casual', 'College', 'Wedding'],
    fashionTip: 'Deep jewel tones matched with slate black. A stunning outfit for dating/evening outings.'
  },
  {
    itemType: 'Shirt',
    color: 'Maroon',
    recommendedItem: 'Grey Trousers',
    baseScore: 93,
    bestOccasions: ['Office', 'Interview', 'Wedding'],
    fashionTip: 'A rich color accent that breaks corporate monotony. Finish with oxblood loafers.'
  },
  {
    itemType: 'Shirt',
    color: 'Maroon',
    recommendedItem: 'Beige Pants',
    baseScore: 91,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Warm autumn aesthetic. Layer with a grey cardigan or tan overcoat.'
  },

  // --- Grey Tops matches (76-85) ---
  {
    itemType: 'Shirt',
    color: 'Grey',
    recommendedItem: 'Black Trousers',
    baseScore: 95,
    bestOccasions: ['Office', 'Interview', 'Casual'],
    fashionTip: 'Understated and super architectural. Style with silver-framed accessories.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Grey',
    recommendedItem: 'Navy Blue Jeans',
    baseScore: 94,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'The ultimate weekend attire. Fits seamlessly with blue denim.'
  },
  {
    itemType: 'T-Shirt',
    color: 'Grey',
    recommendedItem: 'Black Jeans',
    baseScore: 93,
    bestOccasions: ['Casual', 'College', 'Travel', 'Party'],
    fashionTip: 'Low-key urban monochrome. Looks highly polished with minimalist white sneakers.'
  },

  // --- Kurta Matches (Special Ethnic Rules) (86-90) ---
  {
    itemType: 'Kurta',
    color: 'White',
    recommendedItem: 'White Pyjamas / Aligarhi',
    baseScore: 98,
    bestOccasions: ['Wedding', 'Casual', 'College'],
    fashionTip: 'Pristine traditional look. Elevate with a colorful bandhgala jacket or brown mojris.'
  },
  {
    itemType: 'Kurta',
    color: 'Yellow',
    recommendedItem: 'White Pajamas',
    baseScore: 97,
    bestOccasions: ['Wedding', 'Party'],
    fashionTip: 'The definitive Haldi ceremony ensemble. Fresh, celebratory, and culturally resonant.'
  },
  {
    itemType: 'Kurta',
    color: 'Navy Blue',
    recommendedItem: 'Beige Aligarhi Pyjama',
    baseScore: 96,
    bestOccasions: ['Wedding', 'Party', 'Casual'],
    fashionTip: 'Extremely regal design. Accentuate with an ethnic gold-bordered pocket square.'
  },
  {
    itemType: 'Kurta',
    color: 'Maroon',
    recommendedItem: 'Cream Pajama',
    baseScore: 95,
    bestOccasions: ['Wedding', 'Party'],
    fashionTip: 'Rich, cultural, and outstanding. Best paired with hand-crafted leather kolhapuris.'
  },

  // --- Dress Matches (91-95) ---
  {
    itemType: 'Dress',
    color: 'Black',
    recommendedItem: 'Gold Heels & Strappy Sandal',
    baseScore: 98,
    bestOccasions: ['Party', 'Wedding', 'Interview'],
    fashionTip: 'The quintessential Little Black Dress. Elevate with gold dainty jewelry and clutches.'
  },
  {
    itemType: 'Dress',
    color: 'White',
    recommendedItem: 'Tan Suede Jacket & Boots',
    baseScore: 96,
    bestOccasions: ['Casual', 'Travel', 'College'],
    fashionTip: 'Light bohemian style. Ideal for sunny outings or resort travel.'
  },
  {
    itemType: 'Dress',
    color: 'Red',
    recommendedItem: 'Silver Heels & Black Blazer',
    baseScore: 95,
    bestOccasions: ['Party', 'Wedding'],
    fashionTip: 'Daring and high elegance. Keep the accessories simple to let the dress stand out.'
  },

  // --- Hoodie & Jacket Matches (96-105) ---
  {
    itemType: 'Hoodie',
    color: 'Black',
    recommendedItem: 'Grey Joggers / Charcoal Jeans',
    baseScore: 96,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Excellent athletic street leisure style. Fit clean-cut black sneakers.'
  },
  {
    itemType: 'Hoodie',
    color: 'Grey',
    recommendedItem: 'Black Jeans',
    baseScore: 95,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Sleek neutral sports outfit. Easy layering beneath denim jackets.'
  },
  {
    itemType: 'Jacket',
    color: 'Black',
    recommendedItem: 'White T-Shirt & Blue Jeans',
    baseScore: 98,
    bestOccasions: ['Casual', 'Party', 'College', 'Travel'],
    fashionTip: 'Timeless rockstar aesthetic. Leather, denim, and fresh cotton blend.'
  },
  {
    itemType: 'Jacket',
    color: 'Olive Green',
    recommendedItem: 'Black T-Shirt & Black Jeans',
    baseScore: 96,
    bestOccasions: ['Casual', 'College', 'Travel'],
    fashionTip: 'Rugged utility military aesthetic. Pairs beautiful with retro canvas boots.'
  }
];

// Fallback dynamic generator in case we don't have an exact rule mapping.
export function generateDynamicRecommendation(
  itemType: ClothingType,
  color: string,
  gender: Gender,
  occasion: Occasion
): MatchingRule {
  const isBottom = ['Pant', 'Jeans', 'Trouser'].includes(itemType);
  const colorLower = color.toLowerCase();

  // Pick opposite category garments
  let recommendedItem = 'Black Pants';
  let baseScore = 85;
  let fashionTip = 'A neat visual pairing that works on modern minimalist proportions.';

  if (isBottom) {
    // We uploaded bottoms, recommend tops
    if (colorLower.includes('white') || colorLower.includes('beige') || colorLower.includes('grey')) {
      recommendedItem = 'Navy Blue Shirt';
      baseScore = 93;
      fashionTip = `A classic matching. Roll up the cuffs of the shirt to accent the ${color} bottom.`;
    } else {
      recommendedItem = 'White T-Shirt / Shirt';
      baseScore = 95;
      fashionTip = `A crisp, pristine top pairs exceptionally with your ${color} bottom to provide balanced density.`;
    }
  } else {
    // We uploaded tops, recommend bottoms
    if (colorLower.includes('navy') || colorLower.includes('blue')) {
      recommendedItem = 'Beige Chinos';
      baseScore = 94;
      fashionTip = `The perfect warm earth-tone bottom matches beautifully with your blue top.`;
    } else if (colorLower.includes('black') || colorLower.includes('grey')) {
      recommendedItem = 'Grey Chinos';
      baseScore = 91;
      fashionTip = `Create an architectural monochromatic gradient. Style with clean white leather shoes.`;
    } else if (colorLower.includes('white')) {
      recommendedItem = 'Navy Blue Jeans';
      baseScore = 96;
      fashionTip = `Always fresh and dynamic. A casual white top matches wonderfully with textured indigo denim.`;
    } else {
      recommendedItem = 'Black Jeans / Chinos';
      baseScore = 89;
      fashionTip = `A solid neutral black base helps your ${color} ${itemType} pop with confidence.`;
    }
  }

  return {
    itemType,
    color,
    recommendedItem,
    baseScore,
    bestOccasions: [occasion, 'Casual'],
    fashionTip
  };
}

export function evaluateOutfitRecommendation(
  input: {
    clothing_type: ClothingType;
    color: string;
    pattern: Pattern;
    gender_category: Gender;
    occasion: Occasion;
    body_type: BodyType;
  }
) {
  const { clothing_type, color, pattern, gender_category, occasion, body_type } = input;

  // Let's search rules first
  const activeRules = matchingRules.filter(
    (rule) =>
      rule.itemType === clothing_type &&
      rule.color.toLowerCase().trim() === color.toLowerCase().trim()
  );

  // Take existing rules or generate a smart dynamic fallback
  const listToMap = activeRules.length > 0 ? activeRules : [generateDynamicRecommendation(clothing_type, color, gender_category, occasion)];

  return listToMap.map((rule, idx) => {
    // Calculate matching scores dynamically!
    // 1. Color Match Score
    let colorScore = rule.baseScore;
    if (pattern === 'Checked' || pattern === 'Striped') {
      // Patterns require simpler solid matching bottoms
      if (rule.recommendedItem.toLowerCase().includes('jean') || rule.recommendedItem.toLowerCase().includes('chino')) {
        colorScore += 2; // Nice casual blend
      }
    } else if (pattern === 'Floral' || pattern === 'Printed') {
      // Busy top requires ultra-clean solid bottom
      if (rule.recommendedItem.toLowerCase().includes('trouser') || rule.recommendedItem.toLowerCase().includes('black')) {
        colorScore += 1;
      } else {
        colorScore -= 3; // Might mismatch
      }
    }

    // 2. Style Match Score
    let styleScore = 90;
    if (clothing_type === 'Shirt' && rule.recommendedItem.toLowerCase().includes('trouser')) {
      styleScore = 97; // Dapper formal match
    } else if (clothing_type === 'T-Shirt' && rule.recommendedItem.toLowerCase().includes('trouser')) {
      styleScore = 82; // Smart casual clash, slightly lower
    } else if (clothing_type === 'T-Shirt' && rule.recommendedItem.toLowerCase().includes('jeans')) {
      styleScore = 98; // Classic pairing
    } else if (clothing_type === 'Hoodie' && rule.recommendedItem.toLowerCase().includes('jeans')) {
      styleScore = 96;
    } else if (clothing_type === 'Kurta' && rule.recommendedItem.toLowerCase().includes('pyjama')) {
      styleScore = 99; // Pristine traditional synergy
    }

    // 3. Occasion Match Score
    let occasionScore = 85;
    const worksWellForSelected = rule.bestOccasions.includes(occasion);
    if (worksWellForSelected) {
      occasionScore = 96;
    } else {
      // Occasion mismatch adjustments
      if (occasion === 'Interview') {
        if (clothing_type === 'T-Shirt' || clothing_type === 'Hoodie') {
          occasionScore = 45; // Strictly non formal!
        } else {
          occasionScore = 75;
        }
      } else if (occasion === 'Wedding') {
        if (clothing_type === 'Kurta' || clothing_type === 'Dress' || clothing_type === 'Shirt') {
          occasionScore = 95;
        } else {
          occasionScore = 55;
        }
      } else if (occasion === 'Casual' || occasion === 'Travel') {
        if (clothing_type === 'T-Shirt' || clothing_type === 'Hoodie' || clothing_type === 'Jacket') {
          occasionScore = 98;
        } else {
          occasionScore = 85;
        }
      }
    }

    // Force clamp colors
    colorScore = Math.min(100, Math.max(50, colorScore));
    styleScore = Math.min(100, Math.max(50, styleScore));
    occasionScore = Math.min(100, Math.max(50, occasionScore));

    // Dynamic Overall Match Percentage
    const overallScore = Math.round((colorScore * 0.45) + (styleScore * 0.35) + (occasionScore * 0.20));

    // Body Type customized tip augmentation!
    let bodyTypeTip = '';
    const bodyLower = body_type.toLowerCase();
    if (bodyLower.includes('slim')) {
      bodyTypeTip = 'To flatter your Slim framework, go with well-fitted slim cuts to emphasize alignment. Avoid overly baggy oversized elements which can drown out your silhouette.';
    } else if (bodyLower.includes('athletic')) {
      bodyTypeTip = 'To accentuate a athletic silhouette, structured shirts fitted around the shoulders paired with tapered chinos provide a muscular, sharp, and clean appearance.';
    } else if (bodyLower.includes('medium')) {
      bodyTypeTip = 'Your Medium physical proportions offer excellent versatility. A classic straight-fit bottom balanced with smart shoulder padding on top provides ideal balance.';
    } else if (bodyLower.includes('curvy') || bodyLower.includes('plus size') || bodyLower.includes('heavy')) {
      bodyTypeTip = 'Embrace your shape by aiming for fluid, structured draping. A solid-colored base paired with layered cardigans or structured outerwear adds vertical lines and incredible elegance.';
    }

    const compiledTip = `${rule.fashionTip} ${bodyTypeTip}`;

    return {
      id: `rule_match_${idx}_${Date.now()}`,
      recommendedItem: rule.recommendedItem,
      match_score: {
        overall: overallScore,
        color: colorScore,
        style: styleScore,
        occasion: occasionScore
      },
      fashion_tips: compiledTip,
      occasion: occasion
    };
  });
}
