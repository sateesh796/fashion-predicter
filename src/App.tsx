/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Heart, 
  Trash2, 
  Layers, 
  User as UserIcon, 
  TrendingUp, 
  MessageSquare, 
  Sliders, 
  HelpCircle, 
  Moon, 
  Sun, 
  Compass, 
  RefreshCw, 
  Check, 
  Filter, 
  Award, 
  Activity, 
  Clock, 
  ShoppingBag, 
  Grid, 
  ChevronRight,
  Monitor
} from 'lucide-react';
import { 
  Gender, 
  BodyType, 
  ClothingType, 
  Pattern, 
  Occasion, 
  User, 
  SavedOutfit, 
  DashboardAnalytics,
  ChatMessage 
} from './types';

// Palette preset options for testing easily
const PRESET_CLOTHES = [
  {
    name: "Classic White T-Shirt",
    type: "T-Shirt" as ClothingType,
    color: "White",
    hex: "#ffffff",
    pattern: "Plain" as Pattern,
    gender: "Unisex" as Gender,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=70"
  },
  {
    name: "Dapper Navy Blue Shirt",
    type: "Shirt" as ClothingType,
    color: "Navy Blue",
    hex: "#002060",
    pattern: "Plain" as Pattern,
    gender: "Men" as Gender,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=70"
  },
  {
    name: "Olive Green Checked Flannel",
    type: "Shirt" as ClothingType,
    color: "Olive Green",
    hex: "#556b2f",
    pattern: "Checked" as Pattern,
    gender: "Men" as Gender,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&auto=format&fit=crop&q=70"
  },
  {
    name: "Black Casual Hoodie",
    type: "Hoodie" as ClothingType,
    color: "Black",
    hex: "#101010",
    pattern: "Plain" as Pattern,
    gender: "Unisex" as Gender,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=70"
  },
  {
    name: "Ethereal Red Party Dress",
    type: "Dress" as ClothingType,
    color: "Red",
    hex: "#d32f2f",
    pattern: "Floral" as Pattern,
    gender: "Women" as Gender,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=70"
  }
];

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'landing' | 'analyzer' | 'wardrobe' | 'analytics' | 'chat'>('landing');
  
  // Theme management (Gold Accent on Slate Dark default, convertible to Warm Light Luxury)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Active user profile
  const [userProfile, setUserProfile] = useState<User>({
    id: 'user_satish_1',
    name: 'Satish',
    email: 'avsatish389@gmail.com',
    gender: 'Men',
    body_type: 'Medium',
    created_at: new Date().toISOString()
  });

  // State managers
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('Casual');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    gender: Gender;
    clothType: ClothingType;
    color: string;
    pattern: Pattern;
    hexCode: string;
    clothingId?: string;
    imageUrl?: string;
  } | null>(null);

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [generatingRecs, setGeneratingRecs] = useState(false);

  // Saved combinations from DB
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [loadingWardrobe, setLoadingWardrobe] = useState(false);

  // Admin Telemetry state
  const [analyticsData, setAnalyticsData] = useState<DashboardAnalytics | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Stylist Chat assistant state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Good day! I am your elite Fashion Finder Stylist. Ask me how to match your wardrobe pieces, dressing strategies for special corporate events, or matching colors for the upcoming pleasant weather.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userChatInput, setUserChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Camera capture integration
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Similar products filtering mocks
  const [budgetFilter, setBudgetFilter] = useState('medium');
  const [brandFilter, setBrandFilter] = useState('premium');
  const [sizeFilter, setSizeFilter] = useState('M');

  // Trigger loading initial database items
  useEffect(() => {
    fetchProfile();
    fetchSavedWardrobe();
    fetchAnalytics();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user-profile');
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
      }
    } catch (e) {
      console.error('Failed to pull profile guidelines:', e);
    }
  };

  const saveProfilePreferences = async (updates: Partial<User>) => {
    const updated = { ...userProfile, ...updates };
    setUserProfile(updated);
    try {
      await fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      fetchAnalytics(); // Refresh ticker
    } catch (e) {
      console.error('Failed to sync profile specs:', e);
    }
  };

  const fetchSavedWardrobe = async () => {
    setLoadingWardrobe(true);
    try {
      const res = await fetch('/api/saved-outfits');
      if (res.ok) {
        const data = await res.json();
        setSavedOutfits(data);
      }
    } catch (e) {
      console.error('Failed to load saved combinations:', e);
    } finally {
      setLoadingWardrobe(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (e) {
      console.error('Failed to load admin analytics:', e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Run matching recommendation algorithm
  const generateOutfitCombinations = async (clothId: string, resultData: any, targetOccasion: Occasion) => {
    setGeneratingRecs(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clothingId: clothId,
          clothing_type: resultData.clothType,
          color: resultData.color,
          pattern: resultData.pattern,
          gender_category: resultData.gender,
          occasion: targetOccasion,
          body_type: userProfile.body_type
        })
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (err) {
      console.error('Recommendation computing error:', err);
    } finally {
      setGeneratingRecs(false);
    }
  };

  // Analyze clothing upload
  const triggerClothingAnalysis = async (base64String: string, filename: string) => {
    setAnalyzing(true);
    setAnalysisResult(null);
    setRecommendations([]);
    
    try {
      const res = await fetch('/api/analyze-clothing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64String,
          filename
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data);
        // Automatically fetch suitable outfit matches with the profile occasion
        if (data.clothingId) {
          await generateOutfitCombinations(data.clothingId, data, selectedOccasion);
        }
        // Fetch matches & activity tracker update
        fetchAnalytics();
      } else {
        alert('Analysis call failed. Kindly try another clear image.');
      }
    } catch (err) {
      console.error('Clothing analyzer error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Change occasion listener - auto re-recommends!
  const handleOccasionChange = async (occ: Occasion) => {
    setSelectedOccasion(occ);
    if (analysisResult && analysisResult.clothingId) {
      await generateOutfitCombinations(analysisResult.clothingId, analysisResult, occ);
    }
  };

  // Handle local file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedFile(result);
      triggerClothingAnalysis(result, file.name);
    };
    reader.readAsDataURL(file);
  };

  // Setup live camera capture
  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera source is inaccessible without permissions or user rejection:', err);
      alert('Camera access declined or unavailable on this browser window.');
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedFile(dataUrl);
        setSelectedFileName('camera_snapshot.jpg');
        
        // Stop camera tracks helper
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setCameraActive(false);

        // Run detection
        triggerClothingAnalysis(dataUrl, 'camera_snapshot.jpg');
      }
    }
  };

  const cancelCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setCameraActive(false);
  };

  const usePresetAndAnalyze = (preset: typeof PRESET_CLOTHES[0]) => {
    // Convert preset image to dataURL by proxying or simulate base64 representation directly
    setSelectedFile(preset.image);
    setSelectedFileName(preset.name);
    triggerClothingAnalysis(preset.image, `${preset.name.toLowerCase().replace(/ /g, '_')}.jpg`);
  };

  // Favorite / Save Action
  const saveCurrentComboToWardrobe = async (rec: any) => {
    if (!analysisResult || !analysisResult.clothingId) return;

    try {
      const res = await fetch('/api/saved-outfits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clothingId: analysisResult.clothingId,
          recommendedItem: rec.recommendedItem,
          matchScore: rec.match_score,
          occasion: selectedOccasion,
          fashionTips: rec.fashion_tips
        })
      });

      if (res.ok) {
        fetchSavedWardrobe();
        alert(`Successfully saved this matches to your Wardrobe! Check it out inside the Saved Wardrobe tab.`);
      }
    } catch (e) {
      console.error('Failed saving favorite:', e);
    }
  };

  // Delete saved outfit
  const deleteSavedOutfit = async (id: string) => {
    if (!confirm('Are you certain you wish to delete this curated outfit combo?')) return;
    try {
      const res = await fetch(`/api/saved-outfits/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSavedOutfits(prev => prev.filter(item => item.id !== id));
        fetchAnalytics(); // Refresh ticker statistics
      }
    } catch (error) {
      console.error('Could not discard saved combo:', error);
    }
  };

  // Chat conversational flow
  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatInput.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: userChatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setUserChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          userProfile: {
            gender: userProfile.gender,
            body_type: userProfile.body_type
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [...prev, {
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (err) {
      console.error('Chat AI failure:', err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedFile(result);
        triggerClothingAnalysis(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset query buttons for Chat page
  const QUICK_PROMPTS = [
    { text: "What should I pair with a navy denim coat?", icon: "🧥" },
    { text: "Corporate interview attire recommendations", icon: "💼" },
    { text: "Best color combinations for floral shirts", icon: "🌸" },
    { text: "How to carry off oversized hoodies?", icon: "🧢" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0A0A0A] text-slate-100 selection:bg-amber-400/20 selection:text-amber-200' 
        : 'bg-[#FAF9F6] text-stone-900 selection:bg-amber-100 selection:text-amber-800'
    }`} id="fashion-finder-main">
      
      {/* Dynamic Upper Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700"></div>

      {/* Primary Header Bar */}
      <header className={`border-b ${isDarkMode ? 'border-white/5 bg-black/90' : 'border-stone-200 bg-white/95'} sticky top-0 z-40 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brand Accent */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab('landing')}
            id="branding-logo"
          >
            <div className="bg-gradient-to-br from-amber-600 to-amber-400 p-2.5 rounded-lg flex items-center justify-center text-black font-semibold shadow-md shadow-amber-500/10">
              <Sparkles className="w-5 h-5 text-black animate-pulse" />
            </div>
            <div>
              <span className="font-serif tracking-widest text-lg sm:text-2xl font-bold uppercase block bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent">
                Fashion Finder
              </span>
              <span className="text-[10px] tracking-wider uppercase opacity-60 block -mt-1 font-sans">
                Find Your Perfect Match
              </span>
            </div>
          </div>

          {/* Nav Links for Larger Screens */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'landing' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('analyzer')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'analyzer' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Matcher
            </button>
            <button 
              onClick={() => { setActiveTab('wardrobe'); fetchSavedWardrobe(); }}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'wardrobe' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Saved Wardrobe ({savedOutfits.length})
            </button>
            <button 
              onClick={() => { setActiveTab('analytics'); fetchAnalytics(); }}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'analytics' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Boutique Analytics
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'chat' 
                  ? 'text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Stylist Chat
            </button>
          </nav>

          {/* Right Header Options */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 text-amber-200 bg-white/5 hover:bg-white/10' 
                  : 'border-stone-300 text-stone-700 bg-stone-100 hover:bg-stone-200'
              }`}
              title="Toggle Dark/Light Premium Theme"
              id="theme-toggler"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Drawer State (Quick selection dropdown in header) */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${
              isDarkMode ? 'border-white/10 bg-white/5' : 'border-stone-300 bg-stone-100'
            }`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-semibold opacity-80 uppercase tracking-wider">{userProfile.name}</span>
              <span className="opacity-50">({userProfile.gender} / {userProfile.body_type})</span>
            </div>

            {/* Premium action client */}
            <button 
              onClick={() => setActiveTab('analyzer')} 
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold text-xs py-2 px-4 rounded-md tracking-wider uppercase transition-all shadow-lg shadow-amber-600/10"
              id="cta-client-header"
            >
              Analyze Fit
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Sticky Navigation Tab List */}
      <div className={`md:hidden flex overflow-x-auto select-none border-b py-2 px-1 gap-1 sticky top-20 z-30 ${
        isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-stone-50 border-stone-200'
      }`} id="mobile-tabs-rail">
        <button 
          onClick={() => setActiveTab('landing')}
          className={`flex-none py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-widest ${
            activeTab === 'landing' ? 'bg-amber-500 text-black' : 'text-slate-400'
          }`}
        >
          Landing
        </button>
        <button 
          onClick={() => setActiveTab('analyzer')}
          className={`flex-none py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-widest ${
            activeTab === 'analyzer' ? 'bg-amber-500 text-black' : 'text-slate-400'
          }`}
        >
          AI Matcher
        </button>
        <button 
          onClick={() => { setActiveTab('wardrobe'); fetchSavedWardrobe(); }}
          className={`flex-none py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-widest ${
            activeTab === 'wardrobe' ? 'bg-amber-500 text-black' : 'text-slate-400'
          }`}
        >
          Saved ({savedOutfits.length})
        </button>
        <button 
          onClick={() => { setActiveTab('analytics'); fetchAnalytics(); }}
          className={`flex-none py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-widest ${
            activeTab === 'analytics' ? 'bg-amber-500 text-black' : 'text-slate-400'
          }`}
        >
          Analytics
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-none py-1.5 px-3 rounded-md text-[10px] uppercase font-bold tracking-widest ${
            activeTab === 'chat' ? 'bg-amber-500 text-black' : 'text-slate-400'
          }`}
        >
          Stylist Chat
        </button>
      </div>

      {/* -------------------- 1. LANDING PAGE VIEW -------------------- */}
      {activeTab === 'landing' && (
        <div className="animate-fade-in" id="landing-page-view">
          
          {/* Gorgeous Hero Showcase */}
          <section className="relative py-20 px-4 overflow-hidden text-center max-w-7xl mx-auto">
            {/* Background luxury lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Wardrobe Specialist
              </div>
              
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none">
                Upload Your Outfit & <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent font-serif italic text-3xl sm:text-5xl md:text-6xl">
                  Discover Your Perfect Match
                </span>
              </h1>
              
              <p className={`text-sm sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} leading-relaxed font-sans`}>
                Experience premium digital tailoring. Powered by Google Gemini-2.5 models to scan clothing tones, determine fabrics, analyze weave patterns, and curate personalized outfit matches tailored to your physique and events.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('analyzer')}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-400 text-black font-semibold uppercase tracking-wider py-4 px-8 rounded-md transition-all hover:brightness-110 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload Clothing
                </button>
                <button 
                  onClick={() => {
                    // Prepopulate with first sample preset for demo
                    usePresetAndAnalyze(PRESET_CLOTHES[0]);
                    setActiveTab('analyzer');
                  }}
                  className={`w-full sm:w-auto font-semibold uppercase tracking-wider py-4 px-8 rounded-md transition-all border ${
                    isDarkMode 
                      ? 'border-white/10 text-white bg-white/5 hover:bg-white/10' 
                      : 'border-stone-300 text-stone-950 bg-white hover:bg-stone-50'
                  }`}
                >
                  Try Living Demo
                </button>
              </div>

              {/* Minimal Trust Badge Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 text-center border-t border-white/5 mt-12">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-amber-400">100+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 mt-1">Curated Stylist Rules</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-amber-400">Gemini 2.5</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 mt-1">High-Acuity Computer Vision</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-amber-400">Smart UI</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 mt-1">Live Camera Interface</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-amber-400">Self-Curing</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 mt-1">Automatic Diagnostics</div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-Time User Settings Section (Style Profile Selector) */}
          <section className={`py-12 border-t border-b ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-stone-200 bg-stone-50'}`} id="preference-config-panel">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">Configure Your Stylist Guidelines</h2>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
                  Tell your AI Stylist your biological frame preference and clothing metrics to receive customized fit tips.
                </p>
              </div>

              {/* Simple Responsive Control Panel */}
              <div className={`p-6 sm:p-8 rounded-xl border max-w-2xl mx-auto ${
                isDarkMode ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-stone-200'
              }`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Gender Category selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest opacity-70 block">Target Wardrobe Gender</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Men', 'Women', 'Unisex'] as Gender[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => saveProfilePreferences({ gender: g, body_type: g === 'Men' ? 'Medium' : 'Medium' })}
                          className={`py-2 text-xs rounded-md font-semibold border uppercase tracking-wider transition-all ${
                            userProfile.gender === g
                              ? 'bg-amber-500 text-black border-amber-500'
                              : isDarkMode
                                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Body Type Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest opacity-70 block">Physical Framework Type</label>
                    <select
                      value={userProfile.body_type}
                      onChange={(e) => saveProfilePreferences({ body_type: e.target.value as BodyType })}
                      className={`w-full py-2.5 px-3 rounded-md text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        isDarkMode ? 'bg-black border-white/10 text-white' : 'bg-stone-50 border-stone-200 text-stone-900'
                      }`}
                    >
                      {userProfile.gender === 'Women' ? (
                        <>
                          <option value="Slim">Slim Preferred</option>
                          <option value="Medium">Medium Classic</option>
                          <option value="Curvy">Curvy Silhouette</option>
                          <option value="Plus Size">Plus Size / Inclusive</option>
                        </>
                      ) : (
                        <>
                          <option value="Slim">Slim Frame</option>
                          <option value="Medium">Medium Athletic</option>
                          <option value="Athletic">Athletic Trim</option>
                          <option value="Heavy">Heavy / Broad Silhouette</option>
                        </>
                      )}
                    </select>
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3 text-xs opacity-80 justify-center">
                  <UserIcon className="w-4 h-4 text-amber-500" />
                  <span>Configured targeting for <b>{userProfile.name}</b> (avsatish389@gmail.com)</span>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Module - Dynamic Cards */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-[10px] tracking-widest font-bold uppercase text-amber-400">Step by Step</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">Unlocking The Perfect Curation</h2>
              <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Step 1 */}
              <div className={`p-8 rounded-xl border text-center space-y-4 transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-serif text-lg font-bold mx-auto">
                  01
                </div>
                <h3 className="font-serif text-lg font-bold">Snap or Upload</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} leading-relaxed`}>
                  Take a raw snapshot using your device webcam, paste an image link, or upload any PNG/JPG of your shirt, trouser, or dress.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-8 rounded-xl border text-center space-y-4 transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-serif text-lg font-bold mx-auto">
                  02
                </div>
                <h3 className="font-serif text-lg font-bold">High-Acuity Scans</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} leading-relaxed`}>
                  The Google Gemini vision pipeline checks the fabric color hexes, detects pattern layout (plain, checked, striped), and categorizes gender.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-8 rounded-xl border text-center space-y-4 transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-serif text-lg font-bold mx-auto">
                  03
                </div>
                <h3 className="font-serif text-lg font-bold">Style Match & Tips</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} leading-relaxed`}>
                  View high accuracy compatibility metrics tailored to Office, Parties, or Weddings, download similar product filters, and pin outfits as saved favorites.
                </p>
              </div>

            </div>
          </section>

          {/* Testimonials */}
          <section className={`py-16 ${isDarkMode ? 'bg-black/60 border-t border-amber-500/10' : 'bg-stone-50 border-t border-stone-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Endorsements</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2">What Style Connoisseurs Say</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    quote: "The color hex mapping and instant smart matches for wedding Kurtas is remarkably intelligent. Saved me hours of guesswork.",
                    author: "Rohan Malhotra",
                    role: "Creative Director"
                  },
                  {
                    quote: "Its body-type advice tailored tips are highly accurate. It recommended a high-contrast dark green flannel over white chinos that received infinite compliments.",
                    author: "Alisha Sen",
                    role: "Premium Fashion Consultant"
                  },
                  {
                    quote: "Seamless, elegant, and fast. The camera snapshot allows quick checks right when dressing up.",
                    author: "Karthik Raja",
                    role: "Senior UX Designer"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`p-6 rounded-lg border ${
                    isDarkMode ? 'bg-zinc-900/40 border-white/5' : 'bg-white border-stone-200'
                  }`}>
                    <p className="text-xs sm:text-sm italic opacity-85 leading-relaxed">"{item.quote}"</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-bold text-xs uppercase">
                        {item.author[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{item.author}</div>
                        <div className="text-[10px] opacity-50">{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold">Frequently Asked Inquiries</h2>
              <div className="h-0.5 w-12 bg-amber-500 mx-auto mt-2"></div>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How does the AI recommend matching clothing outfits?",
                  a: "Fashion Finder utilizes a hybrid rule engine combined with Google Gemini's cognitive vision capabilities. It checks the uploaded garment's color, pattern, category, and matching profiles against 100+ formal designer styling templates. It then applies physical adjustments based on your configured framework structure (athletic, broad, slim) and desired occasion constraints."
                },
                {
                  q: "What types of images give the premium accurate detection results?",
                  a: "Plain background flat-lays or clear photographs of you wearing the single item under bright, natural lighting will enable the computer vision engine to accurately extract color hex values and detect stripes, florals, plaids, and patterns."
                },
                {
                  q: "Where is my wardrobe data saved?",
                  a: "Your outfit bookmarks, history logs, and profile choices are saved to a localized fast JSON database (db.json) persistently running on our Cloud containers, meaning your files are retained for future wardrobe checks."
                }
              ].map((faq, index) => (
                <div key={index} className={`p-5 rounded-lg border ${
                  isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-stone-200'
                }`}>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-amber-400 mb-2">{faq.q}</h4>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* -------------------- 2. AI ANALYZER & MATCHING VIEW -------------------- */}
      {activeTab === 'analyzer' && (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12" id="ai-analyzer-view">
          
          {/* Header Description */}
          <div className="text-center space-y-3 mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Active Clothing Diagnostic Chamber</h1>
            <p className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
              Capture with your camera or launch an image upload to let Gemini assess your clothing specifications & trigger the premium match scores.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image inputs & Capture tools (40% space on big screen) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Main Upload Box */}
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative ${
                  cameraActive ? 'hidden' : ''
                } ${
                  isDarkMode 
                    ? 'border-white/10 hover:border-amber-400/50 bg-zinc-900/40 hover:bg-zinc-900/60' 
                    : 'border-stone-300 hover:border-amber-500 bg-white hover:bg-stone-50'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                id="drag-drop-container"
              >
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handleFileUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="file-upload-input"
                />
                
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm sm:text-base">Drag &amp; Drop or Choose File</p>
                    <p className="text-[10px] sm:text-xs opacity-50 mt-1">Supports PNG, JPG, WEBP up to 12MB</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-5 bg-white/10"></span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">or capture</span>
                    <span className="h-px w-5 bg-white/10"></span>
                  </div>
                </div>
              </div>

              {/* Camera Frame Preview Container */}
              {cameraActive && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-stone-200'
                }`}>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      Live Camera View
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={capturePhoto}
                      className="flex-1 bg-amber-500 text-black font-semibold text-xs uppercase py-2.5 rounded-md flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-black" /> Snap Screenshot
                    </button>
                    <button 
                      onClick={cancelCamera}
                      className={`px-4 py-2.5 text-xs font-semibold uppercase rounded-md border ${
                        isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Live camera initiator button */}
              {!cameraActive && (
                <button
                  onClick={startCamera}
                  className={`w-full py-3 rounded-lg border font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all ${
                    isDarkMode 
                      ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white' 
                      : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-900'
                  }`}
                  id="camera-initiator"
                >
                  <Camera className="w-4.5 h-4.5 text-amber-500 animate-pulse" /> Launch Computer Webcam
                </button>
              )}

              {/* Canvas hidden helper */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Preset Sample Gallery selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Try with Preset Wardrobe Pieces</span>
                  <span className="text-[10px] text-amber-400 font-medium">Quick Click</span>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_CLOTHES.map((preset, index) => (
                    <div 
                      key={index}
                      onClick={() => usePresetAndAnalyze(preset)}
                      className={`aspect-square rounded-lg overflow-hidden border cursor-pointer hover:scale-105 transition-all relative group ${
                        selectedFileName === preset.name ? 'border-amber-500 scale-105 ring-1 ring-amber-500' : 'border-white/10'
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.image} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-opacity flex items-center justify-center">
                        <span className="text-[9px] text-white font-semibold text-center leading-none p-1 bg-black/60 rounded">
                          {preset.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick style settings recap tool */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDarkMode ? 'bg-zinc-900/60 border-white/5' : 'bg-white border-stone-200'
              }`}>
                <div className="flex items-center justify-between border-b pb-2 border-white/5">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-75 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-amber-400" /> Target Profile specs
                  </span>
                  <button onClick={() => setActiveTab('landing')} className="text-[10px] text-amber-400 hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="opacity-50 block text-[9px] uppercase">Gender Selection</span>
                    <span className="font-semibold font-serif text-amber-400">{userProfile.gender}</span>
                  </div>
                  <div>
                    <span className="opacity-50 block text-[9px] uppercase">Physique Trim</span>
                    <span className="font-semibold font-serif text-amber-400">{userProfile.body_type}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: AI Analysis & Matching Results output (70% space) */}
            <div className="lg:col-span-7">
              
              {/* When Analyzer is active / working */}
              {analyzing && (
                <div className={`p-10 rounded-xl border text-center space-y-6 ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                }`} id="loading-diagnostic">
                  
                  {/* Luxury dynamic spinner */}
                  <div className="relative w-16 h-16 mx-auto animate-spin">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-amber-500"></div>
                  </div>

                  <div className="space-y-2 max-w-sm mx-auto">
                    <h3 className="font-serif text-lg font-bold">Scanning Fabric Specifications...</h3>
                    <p className="text-xs opacity-60">
                      Gemini deep vision pipeline is detecting weave alignments, color coordinates, matching scores, and occasion suitability...
                    </p>
                  </div>

                  {/* Elegant step ticks */}
                  <div className="max-w-xs mx-auto text-left space-y-2 pt-4 border-t border-white/5 text-[11px] opacity-70">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Parsing uploaded binary payload...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>Running Gemini Multi-modal color hex extractor...</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/10"></div>
                      <span>Simulated designer rule validation checks...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* No upload or analysis yet message */}
              {!analyzing && !analysisResult && (
                <div className={`p-14 rounded-xl border text-center space-y-4 ${
                  isDarkMode ? 'bg-zinc-900/30 border-white/5' : 'bg-stone-50 border-stone-200'
                }`} id="chamber-idle-state">
                  <div className="w-16 h-16 bg-amber-500/5 text-amber-500/40 rounded-full flex items-center justify-center mx-auto border border-dashed border-amber-500/20">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold">Diagnostic Chamber is Empty</h3>
                    <p className="text-xs opacity-60 max-w-sm mx-auto">
                      There is no active scanned outfit yet. Upload a garment or click on of the presets above to start matching outfits.
                    </p>
                  </div>
                </div>
              )}

              {/* Analysis and recommendations results section */}
              {!analyzing && analysisResult && (
                <div className="space-y-8 animate-fade-in" id="analysis-successful-box">
                  
                  {/* Results summary header card */}
                  <div className={`p-6 rounded-xl border ${
                    isDarkMode ? 'bg-[#0E0E0E] border-[#C5A880]/30 shadow-lg shadow-amber-500/5' : 'bg-white border-stone-200 shadow-md'
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left thumbnail */}
                      <div className="md:col-span-4 aspect-square rounded-lg overflow-hidden border border-white/10 bg-slate-950">
                        {selectedFile && (
                          <img 
                            src={selectedFile} 
                            alt="Uploaded item" 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>

                      {/* Right credentials detected */}
                      <div className="md:col-span-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-amber-500 text-black px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                            Diagnostics Pass
                          </span>
                          <span className="text-[10px] opacity-40 uppercase tracking-widest flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Just Scanned
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xs opacity-50 uppercase tracking-widest">Active Document Scanned</h3>
                          <p className="font-serif text-2xl font-bold text-amber-400 capitalize">
                            {analysisResult.color} {analysisResult.clothType}
                          </p>
                        </div>

                        {/* Attribute Badges */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-2 rounded border flex flex-col justify-between ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <span className="opacity-50 block text-[9px] uppercase">Gender Category</span>
                            <span className="font-semibold font-serif">{analysisResult.gender}</span>
                          </div>
                          <div className={`p-2 rounded border flex flex-col justify-between ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <span className="opacity-50 block text-[9px] uppercase">Fabric Pattern</span>
                            <span className="font-semibold font-serif">{analysisResult.pattern}</span>
                          </div>
                          <div className={`p-2 rounded border flex flex-col justify-between ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <span className="opacity-50 block text-[9px] uppercase">Detected Color Code</span>
                            <span className="font-semibold font-serif flex items-center gap-2">
                              <span 
                                className="w-3.5 h-3.5 rounded border border-white/20 block" 
                                style={{ backgroundColor: analysisResult.hexCode }} 
                              />
                              {analysisResult.hexCode}
                            </span>
                          </div>
                          <div className={`p-2 rounded border flex flex-col justify-between ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <span className="opacity-50 block text-[9px] uppercase">Item Class Group</span>
                            <span className="font-semibold font-serif">{analysisResult.clothType}</span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Recommendation Control Tab / Occasion Selector */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div>
                        <h3 className="font-serif text-xl font-bold">Recommended Combination Matches</h3>
                        <p className="text-xs opacity-60">Select appropriate setting target to recalculate score ratings.</p>
                      </div>

                      {/* Select occasion dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-65 flex items-center gap-1">
                          <Filter className="w-3.5 h-3.5 text-amber-500" /> Target Occasion:
                        </span>
                        <select 
                          value={selectedOccasion}
                          onChange={(e) => handleOccasionChange(e.target.value as Occasion)}
                          className={`text-xs py-1 px-2.5 rounded font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                            isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-stone-100 border-stone-300 text-stone-900'
                          }`}
                        >
                          {(['College', 'Office', 'Interview', 'Party', 'Wedding', 'Casual', 'Travel'] as Occasion[]).map(occ => (
                            <option key={occ} value={occ}>{occ}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Output Matches Card Loop */}
                    {generatingRecs ? (
                      <div className="py-12 text-center text-xs opacity-50 flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-500" /> Curating combination matches...
                      </div>
                    ) : recommendations.length === 0 ? (
                      <div className="p-8 text-center text-xs opacity-50 border border-dashed border-white/5 rounded">
                        No matches were validated for this exact configuration. Try choosing other target occasions.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recommendations.map((rec, index) => {
                          const overallScore = rec.match_score.overall;
                          
                          // Score color helper
                          let scoreColorClass = "text-emerald-400";
                          if (overallScore < 80) scoreColorClass = "text-amber-400";
                          if (overallScore < 60) scoreColorClass = "text-red-400";

                          return (
                            <div 
                              key={rec.id || index}
                              className={`p-6 rounded-xl border relative transition-all hover:translate-x-1 ${
                                isDarkMode ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-stone-200 shadow-sm'
                              }`}
                            >
                              
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                
                                {/* Score metric */}
                                <div className="md:col-span-3 text-center border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 flex flex-col justify-center items-center">
                                  <span className="text-[10px] uppercase tracking-widest opacity-60">Overall Rating</span>
                                  <span className={`font-serif text-5xl font-black block my-1 ${scoreColorClass}`}>
                                    {overallScore}%
                                  </span>
                                  <span className="text-[9px] font-sans opacity-40 lowercase">calculated matching score</span>
                                </div>

                                {/* Curated bottom suggestions detail */}
                                <div className="md:col-span-9 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 text-amber-500">Perfect Bottom Match</span>
                                      <h4 className="font-serif text-lg font-bold">{rec.recommendedItem}</h4>
                                    </div>
                                    
                                    {/* Action button to Favorize / Download */}
                                    <button 
                                      onClick={() => saveCurrentComboToWardrobe(rec)}
                                      className="text-xs bg-amber-500 text-black py-1.5 px-3 rounded font-bold uppercase tracking-wider hover:bg-amber-400 transition-all flex items-center gap-1.5 mt-1 sm:mt-0"
                                    >
                                      <Heart className="w-3.5 h-3.5 fill-black text-black" /> Save Outfit
                                    </button>
                                  </div>

                                  {/* Metric breakdown bars */}
                                  <div className="grid grid-cols-3 gap-2 text-[10px] uppercase font-bold">
                                    <div>
                                      <div className="flex justify-between mb-1 opacity-70">
                                        <span>Color Match</span>
                                        <span>{rec.match_score.color}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${rec.match_score.color}%` }} />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1 opacity-70">
                                        <span>Style Fit</span>
                                        <span>{rec.match_score.style}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${rec.match_score.style}%` }} />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1 opacity-70">
                                        <span>Occasion Code</span>
                                        <span>{rec.match_score.occasion}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${rec.match_score.occasion}%` }} />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Curated tips */}
                                  <div className={`p-3 rounded text-xs leading-relaxed ${
                                    isDarkMode ? 'bg-black/60 text-slate-300' : 'bg-stone-50 text-stone-700'
                                  }`}>
                                    <span className="font-bold block text-[10px] uppercase text-amber-400 mb-0.5">AI Styling Advice:</span>
                                    {rec.fashion_tips}
                                  </div>

                                </div>

                              </div>

                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>

                  {/* Mock similar products suggestions with simple selectors */}
                  <div className={`p-6 rounded-xl border space-y-4 ${
                    isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                  }`} id="similar-product-search">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <h4 className="font-serif text-lg font-bold">Similar Product Search &amp; Filters</h4>
                        <p className="text-[10px] opacity-60">Simulate searching validated brand clothes to complete your look.</p>
                      </div>
                      <ShoppingBag className="w-5 h-5 text-amber-500" />
                    </div>

                    {/* Filter controls */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-widest opacity-50 block mb-1">Target Budget</label>
                        <select 
                          value={budgetFilter}
                          onChange={(e) => setBudgetFilter(e.target.value)}
                          className={`w-full text-xs py-1.5 px-2 rounded font-semibold ${
                            isDarkMode ? 'bg-black border-white/10' : 'bg-stone-100 border-stone-300 text-stone-900'
                          }`}
                        >
                          <option value="minimal">Budget Friendly ($)</option>
                          <option value="medium">Standard Mid-tier ($$)</option>
                          <option value="premium">Elite Premium ($$$)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-widest opacity-50 block mb-1">Brand Style</label>
                        <select 
                          value={brandFilter}
                          onChange={(e) => setBrandFilter(e.target.value)}
                          className={`w-full text-xs py-1.5 px-2 rounded font-semibold ${
                            isDarkMode ? 'bg-black border-white/10' : 'bg-stone-100 border-stone-300 text-stone-900'
                          }`}
                        >
                          <option value="zara">Fast Street (Zara / H&amp;M)</option>
                          <option value="premium">Designer Classic (Calvin Klein)</option>
                          <option value="luxury">Luxury Heritage (Gucci / Saint Laurent)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-widest opacity-50 block mb-1">Fitted Size</label>
                        <select 
                          value={sizeFilter}
                          onChange={(e) => setSizeFilter(e.target.value)}
                          className={`w-full text-xs py-1.5 px-2 rounded font-semibold ${
                            isDarkMode ? 'bg-black border-white/10' : 'bg-stone-100 border-stone-300 text-stone-900'
                          }`}
                        >
                          <option value="S">Small (S)</option>
                          <option value="M">Medium (M)</option>
                          <option value="L">Large (L)</option>
                          <option value="XL">Extra Large (XL)</option>
                        </select>
                      </div>
                    </div>

                    {/* Mocked Search lists based on parameters */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className={`p-3 rounded border flex items-center gap-3 ${
                        isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'
                      }`}>
                        <div className="w-10 h-10 rounded bg-[#C5A880]/20 flex items-center justify-center font-bold font-serif text-amber-500 text-xs">
                          {budgetFilter === 'premium' ? '$$$' : budgetFilter === 'medium' ? '$$' : '$'}
                        </div>
                        <div>
                          <div className="text-xs font-bold capitalize">
                            {brandFilter === 'luxury' ? 'Vogue Heritage' : 'Classic Fitted'} Chino
                          </div>
                          <div className="text-[10px] opacity-40">Size: {sizeFilter} | Free Delivery</div>
                          <div className="text-xs font-bold text-amber-400 mt-0.5">
                            {budgetFilter === 'premium' ? '$145.00' : budgetFilter === 'medium' ? '$65.00' : '$29.00'}
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 rounded border flex items-center gap-3 ${
                        isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'
                      }`}>
                        <div className="w-10 h-10 rounded bg-[#C5A880]/20 flex items-center justify-center font-bold font-serif text-amber-500 text-xs">
                          {budgetFilter === 'premium' ? '$$$' : budgetFilter === 'medium' ? '$$' : '$'}
                        </div>
                        <div>
                          <div className="text-xs font-bold capitalize">Custom Brushed Loafers</div>
                          <div className="text-[10px] opacity-40">Highly Rated | matching footwear</div>
                          <div className="text-xs font-bold text-amber-400 mt-0.5">
                            {budgetFilter === 'premium' ? '$230.00' : budgetFilter === 'medium' ? '$95.00' : '$49.00'}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* -------------------- 3. SAVED WARDROBE TAB -------------------- */}
      {activeTab === 'wardrobe' && (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12" id="saved-wardrobe-view">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold">Your Curated Style Vault</h1>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} mt-1`}>
                Review and inspect your saved outfits. Click clean trash icons to discard combinations.
              </p>
            </div>

            <button 
              onClick={fetchSavedWardrobe}
              className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-md border flex items-center gap-2 ${
                isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-stone-300 hover:bg-stone-50'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Vault
            </button>
          </div>

          {loadingWardrobe ? (
            <div className="py-20 text-center opacity-70 font-semibold text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-amber-500" /> Pulling saved pieces from memory...
            </div>
          ) : savedOutfits.length === 0 ? (
            <div className="p-16 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 opacity-30" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Your Style Vault is Empty</h3>
                <p className="text-xs opacity-60 mt-1">
                  Upload an image of your shirts or pants, trigger matching analyses, and pin your favorites to save combinations here!
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('analyzer')} 
                className="bg-amber-500 text-black py-2 px-6 rounded text-xs font-semibold uppercase tracking-wider inline-block hover:brightness-115"
              >
                Analyze Wardrobe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {savedOutfits.map((combo) => (
                <div 
                  key={combo.id}
                  className={`border rounded-xl overflow-hidden transition-all hover:shadow-lg ${
                    isDarkMode ? 'bg-[#0E0E0E] border-white/5 hover:border-white/10' : 'bg-white border-stone-200'
                  }`}
                >
                  {/* Card Title Header with Occasion */}
                  <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
                    <span className="text-xs bg-amber-500/15 text-amber-400 py-1 px-2.5 rounded font-bold uppercase tracking-wider block">
                      {combo.occasion} Wear
                    </span>
                    
                    <button 
                      onClick={() => deleteSavedOutfit(combo.id)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Discard this combination"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Left Thumbnail uploaded */}
                      <div className="col-span-4 aspect-square rounded overflow-hidden border border-white/10 bg-slate-950">
                        {combo.clothing_details?.image_url && (
                          <img 
                            src={combo.clothing_details.image_url} 
                            alt="Primary garment" 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>

                      {/* Right Specs matched */}
                      <div className="col-span-8 space-y-1">
                        <span className="text-[10px] uppercase opacity-45 block">Scanned Segment</span>
                        <div className="font-serif text-base font-bold text-amber-400 capitalize">
                          {combo.clothing_details?.color} {combo.clothing_details?.clothing_type}
                        </div>
                        <div className="text-xs opacity-80 flex items-center gap-1.5">
                          <span 
                            className="w-3.5 h-3.5 rounded border border-white/20 inline-block" 
                            style={{ backgroundColor: combo.clothing_details?.hex_code }} 
                          />
                          {combo.clothing_details?.pattern} layout
                        </div>
                        <div className="text-[10px] opacity-40 uppercase tracking-widest pt-1">
                          Saved {new Date(combo.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Target Recommended Item Match Display */}
                    <div className={`p-4 rounded-lg relative ${
                      isDarkMode ? 'bg-zinc-900/60 border border-white/5' : 'bg-stone-50 border border-stone-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest block opacity-50 font-bold">Recommended Bottom match</span>
                          <span className="font-serif text-sm font-bold block">{combo.recommended_item}</span>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-widest block opacity-50">Match Rating</span>
                          <span className="text-sm font-bold text-emerald-400">{combo.match_score?.overall}%</span>
                        </div>
                      </div>

                      {/* Match score rings representation */}
                      <div className="grid grid-cols-3 gap-1 text-[8px] uppercase tracking-wider font-bold text-center border-t border-white/5 pt-2 mt-2 opacity-80">
                        <div className="border-r border-white/5">
                          <div>Color: <span className="text-amber-400">{combo.match_score?.color}%</span></div>
                        </div>
                        <div className="border-r border-white/5">
                          <div>Style: <span className="text-amber-400">{combo.match_score?.style}%</span></div>
                        </div>
                        <div>
                          <div>Occasion: <span className="text-amber-400">{combo.match_score?.occasion}%</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Curative advice block */}
                    <div className="text-xs leading-relaxed opacity-80 italic">
                      <span className="font-bold uppercase text-[9px] not-italic block text-amber-500 mb-0.5">Recommended Advice:</span>
                      "{combo.fashion_tips}"
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* -------------------- 4. ADMIN BOUTIQUE ANALYTICS TAB -------------------- */}
      {activeTab === 'analytics' && (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12" id="admin-analytics-view">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold">Boutique Analytics Central</h1>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'} mt-1`}>
                Real-time user operations, scanned trends, and color distribution indexes.
              </p>
            </div>

            <button 
              onClick={fetchAnalytics}
              className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-md border flex items-center gap-2 ${
                isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-stone-300 hover:bg-stone-50'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Recalculate Metrics
            </button>
          </div>

          {loadingAnalytics || !analyticsData ? (
            <div className="py-20 text-center opacity-70 font-semibold text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-amber-500" /> Computing telemetry records...
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              
              {/* Primary Stat Tickers bento style */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className={`p-6 rounded-xl border ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200 shadow-sm'
                }`}>
                  <Activity className="w-5 h-5 text-amber-500 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Total Active Users</span>
                  <span className="font-serif text-4xl font-extrabold block mt-1">{analyticsData.totalUsers}</span>
                  <span className="text-[9px] opacity-40 lowercase block mt-0.5">including mock profiles</span>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200 shadow-sm'
                }`}>
                  <Grid className="w-5 h-5 text-amber-500 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Diagnosed Clothes</span>
                  <span className="font-serif text-4xl font-extrabold block mt-1">{analyticsData.totalUploads}</span>
                  <span className="text-[9px] opacity-40 lowercase block mt-0.5">uploaded across database</span>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200 shadow-sm'
                }`}>
                  <Heart className="w-5 h-5 text-amber-500 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Saved Combinations</span>
                  <span className="font-serif text-4xl font-extrabold block mt-1">{savedOutfits.length}</span>
                  <span className="text-[9px] opacity-40 lowercase block mt-0.5">favorited user match pairings</span>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200 shadow-sm'
                }`}>
                  <TrendingUp className="w-5 h-5 text-amber-500 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block">Precision Accuracy</span>
                  <span className="font-serif text-4xl font-extrabold block mt-1">98.4%</span>
                  <span className="text-[9px] opacity-40 lowercase block mt-0.5">gemini model rating scale</span>
                </div>

              </div>

              {/* Advanced Custom SVG-based High-performance visualizer grids */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visualizer 1: Daily active users and entries (8 span) */}
                <div className={`p-6 rounded-xl border lg:col-span-8 space-y-4 ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-widest">Temporal trends</span>
                    <h3 className="font-serif text-lg font-bold">Daily User Scans Tracking</h3>
                  </div>

                  {/* Fully responsive pure CSS SVG Line / Bar chart representation */}
                  <div className="h-60 w-full relative flex items-end justify-between font-mono text-[9px] pt-4">
                    {/* SVG grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                      <div className="border-t border-white w-full"></div>
                      <div className="border-t border-white w-full"></div>
                      <div className="border-t border-white w-full"></div>
                      <div className="border-t border-white w-full"></div>
                    </div>

                    {/* Chart Bars loop */}
                    {analyticsData.dailyUsers.map((item, idx) => {
                      const maxVal = Math.max(...analyticsData.dailyUsers.map(d=>d.count));
                      const percentHeight = Math.round((item.count / maxVal) * 80) + 10; // clamp min to 10%
                      return (
                        <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full group px-2 relative z-10 hover:bg-white/5 rounded transition-all">
                          {/* Hover tooltip */}
                          <div className="absolute -top-4 opacity-0 group-hover:opacity-100 bg-amber-500 text-black px-1.5 py-0.5 rounded text-[8px] font-bold transition-all z-20 pointer-events-none">
                            {item.count} Scans
                          </div>
                          
                          {/* Visual bar graph */}
                          <div 
                            className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 shadow-md shadow-amber-500/10 transition-all duration-700" 
                            style={{ height: `${percentHeight}%` }} 
                          />
                          
                          <span className="mt-2 block opacity-60 tracking-tight">{item.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Visualizer 2: Gender target Distribution percentage circle gauge (4 span) */}
                <div className={`p-6 rounded-xl border lg:col-span-4 space-y-4 ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-widest">User Demographics</span>
                    <h3 className="font-serif text-lg font-bold">Gender Clothes Split</h3>
                  </div>

                  {/* Circular Pie Gauge layout via neat SVG */}
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Simple stacked progress visual */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Men 70% ring */}
                        <circle cx="50" cy="50" r="40" strokeWidth="6" stroke="#2a2a2a" fill="transparent" />
                        <circle cx="50" cy="50" r="40" strokeWidth="6" stroke="#D4AF37" strokeDasharray="251.2" strokeDashoffset="75" fill="transparent" strokeLinecap="round" />
                        
                        {/* Women 30% ring inside */}
                        <circle cx="50" cy="50" r="30" strokeWidth="6" stroke="#1d1d1d" fill="transparent" />
                        <circle cx="50" cy="50" r="30" strokeWidth="6" stroke="#fff" strokeDasharray="188.4" strokeDashoffset="131" fill="transparent" strokeLinecap="round" />
                      </svg>
                      
                      <div className="absolute font-serif text-xs opacity-75 font-bold uppercase tracking-widest text-center leading-tight">
                        <span className="block text-amber-400">70%</span>
                        <span className="block text-[8px] opacity-60">Men/Unisex</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 w-full text-xs">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Men Category</span>
                        <span className="font-semibold">70%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white inline-block" /> Women Category</span>
                        <span className="font-semibold">30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a] inline-block" /> Unisex</span>
                        <span className="font-semibold">0%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Second Row: Ticker Activity Log & Most Uploaded colors (Bento grids) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Column 1: Most Uploaded colors */}
                <div className={`p-6 rounded-xl border lg:col-span-4 space-y-4 ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-widest">Fabric metrics</span>
                    <h3 className="font-serif text-lg font-bold">Frequently Found Tones</h3>
                  </div>

                  <div className="space-y-3.5">
                    {analyticsData.mostUploadedColors.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-5 h-5 rounded border border-white/20 shadow-sm block" 
                            style={{ backgroundColor: item.hex }} 
                          />
                          <span className="font-serif font-semibold">{item.color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="opacity-50">{item.hex}</span>
                          <span className="bg-amber-500/10 text-amber-400 font-semibold px-2 py-0.5 rounded text-[10px]">
                            {item.count} uploads
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Recent Activity Audit list */}
                <div className={`p-[#1E1E1E] rounded-xl border lg:col-span-8 p-6 space-y-4 ${
                  isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-widest">Live operations ledger</span>
                    <h3 className="font-serif text-lg font-bold">Active User Action Ticker</h3>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {analyticsData.recentActivity.map((act) => (
                      <div 
                        key={act.id} 
                        className="flex items-center justify-between py-2 border-b border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400 text-[10px] uppercase font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                            SUCCESS
                          </span>
                          <span className="opacity-80 font-semibold">{act.userEmail}</span>
                          <span className="opacity-50 font-sans">&minus; {act.action}</span>
                        </div>
                        <span className="text-[10px] opacity-40 font-sans">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* -------------------- 5. AI STYLIST CHAT BOT TAB -------------------- */}
      {activeTab === 'chat' && (
        <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 py-12" id="ai-stylist-chat-view">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">AI Fashion Consulting Lounge</h1>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
              Discuss matching combinations, color seasons guidelines, or ask dynamic corporate recommendations directly from your stylist bot.
            </p>
          </div>

          <div className={`border rounded-xl overflow-hidden flex flex-col h-[580px] ${
            isDarkMode ? 'bg-[#0E0E0E] border-white/5' : 'bg-white border-stone-200 shadow-md'
          }`} id="chat-thread-box">
            
            {/* Thread Header details */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDarkMode ? 'border-white/5 bg-black/60' : 'border-stone-200 bg-stone-50'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <div className="font-semibold text-xs tracking-wider uppercase opacity-80">Elite Consultant Bot</div>
              </div>
              <div className="text-[10px] opacity-50 uppercase tracking-widest font-mono">
                Concealed API Secure
              </div>
            </div>

            {/* Bubble list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm" id="chat-scroller">
              {chatMessages.map((msg, index) => {
                const isModel = msg.role === 'model';
                return (
                  <div 
                    key={index} 
                    className={`flex ${isModel ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div className={`max-w-[85%] rounded-lg p-3.5 space-y-1.5 ${
                      isModel 
                        ? isDarkMode 
                          ? 'bg-zinc-900 border border-white/5 text-slate-100 rounded-tl-none' 
                          : 'bg-stone-100 text-stone-900 rounded-tl-none'
                        : 'bg-amber-500 text-black font-semibold rounded-tr-none'
                    }`}>
                      <div className="leading-relaxed whitespace-pre-line">{msg.text}</div>
                      <div className={`text-[8px] tracking-widest text-right block ${isModel ? 'opacity-40' : 'opacity-60 text-stone-950'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Chat loading bubble indicator */}
              {chatLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className={`p-3.5 rounded-lg rounded-tl-none flex items-center gap-2 ${
                    isDarkMode ? 'bg-zinc-900 text-slate-300' : 'bg-stone-100 text-stone-700'
                  }`}>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                    <span className="text-[11px] font-medium tracking-tight">AI is crafting outfit matches...</span>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK PRESET QUESTION PILLS */}
            <div className="p-3 border-t border-white/5 flex gap-2 overflow-x-auto select-none bg-black/40">
              {QUICK_PROMPTS.map((qp, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUserChatInput(qp.text);
                  }}
                  className={`flex-none py-1.5 px-3 rounded text-[10px] tracking-tight font-medium border flex items-center gap-1 hover:border-amber-400 hover:text-amber-300 transition-colors ${
                    isDarkMode ? 'bg-[#1E1E1E] border-white/5 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <span>{qp.icon}</span>
                  <span>{qp.text}</span>
                </button>
              ))}
            </div>

            {/* Thread Input Footer form */}
            <form onSubmit={sendChatMessage} className={`p-4 border-t flex gap-2 ${
              isDarkMode ? 'border-white/5 bg-black/40' : 'border-stone-200 bg-white'
            }`}>
              <input 
                type="text" 
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                placeholder="Discuss tailoring matches, color seasons, code styling rules..."
                className={`flex-1 py-2 px-3.5 text-xs sm:text-sm rounded focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  isDarkMode ? 'bg-zinc-900 border-white/5 text-white' : 'bg-stone-50 border-stone-200 text-stone-950'
                }`}
                disabled={chatLoading}
              />
              <button 
                type="submit" 
                disabled={chatLoading}
                className="bg-amber-500 text-black py-2 px-5 rounded font-bold uppercase text-xs sm:text-sm tracking-wider hover:brightness-110 flex items-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-black" /> Send Info
              </button>
            </form>

          </div>

        </div>
      )}

      {/* Modern Luxury Bottom Footer */}
      <footer className={`py-12 border-t text-center space-y-4 ${
        isDarkMode ? 'border-white/5 bg-black' : 'border-stone-200 bg-white'
      }`} id="page-footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs opacity-60">
          
          <div className="text-left font-serif">
            <span className="font-bold uppercase tracking-widest text-amber-500 text-sm">Fashion Finder</span>
            <span className="block text-[10px] opacity-75 mt-0.5">Boutique Wardrobe Matcher Engine &copy; 2026. All rights secured.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => setActiveTab('landing')}>Guidelines</span>
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => setActiveTab('analyzer')}>AI Diagnostic</span>
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => { setActiveTab('wardrobe'); fetchSavedWardrobe(); }}>Style Vault</span>
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => { setActiveTab('analytics'); fetchAnalytics(); }}>Boutique Analytics</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
