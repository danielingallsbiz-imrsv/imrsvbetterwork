import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Map, Search, Bell, Activity, Navigation, Coffee, Home, Plane, Zap, CheckCircle2, XCircle, Leaf, X, Lock, Send, MessageSquareText, Wallet, Share, Users, MapPin, ChevronRight, Link2, Calendar, Star, TrendingUp, Play, Square, Heart, MessageCircle, Terminal, Repeat, ChevronLeft, User, Globe, Shield, Sparkles, Camera, Plus, Trash2, Loader2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Tooltip, Area } from 'recharts';
import imageCompression from 'browser-image-compression';
import { supabase } from './lib/supabase';
import './App.css';

// --- DATA ---
const REINVESTMENT_DATA = [
  { month: 'Jan', amount: 84000 },
  { month: 'Feb', amount: 96000 },
  { month: 'Mar', amount: 102000 },
  { month: 'Apr', amount: 115000 },
  { month: 'May', amount: 128000 },
  { month: 'Jun', amount: 142000 },
];

const COUNTRY_IMPACT = [
  { id: 'c1', country: 'Japan', events: [{ name: 'Kyoto Youth Run Club', impact: 'Community Event' }, { name: 'Fushimi Shrine Cleanup', impact: 'Restoration' }] },
  { id: 'c2', country: 'Indonesia', events: [{ name: 'Bali Reef Repair', impact: 'Marine Conservation' }, { name: 'Ubud Artisan Fund', impact: 'Local Enterprise' }] },
  { id: 'c3', country: 'Mexico', events: [{ name: 'Oaxaca Artisan Guild', impact: 'Local Business Support' }, { name: 'CDMX Food Bank', impact: 'Feeding Program' }] },
];

