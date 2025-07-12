"use client"
import { useState, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, Eye, Star, Calendar, Shirt, SlidersHorizontal, Grid3X3, List, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

// Dummy data - In real app, this would come from Python API
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
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
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
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
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
    description: "Clean white leather sneakers in great condition. Minimal wear, perfect for everyday casual looks.",
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
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    datePosted: "2024-01-10",
    dateBought: "2023-11-12",
    views: 167,
    likes: 22,
    tags: ["sneakers", "white", "casual", "everyday"],
    featured: false,
  },
]

export default function ItemsPage() {
  const [items, setItems] = useState([]);  // Initialize as empty array
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [likedItems, setLikedItems] = useState(new Set())

  // Simulate API call to Python backend
  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/cloths");
      const result = response.data;

      setItems(result.data);
      setFilteredItems(result.data);
      console.log("Fetched items:", result.data);
      return result.data;  // ✅ RETURN HERE
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchItems();
    // Only sets items and filteredItems once
  }, []);

  const toggleLike = (itemId) => {
    const newLikedItems = new Set(likedItems)
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId)
    } else {
      newLikedItems.add(itemId)
    }
    setLikedItems(newLikedItems)
  }

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "like new":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "excellent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "very good":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "good":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 mt-16">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Discover Amazing Items
            </motion.h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find unique clothing pieces from our community of fashion enthusiasts
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-4xl mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search for items, brands, or styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-600 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partywear">Partywear</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="ethnic">Ethnic</SelectItem>
                      <SelectItem value="sportswear">Sportswear</SelectItem>
                      <SelectItem value="sleepwear">Sleepwear</SelectItem>
                      <SelectItem value="streetwear">Streetwear</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="winterwear">Winterwear</SelectItem>
                      <SelectItem value="summerwear">Summerwear</SelectItem>
                      <SelectItem value="rainwear">Rainwear</SelectItem>
                      <SelectItem value="loungewear">Loungewear</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="maternity">Maternity</SelectItem>
                      <SelectItem value="kidswear">Kidswear</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="like new">Like New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="very good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200">$200+</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Toggle & Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredItems?.length} of {items?.length} items
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          layout
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
        >
          <AnimatePresence>
            {Array.isArray(filteredItems) && filteredItems.map((item, index) => (
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
    

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item?.images?.[0]?.replace(`["`, "").replace(`"]`, "") || "/placeholder.svg"}
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
                      {/* Title & Brand */}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.brand}</p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        
                        <Badge variant="secondary" className="text-xs">
                          {item.points} Points
                        </Badge>
                      </div>

                      {/* Condition & Size */}
                      <div className="flex items-center space-x-2">
                        <Badge className={getConditionColor(item.condition)}>{item.condition}</Badge>
                        <Badge variant="outline">Size {item.size}</Badge>
                      </div>

                      {/* Seller Info */}
                      <div className="flex items-center space-x-2">
                        <Image
                          src={item.seller?.avatar || "/placeholder.svg"}
                          alt={item.seller?.username}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.seller.username}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500 ml-1">{item.seller.rating}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                      
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredItems?.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Shirt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedSize("all")
                setSelectedCondition("all")
                setPriceRange("all")
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
