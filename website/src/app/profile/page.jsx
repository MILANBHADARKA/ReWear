"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Eye } from "lucide-react";

import {
  User,
  Heart,
  MessageCircle,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  ShirtIcon,
  CheckCircle,
  ThumbsUp,
  Coins,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import IsSignedIn from "@/components/HOC/IsSignedIn";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useUser();
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    itemsListed: 12,
    successfulSwaps: 5,
    positiveFeedback: 8,
    pointsEarned: 120,
  });
  const [viewMode, setViewMode] = useState("grid");
  const [likedItems, setLikedItems] = useState(new Set());

  const toggleLike = (itemId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
  };
 const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function getBadges() {
      const fetchedBadges = await fetchUserBadges();
      setBadges(fetchedBadges);
    }

    getBadges(); 
  }, []);

    async function fetchUserBadges() {
    try {
      const response = await fetch("/api/badge/currentUser");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      console.log("Badges:", data.badges);
      return data.badges;
    } catch (error) {
      console.error("Failed to fetch badges:", error.message);
      return [];
    }
  }

  const dummyItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description:
        "Classic vintage denim jacket in excellent condition. Perfect for layering and adding a retro touch to any outfit.",
      price: 45,
      originalPrice: 120,
      category: "Outerwear",
      size: "M",
      condition: "Excellent",
      brand: "Levi's",
      color: "Blue",
      seller: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        location: "New York, NY",
      },
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      datePosted: "2024-01-15",
      dateBought: "2023-06-10",
      views: 234,
      likes: 18,
      tags: ["vintage", "denim", "casual", "retro"],
      featured: true,
    },
    {
      id: 2,
      title: "Designer Silk Dress",
      description:
        "Elegant silk dress from a premium designer brand. Worn only once to a special event. Perfect for formal occasions.",
      price: 180,
      originalPrice: 450,
      category: "Dresses",
      size: "S",
      condition: "Like New",
      brand: "Valentino",
      color: "Black",
      seller: {
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        location: "Los Angeles, CA",
      },
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      datePosted: "2024-01-14",
      dateBought: "2023-12-20",
      views: 456,
      likes: 32,
      tags: ["designer", "silk", "formal", "elegant"],
      featured: false,
    },
    {
      id: 3,
      title: "Cozy Wool Sweater",
      description:
        "Super soft merino wool sweater in beautiful cream color. Perfect for cold weather and very comfortable to wear.",
      price: 35,
      originalPrice: 85,
      category: "Tops",
      size: "L",
      condition: "Good",
      brand: "Uniqlo",
      color: "Cream",
      seller: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        location: "San Francisco, CA",
      },
      images: ["/placeholder.svg?height=400&width=400"],
      datePosted: "2024-01-13",
      dateBought: "2023-10-15",
      views: 189,
      likes: 25,
      tags: ["wool", "cozy", "winter", "comfortable"],
      featured: false,
    },
    {
      id: 4,
      title: "Leather Ankle Boots",
      description:
        "Genuine leather ankle boots with a slight heel. Very comfortable and stylish. Great for both casual and semi-formal looks.",
      price: 65,
      originalPrice: 160,
      category: "Footwear",
      size: "8",
      condition: "Good",
      brand: "Cole Haan",
      color: "Brown",
      seller: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
        location: "Chicago, IL",
      },
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      datePosted: "2024-01-12",
      dateBought: "2023-09-05",
      views: 123,
      likes: 15,
      tags: ["leather", "boots", "comfortable", "versatile"],
      featured: true,
    },
    {
      id: 5,
      title: "Bohemian Maxi Skirt",
      description:
        "Flowy bohemian-style maxi skirt with beautiful floral patterns. Perfect for summer festivals and casual outings.",
      price: 28,
      originalPrice: 70,
      category: "Bottoms",
      size: "M",
      condition: "Excellent",
      brand: "Free People",
      color: "Floral",
      seller: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        location: "Austin, TX",
      },
      images: ["/placeholder.svg?height=400&width=400"],
      datePosted: "2024-01-11",
      dateBought: "2023-07-20",
      views: 298,
      likes: 41,
      tags: ["bohemian", "floral", "summer", "festival"],
      featured: false,
    },
    {
      id: 6,
      title: "Classic White Sneakers",
      description:
        "Clean white leather sneakers in great condition. Minimal wear, perfect for everyday casual looks.",
      price: 42,
      originalPrice: 100,
      category: "Footwear",
      size: "9",
      condition: "Very Good",
      brand: "Adidas",
      color: "White",
      seller: {
        name: "Jordan Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        location: "Seattle, WA",
      },
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      datePosted: "2024-01-10",
      dateBought: "2023-11-12",
      views: 167,
      likes: 22,
      tags: ["sneakers", "white", "casual", "everyday"],
      featured: false,
    },
  ];
  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "like new":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "excellent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "very good":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "good":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };
  const [bageImages, setBageImages] = useState([
    "https://gateway.pinata.cloud/ipfs/QmEcoHeroBadgeCID", // Eco Hero
    "https://gateway.pinata.cloud/ipfs/QmTopListerBadgeCID", // Top Lister
    "https://gateway.pinata.cloud/ipfs/QmGoldenReputationBadgeCID", // Golden Reputation
  ]);

  const [badgesLoading, setBadgesLoading] = useState(false);

 

 

  // Updated to match your posts API pattern
  async function fetchUserBadges() {
    try {
      const response = await fetch("/api/badge/currentUser");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      console.log("Badges:", data.badges);
      return data.badges;
    } catch (error) {
      console.error("Failed to fetch badges:", error.message);
      return [];
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>
  }
  return (
    <div className="mt-16 min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700"
      >
        <div className="max-w-6xl mx-auto px-2 py-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {user?.username?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user?.username || "User"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.email || "user@example.com"}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar size={14} />
                Joined{" "}
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-2 py-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShirtIcon
                size={24}
                className="text-blue-600 dark:text-blue-300"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.itemsListed}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Items Listed</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle
                size={24}
                className="text-purple-600 dark:text-purple-300"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.successfulSwaps}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Successful Swaps</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <ThumbsUp
                size={24}
                className="text-green-600 dark:text-green-300"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.positiveFeedback}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Positive Feedback
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Coins
                size={24}
                className="text-yellow-600 dark:text-yellow-300"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.pointsEarned}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Points Earned</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏆</span>
              </div>
              Achievements
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {badgesLoading ? "..." : `${bageImages.length} earned`}
            </div>
          </div>

          {badgesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 shadow-lg overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent -translate-x-full animate-pulse duration-1000"
                    style={{
                      animation: "shimmer 2s infinite",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    }}
                  />

                  {/* Skeleton badge */}
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                    {/* Pulsing glow */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-blue-300/50 to-purple-300/50 dark:from-blue-500/40 dark:to-purple-500/40 rounded-full animate-ping"
                      style={{ animationDuration: "2s" }}
                    />
                  </div>

                  {/* Skeleton text */}
                  <div className="text-center">
                    <div
                      className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto animate-pulse"
                      style={{ width: "60%" }}
                    />
                  </div>

                  {/* Loading dots */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <div
                      className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1 h-1 bg-purple-400 dark:bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : bageImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bageImages.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    z: 50,
                  }}
                  className="group relative"
                >
                  {/* Glassmorphism container */}
                  <div className="relative bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-800/50">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge image container */}
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 dark:from-yellow-400 dark:to-orange-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                      <div className="relative w-full h-full bg-zinc-700 dark:bg-zinc-600 rounded-full p-2 shadow-lg">
                        <Image
                          src={badge.image}
                          alt={badge.name || "Badge"}
                          fill
                          className="object-contain drop-shadow-sm"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Sparkle effect */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs">✨</span>
                      </div>
                    </div>

                    {/* Badge name */}
                    {badge.name && (
                      <div className="text-center">
                        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate px-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          {badge.name}
                        </h3>
                      </div>
                    )}

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      {badge.name || "Achievement"}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add more badges placeholder */}
              {Array.from({ length: Math.max(0, 6 - bageImages.length) }).map(
                (_, index) => (
                  <motion.div
                    key={`placeholder-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (bageImages.length + index) * 0.1 }}
                    className="relative bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[120px] hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-400 dark:text-gray-500 text-lg">
                        ?
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 text-center">
                      More to unlock
                    </span>
                  </motion.div>
                )
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No achievements yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                Start creating posts, engaging with the community, and earning
                your first badges!
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Recent Listing
          </h2>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {dummyItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative">
                        {/* Featured Badge */}
                        {item.featured && (
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}

                        {/* Like Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(item.id)}
                          className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              likedItems.has(item.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          />
                        </Button>

                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link href={`/items/${item.id}`}>
                            <Button className="bg-white text-black hover:bg-gray-100">
                              <Eye className="h-4 w-4 mr-2" />
                              Quick View
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.brand}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              ${item.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(
                                (1 - item.price / item.originalPrice) * 100
                              )}
                              % off
                            </Badge>
                          </div>

                          {/* Condition & Size */}
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getConditionColor(item.condition)}
                            >
                              {item.condition}
                            </Badge>
                            <Badge variant="outline">Size {item.size}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {dummyItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Shirt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No items found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedSize("all");
                    setSelectedCondition("all");
                    setPriceRange("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