const EXPLORE_PLACES = [
  { id: 1, title: "Kinkaku-ji Temple", tag: "Guided Tour", price: "$45", rating: "4.9", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", locked: false },
  { id: 2, title: "Arashiyama Bamboo", tag: "Private Rickshaw", price: "$120", rating: "4.8", img: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=600&q=80", locked: true },
  { id: 3, title: "Gion District", tag: "Geisha Evening", price: "$250", rating: "5.0", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80", locked: false },
  { id: 4, title: "Fushimi Inari Secret", tag: "Night Hike", price: "$65", rating: "4.9", img: "https://images.unsplash.com/photo-1478000183905-45de96279f64?auto=format&fit=crop&w=600&q=80", locked: true },
  { id: 5, title: "Zen Meditation", tag: "Temple Session", price: "$35", rating: "4.7", img: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&w=600&q=80", locked: false },
  { id: 6, title: "Kyoto Food Tour", tag: "Street Eats", price: "$85", rating: "4.8", img: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=600&q=80", locked: true },
  { id: 7, title: "Sake Tasting", tag: "Brewery Visit", price: "$55", rating: "4.9", img: "https://images.unsplash.com/photo-1516997121675-4c2d388e404b?auto=format&fit=crop&w=600&q=80", locked: false },
  { id: 8, title: "Tea Ceremony", tag: "Maiko Hosted", price: "$150", rating: "5.0", img: "https://images.unsplash.com/photo-1506198160408-0bf458137397?auto=format&fit=crop&w=600&q=80", locked: true },
  { id: 9, title: "Arashiyama Bridge", tag: "Boat Cruise", price: "$40", rating: "4.6", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", locked: false },
  { id: 10, title: "Nishiki Cooking", tag: "Chef Workshop", price: "$110", rating: "4.9", img: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=600&q=80", locked: true },
];

const GALLERY_DROPS = [
  { id: 1, date: "May 12, 2024", time: "14:20", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, date: "May 11, 2024", time: "10:15", img: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=600&q=80" },
  { id: 3, date: "May 10, 2024", time: "18:45", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80" },
  { id: 4, date: "May 09, 2024", time: "09:30", img: "https://images.unsplash.com/photo-1478000183905-45de96279f64?auto=format&fit=crop&w=600&q=80" },
  { id: 5, date: "May 08, 2024", time: "21:10", img: "https://images.unsplash.com/photo-1506198160408-0bf458137397?auto=format&fit=crop&w=600&q=80" },
  { id: 6, date: "May 07, 2024", time: "12:05", img: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=600&q=80" },
  { id: 7, date: "May 06, 2024", time: "15:50", img: "https://images.unsplash.com/photo-1516997121675-4c2d388e404b?auto=format&fit=crop&w=600&q=80" },
  { id: 8, date: "May 05, 2024", time: "08:15", img: "https://images.unsplash.com/photo-1545569341-9eb8b3097314?auto=format&fit=crop&w=600&q=80" },
  { id: 9, date: "May 04, 2024", time: "17:25", img: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=600&q=80" },
];

const TIMELINE_TRIP = [
  { id: 1, type: "flight", time: "8:50 am", title: "Flight", desc: "Los Angeles → Bali", color: "tl-orange", icon: <Plane size={20} /> },
  { id: 2, type: "hotel", time: "11:00 am", title: "Hotel Rest", desc: "Viceroy Resort, Ubud", color: "tl-green", icon: <Home size={20} /> },
  { id: 3, type: "dinner", time: "07:00 pm", title: "Outdoor Dinner", desc: "Beachfront Villa", color: "tl-blue", icon: <Coffee size={20} /> },
  { id: 4, type: "shop", time: "11:30 am", title: "Local Shopping", desc: "Ubud Market", color: "tl-purple", icon: <Activity size={20} /> },
];

const UPCOMING_TRIPS = [
  {
    id: 't1',
    location: 'Kyoto, Japan',
    dates: 'May 12 - May 18, 2024',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    status: 'Confirmed',
    itinerary: [
      { id: 1, type: "flight", time: "10:30 am", title: "KIX Arrival", desc: "Flight JL004 from LAX", color: "tl-orange", icon: <Plane size={20} /> },
      { id: 2, type: "hotel", time: "01:00 pm", title: "Ace Hotel Check-in", desc: "Nakagyo Ward, Kyoto", color: "tl-green", icon: <Home size={20} /> },
      { id: 3, type: "experience", time: "04:00 pm", title: "Gion Walking Tour", desc: "Guided History Walk", color: "tl-purple", icon: <MapPin size={20} /> },
    ]
  },
  {
    id: 't2',
    location: 'Bali, Indonesia',
    dates: 'Jun 05 - Jun 12, 2024',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    status: 'Synced',
    itinerary: TIMELINE_TRIP
  },
  {
    id: 't3',
    location: 'Seoul, South Korea',
    dates: 'Jul 20 - Jul 25, 2024',
    img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    status: 'Confirmed',
    itinerary: [
      { id: 1, type: "flight", time: "09:00 am", title: "ICN Arrival", desc: "Flight KE012", color: "tl-orange", icon: <Plane size={20} /> },
    ]
  }
];

const HOTSPOTS = {
  "Nature & Walks": [
    { id: 1, title: "Philosopher's Path", dist: "2.1 mi", cost: "Free", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Bamboo Grove", dist: "3.4 mi", cost: "Free", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Arashiyama River Walk", dist: "4.2 mi", cost: "Free", img: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Kamogawa Riverbank", dist: "0.6 mi", cost: "Free", img: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=400&q=80" },
  ],
  "Food & Markets": [
    { id: 5, title: "Nishiki Market", dist: "1.2 mi", cost: "Free", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80" },
    { id: 6, title: "Pontocho Alley Eats", dist: "0.8 mi", cost: "Free", img: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=400&q=80" },
    { id: 7, title: "Tofu Street Tasting", dist: "1.5 mi", cost: "Free", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80" },
    { id: 8, title: "Matcha District", dist: "2.0 mi", cost: "Free", img: "https://images.unsplash.com/photo-1563822249510-04678c4b2839?auto=format&fit=crop&w=400&q=80" },
  ],
  "Sightseeing": [
    { id: 9, title: "Kinkaku-ji (Golden)", dist: "3.8 mi", cost: "¥400", img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=400&q=80" },
    { id: 10, title: "Kyoto Tower View", dist: "1.0 mi", cost: "Free", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" },
    { id: 11, title: "Togetsukyo Bridge", dist: "4.0 mi", cost: "Free", img: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=400&q=80" },
    { id: 12, title: "Higashiyama District", dist: "1.4 mi", cost: "Free", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80" },
  ],
  "Temples & Shrines": [
    { id: 13, title: "Fushimi Inari Walk", dist: "0.4 mi", cost: "Free", img: "https://images.unsplash.com/photo-1478000183905-45de96279f64?auto=format&fit=crop&w=400&q=80" },
    { id: 14, title: "Kiyomizu-dera", dist: "1.8 mi", cost: "¥400", img: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?auto=format&fit=crop&w=400&q=80" },
    { id: 15, title: "Ryoan-ji Zen Garden", dist: "3.2 mi", cost: "¥500", img: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=400&q=80" },
    { id: 16, title: "Nanzen-ji Gate", dist: "2.5 mi", cost: "Free", img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=400&q=80" },
  ],
  "Nightlife": [
    { id: 17, title: "Gion District Stroll", dist: "0.9 mi", cost: "Free", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80" },
    { id: 18, title: "Pontocho by Night", dist: "0.7 mi", cost: "Free", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80" },
    { id: 19, title: "Kawaramachi Bars", dist: "1.1 mi", cost: "Free", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80" },
  ],
};

const COMMUNITY_FEED = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    status: "Active Explorer",
    location: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    likes: 124,
    reposts: 42,
    experience: "Kinkaku-ji Temple",
    bio: "Digital nomad scouting the best caffeine spots in SE Asia. Always hunting for the perfect coordinate."
  },
  {
    id: 2,
    user: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    status: "Pro Member",
    location: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1506905925237-cb51fcd8df2f?auto=format&fit=crop&w=600&q=80",
    likes: 430,
    reposts: 89,
    experience: "Grindelwald Hike",
    bio: "Alpine enthusiast and high-altitude photographer. Capturing the world's most remote peaks since 2018."
  },
  {
    id: 3,
    user: "Marcus K",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    status: "Nomad",
    location: "Uluwatu",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    likes: 890,
    reposts: 156,
    experience: "Surf Lesson",
    bio: "Waves, code, and community footprint."
  },
  {
    id: 4,
    user: "Mina Wang",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    status: "Explorer",
    location: "Marrakech",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80",
    likes: 156,
    reposts: 28,
    experience: "Riad Discovery",
    bio: "Chasing architecture and shadows."
  },
  {
    id: 5,
    user: "Leo Rossi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=w=150",
    status: "Pro",
    location: "Amalfi",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    likes: 1205,
    reposts: 312,
    experience: "Lemon Grove Tour",
    bio: "Living for the lemon groves."
  },
  {
    id: 6,
    user: "Chloe Kim",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
    status: "Scout",
    location: "Seoul",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    likes: 89,
    reposts: 12,
    experience: "Hanok Stay",
    bio: "Future of the circular economy."
  }
];

const MOCK_REPUTATION_NOTES = {
  1: [
    { id: 101, writer: "Sarah Jenkins", text: "Alex is the most reliable photographer I've worked with. Knows all the Gion secrets.", tag: "RELIABLE" },
    { id: 102, writer: "Marcus K", text: "Verified explorer. Genuine community contribution.", tag: "TRUSTED" }
  ],
  2: [
    { id: 201, writer: "Alex Chen", text: "Sarah's knowledge of the Swiss Alps is unmatched.", tag: "EXCEL" }
  ]
};

const FLIGHT_DROPS = [
  { id: 1, dest: "Seoul, KR", price: "$214", img: "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, dest: "Taipei, TW", price: "$182", img: "https://images.unsplash.com/photo-1571474004502-c1def214ac6d?auto=format&fit=crop&w=600&q=80" },
  { id: 3, dest: "Bangkok, TH", price: "$289", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80" },
  { id: 4, dest: "Hong Kong, HK", price: "$195", img: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=600&q=80" },
  { id: 5, dest: "Osaka, JP", price: "$115", img: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=600&q=80" },
  { id: 6, dest: "Singapore, SG", price: "$245", img: "https://images.unsplash.com/photo-1525625293386-3fb0075d5658?auto=format&fit=crop&w=600&q=80" },
];

const MISSION_STEPS = [
  { id: 1, label: "CONNECT", desc: "Sync 3 Hotspots", pts: "200 PTS", color: "var(--accent-purple)" },
  { id: 2, label: "CAPTURE", desc: "Post Daily Drop", pts: "500 PTS", color: "var(--accent-sage)" },
  { id: 3, label: "CONTRIBUTE", desc: "Fund a Project", pts: "1.2K PTS", color: "#FFF" },
];

const CATEGORIZED_EXPERIENCES = {
  adventure: [
    { id: 'a1', title: "Volcano Ridge Hike", tag: "Adventure", price: "$85", rating: "4.9", img: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600", reviews: ["Absolute peak experience!", "The view is worth Every. Single. Step."] },
    { id: 'a2', title: "Night Surf Session", tag: "Adventure", price: "$110", rating: "4.8", img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600", reviews: ["Glowing waves and pure vibes.", "Surreal experience under the stars."] },
    { id: 'a3', title: "Downhill MTB", tag: "Adventure", price: "$95", rating: "4.7", img: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600", reviews: ["Fast, muddy, and exhilarating."] }
  ],
  cooking: [
    { id: 'c1', title: "Omakase Masterclass", tag: "Cooking", price: "$150", rating: "5.0", img: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600", reviews: ["Art on a plate. Learned so much.", "Best sushi I've ever eaten."] },
    { id: 'c2', title: "Street Food Lab", tag: "Cooking", price: "$40", rating: "4.9", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600", reviews: ["Hidden gems in the market.", "The secret sauce is real."] },
    { id: 'c3', title: "Zen Tea Ceremony", tag: "Cultural", price: "$60", rating: "4.8", img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600", reviews: ["Incredible peace.", "A spiritual experience."] }
  ]
};

const IMPACT_PROJECTS = [
  { id: 'p1', name: "Coral Reef Repair", loc: "Bali, ID", status: "74% Funded", icon: <Leaf size={18} />, color: "var(--accent-sage)", x: "74%", y: "65%" },
  { id: 'p2', name: "Local Artisan Hub", loc: "Kyoto, Japan", status: "Active Now", icon: <Activity size={18} />, color: "var(--accent-orange)", x: "82%", y: "38%" },
  { id: 'p3', name: "Clean Water Grid", loc: "Oaxaca, MX", status: "42% Funded", icon: <Zap size={18} />, color: "var(--accent-purple)", x: "22%", y: "48%" },
];

const LIFESTYLE_SOCIALS = [
  { id: 's1', name: "Hawaii Run Club", time: "Sun • Monthly", rsvps: 84, type: "Lifestyle", avatars: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40"], x: "12%", y: "42%", color: "var(--accent-orange)" },
  { id: 's2', name: "Colombia Ice Bath", time: "Sun • Monthly", rsvps: 42, type: "Wellness", avatars: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40"], x: "28%", y: "58%", color: "var(--accent-sage)" },
  { id: 's3', name: "Australia Run Club", time: "Sun • Monthly", rsvps: 156, type: "Lifestyle", avatars: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40"], x: "85%", y: "78%", color: "var(--accent-orange)" },
  { id: 's4', name: "Bali Ice Bath", time: "Sun • Monthly", rsvps: 32, type: "Wellness", avatars: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40"], x: "78%", y: "65%", color: "var(--accent-sage)" },
  { id: 's5', name: "Germany Run Club", time: "Sun • Monthly", rsvps: 92, type: "Lifestyle", avatars: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40"], x: "48%", y: "28%", color: "var(--accent-orange)" },
];

const Logo = ({ size = 24 }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src="/logo.png"
      alt="IMRSV"
      style={{
        height: size,
        width: 'auto',
        filter: 'brightness(0) invert(1)',
        display: 'block'
      }}
    />
  </div>
);
function SearchOverlay({ isOpen, onClose, onAction, onSelectUser, onSelectExp }) {
  const [query, setQuery] = useState('');

  const allExperiences = [
    ...EXPLORE_PLACES,
    ...CATEGORIZED_EXPERIENCES.adventure,
    ...CATEGORIZED_EXPERIENCES.cooking
  ];

  const filteredPeople = query ? COMMUNITY_FEED.filter(p => p.user.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredExp = query ? allExperiences.filter(e => e.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredEvents = query ? LIFESTYLE_SOCIALS.filter(s => s.name.toLowerCase().includes(query.toLowerCase())) : [];

  const handleSelectUser = (user) => {
    onSelectUser(user);
    onClose();
  };

  const handleSelectExp = (exp) => {
    onSelectExp(exp);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.3}
          onDragEnd={(e, info) => { if (info.offset.y > 100) onClose(); }}
          style={{ position: 'absolute', inset: 0, background: 'var(--bg-color)', backdropFilter: 'blur(30px)', zIndex: 7000, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ padding: '60px 24px 20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'var(--border-color)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <Search size={20} color="var(--accent-orange)" />
              <input
                autoFocus
                type="text"
                placeholder="Partners, experiences, events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '16px 12px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            <button onClick={onClose} style={{ color: 'var(--text-main)', background: 'var(--border-color)', border: 'none', borderRadius: '12px', padding: '8px 16px', fontWeight: 800, fontSize: '0.8rem' }}>ESC</button>
          </div>

          <div className="scroll-y" style={{ flex: 1, padding: '0 24px 40px' }}>
            {query === '' ? (
              <div style={{ marginTop: '40px' }}>
                <p style={{ color: '#444', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '2px' }}>Trending Discovery</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Bali', 'Alex Chen', 'Volcano Hike', 'Seoul', 'Ice Bath'].map(t => (
                    <button key={t} onClick={() => setQuery(t)} style={{ background: 'var(--border-color)', border: '1px solid var(--border-color)', color: 'var(--text-sub)', padding: '8px 16px', borderRadius: '100px', fontSize: '0.8rem' }}>{t}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {filteredPeople.length > 0 && (
                  <div>
                    <p style={{ color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Partners</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {filteredPeople.map(person => (
                        <div key={person.id} className="simple-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)', cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: '12px' }} onClick={() => handleSelectUser(person)}>
                          <img src={person.avatar} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-color)' }} alt="P" />
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>{person.user}</div>
                            <div style={{ color: 'var(--text-sub)', fontSize: '0.75rem' }}>{person.status} • {person.location}</div>
                          </div>
                          <ChevronRight size={18} color="#444" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredExp.length > 0 && (
                  <div>
                    <p style={{ color: 'var(--accent-purple)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Experiences</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {filteredExp.map(exp => (
                        <div key={exp.id} className="simple-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)', cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: '12px' }} onClick={() => handleSelectExp(exp)}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img src={exp.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="E" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>{exp.title}</div>
                            <div style={{ color: 'var(--accent-purple)', fontSize: '0.75rem', fontWeight: 800 }}>{exp.price} • {exp.tag}</div>
                          </div>
                          <ChevronRight size={18} color="#444" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredEvents.length > 0 && (
                  <div>
                    <p style={{ color: 'var(--accent-sage)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Events</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {filteredEvents.map(event => (
                        <div key={event.id} className="simple-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)', cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: '12px' }} onClick={() => { onAction(`RSVPed for ${event.name} 🗓️`); onClose(); }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MapPin size={20} color="var(--accent-sage)" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: 700 }}>{event.name}</div>
                            <div style={{ color: 'var(--text-sub)', fontSize: '0.75rem' }}>{event.time} • {event.rsvps} RSVPed</div>
                          </div>
                          <ChevronRight size={18} color="#444" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredPeople.length === 0 && filteredExp.length === 0 && filteredEvents.length === 0 && (
                  <div style={{ textAlign: 'center', marginTop: '40px', color: '#444' }}>No results for "{query}"</div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence >
  );
}

function SettingsOverlay({ isOpen, onClose, theme, setTheme, profileData, setProfileData }) {
  const isLight = theme === 'light';
  const [editingField, setEditingField] = useState(null);

  const handleFieldChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const EditableField = ({ label, field, multiline }) => {
    const isEditing = editingField === field;
    const value = profileData?.[field] || '';
    return (
      <div style={{ marginBottom: '16px' }}>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{label}</p>
        {isEditing ? (
          multiline ? (
            <textarea
              autoFocus
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              onBlur={() => setEditingField(null)}
              style={{ width: '100%', background: 'var(--surface-color)', border: '1px solid var(--accent-purple)', borderRadius: '12px', padding: '12px', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5, resize: 'none', minHeight: '80px', outline: 'none', fontFamily: 'inherit' }}
            />
          ) : (
            <input
              autoFocus
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              onBlur={() => setEditingField(null)}
              onKeyPress={(e) => e.key === 'Enter' && setEditingField(null)}
              style={{ width: '100%', background: 'var(--surface-color)', border: '1px solid var(--accent-purple)', borderRadius: '12px', padding: '12px', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
            />
          )
        ) : (
          <div
            onClick={() => setEditingField(field)}
            style={{ padding: '12px', background: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-main)', fontSize: '0.9rem', cursor: 'pointer', border: '1px solid transparent', transition: 'border-color 0.2s', lineHeight: multiline ? 1.5 : 'inherit', minHeight: multiline ? '60px' : 'auto' }}
          >
            {value || <span style={{ color: 'var(--text-sub)', fontStyle: 'italic' }}>Tap to edit...</span>}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="settings-overlay"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'var(--bg-color)', zIndex: 6000,
            display: 'flex', flexDirection: 'column'
          }}
        >
          <div style={{ padding: '60px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 800 }}>Settings</h2>
            <button
              onClick={onClose}
              style={{ background: 'var(--border-color)', border: 'none', borderRadius: '50%', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={24} color="var(--text-main)" />
            </button>
          </div>

          <div className="scroll-y" style={{ padding: '24px' }}>
            {/* Edit Profile Section */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Edit Profile</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={profileData?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-orange)' }}
                    alt="Profile"
                  />
                  <div
                    style={{ position: 'absolute', bottom: -2, right: -2, width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--bg-color)' }}
                  >
                    <Camera size={12} color="#FFF" />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--text-main)', fontWeight: 700 }}>{profileData?.name || 'Alex Chen'}</p>
                  <p style={{ color: 'var(--text-sub)', fontSize: '0.8rem' }}>{profileData?.location || 'Kyoto, Japan'}</p>
                </div>
              </div>
              <EditableField label="Display Name" field="name" />
              <EditableField label="Location" field="location" />
              <EditableField label="Bio" field="bio" multiline />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: 'var(--accent-purple)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Account</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-main)' }}>Privacy Profile</span>
                  <ChevronRight size={20} color="var(--text-sub)" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-main)' }}>Security Keys</span>
                  <ChevronRight size={20} color="var(--text-sub)" />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: 'var(--accent-purple)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Preferences</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setTheme(isLight ? 'dark' : 'light')}
                >
                  <span style={{ color: 'var(--text-main)' }}>Theme Mode</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--border-color)', padding: '6px 12px', borderRadius: '100px' }}>
                    <span style={{ color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: 700 }}>{isLight ? 'Daylight' : 'Midnight'}</span>
                    <Repeat size={14} color="var(--accent-purple)" />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-main)' }}>Push Notifications</span>
                  <div style={{ width: '44px', height: '24px', background: 'rgba(162, 48, 237, 0.2)', borderRadius: '12px', padding: '2px', border: '1px solid var(--accent-purple)', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '18px', height: '18px', background: 'var(--accent-purple)', borderRadius: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <button style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 600 }}>Log Out</button>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.7rem', marginTop: '40px', opacity: 0.5 }}>IMRSV v2.4.0 • Built for Founders</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- COMPONENTS ---

function Toast({ message, icon, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="toast">
      {icon}
      <span>{message}</span>
    </div>
  );
}

function AppTabBar({ activeTab, setActiveTab, onSearchOpen }) {
  return (
    <nav className="app-tab-bar" style={{ height: '80px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderTop: 'none', paddingBottom: '20px' }}>
      <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
        <Navigation size={22} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
      </button>

      <button className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`} onClick={() => setActiveTab('planner')}>
        <Map size={22} strokeWidth={activeTab === 'planner' ? 2.5 : 2} />
      </button>

      <button className="tab-btn" onClick={onSearchOpen}>
        <Search size={22} strokeWidth={2} />
      </button>

      <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
        <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
      </button>

      <button className={`tab-btn ${activeTab === 'pro' ? 'active' : ''}`} onClick={() => setActiveTab('pro')}>
        <Shield size={22} strokeWidth={activeTab === 'pro' ? 2.5 : 2} />
      </button>
    </nav>
  );
}

function CameraOverlay({ onCapture, onClose }) {
  const videoRef = React.useRef(null);
  const [stream, setStream] = React.useState(null);

  React.useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access error:", err);
        // Fallback or error message could go here
      }
    }
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    onCapture(dataUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0,
        background: 'var(--bg-color)', zIndex: 6000,
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* SHUTTER BUTTON CONTAINER */}
        <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={28} color="#FFF" />
          </button>

          <button
            onClick={capturePhoto}
            style={{
              width: '84px', height: '84px',
              borderRadius: '50%', border: '4px solid #FFF',
              background: 'transparent', padding: '6px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FFF' }}></div>
          </button>

          <div style={{ width: '60px' }}></div> {/* Spacer for symmetry */}
        </div>
      </div>

      <div style={{ height: '120px', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', fontSize: '1rem', letterSpacing: '2px', fontWeight: 600 }}>
        CAPTURING COORDINATE
      </div>
    </motion.div>
  );
}

function AppHeader({ title, subtitle, showPulse = false, useAvatar = false, onSettingsClick }) {
  const isPremiumBrand = title === "The IMRSV Project";

  return (
    <header className="app-header">
      <div className="header-user">
        {useAvatar ? (
          <div className="header-avatar" style={{ border: 'none' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Profile" />
          </div>
        ) : (
          <div className="header-avatar" style={{ background: 'transparent', padding: '4px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo size={20} />
          </div>
        )}
        <div className="header-titles">
          <span className="header-title-small" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {showPulse && <div className="pulse-dot"></div>}
            {subtitle}
          </span>
          {isPremiumBrand ? (
            <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Outfit', sans-serif" }}>
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400', fontSize: '1.2rem', color: 'var(--text-sub)' }}>The</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 900, letterSpacing: '3px' }}>IMRSV</span>
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400', fontSize: '1.2rem', color: 'var(--text-sub)' }}>Project</span>
            </h1>
          ) : (
            <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {title} <span style={{
                fontSize: '0.7rem',
                color: 'var(--text-main)',
                fontWeight: 900,
                letterSpacing: '3px',
                borderLeft: '1px solid var(--border-color)',
                paddingLeft: '10px',
                marginLeft: '4px'
              }}>IMRSV</span>
            </h1>
          )}
        </div>
      </div>
      <button className="header-icon-btn" onClick={onSettingsClick}><Compass size={20} /></button>
    </header>
  );
}

function DashHeader({ activeSubTab, setActiveSubTab, onSettingsClick, feedTab, setFeedTab }) {
  const isRadar = activeSubTab === 'radar';

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Logo size={20} />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          className="flip-toggle-btn"
          onClick={() => setActiveSubTab(isRadar ? 'flipside' : 'radar')}
        >
          <Repeat size={14} className="toggle-icon" />
          {isRadar ? 'Flip Side' : 'Radar'}
        </button>
        <button className="header-icon-btn" style={{ width: '38px', height: '38px' }} onClick={onSettingsClick}>
          <Compass size={18} />
        </button>
      </div>
    </header>
  );
}

// --- TAB COMPONENTS ---

function DashboardTab({ onAction, onSettingsClick, selectedUser, setSelectedUser, selectedExperience, setSelectedExperience, showUnlockOverlay, setShowUnlockOverlay, showUserGallery, setShowUserGallery, connections, setConnections }) {
  const [activeSubTab, setActiveSubTab] = useState('radar');
  const [feedTab, setFeedTab] = useState('For You');

  return (
    <div className="tab-layout">
      <DashHeader activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} onSettingsClick={onSettingsClick} feedTab={feedTab} setFeedTab={setFeedTab} />

      <div className="content-pad scroll-y">
        <AnimatePresence mode="wait">
          {activeSubTab === 'radar' ? (
            <motion.div key="radar" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <div style={{ marginBottom: '32px' }}>
                <h1 className="header-title">Explore</h1>
                <p className="header-subtitle">Kyoto, Japan</p>
              </div>

              {Object.entries(HOTSPOTS).map(([category, spots]) => (
                <div key={category} style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-sub)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{category}</p>
                  <div className="horizontal-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -24px', padding: '0 24px 8px' }}>
                    {spots.map((spot, i) => (
                      <motion.div
                        key={spot.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onAction(`Mapped: ${spot.title} 📍`)}
                        style={{
                          minWidth: '160px', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                          background: 'var(--surface-color)', border: '1px solid var(--border-color)', position: 'relative'
                        }}
                      >
                        <img src={spot.img} alt={spot.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>{spot.title}</h4>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.7rem', color: '#666' }}>{spot.dist}</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-green)' }}>{spot.cost}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              <h2 className="section-title">Local Paid Experiences</h2>
              <div className="horizontal-scroll mt-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px', scrollSnapType: 'x mandatory', flexWrap: 'nowrap' }}>
                {EXPLORE_PLACES.map((place, i) => (
                  <motion.div
                    className="place-card simple-card"
                    key={place.id + '-' + i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ cursor: 'pointer', minWidth: '70%', scrollSnapAlign: 'center', flexShrink: 0, height: '240px' }}
                    onClick={() => place.locked ? setShowUnlockOverlay(true) : setSelectedExperience(place)}
                  >
                    <img src={place.img} alt={place.title} className="pc-bg" style={{ filter: place.locked ? 'grayscale(100%) brightness(0.4)' : 'none' }} />
                    <div className="pc-overlay">
                      <div className="pc-price-tag" style={{ background: place.locked ? 'rgba(192, 132, 252, 0.3)' : 'rgba(255, 255, 255, 0.15)', borderColor: place.locked ? '#C084FC' : 'rgba(255, 255, 255, 0.2)' }}>
                        {place.locked ? <Lock size={12} style={{ marginRight: '4px' }} /> : null}
                        {place.price}
                      </div>
                      <div className="pc-bottom" style={{ opacity: place.locked ? 0.6 : 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.85rem' }}>{place.tag}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFF', fontWeight: 600 }}><Star size={12} fill="#FFF" /> {place.rating}</span>
                        </div>
                        <h4 style={{ fontFamily: place.locked ? 'Georgia, serif' : 'inherit', fontStyle: place.locked ? 'italic' : 'normal' }}>{place.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <h2 className="section-title mt-8" style={{ color: 'var(--text-main)' }}>Pure Adventure</h2>
              <div className="horizontal-scroll mt-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px', scrollSnapType: 'x mandatory', flexWrap: 'nowrap' }}>
                {CATEGORIZED_EXPERIENCES.adventure.map((exp, i) => (
                  <motion.div
                    className="place-card simple-card"
                    key={exp.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ cursor: 'pointer', minWidth: '70%', scrollSnapAlign: 'center', flexShrink: 0, height: '240px' }}
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <img src={exp.img} className="pc-bg" style={{ objectPosition: 'center' }} />
                    <div className="pc-overlay">
                      <div className="pc-price-tag">{exp.price}</div>
                      <div className="pc-bottom">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.8rem' }}>{exp.tag}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)' }}><Star size={10} fill="var(--text-main)" /> {exp.rating}</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem' }}>{exp.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="section-title mt-8" style={{ color: 'var(--text-main)' }}>Mastering the Kitchen</h2>
              <div className="horizontal-scroll mt-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px', scrollSnapType: 'x mandatory', flexWrap: 'nowrap' }}>
                {CATEGORIZED_EXPERIENCES.cooking.map((exp, i) => (
                  <motion.div
                    className="place-card simple-card"
                    key={exp.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ cursor: 'pointer', minWidth: '70%', scrollSnapAlign: 'center', flexShrink: 0, height: '240px' }}
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <img src={exp.img} className="pc-bg" style={{ objectPosition: 'center' }} />
                    <div className="pc-overlay">
                      <div className="pc-price-tag">{exp.price}</div>
                      <div className="pc-bottom">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.8rem' }}>{exp.tag}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)' }}><Star size={10} fill="var(--text-main)" /> {exp.rating}</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem' }}>{exp.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ padding: '24px 0 16px' }}>
                <motion.div
                  className="unlock-banner"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    cursor: 'pointer',
                    background: `linear-gradient(90deg, var(--surface-color) 0%, var(--surface-color) 35%, var(--shimmer-glow) 50%, var(--surface-color) 65%, var(--surface-color) 100%)`,
                    backgroundSize: '200% 100%',
                    border: '1px solid var(--border-color)',
                    padding: '12px 20px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--card-shadow)'
                  }}
                  animate={{
                    backgroundPosition: ['200% 0%', '-100% 0%'],
                    borderColor: ['var(--border-color)', 'var(--text-sub)', 'var(--border-color)']
                  }}
                  transition={{
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 },
                    borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  onClick={() => setShowUnlockOverlay(true)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={18} color="var(--text-main)" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.10rem', color: 'var(--text-main)' }}>Unlock 25+ hidden gems</h3>
                      <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.6rem', color: 'var(--text-sub)', fontWeight: 800, marginTop: '2px' }}>Founder Access Required</p>
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-sub)" style={{ opacity: 0.4, position: 'relative', zIndex: 1 }} />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="flipside" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <div style={{ marginBottom: '32px' }}>
                <h1 className="header-title">The Flip Side</h1>
                <p className="header-subtitle">See where the world is moving.</p>
              </div>

              <div className="active-locations-card">
                <span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }}></div>
                  2,341 ACTIVE LOCATIONS TODAY
                </span>
              </div>

              <div className="filter-pills-row" style={{ marginTop: '24px' }}>
                {['Kyoto', 'Bali', 'Lisbon', 'Medellín', 'Aspen'].map((loc, i) => (
                  <button key={loc} className={`filter-pill ${i === 0 ? 'active' : ''}`}>{loc}</button>
                ))}
              </div>

              <div className="filter-pills-row" style={{ marginTop: '4px' }}>
                {['ALL', 'NATURE', 'URBAN', 'FOOD', 'CULTURE'].map((cat, i) => (
                  <button key={cat} className={`filter-pill ${i === 0 ? 'active' : ''}`}>{cat}</button>
                ))}
              </div>

              <div className="feed-container" style={{ marginTop: '24px' }}>
                {COMMUNITY_FEED.filter(post => {
                  if (feedTab === 'Following') return connections[post.id] === 'connected';
                  return true;
                }).map(post => (
                  <div className="feed-card" key={post.id}>
                    <div className="feed-media" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setSelectedUser(post)}>
                      <img src={post.image} style={{ width: '100%', display: 'block' }} alt="Post" />

                      <div className="feed-card-header">
                        <img src={post.avatar} alt="Avatar" />
                        <span>@{post.user.toLowerCase().replace(' ', '.')}</span>
                      </div>

                      <div className="feed-card-footer">
                        <div className="feed-stat">
                          <Heart size={14} fill="#FFF" />
                          {post.likes}
                        </div>
                        <div className="feed-stat">
                          <Repeat size={14} />
                          {post.reposts}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ height: '240px' }}></div>
      </div>

      <AnimatePresence>
        {showUnlockOverlay && (
          <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(30px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ maxWidth: '400px', width: '100%', background: 'var(--surface-color)', borderRadius: '32px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ height: '240px', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1549416801-6b8f72740924?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="Elite" />
                <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--header-bg)', border: 'none', borderRadius: '50%', padding: '10px', color: 'var(--text-main)' }} onClick={() => setShowUnlockOverlay(false)}><X size={20} /></button>
                <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--header-bg)', padding: '6px 12px', borderRadius: '100px', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', marginBottom: '12px' }}>
                    <Shield size={14} color="var(--accent-sage)" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', color: 'var(--text-main)' }}>FOUNDER ELITE</span>
                  </div>
                  <h2 style={{ color: '#FFF', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Private Selection</h2>
                </div>
              </div>
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-sub)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '32px', maxWidth: '300px', margin: '0 auto 32px' }}>
                  A clandestine collection of hyper-local drops, curated exclusively for the <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--text-main)' }}>IMRSV Founder Circle.</span>
                </p>

                <motion.button
                  className="lu-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'var(--text-main)',
                    color: 'var(--bg-color)',
                    width: '100%',
                    padding: '20px',
                    borderRadius: '16px',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  Join the Founders
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedExperience && (
          <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ maxWidth: '400px', width: '100%', background: 'var(--surface-color)', borderRadius: '30px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <img src={selectedExperience.img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="Exp" />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>{selectedExperience.title}</h2>
                  <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '1.2rem' }}>{selectedExperience.price}</span>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <p style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Community Intelligence</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(selectedExperience.reviews || ["Verified coordinate.", "Highly recommended by local partners."]).map((rev, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)', marginTop: '6px' }}></div>
                        <p style={{ color: '#888', fontSize: '0.9rem', fontStyle: 'italic' }}>"{rev}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => { onAction("Experience Reserved! ⚡️"); setSelectedExperience(null); }} style={{ width: '100%', background: 'var(--accent-orange)', color: '#000', padding: '18px', borderRadius: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Reserve Spot</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 4500, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '50px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={selectedUser.avatar} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-orange)' }} alt="User" />
                <div>
                  <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>{selectedUser.user}</h2>
                  <p style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.8rem' }}>{selectedUser.location}</p>
                </div>
              </div>
              <button style={{ background: 'var(--border-color)', border: 'none', borderRadius: '50%', padding: '12px' }} onClick={() => setSelectedUser(null)}><X size={24} color="var(--text-main)" /></button>
            </div>

            <div className="scroll-y content-pad">
              <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <button
                  className="lu-btn"
                  style={{
                    flex: 1.2,
                    background: (connections[selectedUser.id] === 'connected' || connections[selectedUser.id] === 'requestSent') ? 'var(--surface-color)' : 'linear-gradient(135deg, var(--accent-orange), #ff7a3a)',
                    color: (connections[selectedUser.id] === 'connected' || connections[selectedUser.id] === 'requestSent') ? 'var(--text-main)' : '#000',
                    height: '64px', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    border: (connections[selectedUser.id] === 'connected' || connections[selectedUser.id] === 'requestSent') ? '1px solid var(--border-color)' : 'none'
                  }}
                  onClick={() => {
                    const currentState = connections[selectedUser.id] || 'notConnected';
                    if (currentState === 'notConnected') {
                      setConnections({ ...connections, [selectedUser.id]: 'requestSent' });
                      onAction("Friend request sent! ⚡️");
                    } else if (currentState === 'requestReceived') {
                      setConnections({ ...connections, [selectedUser.id]: 'connected' });
                      onAction("Connection established! ❤️");
                    } else if (currentState === 'connected') {
                      onAction("Already connected!");
                    }
                  }}
                >
                  {connections[selectedUser.id] === 'connected' ? <CheckCircle2 size={20} style={{ marginBottom: '4px' }} /> : <Users size={20} style={{ marginBottom: '4px' }} />}
                  {connections[selectedUser.id] === 'requestSent' ? 'Requested' : connections[selectedUser.id] === 'connected' ? 'Connected' : 'Add Friend'}
                </button>
                <button
                  className="lu-btn"
                  style={{ flex: 1, background: 'var(--border-color)', color: 'var(--text-main)', height: '64px', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => onAction("Chat interface opening...")}
                >
                  <MessageCircle size={20} style={{ marginBottom: '4px' }} />
                  Message
                </button>
              </div>

              <p style={{ color: '#A0A0A0', lineHeight: 1.5, fontSize: '0.9rem', marginBottom: '32px' }}>{selectedUser.bio}</p>

              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>Reputation Notes</h3>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-sage)', fontWeight: 800, background: 'rgba(52, 211, 153, 0.1)', padding: '4px 8px', borderRadius: '4px', letterSpacing: '1px' }}>VERIFIED</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {MOCK_REPUTATION_NOTES[selectedUser.id]?.map(note => (
                    <div key={note.id} className="reputation-note">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)' }}>{note.writer}</span>
                        <span className="trust-tag">{note.tag}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>{note.text}</p>
                    </div>
                  ))}

                  {connections[selectedUser.id] === 'connected' && (
                    <button
                      className="lu-btn"
                      style={{ width: '100%', background: 'rgba(255,255,255,0.03)', marginTop: '4px', border: '1px dashed var(--border-color)', fontSize: '0.75rem', color: 'var(--text-sub)', padding: '12px' }}
                      onClick={() => onAction("Note compose opened... ✍️")}
                    >
                      Write a Note...
                    </button>
                  )}
                </div>
              </div>

              <h3 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '16px' }}>Global Footprint</h3>
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserGallery(true)}
                style={{ height: '180px', background: '#080808', borderRadius: '20px', overflow: 'hidden', position: 'relative', marginBottom: '16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Map" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: '40%', left: '60%', width: '12px', height: '12px', background: 'var(--accent-orange)', borderRadius: '50%' }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    style={{ position: 'absolute', top: '70%', left: '30%', width: '10px', height: '10px', background: '#00E5FF', borderRadius: '50%' }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    style={{ position: 'absolute', top: '20%', left: '80%', width: '8px', height: '8px', background: 'var(--accent-orange)', borderRadius: '50%' }}
                  />
                  <Globe size={48} color="var(--accent-orange)" />
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: 800 }}>Tap for full footprint →</div>
              </motion.div>

              <h3 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '16px' }}>Recent Drops</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingBottom: '40px' }}>
                {[selectedUser.image, ...GALLERY_DROPS.slice(0, 3).map(g => g.img)].map((img, idx) => (
                  <div key={idx} style={{ aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', background: '#111' }}>
                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Drop" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUserGallery && selectedUser && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 5000, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '50px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
              <div>
                <h2 style={{ color: '#FFF' }}>{selectedUser.user}'s Footprint</h2>
                <p style={{ color: '#666' }}>{selectedUser.stats}</p>
              </div>
              <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '12px' }} onClick={() => setShowUserGallery(false)}><X size={24} color="#FFF" /></button>
            </div>
            <div className="scroll-y content-pad">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', paddingBottom: '40px' }}>
                {[selectedUser.image, ...GALLERY_DROPS.map(g => g.img)].map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{ aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Drop" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}

function PlannerTab({ onAction, onSettingsClick }) {
  const [plannerView, setPlannerView] = useState('agent');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: "Hey! I see you just landed in Kyoto, Japan. I've pulled some cheap flight drops above if you're thinking of hopping early. Do you want me to plan your Kyoto, Japan itinerary for tomorrow?", type: 'text' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text = inputValue) => {
    const msgToProcess = text.trim();
    if (!msgToProcess) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: msgToProcess, type: 'text' }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let responseText = "Looking into that. I've found a premium option that matches your founder profile.";
      let richCard = null;

      if (msgToProcess.toLowerCase().includes('tokyo') || msgToProcess.toLowerCase().includes('flight')) {
        responseText = "Found a direct flight to Tokyo for Friday morning. Premium seating available.";
        richCard = { type: 'flight', title: 'ITM → HND (ANA)', sub: 'Fast-track • 1h 10m', price: '$180.00' };
      } else if (msgToProcess.toLowerCase().includes('hotel') || msgToProcess.toLowerCase().includes('stay')) {
        responseText = "The Ace Hotel Kyoto has a King Suite opening for Founders tonight.";
        richCard = { type: 'hotel', title: 'Ace Hotel Kyoto', sub: 'King Suite • Founder Pref', price: '$420/night' };
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'agent', text: responseText, type: 'text', card: richCard }]);
      onAction("Agent Response Received ⚡️");
    }, 1200);
  };

  return (
    <div className="tab-layout">
      <header className="app-header">
        <div className="header-user" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Logo size={18} color="var(--accent-sage)" />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-main)', fontWeight: 900, letterSpacing: '4px' }}>IMRSV</span>
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-sage)', boxShadow: '0 0 8px var(--accent-sage)' }}></div>
          </div>
          <div className="header-titles">
            <h1 className="header-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>Agent & Trips</h1>
          </div>
        </div>
        <button className="header-icon-btn" onClick={onSettingsClick}><Compass size={20} /></button>
      </header>
      <div className="segmented-control">
        <button className={`segment-btn ${plannerView === 'agent' ? 'active' : ''}`} onClick={() => setPlannerView('agent')}>Agent Nova</button>
        <button className={`segment-btn ${plannerView === 'timeline' ? 'active' : ''}`} onClick={() => setPlannerView('timeline')}>Upcoming Trips</button>
      </div>

      {plannerView === 'agent' ? (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Agent Chat Content (remains same) */}
          <div style={{ padding: '0 24px', flexShrink: 0 }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '8px' }}>Live Flight Drops</p>
            <div className="horizontal-scroll" style={{ display: 'flex', gap: '12px', paddingBottom: '12px' }}>
              {FLIGHT_DROPS.map(drop => (
                <div key={drop.id} style={{ minWidth: '140px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <img src={drop.img} style={{ width: '100%', height: '100px', objectFit: 'cover' }} alt={drop.dest} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                    <div style={{ color: '#FFF', fontWeight: 800 }}>{drop.price}</div>
                    <div style={{ fontSize: '0.7rem', color: '#FFF' }}>To {drop.dest}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble-row ${msg.sender === 'user' ? 'user' : ''}`} style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.sender === 'agent' ? 'var(--accent-sage)' : 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {msg.sender === 'agent' ? <Logo size={16} color="#FFF" /> : <User size={16} color="var(--bg-color)" />}
                </div>
                <div style={{ maxWidth: '80%' }}>
                  <div className="chat-bubble" style={{ background: msg.sender === 'user' ? 'var(--accent-sage)' : 'var(--surface-color)', color: msg.sender === 'user' ? '#000' : 'var(--text-main)', padding: '12px 16px', borderRadius: '18px', border: msg.sender === 'agent' ? '1px solid var(--border-color)' : 'none' }}>{msg.text}</div>
                  {msg.card && (
                    <div className="chat-rich-card" style={{ marginTop: '12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-sub)' }}>{msg.card.type}</span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>{msg.card.price}</span>
                      </div>
                      <div style={{ padding: '12px', display: 'flex', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {msg.card.type === 'flight' ? <Plane size={20} color="var(--accent-sage)" /> : <Home size={20} color="var(--accent-sage)" />}
                        </div>
                        <div><h4 style={{ color: 'var(--text-main)' }}>{msg.card.title}</h4><p style={{ color: 'var(--text-sub)', fontSize: '0.8rem' }}>{msg.card.sub}</p></div>
                      </div>
                      <button className="lu-btn" style={{ width: '100%', borderRadius: 0, background: '#FFF', color: '#000', padding: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Book Now</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <div className="chat-bubble" style={{ opacity: 0.6 }}>Nova is thinking...</div>}
          </div>

          <div style={{ padding: '12px 24px 100px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['Change to Tokyo', 'Find me a Hotel', 'Quick Book Flight'].map(suggestion => (
                <button key={suggestion} onClick={() => handleSendMessage(suggestion)} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '20px', background: 'var(--border-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.8rem' }}>{suggestion}</button>
              ))}
            </div>
            <div className="chat-input-area" style={{ background: 'var(--surface-color)', borderRadius: '30px', padding: '8px 16px', display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)' }}>
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Message Nova..." style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1rem', padding: '12px' }} />
              <button onClick={() => handleSendMessage()} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--text-main)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}><Send size={18} color="var(--bg-color)" /></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-pad scroll-y" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence mode="wait">
            {!selectedTrip ? (
              <motion.div
                key="trip-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(154, 191, 128, 0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(154, 191, 128, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={16} color="var(--accent-sage)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', fontWeight: 700 }}>Synced with Expedia, AirBnB & Booking</span>
                  </div>
                  <Sparkles size={14} color="var(--accent-sage)" />
                </div>

                {UPCOMING_TRIPS.map(trip => (
                  <motion.div
                    key={trip.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrip(trip)}
                    style={{ background: 'var(--surface-color)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                  >
                    <div style={{ height: '120px', position: 'relative' }}>
                      <img src={trip.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={trip.location} />
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', color: trip.status === 'Synced' ? 'var(--accent-sage)' : '#FFF', fontWeight: 800, border: trip.status === 'Synced' ? '1px solid var(--accent-sage)' : '1px solid rgba(255,255,255,0.2)' }}>
                        {trip.status}
                      </div>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800 }}>{trip.location}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <p style={{ color: '#888', fontSize: '0.85rem' }}>{trip.dates}</p>
                        <ChevronRight size={18} color="#444" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="itinerary-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button onClick={() => setSelectedTrip(null)} style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <ChevronLeft size={18} /> Back to Trips
                </button>

                <div style={{ marginBottom: '24px' }}>
                  <p style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Itinerary</p>
                  <h2 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: 900 }}>{selectedTrip.location}</h2>
                </div>

                <div className="timeline-container">
                  {selectedTrip.itinerary.map(stop => (
                    <div className="timeline-item" key={stop.id} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,93,19,0.1)', border: '1px solid var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{stop.icon}</div>
                      <div>
                        <div style={{ color: 'var(--text-main)', fontWeight: 800 }}>{stop.title}</div>
                        <div style={{ color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 700 }}>{stop.time}</div>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>{stop.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="lu-btn" style={{ width: '100%', marginTop: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
                  <Share size={18} style={{ marginRight: '8px' }} /> Share Itinerary
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <div style={{ height: '100px' }}></div>
        </div>
      )}
    </div>
  );
}

// --- PREMIUM UPLOADER COMPONENTS ---

export function AvatarUploader({ userId, currentPath, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `avatars/${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_path: filePath, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (dbError) throw dbError;

      const { data: { publicUrl } } = supabase.storage.from('profile-images').getPublicUrl(filePath);
      onUploadSuccess(publicUrl, filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  const publicUrl = currentPath ? supabase.storage.from('profile-images').getPublicUrl(currentPath).data.publicUrl : null;

  return (
    <div className="avatarWrap">
      <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" style={{ display: 'none' }} />
      <div className="avatarCircle" onClick={() => !uploading && fileInputRef.current.click()}>
        <img
          src={publicUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
          alt="Avatar"
          style={{ opacity: uploading ? 0.3 : 1, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="avatarOverlay" style={{ opacity: uploading ? 1 : undefined, display: uploading ? 'grid' : undefined, placeItems: uploading ? 'center' : undefined }}>
          {uploading ? <Loader2 className="loading-ring" size={32} color="var(--gold)" /> : <Camera size={24} color="#FFF" />}
        </div>
        <div className="avatarPlus">
          <Plus size={18} />
        </div>
      </div>
    </div>
  );
}

export function PhotoGalleryUploader({ userId, photos, onUpdate }) {
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const fileInputRef = React.useRef(null);
  const [targetSlot, setTargetSlot] = useState(null);

  const handleFileSelect = (slotIndex) => {
    setTargetSlot(slotIndex);
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      const slotIndex = targetSlot;
      setUploadingSlot(slotIndex);

      const file = event.target.files[0];
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const existingPhoto = photos.find(p => p.sort_order === slotIndex);

      if (existingPhoto) {
        // Update
        const { error: dbError } = await supabase
          .from('profile_photos')
          .update({ photo_path: filePath })
          .eq('id', existingPhoto.id);
        if (dbError) throw dbError;

        // Cleanup old storage
        await supabase.storage.from('profile-images').remove([existingPhoto.photo_path]);
      } else {
        // Insert
        const { error: dbError } = await supabase
          .from('profile_photos')
          .insert({ user_id: userId, photo_path: filePath, sort_order: slotIndex });
        if (dbError) throw dbError;
      }

      onUpdate();
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Upload failed!');
    } finally {
      setUploadingSlot(null);
      setTargetSlot(null);
    }
  };

  const handleRemove = async (photo) => {
    try {
      const { error: dbError } = await supabase.from('profile_photos').delete().eq('id', photo.id);
      if (dbError) throw dbError;
      await supabase.storage.from('profile-images').remove([photo.photo_path]);
      onUpdate();
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  return (
    <div className="gallery">
      <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" style={{ display: 'none' }} />
      {[0, 1, 2].map((i) => {
        const photo = photos.find(p => p.sort_order === i);
        const isUploading = uploadingSlot === i;
        const publicUrl = photo ? supabase.storage.from('profile-images').getPublicUrl(photo.photo_path).data.publicUrl : null;

        return (
          <div key={i} className="slot" onClick={() => !isUploading && handleFileSelect(i)}>
            {isUploading ? (
              <Loader2 className="loading-ring" size={24} color="var(--gold)" />
            ) : photo ? (
              <>
                <img src={publicUrl} alt={`Slot ${i}`} />
                <div className="slotActions">
                  <button className="slot-action-btn" onClick={(e) => { e.stopPropagation(); handleFileSelect(i); }}>
                    <Repeat size={14} color="#111" />
                  </button>
                  <button className="slot-action-btn" onClick={(e) => { e.stopPropagation(); handleRemove(photo); }}>
                    <Trash2 size={14} color="#EF4444" />
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Plus size={20} color="var(--muted)" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Add Photo</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProfileTab({ onAction }) {
  const [profile, setProfile] = useState({ full_name: '', profession: '', bio: '', avatar_path: '' });
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mock current user ID - In real app, get from auth
  const userId = '00000000-0000-0000-0000-000000000000';

  const fetchProfile = async () => {
    try {
      const { data: prof, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profError && profError.code !== 'PGRST116') throw profError;
      setProfile(prof || { full_name: '', profession: '', bio: '', avatar_path: '' });

      const { data: photos, error: photoError } = await supabase
        .from('profile_photos')
        .select('*')
        .eq('user_id', userId)
        .order('sort_order', { ascending: true });

      if (photoError) throw photoError;
      setGallery(photos || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (data) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          profession: data.profession,
          bio: data.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      setProfile(prev => ({ ...prev, ...data }));
      onAction('Profile Updated ✓');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><Loader2 className="loading-ring" /></div>;

  return (
    <div className="tab-layout">
      <AppHeader title="Profile" subtitle="Personal Identity" showPulse onSettingsClick={() => { }} />
      <div className="content-pad scroll-y" style={{ background: 'var(--bg)' }}>
        <div className="profileCard">
          <AvatarUploader
            userId={userId}
            currentPath={profile?.avatar_path}
            onUploadSuccess={(url, path) => setProfile(prev => ({ ...prev, avatar_path: path }))}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
            <div>
              <label className="label">Full Name</label>
              <input
                className="input"
                value={profile?.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Profession</label>
              <input
                className="input"
                value={profile?.profession}
                onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Biography</label>
              <textarea
                className="textarea"
                value={profile?.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Featured Photography</label>
              <PhotoGalleryUploader userId={userId} photos={gallery} onUpdate={fetchProfile} />
            </div>

            <button
              className="saveBtn"
              onClick={() => handleSave(profile)}
              disabled={saving}
            >
              {saving ? 'Syncing...' : 'Update Explorer Profile'}
            </button>
          </div>
        </div>
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
}

// --- MAIN APP ---

const AppStyles = `
  .map-tooltip { pointer-events: none; }
  div:hover > .map-tooltip { opacity: 1 !important; transform: translate(-50%, -5px) !important; }
  .tab-search-pill { 
    flex: 1; 
    max-width: 140px; 
    height: 48px; 
    background: rgba(255,255,255,0.05); 
    border-radius: 24px; 
    display: flex; 
    align-items: center; 
    justify-content: flex-start; 
    padding: 0 16px; 
    gap: 12px; 
    border: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab-search-pill:active { transform: scale(0.95); background: rgba(255,255,255,0.1); }
  .light-theme .tab-search-pill { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.12); }
  .light-theme .tab-search-pill:active { background: rgba(0,0,0,0.08); }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRecording, setIsRecording] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [isFounderUnlocked, setIsFounderUnlocked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isClaimed, setIsClaimed] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Chen',
    location: 'Kyoto, Japan',
    bio: 'Digital Nomad & Adventure Photographer. Collecting coordinates and funding communities.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    status: 'Active Explorer'
  });

  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUnlockOverlay, setShowUnlockOverlay] = useState(false);
  const [showUserGallery, setShowUserGallery] = useState(false);
  const [connections, setConnections] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, icon: <Sparkles size={16} color="var(--accent-sage)" /> }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="preview-wrapper">
      <style>{AppStyles}</style>
      <div className="iphone-frame">
        <div className="iphone-notch"></div>
        <div className={`mobile-app-container ${theme === 'light' ? 'light-theme' : ''}`}>
          <AnimatePresence>
            {showSplash && (
              <motion.div style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} exit={{ opacity: 0 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                  <Logo size={80} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="toast-container">
            {toasts.map(t => <Toast key={t.id} message={t.message} icon={t.icon} onRemove={() => removeToast(t.id)} />)}
          </div>

          <AnimatePresence>
            {isRecording && (
              <motion.div className="live-recording-banner" initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>
                <div className="lrb-pulse"></div><span>Recording Active GPS...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="mobile-main-wrapper" style={{ paddingTop: isRecording ? '40px' : '0' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper"><DashboardTab onAction={addToast} onSettingsClick={() => setIsSettingsOpen(true)} selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience} showUnlockOverlay={showUnlockOverlay} setShowUnlockOverlay={setShowUnlockOverlay} showUserGallery={showUserGallery} setShowUserGallery={setShowUserGallery} connections={connections} setConnections={setConnections} /></motion.div>}
              {activeTab === 'planner' && <motion.div key="plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper"><PlannerTab onAction={addToast} onSettingsClick={() => setIsSettingsOpen(true)} /></motion.div>}
              {activeTab === 'profile' && <motion.div key="prof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper"><ProfileTab onAction={addToast} /></motion.div>}
              {activeTab === 'pro' && <motion.div key="pro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper"><ProTab isUnlocked={isFounderUnlocked} setUnlocked={setIsFounderUnlocked} onAction={addToast} onSettingsClick={() => setIsSettingsOpen(true)} isClaimed={isClaimed} setIsClaimed={setIsClaimed} /></motion.div>}
            </AnimatePresence>
          </main>

          <SettingsOverlay isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} theme={theme} setTheme={setTheme} profileData={profileData} setProfileData={setProfileData} />

          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onAction={addToast}
            onSelectUser={setSelectedUser}
            onSelectExp={setSelectedExperience}
          />

          <AppTabBar activeTab={activeTab} setActiveTab={setActiveTab} onSearchOpen={() => setIsSearchOpen(true)} />

          <AnimatePresence>
            {showUnlockOverlay && (
              <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 6500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ maxWidth: '400px', width: '100%', background: 'var(--surface-color)', borderRadius: '30px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <div style={{ height: '200px', position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hidden" />
                    <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '8px' }} onClick={() => setShowUnlockOverlay(false)}><X size={20} color="#FFF" /></button>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', textAlign: 'center', width: 'calc(100% - 40px)' }}><Lock size={32} color="#C084FC" /><h2 style={{ color: '#FFF' }}>Restricted Coordinates</h2></div>
                  </div>
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-sub)', marginBottom: '24px' }}>Requires IMRSV Founder Access to view hidden coordinate drops.</p>
                    <button className="lu-btn" style={{ background: 'var(--accent-orange)', color: '#000', width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 800 }}>Upgrade to Founder</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedExperience && (
              <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 6500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ maxWidth: '400px', width: '100%', background: 'var(--surface-color)', borderRadius: '30px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <img src={selectedExperience.img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="Exp" />
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>{selectedExperience.title}</h2>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '1.2rem' }}>{selectedExperience.price}</span>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Community Intelligence</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(selectedExperience.reviews || ["Verified coordinate.", "Highly recommended by local partners."]).map((rev, i) => (
                          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)', marginTop: '6px' }}></div>
                            <p style={{ color: '#888', fontSize: '0.9rem', fontStyle: 'italic' }}>"{rev}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => { addToast("Experience Reserved! ⚡️"); setSelectedExperience(null); }} style={{ width: '100%', background: 'var(--accent-orange)', color: '#000', padding: '18px', borderRadius: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Reserve Spot</button>
                    <button onClick={() => setSelectedExperience(null)} style={{ width: '100%', background: 'none', color: '#666', padding: '12px', marginTop: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CLOSE</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 6500, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: '50px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={selectedUser.avatar} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-orange)' }} alt="User" />
                    <div>
                      <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>{selectedUser.user}</h2>
                      <p style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.8rem' }}>{selectedUser.points}</p>
                    </div>
                  </div>
                  <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '12px' }} onClick={() => setSelectedUser(null)}><X size={24} color="#FFF" /></button>
                </div>

                <div className="scroll-y content-pad">
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                    <button
                      className="lu-btn"
                      style={{ flex: 1.2, background: 'linear-gradient(135deg, var(--accent-orange), #ff7a3a)', color: '#000', height: '64px', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => { addToast(`Following ${selectedUser.user}! ⚡️`); setSelectedUser(null); }}
                    >
                      <Users size={20} style={{ marginBottom: '4px' }} />
                      Follow Partner
                    </button>
                    <button
                      className="lu-btn"
                      style={{ flex: 1, background: 'var(--border-color)', color: 'var(--text-main)', height: '64px', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <MessageCircle size={20} style={{ marginBottom: '4px' }} />
                      Message
                    </button>
                  </div>

                  <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
                    <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                      <span style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.75rem', marginBottom: '4px' }}>COLLECTED DROPS</span>
                      <span style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 800 }}>{selectedUser.likes}+</span>
                    </div>
                    <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                      <span style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.75rem', marginBottom: '4px' }}>LOCATION</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700 }}>{selectedUser.location}</span>
                    </div>
                  </div>

                  <p style={{ color: '#A0A0A0', lineHeight: 1.5, fontSize: '0.9rem', marginBottom: '32px' }}>{selectedUser.bio}</p>

                  <h3 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '16px' }}>Global Footprint</h3>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUserGallery(true)}
                    style={{ height: '180px', background: '#080808', borderRadius: '20px', overflow: 'hidden', position: 'relative', marginBottom: '16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Map" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', top: '40%', left: '60%', width: '12px', height: '12px', background: 'var(--accent-orange)', borderRadius: '50%' }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        style={{ position: 'absolute', top: '70%', left: '30%', width: '10px', height: '10px', background: '#00E5FF', borderRadius: '50%' }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        style={{ position: 'absolute', top: '20%', left: '80%', width: '8px', height: '8px', background: 'var(--accent-orange)', borderRadius: '50%' }}
                      />
                      <Globe size={48} color="var(--accent-orange)" />
                    </div>
                    <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: 800 }}>Tap for full footprint →</div>
                  </motion.div>

                  <h3 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '16px' }}>Recent Drops</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingBottom: '40px' }}>
                    {[selectedUser.image, ...GALLERY_DROPS.slice(0, 3).map(g => g.img)].map((img, idx) => (
                      <div key={idx} style={{ aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', background: '#111' }}>
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Drop" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Sub-components that were at the end
function ProTab({ isUnlocked, setUnlocked, onAction, onSettingsClick, isClaimed, setIsClaimed }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const handleUnlock = () => {
    setShowExplainer(true);
  };

  const handleSubscribe = () => {
    setShowExplainer(false);
    setIsProcessing(true);
    setTimeout(() => {
      setUnlocked(true);
      setIsProcessing(false);
      onAction("Founder Elite Activated! 🎉");
    }, 2000);
  };

  const handleClaim = () => {
    if (isClaimed) return;
    setIsClaimed(true);
  };

  if (isClaimed) {
    return (
      <div className="tab-layout">
        <AppHeader title="The IMRSV Project" subtitle="Elite Dashboard" onSettingsClick={onSettingsClick} />
        <div className="content-pad scroll-y">
          <div className="simple-card" style={{ padding: '24px', marginBottom: '32px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,122,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={20} color="var(--accent-orange)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>Gamification</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.75rem' }}>How you earn & grow</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Every action you take earns points — exploring new places, posting drops, referring friends, and funding communities.
              Points unlock ranks from <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>Scout</span> → <span style={{ color: 'var(--accent-sage)', fontWeight: 700 }}>Nomad</span> → <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Founder</span>,
              each with better rates, exclusive access, and greater voting power in the Impact Fund.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--border-color)', padding: '14px', borderRadius: '14px' }}>
                <p style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '6px' }}>Explore</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>Visit new places to unlock map quadrants and trigger 1.5x point streaks.</p>
              </div>
              <div style={{ background: 'var(--border-color)', padding: '14px', borderRadius: '14px' }}>
                <p style={{ color: 'var(--accent-sage)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '6px' }}>Discover</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>Post "Drops" at hidden coordinates for massive point payouts.</p>
              </div>
              <div style={{ background: 'var(--border-color)', padding: '14px', borderRadius: '14px' }}>
                <p style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '6px' }}>Refer</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>Invite friends and earn 10% of their total activity points.</p>
              </div>
              <div style={{ background: 'var(--border-color)', padding: '14px', borderRadius: '14px' }}>
                <p style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '6px' }}>Impact</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: 1.4 }}>Fund local communities to unlock Legendary gear and access.</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>Current Standing</h3>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'monospace' }}>84% TO NOMAD</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden', display: 'flex', padding: '1px' }}>
              <div style={{ width: '45%', background: 'var(--accent-orange)', borderRadius: '4px 0 0 4px' }}></div>
              <div style={{ width: '30%', background: 'var(--accent-sage)' }}></div>
              <div style={{ width: '9%', background: 'var(--accent-purple)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--accent-orange)', fontWeight: 800 }}>SCOUT</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--accent-sage)', fontWeight: 800 }}>NOMAD</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--accent-purple)', fontWeight: 800 }}>FOUNDER</span>
            </div>
          </div>

          <div className="chart-card simple-card mb-6" style={{ background: 'linear-gradient(135deg, var(--bg-color), #150024)', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px' }}>
              <TrendingUp size={24} color="#C084FC" style={{ opacity: 0.4 }} />
            </div>
            <p className="chart-label" style={{ color: 'var(--text-sub)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px' }}>Community Reinvestment</p>
            <h2 className="chart-value" style={{ color: 'var(--text-main)', fontSize: '2rem', marginTop: '4px', fontWeight: 800 }}>$142,000.00</h2>
            <div style={{ width: '100%', height: 180, marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REINVESTMENT_DATA}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#C084FC' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#C084FC" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="section-title">Global Impact Map</h2>
          <div className="impact-map-card simple-card mb-6" style={{ height: '300px', background: '#080808', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, filter: 'grayscale(100%) brightness(0.5)' }} alt="Map" />

            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
              {/* Impact Project Markers */}
              {IMPACT_PROJECTS.map(proj => (
                <motion.div
                  key={proj.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                  style={{
                    position: 'absolute',
                    top: proj.y,
                    left: proj.x,
                    width: '10px',
                    height: '10px',
                    background: proj.color,
                    borderRadius: '50%',
                    boxShadow: `0 0 15px ${proj.color}`,
                    cursor: 'pointer'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', inset: -4, border: `1px solid ${proj.color}`, borderRadius: '50%' }}
                  />
                  <div className="map-tooltip" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', background: '#000', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', whiteSpace: 'nowrap', pointerEvents: 'none', border: `1px solid ${proj.color}`, opacity: 0, transition: 'opacity 0.2s' }}>
                    {proj.name}
                  </div>
                </motion.div>
              ))}

              {/* Lifestyle Social Markers */}
              {LIFESTYLE_SOCIALS.map(social => (
                <motion.div
                  key={social.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                  style={{
                    position: 'absolute',
                    top: social.y,
                    left: social.x,
                    width: '8px',
                    height: '8px',
                    background: social.color,
                    borderRadius: '50%',
                    boxShadow: `0 0 10px ${social.color}`,
                    cursor: 'pointer',
                    border: '2px solid #000'
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', background: '#000', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', whiteSpace: 'nowrap', pointerEvents: 'none', border: `1px solid ${social.color}`, opacity: 0, transition: 'opacity 0.2s' }}>
                    {social.name}
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#666', fontWeight: 800 }}>Global Activity Engine // Live</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)' }}></div>
                  <span style={{ fontSize: '0.5rem', color: '#888' }}>Social</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-sage)' }}></div>
                  <span style={{ fontSize: '0.5rem', color: '#888' }}>Impact</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="section-title">IMRSV Impact Fund</h2>
          <div className="horizontal-scroll mb-8" style={{ display: 'flex', gap: '16px', padding: '0 4px 16px', margin: '0 -4px' }}>
            {IMPACT_PROJECTS.map(proj => (
              <div key={proj.id} style={{ minWidth: '220px', background: 'var(--surface-color)', borderRadius: '24px', padding: '20px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${proj.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  {React.cloneElement(proj.icon, { color: proj.color })}
                </div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '4px' }}>{proj.name}</h4>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.8rem', marginBottom: '12px' }}>{proj.loc}</p>
                <div style={{ background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: proj.status.includes('%') ? proj.status.split('%')[0] + '%' : '100%', height: '100%', background: proj.color }}></div>
                </div>
                <p style={{ fontSize: '0.7rem', color: proj.color, fontWeight: 800, marginTop: '8px' }}>{proj.status}</p>
              </div>
            ))}
          </div>

          <h2 className="section-title">Founder Lifestyle Socials</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {LIFESTYLE_SOCIALS.map(social => (
              <motion.div
                key={social.id}
                className="simple-card"
                whileTap={{ scale: 0.98 }}
                style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, var(--surface-color), #0a0a0a)' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: '#888', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700 }}>{social.type}</span>
                    <span style={{ color: 'var(--accent-orange)', fontSize: '0.7rem', fontWeight: 700 }}>{social.time}</span>
                  </div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{social.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', marginLeft: '4px' }}>
                      {social.avatars.map((av, idx) => (
                        <div key={idx} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #000', overflow: 'hidden', marginLeft: idx === 0 ? 0 : '-8px' }}>
                          <img src={av} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="U" />
                        </div>
                      ))}
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#222', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-8px', fontSize: '0.6rem', color: '#FFF', fontWeight: 800 }}>+{social.rsvps - social.avatars.length}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{social.rsvps} RSVPed</span>
                  </div>
                </div>
                <button className="lu-btn" style={{ padding: '8px 16px', background: 'var(--accent-purple)', color: '#FFF', fontSize: '0.8rem', borderRadius: '10px' }} onClick={() => onAction("RSVP'd to Event! ✨")}>Join</button>
              </motion.div>
            ))}
          </div>

          <div style={{ height: '120px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-layout">
      <AppHeader title="The IMRSV Project" subtitle="Founder Hub" onSettingsClick={onSettingsClick} />
      <div className="content-pad scroll-y">
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0D0118, #1a0030)',
            padding: '40px 24px',
            borderRadius: '32px',
            border: `1px solid ${isUnlocked ? 'var(--accent-purple)' : 'rgba(126, 34, 206, 0.2)'}`,
            textAlign: 'center',
            filter: isUnlocked ? 'none' : 'blur(4px)',
            opacity: isUnlocked ? 1 : 0.6,
            transition: 'all 0.5s ease'
          }}>
            <Shield size={40} color="var(--accent-purple)" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '2rem', color: '#FFF' }}>Founder Elite</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '16px 0' }}>Join the top 1% of the circular economy. Exclusive rates, private drops, and voting power.</p>

            <motion.button
              className="lu-btn"
              whileHover={isClaimed ? {} : { scale: 1.01 }}
              whileTap={isClaimed ? {} : { scale: 0.99 }}
              onClick={handleClaim}
              animate={isClaimed ? { borderColor: '#10B981' } : {
                borderColor: [
                  'rgba(192, 132, 252, 0.3)',
                  'rgba(192, 132, 252, 0.8)',
                  'rgba(192, 132, 252, 0.4)',
                  'rgba(192, 132, 252, 1)',
                  'rgba(192, 132, 252, 0.3)'
                ],
                boxShadow: [
                  '0 0 0px rgba(126, 34, 206, 0)',
                  '0 0 15px rgba(126, 34, 206, 0.4)',
                  '0 0 5px rgba(126, 34, 206, 0.2)',
                  '0 0 25px rgba(126, 34, 206, 0.6)',
                  '0 0 0px rgba(126, 34, 206, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.05, 0.1, 0.15, 1],
                ease: "easeInOut"
              }}
              style={{
                background: '#0D0118',
                color: isClaimed ? '#10B981' : '#FFF',
                width: '100%',
                padding: '20px',
                borderRadius: '24px',
                border: '1px solid rgba(162, 48, 237, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <motion.div
                animate={isClaimed ? { opacity: 1, filter: 'none' } : {
                  opacity: [1, 0.5, 1, 0.3, 1],
                  filter: [
                    'drop-shadow(0 0 0px var(--accent-purple))',
                    'drop-shadow(0 0 8px var(--accent-purple))',
                    'drop-shadow(0 0 2px var(--accent-purple))',
                    'drop-shadow(0 0 12px var(--accent-purple))',
                    'drop-shadow(0 0 0px var(--accent-purple))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.05, 0.1, 0.15, 1],
                  ease: "easeInOut"
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isClaimed ? <CheckCircle2 size={20} color="#10B981" /> : <Logo size={20} color="var(--accent-purple)" />}
              </motion.div>
              <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem' }}>
                {isClaimed ? 'Access Active' : 'Claim Founder Access'}
              </span>
            </motion.button>
          </div>

          {!isUnlocked && (
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10
              }}
              onClick={handleUnlock}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                style={{
                  background: 'rgba(20, 20, 20, 0.9)',
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--accent-purple)',
                  boxShadow: '0 0 30px rgba(162, 48, 237, 0.3)'
                }}
                animate={isProcessing ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {isProcessing ? (
                  <div style={{ border: '3px solid transparent', borderTop: '3px solid var(--accent-purple)', borderRadius: '50%', width: '30px', height: '30px' }}></div>
                ) : (
                  <Lock size={32} color="var(--accent-purple)" />
                )}
              </motion.div>

              <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, textAlign: 'center' }}>
                <p style={{ color: '#FFF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem' }}>TAP TO UNLOCK FOUNDER ELITE</p>
                <p style={{ color: '#C084FC', fontSize: '1.1rem', fontWeight: 800, marginTop: '8px' }}>$12.99<span style={{ fontSize: '0.7rem', fontWeight: 600 }}>/month</span></p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Explainer Overlay */}
      <AnimatePresence>
        {showExplainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--bg-color)', zIndex: 6000, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '50px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'var(--text-main)', fontWeight: 800 }}>Founder Elite</h2>
              <button style={{ background: 'var(--border-color)', border: 'none', borderRadius: '50%', padding: '12px', cursor: 'pointer' }} onClick={() => setShowExplainer(false)}><X size={24} color="var(--text-main)" /></button>
            </div>
            <div className="scroll-y" style={{ padding: '0 24px 40px' }}>
              <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(126, 34, 206, 0.1)', border: '2px solid var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Shield size={36} color="var(--accent-purple)" />
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '16px' }}>Become a Founder</h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(126, 34, 206, 0.08)', border: '1px solid rgba(126, 34, 206, 0.2)', borderRadius: '20px', padding: '12px 24px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', textDecoration: 'line-through', opacity: 0.6 }}>$24.99</span>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-purple)', fontFamily: 'Georgia, serif' }}>$12.99</span>
                  <span style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>/mo</span>
                </div>
                <p style={{ color: 'var(--accent-sage)', fontSize: '0.75rem', fontWeight: 700, marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Limited early access pricing</p>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.8rem', marginTop: '4px' }}>Cancel anytime. No commitments.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {[
                  { icon: <Zap size={20} color="var(--accent-orange)" />, title: 'Gamification Engine', desc: 'Everything you do earns points — checking in at a hotspot (50 pts), posting a daily drop (500 pts), referring a friend (200 pts), or funding a community project (1,200 pts). Accumulate points to rank up from Scout → Nomad → Founder, unlocking better rates and exclusive perks at every tier.' },
                  { icon: <Globe size={20} color="var(--accent-sage)" />, title: 'Impact Fund Access', desc: 'A portion of every subscription goes directly into local community projects — clean water initiatives, cultural preservation, and eco-tourism programs. Track exactly where your money goes on the live Impact Map.' },
                  { icon: <Lock size={20} color="var(--accent-purple)" />, title: 'Private Drops & Coordinates', desc: 'Access hidden coordinates that only Founders can see — secret viewpoints, underground restaurants, and invite-only cultural experiences curated by locals.' },
                  { icon: <Users size={20} color="#00E5FF" />, title: 'Founder Lifestyle Socials', desc: 'Join invite-only events — rooftop dinners in Tokyo, sunrise hikes in Bali, wine tastings in Tuscany. Meet fellow Founders and build your global network.' },
                  { icon: <Star size={20} color="var(--accent-orange)" />, title: 'Voting Power', desc: 'Cast votes on which communities receive funding next. Top-ranked Founders get 3x voting weight, directly shaping where the network grows.' }
                ].map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', padding: '16px', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '4px' }}>{feature.title}</h4>
                      <p style={{ color: 'var(--text-sub)', fontSize: '0.8rem', lineHeight: 1.5 }}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                className="lu-btn"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleSubscribe}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(162, 48, 237, 0.2), 0 0 60px rgba(162, 48, 237, 0.1)',
                    '0 0 30px rgba(162, 48, 237, 0.4), 0 0 80px rgba(162, 48, 237, 0.2)',
                    '0 0 20px rgba(162, 48, 237, 0.2), 0 0 60px rgba(162, 48, 237, 0.1)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '100%', padding: '20px',
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #C084FC, #A855F7, #7C3AED)',
                  backgroundSize: '200% 200%',
                  color: '#FFF', fontWeight: 900, fontSize: '1rem',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  borderRadius: '20px', border: '1px solid rgba(192, 132, 252, 0.4)',
                  marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                }}
              >
                <Shield size={18} />
                <span>Subscribe</span>
                <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, letterSpacing: '0', textTransform: 'none', opacity: 0.9 }}>— $12.99/mo</span>
              </motion.button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Lock size={10} color="var(--text-sub)" /><span style={{ color: 'var(--text-sub)', fontSize: '0.7rem' }}>Secure</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={10} color="var(--text-sub)" /><span style={{ color: 'var(--text-sub)', fontSize: '0.7rem' }}>Instant access</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><X size={10} color="var(--text-sub)" /><span style={{ color: 'var(--text-sub)', fontSize: '0.7rem' }}>Cancel anytime</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
