var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);

// server/db.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var DB_FILE_PATH = import_path.default.join(process.cwd(), "db.json");
function getSeedState() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const seedUser = {
    id: "user_satish_1",
    name: "Satish",
    email: "avsatish389@gmail.com",
    gender: "Men",
    body_type: "Medium",
    created_at: now
  };
  const seedClothes = [
    {
      id: "cloth_white_shirt",
      user_id: "user_satish_1",
      image_url: "https://images.unsplash.com/photo-1620012253295-c05518e99351?w=500&auto=format&fit=crop&q=60",
      clothing_type: "Shirt",
      color: "White",
      hex_code: "#ffffff",
      pattern: "Plain",
      gender_category: "Men",
      created_at: now
    },
    {
      id: "cloth_navy_suit",
      user_id: "user_satish_1",
      image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=60",
      clothing_type: "Shirt",
      color: "Navy Blue",
      hex_code: "#002060",
      pattern: "Plain",
      gender_category: "Men",
      created_at: now
    },
    {
      id: "cloth_checked_flannel",
      user_id: "user_satish_1",
      image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60",
      clothing_type: "Shirt",
      color: "Olive Green",
      hex_code: "#556b2f",
      pattern: "Checked",
      gender_category: "Men",
      created_at: now
    }
  ];
  const seedSavedOutfits = [
    {
      id: "saved_outfit_1",
      user_id: "user_satish_1",
      clothing_id: "cloth_white_shirt",
      recommended_item: "Navy Blue Chinos",
      match_score: {
        overall: 98,
        color: 98,
        style: 97,
        occasion: 99
      },
      occasion: "Office",
      fashion_tips: "A timeless combination. Roll up the sleeves and pair with brown leather loafers. Your Medium physical proportions offer excellent versatility.",
      clothing_details: {
        clothing_type: "Shirt",
        color: "White",
        hex_code: "#ffffff",
        pattern: "Plain",
        image_url: "https://images.unsplash.com/photo-1620012253295-c05518e99351?w=500&auto=format&fit=crop&q=60"
      },
      created_at: now
    },
    {
      id: "saved_outfit_2",
      user_id: "user_satish_1",
      clothing_id: "cloth_navy_suit",
      recommended_item: "Beige Chinos",
      match_score: {
        overall: 99,
        color: 99,
        style: 98,
        occasion: 99
      },
      occasion: "Casual",
      fashion_tips: "The absolute gold standard in style. Tailored, sophisticated and warm. Best suited with clean sneakers.",
      clothing_details: {
        clothing_type: "Shirt",
        color: "Navy Blue",
        hex_code: "#002060",
        pattern: "Plain",
        image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=60"
      },
      created_at: now
    }
  ];
  const seedActivityLogs = [
    { id: "act_1", userEmail: "avsatish389@gmail.com", action: "Created account", time: "10 minutes ago" },
    { id: "act_2", userEmail: "avsatish389@gmail.com", action: "Uploaded White Shirt", time: "8 minutes ago" },
    { id: "act_3", userEmail: "avsatish389@gmail.com", action: "Analyzed Navy Blue Shirt", time: "6 minutes ago" },
    { id: "act_4", userEmail: "avsatish389@gmail.com", action: "Favourited Navy & Beige combination", time: "4 minutes ago" }
  ];
  return {
    users: [seedUser, {
      id: "user_demo_female",
      name: "Priya",
      email: "priya.demo@gmail.com",
      gender: "Women",
      body_type: "Medium",
      created_at: now
    }],
    clothing: seedClothes,
    recommendations: [],
    saved_outfits: seedSavedOutfits,
    activity_logs: seedActivityLogs
  };
}
function readDB() {
  try {
    if (!import_fs.default.existsSync(DB_FILE_PATH)) {
      const seed = getSeedState();
      import_fs.default.writeFileSync(DB_FILE_PATH, JSON.stringify(seed, null, 2), "utf-8");
      return seed;
    }
    const dataStr = import_fs.default.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(dataStr);
  } catch (error) {
    console.error("Error reading db.json, returning seed state:", error);
    return getSeedState();
  }
}
function writeDB(data) {
  try {
    import_fs.default.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to db.json:", error);
    return false;
  }
}
function logActivity(userEmail, action) {
  const db = readDB();
  const newActivity = {
    id: `act_${Date.now()}`,
    userEmail,
    action,
    time: "Just now"
  };
  db.activity_logs.unshift(newActivity);
  if (db.activity_logs.length > 40) {
    db.activity_logs = db.activity_logs.slice(0, 40);
  }
  writeDB(db);
}

// src/utils/recommendationEngine.ts
var matchingRules = [
  // --- White Shirts/T-Shirts Bottom matches (1-15) ---
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Navy Blue Chinos",
    baseScore: 98,
    bestOccasions: ["Office", "Interview", "Casual", "College"],
    fashionTip: "A timeless combination. Roll up the sleeves and pair with brown leather loafers."
  },
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Black Trousers",
    baseScore: 96,
    bestOccasions: ["Office", "Interview", "Wedding", "Party"],
    fashionTip: "Ultra sharp. Finish the look with a black leather belt and oxford shoes."
  },
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Beige Pants",
    baseScore: 95,
    bestOccasions: ["Casual", "Travel", "College", "Office"],
    fashionTip: "Fresh, airy, and sophisticated. Pairs perfectly with white clean-cut sneakers."
  },
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Navy Blue Jeans",
    baseScore: 94,
    bestOccasions: ["Casual", "College", "Party", "Travel"],
    fashionTip: "The ultimate smart-casual look. Throw on a brown jacket or grey blazer to layer."
  },
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Olive Green Chinos",
    baseScore: 92,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Earth-toned and highly modern. Elevate with tan desert boots."
  },
  {
    itemType: "Shirt",
    color: "White",
    recommendedItem: "Dark Grey Trousers",
    baseScore: 93,
    bestOccasions: ["Office", "Interview", "College"],
    fashionTip: "Sleek and highly professional. Pair with a dark leather wrist strap."
  },
  {
    itemType: "T-Shirt",
    color: "White",
    recommendedItem: "Black Jeans",
    baseScore: 97,
    bestOccasions: ["Casual", "College", "Travel", "Party"],
    fashionTip: "The classic modern minimalist uniform. Layer with a black leather jacket."
  },
  {
    itemType: "T-Shirt",
    color: "White",
    recommendedItem: "Navy Blue Jeans",
    baseScore: 95,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Effortless and clean. Pairs beautifully with sneakers and simple silver chains."
  },
  {
    itemType: "T-Shirt",
    color: "White",
    recommendedItem: "Grey Chinos",
    baseScore: 92,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Monochromatic utility. Great with white low-tops and sporty sunglasses."
  },
  {
    itemType: "T-Shirt",
    color: "White",
    recommendedItem: "Khaki Chinos",
    baseScore: 91,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Bright and optimistic. Excellent for weekend brunches or outdoor events."
  },
  // --- Black Shirts/T-Shirts matches (16-30) ---
  {
    itemType: "Shirt",
    color: "Black",
    recommendedItem: "Beige Chinos",
    baseScore: 95,
    bestOccasions: ["Casual", "Party", "Office", "College"],
    fashionTip: "Perfect high-contrast balance. Wear with beige suede boots and gold accessories."
  },
  {
    itemType: "Shirt",
    color: "Black",
    recommendedItem: "Grey Trousers",
    baseScore: 96,
    bestOccasions: ["Office", "Party", "Interview"],
    fashionTip: "Sleek and professional. A black shirt with dark grey bottoms creates a slim silhouette."
  },
  {
    itemType: "Shirt",
    color: "Black",
    recommendedItem: "Charcoal Pant",
    baseScore: 93,
    bestOccasions: ["Office", "Party", "Wedding"],
    fashionTip: "Elegant monochrome. Perfect for evening cocktail parties or sleek galleries."
  },
  {
    itemType: "Shirt",
    color: "Black",
    recommendedItem: "Light Blue Jeans",
    baseScore: 91,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Creates a modern, relaxed grunge vibe. Roll the sleeves for an effortless fit."
  },
  {
    itemType: "Shirt",
    color: "Black",
    recommendedItem: "White Trousers",
    baseScore: 94,
    bestOccasions: ["Party", "Wedding", "Casual"],
    fashionTip: "Bold dapper look. Excellent for summer weddings or high-fashion receptions."
  },
  {
    itemType: "T-Shirt",
    color: "Black",
    recommendedItem: "Beige Pants",
    baseScore: 93,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "A great smart casual fit. Looks incredible with minimal white trainers."
  },
  {
    itemType: "T-Shirt",
    color: "Black",
    recommendedItem: "Grey Chinos",
    baseScore: 94,
    bestOccasions: ["Casual", "College", "Travel", "Party"],
    fashionTip: "Low-key, sporty, and highly versatile. Great for everyday urban wear."
  },
  {
    itemType: "T-Shirt",
    color: "Black",
    recommendedItem: "Olive Green Chinos",
    baseScore: 92,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Understated military-inspired palette. Best styled with dark high-top canvas sneakers."
  },
  // --- Navy Blue matches (31-45) ---
  {
    itemType: "Shirt",
    color: "Navy Blue",
    recommendedItem: "Beige Chinos",
    baseScore: 99,
    bestOccasions: ["Office", "College", "Casual", "Travel"],
    fashionTip: "The absolute gold standard in men's style. Tailored, sophisticated, and super warm."
  },
  {
    itemType: "Shirt",
    color: "Navy Blue",
    recommendedItem: "White Pants",
    baseScore: 96,
    bestOccasions: ["Party", "Wedding", "Casual"],
    fashionTip: "Nautical-inspired sophistication. Pair with tan driving shoes or loafers."
  },
  {
    itemType: "Shirt",
    color: "Navy Blue",
    recommendedItem: "Grey Chinos",
    baseScore: 94,
    bestOccasions: ["Office", "Interview", "College"],
    fashionTip: "Professional and stylish. A great swap from standard black/white setups."
  },
  {
    itemType: "Shirt",
    color: "Navy Blue",
    recommendedItem: "Black Jeans",
    baseScore: 90,
    bestOccasions: ["Casual", "Party", "College"],
    fashionTip: "Dark and sophisticated. Fits perfectly with leather chelsea boots."
  },
  {
    itemType: "T-Shirt",
    color: "Navy Blue",
    recommendedItem: "Beige Pants",
    baseScore: 95,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Relaxed and preppy. Classic yachting style. Add leather boating shoes."
  },
  {
    itemType: "T-Shirt",
    color: "Navy Blue",
    recommendedItem: "Grey Chinos",
    baseScore: 92,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Extremely clean and simple. Add an active wristwatch for a sporty finish."
  },
  // --- Light Blue Custom matches (46-55) ---
  {
    itemType: "Shirt",
    color: "Light Blue",
    recommendedItem: "Navy Blue Chinos",
    baseScore: 97,
    bestOccasions: ["Office", "Interview", "Wedding"],
    fashionTip: "Monochrome blues create height. Accentuate with a gold-buckled brown leather belt."
  },
  {
    itemType: "Shirt",
    color: "Light Blue",
    recommendedItem: "Beige Pant",
    baseScore: 96,
    bestOccasions: ["Office", "Casual", "College", "Travel"],
    fashionTip: "Fresh and welcoming business-casual look. Excellent for warm weather."
  },
  {
    itemType: "Shirt",
    color: "Light Blue",
    recommendedItem: "Dark Grey Trouser",
    baseScore: 94,
    bestOccasions: ["Office", "Interview"],
    fashionTip: "Traditional and reliable corporate presentation. Complements classic silver watches."
  },
  {
    itemType: "Shirt",
    color: "Light Blue",
    recommendedItem: "Black Jeans",
    baseScore: 92,
    bestOccasions: ["Casual", "College", "Party"],
    fashionTip: "Understated edge. Soft top color contrasted with sharp black bottom."
  },
  // --- Olive Green matches (56-65) ---
  {
    itemType: "Shirt",
    color: "Olive Green",
    recommendedItem: "Beige Pants",
    baseScore: 95,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Nature-inspired safari vibe. Complete with tan leather accessories and boots."
  },
  {
    itemType: "Shirt",
    color: "Olive Green",
    recommendedItem: "Black Jeans",
    baseScore: 94,
    bestOccasions: ["Casual", "Party", "College"],
    fashionTip: "Rugged and masculine. Pair with a dark silver necklace and heavy-soled boots."
  },
  {
    itemType: "Shirt",
    color: "Olive Green",
    recommendedItem: "Navy Blue Jeans",
    baseScore: 91,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Robust, workwear-inspired outfit. Pairs beautifully with heavy leather jackets."
  },
  // --- Maroon/Burgundy matches (66-75) ---
  {
    itemType: "Shirt",
    color: "Maroon",
    recommendedItem: "Black Jeans",
    baseScore: 96,
    bestOccasions: ["Party", "Casual", "College", "Wedding"],
    fashionTip: "Deep jewel tones matched with slate black. A stunning outfit for dating/evening outings."
  },
  {
    itemType: "Shirt",
    color: "Maroon",
    recommendedItem: "Grey Trousers",
    baseScore: 93,
    bestOccasions: ["Office", "Interview", "Wedding"],
    fashionTip: "A rich color accent that breaks corporate monotony. Finish with oxblood loafers."
  },
  {
    itemType: "Shirt",
    color: "Maroon",
    recommendedItem: "Beige Pants",
    baseScore: 91,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Warm autumn aesthetic. Layer with a grey cardigan or tan overcoat."
  },
  // --- Grey Tops matches (76-85) ---
  {
    itemType: "Shirt",
    color: "Grey",
    recommendedItem: "Black Trousers",
    baseScore: 95,
    bestOccasions: ["Office", "Interview", "Casual"],
    fashionTip: "Understated and super architectural. Style with silver-framed accessories."
  },
  {
    itemType: "T-Shirt",
    color: "Grey",
    recommendedItem: "Navy Blue Jeans",
    baseScore: 94,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "The ultimate weekend attire. Fits seamlessly with blue denim."
  },
  {
    itemType: "T-Shirt",
    color: "Grey",
    recommendedItem: "Black Jeans",
    baseScore: 93,
    bestOccasions: ["Casual", "College", "Travel", "Party"],
    fashionTip: "Low-key urban monochrome. Looks highly polished with minimalist white sneakers."
  },
  // --- Kurta Matches (Special Ethnic Rules) (86-90) ---
  {
    itemType: "Kurta",
    color: "White",
    recommendedItem: "White Pyjamas / Aligarhi",
    baseScore: 98,
    bestOccasions: ["Wedding", "Casual", "College"],
    fashionTip: "Pristine traditional look. Elevate with a colorful bandhgala jacket or brown mojris."
  },
  {
    itemType: "Kurta",
    color: "Yellow",
    recommendedItem: "White Pajamas",
    baseScore: 97,
    bestOccasions: ["Wedding", "Party"],
    fashionTip: "The definitive Haldi ceremony ensemble. Fresh, celebratory, and culturally resonant."
  },
  {
    itemType: "Kurta",
    color: "Navy Blue",
    recommendedItem: "Beige Aligarhi Pyjama",
    baseScore: 96,
    bestOccasions: ["Wedding", "Party", "Casual"],
    fashionTip: "Extremely regal design. Accentuate with an ethnic gold-bordered pocket square."
  },
  {
    itemType: "Kurta",
    color: "Maroon",
    recommendedItem: "Cream Pajama",
    baseScore: 95,
    bestOccasions: ["Wedding", "Party"],
    fashionTip: "Rich, cultural, and outstanding. Best paired with hand-crafted leather kolhapuris."
  },
  // --- Dress Matches (91-95) ---
  {
    itemType: "Dress",
    color: "Black",
    recommendedItem: "Gold Heels & Strappy Sandal",
    baseScore: 98,
    bestOccasions: ["Party", "Wedding", "Interview"],
    fashionTip: "The quintessential Little Black Dress. Elevate with gold dainty jewelry and clutches."
  },
  {
    itemType: "Dress",
    color: "White",
    recommendedItem: "Tan Suede Jacket & Boots",
    baseScore: 96,
    bestOccasions: ["Casual", "Travel", "College"],
    fashionTip: "Light bohemian style. Ideal for sunny outings or resort travel."
  },
  {
    itemType: "Dress",
    color: "Red",
    recommendedItem: "Silver Heels & Black Blazer",
    baseScore: 95,
    bestOccasions: ["Party", "Wedding"],
    fashionTip: "Daring and high elegance. Keep the accessories simple to let the dress stand out."
  },
  // --- Hoodie & Jacket Matches (96-105) ---
  {
    itemType: "Hoodie",
    color: "Black",
    recommendedItem: "Grey Joggers / Charcoal Jeans",
    baseScore: 96,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Excellent athletic street leisure style. Fit clean-cut black sneakers."
  },
  {
    itemType: "Hoodie",
    color: "Grey",
    recommendedItem: "Black Jeans",
    baseScore: 95,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Sleek neutral sports outfit. Easy layering beneath denim jackets."
  },
  {
    itemType: "Jacket",
    color: "Black",
    recommendedItem: "White T-Shirt & Blue Jeans",
    baseScore: 98,
    bestOccasions: ["Casual", "Party", "College", "Travel"],
    fashionTip: "Timeless rockstar aesthetic. Leather, denim, and fresh cotton blend."
  },
  {
    itemType: "Jacket",
    color: "Olive Green",
    recommendedItem: "Black T-Shirt & Black Jeans",
    baseScore: 96,
    bestOccasions: ["Casual", "College", "Travel"],
    fashionTip: "Rugged utility military aesthetic. Pairs beautiful with retro canvas boots."
  }
];
function generateDynamicRecommendation(itemType, color, gender, occasion) {
  const isBottom = ["Pant", "Jeans", "Trouser"].includes(itemType);
  const colorLower = color.toLowerCase();
  let recommendedItem = "Black Pants";
  let baseScore = 85;
  let fashionTip = "A neat visual pairing that works on modern minimalist proportions.";
  if (isBottom) {
    if (colorLower.includes("white") || colorLower.includes("beige") || colorLower.includes("grey")) {
      recommendedItem = "Navy Blue Shirt";
      baseScore = 93;
      fashionTip = `A classic matching. Roll up the cuffs of the shirt to accent the ${color} bottom.`;
    } else {
      recommendedItem = "White T-Shirt / Shirt";
      baseScore = 95;
      fashionTip = `A crisp, pristine top pairs exceptionally with your ${color} bottom to provide balanced density.`;
    }
  } else {
    if (colorLower.includes("navy") || colorLower.includes("blue")) {
      recommendedItem = "Beige Chinos";
      baseScore = 94;
      fashionTip = `The perfect warm earth-tone bottom matches beautifully with your blue top.`;
    } else if (colorLower.includes("black") || colorLower.includes("grey")) {
      recommendedItem = "Grey Chinos";
      baseScore = 91;
      fashionTip = `Create an architectural monochromatic gradient. Style with clean white leather shoes.`;
    } else if (colorLower.includes("white")) {
      recommendedItem = "Navy Blue Jeans";
      baseScore = 96;
      fashionTip = `Always fresh and dynamic. A casual white top matches wonderfully with textured indigo denim.`;
    } else {
      recommendedItem = "Black Jeans / Chinos";
      baseScore = 89;
      fashionTip = `A solid neutral black base helps your ${color} ${itemType} pop with confidence.`;
    }
  }
  return {
    itemType,
    color,
    recommendedItem,
    baseScore,
    bestOccasions: [occasion, "Casual"],
    fashionTip
  };
}
function evaluateOutfitRecommendation(input) {
  const { clothing_type, color, pattern, gender_category, occasion, body_type } = input;
  const activeRules = matchingRules.filter(
    (rule) => rule.itemType === clothing_type && rule.color.toLowerCase().trim() === color.toLowerCase().trim()
  );
  const listToMap = activeRules.length > 0 ? activeRules : [generateDynamicRecommendation(clothing_type, color, gender_category, occasion)];
  return listToMap.map((rule, idx) => {
    let colorScore = rule.baseScore;
    if (pattern === "Checked" || pattern === "Striped") {
      if (rule.recommendedItem.toLowerCase().includes("jean") || rule.recommendedItem.toLowerCase().includes("chino")) {
        colorScore += 2;
      }
    } else if (pattern === "Floral" || pattern === "Printed") {
      if (rule.recommendedItem.toLowerCase().includes("trouser") || rule.recommendedItem.toLowerCase().includes("black")) {
        colorScore += 1;
      } else {
        colorScore -= 3;
      }
    }
    let styleScore = 90;
    if (clothing_type === "Shirt" && rule.recommendedItem.toLowerCase().includes("trouser")) {
      styleScore = 97;
    } else if (clothing_type === "T-Shirt" && rule.recommendedItem.toLowerCase().includes("trouser")) {
      styleScore = 82;
    } else if (clothing_type === "T-Shirt" && rule.recommendedItem.toLowerCase().includes("jeans")) {
      styleScore = 98;
    } else if (clothing_type === "Hoodie" && rule.recommendedItem.toLowerCase().includes("jeans")) {
      styleScore = 96;
    } else if (clothing_type === "Kurta" && rule.recommendedItem.toLowerCase().includes("pyjama")) {
      styleScore = 99;
    }
    let occasionScore = 85;
    const worksWellForSelected = rule.bestOccasions.includes(occasion);
    if (worksWellForSelected) {
      occasionScore = 96;
    } else {
      if (occasion === "Interview") {
        if (clothing_type === "T-Shirt" || clothing_type === "Hoodie") {
          occasionScore = 45;
        } else {
          occasionScore = 75;
        }
      } else if (occasion === "Wedding") {
        if (clothing_type === "Kurta" || clothing_type === "Dress" || clothing_type === "Shirt") {
          occasionScore = 95;
        } else {
          occasionScore = 55;
        }
      } else if (occasion === "Casual" || occasion === "Travel") {
        if (clothing_type === "T-Shirt" || clothing_type === "Hoodie" || clothing_type === "Jacket") {
          occasionScore = 98;
        } else {
          occasionScore = 85;
        }
      }
    }
    colorScore = Math.min(100, Math.max(50, colorScore));
    styleScore = Math.min(100, Math.max(50, styleScore));
    occasionScore = Math.min(100, Math.max(50, occasionScore));
    const overallScore = Math.round(colorScore * 0.45 + styleScore * 0.35 + occasionScore * 0.2);
    let bodyTypeTip = "";
    const bodyLower = body_type.toLowerCase();
    if (bodyLower.includes("slim")) {
      bodyTypeTip = "To flatter your Slim framework, go with well-fitted slim cuts to emphasize alignment. Avoid overly baggy oversized elements which can drown out your silhouette.";
    } else if (bodyLower.includes("athletic")) {
      bodyTypeTip = "To accentuate a athletic silhouette, structured shirts fitted around the shoulders paired with tapered chinos provide a muscular, sharp, and clean appearance.";
    } else if (bodyLower.includes("medium")) {
      bodyTypeTip = "Your Medium physical proportions offer excellent versatility. A classic straight-fit bottom balanced with smart shoulder padding on top provides ideal balance.";
    } else if (bodyLower.includes("curvy") || bodyLower.includes("plus size") || bodyLower.includes("heavy")) {
      bodyTypeTip = "Embrace your shape by aiming for fluid, structured draping. A solid-colored base paired with layered cardigans or structured outerwear adds vertical lines and incredible elegance.";
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
      occasion
    };
  });
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json({ limit: "15mb" }));
var aiClient = null;
function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new import_genai.GoogleGenAI({ apiKey: key });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI client:", err);
      }
    }
  }
  return aiClient;
}
var currentDB = readDB();
console.log(`Database initialized with ${currentDB.users.length} users and ${currentDB.clothing.length} clothing items.`);
app.post("/api/analyze-clothing", async (req, res) => {
  const { image, filename } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image data provided." });
  }
  logActivity("avsatish389@gmail.com", `Initiated clothing image analysis: ${filename || "upload.jpg"}`);
  let mimeType = "image/jpeg";
  let base64Data = image;
  if (image.startsWith("data:")) {
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Data = matches[2];
    }
  }
  const client = getAIClient();
  if (client) {
    try {
      console.log("Sending base64 image to Gemini API for analytical detection...");
      const prompt = `You are a high-end fashion AI expert. Analyze this uploaded clothing item image and determine the following 5 attributes. Respond ONLY with a valid JSON object matching this schema:
{
  "gender": "Men" | "Women" | "Unisex",
  "clothType": "Shirt" | "T-Shirt" | "Pant" | "Jeans" | "Trouser" | "Kurta" | "Dress" | "Hoodie" | "Jacket",
  "color": "White" | "Black" | "Navy Blue" | "Grey" | "Olive Green" | "Beige" | "Brown" | "Maroon" | "Yellow" | "Red" | "Pink" | "Light Blue",
  "hexCode": "The closest #hex code representing the exact color",
  "pattern": "Plain" | "Checked" | "Striped" | "Printed" | "Floral" | "Textured"
}

Ensure the output is parseable raw JSON. Do not include markdown formatting or backticks outside the json structure.`;
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType
            }
          }
        ]
      });
      const responseText = response.text || "";
      console.log("Gemini raw response text:", responseText);
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = responseText.substring(jsonStart, jsonEnd + 1);
        const analysis = JSON.parse(jsonStr);
        const result = {
          gender: analysis.gender || "Unisex",
          bodyType: "Medium",
          // default initial
          clothType: analysis.clothType || "Shirt",
          color: analysis.color || "White",
          pattern: analysis.pattern || "Plain",
          hexCode: analysis.hexCode || "#ffffff"
        };
        const db2 = readDB();
        const newClothing = {
          id: `cloth_${Date.now()}`,
          user_id: "user_satish_1",
          image_url: image.startsWith("data:") ? image : `data:${mimeType};base64,${base64Data}`,
          clothing_type: result.clothType,
          color: result.color,
          hex_code: result.hexCode,
          pattern: result.pattern,
          gender_category: result.gender,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        db2.clothing.push(newClothing);
        writeDB(db2);
        logActivity("avsatish389@gmail.com", `AI completed analysis: Detected ${result.color} ${result.pattern} ${result.clothType}`);
        return res.json({
          ...result,
          clothingId: newClothing.id,
          imageUrl: newClothing.image_url
        });
      }
    } catch (err) {
      console.error("Gemini API execution failed, invoking local fallback:", err);
    }
  }
  console.log("Using local matching engine logic...");
  const nameLower = (filename || "").toLowerCase();
  let detectedType = "Shirt";
  let detectedColor = "White";
  let detectedHex = "#ffffff";
  let detectedPattern = "Plain";
  let detectedGender = "Men";
  if (nameLower.includes("pant") || nameLower.includes("trouser")) {
    detectedType = nameLower.includes("jeans") ? "Jeans" : "Pant";
    detectedColor = "Black";
    detectedHex = "#000000";
  } else if (nameLower.includes("tshirt") || nameLower.includes("t-shirt")) {
    detectedType = "T-Shirt";
    detectedColor = "Light Blue";
    detectedHex = "#add8e6";
  } else if (nameLower.includes("kurta")) {
    detectedType = "Kurta";
    detectedColor = "Olive Green";
    detectedHex = "#556b2f";
    detectedPattern = "Textured";
  } else if (nameLower.includes("dress") || nameLower.includes("frock")) {
    detectedType = "Dress";
    detectedColor = "Maroon";
    detectedHex = "#800000";
    detectedGender = "Women";
  } else if (nameLower.includes("hoodie")) {
    detectedType = "Hoodie";
    detectedColor = "Grey";
    detectedHex = "#808080";
  } else if (nameLower.includes("jacket")) {
    detectedType = "Jacket";
    detectedColor = "Black";
    detectedHex = "#1a1a1a";
  }
  if (nameLower.includes("strip")) {
    detectedPattern = "Striped";
  } else if (nameLower.includes("print")) {
    detectedPattern = "Printed";
  } else if (nameLower.includes("check")) {
    detectedPattern = "Checked";
  } else if (nameLower.includes("floral")) {
    detectedPattern = "Floral";
  }
  const db = readDB();
  const clothingId = `cloth_fb_${Date.now()}`;
  const mockClothingRecord = {
    id: clothingId,
    user_id: "user_satish_1",
    image_url: image,
    // Return raw input image or placeholder
    clothing_type: detectedType,
    color: detectedColor,
    hex_code: detectedHex,
    pattern: detectedPattern,
    gender_category: detectedGender,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.clothing.push(mockClothingRecord);
  writeDB(db);
  logActivity("avsatish389@gmail.com", `Simulated analysis completed to ensure high uptime. Detected ${detectedColor} ${detectedType}`);
  return res.json({
    gender: detectedGender,
    bodyType: "Medium",
    clothType: detectedType,
    color: detectedColor,
    pattern: detectedPattern,
    hexCode: detectedHex,
    clothingId,
    imageUrl: image,
    wasFallback: true
  });
});
app.post("/api/recommend", (req, res) => {
  const { clothingId, clothing_type, color, pattern, gender_category, occasion, body_type } = req.body;
  let activeType = clothing_type;
  let activeColor = color;
  let activePattern = pattern;
  let activeGender = gender_category;
  let activeOccasion = occasion || "Casual";
  let activeBody = body_type || "Medium";
  if (clothingId) {
    const db = readDB();
    const match = db.clothing.find((c) => c.id === clothingId);
    if (match) {
      activeType = match.clothing_type;
      activeColor = match.color;
      activePattern = match.pattern;
      activeGender = match.gender_category;
    }
  }
  if (!activeType || !activeColor) {
    return res.status(400).json({ error: "Missing core clothing attributes to calculate recommendations." });
  }
  const matches = evaluateOutfitRecommendation({
    clothing_type: activeType,
    color: activeColor,
    pattern: activePattern || "Plain",
    gender_category: activeGender || "Men",
    occasion: activeOccasion,
    body_type: activeBody
  });
  return res.json({ recommendations: matches });
});
app.get("/api/saved-outfits", (req, res) => {
  const db = readDB();
  return res.json(db.saved_outfits);
});
app.post("/api/saved-outfits", (req, res) => {
  const { clothingId, recommendedItem, matchScore, occasion, fashionTips } = req.body;
  if (!clothingId || !recommendedItem) {
    return res.status(400).json({ error: "Missing clothingId or recommendation parameters." });
  }
  const db = readDB();
  const clothingItem = db.clothing.find((c) => c.id === clothingId);
  if (!clothingItem) {
    return res.status(404).json({ error: "Associated clothing upload not found in database." });
  }
  const newSaved = {
    id: `saved_${Date.now()}`,
    user_id: "user_satish_1",
    clothing_id: clothingId,
    recommended_item: recommendedItem,
    match_score: matchScore || { overall: 92, color: 90, style: 95, occasion: 90 },
    occasion: occasion || "Casual",
    fashion_tips: fashionTips || "Looks fantastic.",
    clothing_details: {
      clothing_type: clothingItem.clothing_type,
      color: clothingItem.color,
      hex_code: clothingItem.hex_code,
      pattern: clothingItem.pattern,
      image_url: clothingItem.image_url
    },
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.saved_outfits.unshift(newSaved);
  writeDB(db);
  logActivity("avsatish389@gmail.com", `Saved outfit recommendation: ${clothingItem.color} ${clothingItem.clothing_type} paired with ${recommendedItem}`);
  return res.json(newSaved);
});
app.delete("/api/saved-outfits/:id", (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const originalLength = db.saved_outfits.length;
  db.saved_outfits = db.saved_outfits.filter((fit) => fit.id !== id);
  if (db.saved_outfits.length === originalLength) {
    return res.status(404).json({ error: "Saved combination not found." });
  }
  writeDB(db);
  logActivity("avsatish389@gmail.com", `Removed saved outfit combo ID: ${id}`);
  return res.json({ success: true, message: "Outfit combination removed successfully." });
});
app.get("/api/analytics", (req, res) => {
  const db = readDB();
  const totalUsers = db.users.length;
  const totalUploads = db.clothing.length;
  const colorMap = {};
  db.clothing.forEach((c) => {
    if (!colorMap[c.color]) {
      colorMap[c.color] = { count: 0, hex: c.hex_code || "#808080" };
    }
    colorMap[c.color].count++;
  });
  const mostUploadedColors = Object.entries(colorMap).map(([color, val]) => ({ color, hex: val.hex, count: val.count })).sort((a, b) => b.count - a.count).slice(0, 5);
  const popularMatches = db.saved_outfits.map((o) => ({
    source: `${o.clothing_details.color} ${o.clothing_details.clothing_type}`,
    recommendation: o.recommended_item,
    score: o.match_score.overall,
    count: 1
  })).slice(0, 5);
  if (popularMatches.length === 0) {
    popularMatches.push({ source: "White Shirt", recommendation: "Navy Blue Chinos", score: 98, count: 4 });
    popularMatches.push({ source: "Black T-Shirt", recommendation: "Grey Chinos", score: 94, count: 2 });
  }
  const dailyUsers = [
    { date: "Jun 14", count: 4 },
    { date: "Jun 15", count: 6 },
    { date: "Jun 16", count: 12 },
    { date: "Jun 17", count: 8 },
    { date: "Jun 18", count: 15 },
    { date: "Jun 19", count: 21 },
    { date: "Jun 20", count: totalUsers + 5 }
  ];
  const trendsMap = {};
  db.clothing.forEach((c) => {
    trendsMap[c.clothing_type] = (trendsMap[c.clothing_type] || 0) + 1;
  });
  const clothingTrends = Object.entries(trendsMap).map(([type, count]) => ({ type, count }));
  if (clothingTrends.length === 0) {
    clothingTrends.push({ type: "Shirt", count: 10 });
    clothingTrends.push({ type: "T-Shirt", count: 5 });
  }
  const genderMap = { Men: 0, Women: 0, Unisex: 0 };
  db.clothing.forEach((c) => {
    const cat = c.gender_category || "Men";
    genderMap[cat] = (genderMap[cat] || 0) + 1;
  });
  const genderDistribution = Object.entries(genderMap).map(([gender, count]) => ({ gender, count }));
  const response = {
    totalUsers,
    totalUploads,
    mostUploadedColors,
    popularMatches,
    recentActivity: db.activity_logs.slice(0, 10),
    dailyUsers,
    clothingTrends,
    genderDistribution
  };
  return res.json(response);
});
app.get("/api/user-profile", (req, res) => {
  const db = readDB();
  const profile = db.users.find((u) => u.email === "avsatish389@gmail.com") || db.users[0];
  return res.json(profile);
});
app.put("/api/user-profile", (req, res) => {
  const { name, email, gender, body_type } = req.body;
  const db = readDB();
  let profile = db.users.find((u) => u.email === "avsatish389@gmail.com");
  if (profile) {
    profile.name = name || profile.name;
    profile.gender = gender || profile.gender;
    profile.body_type = body_type || profile.body_type;
  } else {
    profile = {
      id: `user_${Date.now()}`,
      name: name || "Satish",
      email: email || "avsatish389@gmail.com",
      gender: gender || "Men",
      body_type: body_type || "Medium",
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.users.push(profile);
  }
  writeDB(db);
  logActivity(profile.email, `Updated profile guidelines: ${profile.gender} (${profile.body_type})`);
  return res.json(profile);
});
app.post("/api/chat-assistant", async (req, res) => {
  const { messages, userProfile } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages list is required for the Chat Assistant." });
  }
  const latestMsg = messages[messages.length - 1]?.text || "";
  const genderContext = userProfile?.gender || "Men";
  const bodyContext = userProfile?.body_type || "Medium";
  const client = getAIClient();
  if (client) {
    try {
      console.log("Sending question to Gemini for dynamic chat consulting...");
      const prompt = `You are "Fashion Finder AI Assistant" - an elite luxury stylist advisor.
The user is ${genderContext} with body type "${bodyContext}".
Address the user directly. Offer exact, professional recommendations for clothing, matching colors, patterns, and styling hacks.
Keep the advice elegant, extremely clean, concise (maximum 3 concise bulleted suggestions or 4 lines), and premium.

User question: ${latestMsg}`;
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      const reply2 = response.text || "I recommend sticking with high-contrast minimal outfits. A white linen button-down with sharp black cotton trousers always communicates timeless luxury.";
      return res.json({ text: reply2 });
    } catch (err) {
      console.error("Chat Assistant Gemini failure, falling back:", err);
    }
  }
  let reply = "A great styling choice for your profile is pairing structured darker tones on top with beige or khaki bottoms. This creates balanced proportions and always feels relaxed yet curated.";
  const qLower = latestMsg.toLowerCase();
  if (qLower.includes("wedding")) {
    reply = `For standard weddings, high-quality linen Kurtas in jewel colors (Maroon, Royal Blue) paired with cream aligarhi pajamas create a stately, regal impression. If going Western, a tailored charcoal suit is excellent.`;
  } else if (qLower.includes("office") || qLower.includes("interview")) {
    reply = `For corporate interview and office settings, stick to traditional colors. A crisp, plain White/Light Blue shirt tucked into custom black or charcoal tapered trousers. Top off with dark oxfords.`;
  } else if (qLower.includes("party")) {
    reply = `To stand out at social events, try clean contrasts. A sleek black shirt with rolled cuffs paired with sleek beige chinos and minimalist brown boots is incredibly modern and appealing.`;
  } else if (qLower.includes("casual") || qLower.includes("college")) {
    reply = `Keep college or weekend wear easy but intentional. Clean-cut crew-neck T-shirts in neutral tones (navy, olive, white) worn with dark indigo denim and immaculate white sneakers.`;
  }
  return res.json({ text: reply });
});
app.use(import_express.default.static(import_path2.default.join(process.cwd(), "dist")));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(import_path2.default.join(process.cwd(), "dist", "index.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Fashion Finder full-stack server running live on port ${PORT}`);
});
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
