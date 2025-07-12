"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Eye,
  Shield,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

// Dummy data - In real app, this would come from Python API
const dummyItem = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "This beautiful vintage denim jacket is a true classic piece that never goes out of style. Made from high-quality denim with authentic vintage wash and distressing. The jacket features classic button closure, chest pockets, and a comfortable fit that works perfectly for layering. It's been well-maintained and shows minimal signs of wear, making it a perfect addition to any wardrobe. The timeless design makes it versatile enough to pair with dresses, t-shirts, or over sweaters for a casual chic look.",
  price: 45,
  originalPrice: 120,
  category: "Outerwear",
  size: "M",
  condition: "Excellent",
  brand: "Levi's",
  color: "Blue",
  material: "100% Cotton Denim",
  seller: {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalReviews: 127,
    location: "New York, NY",
    joinDate: "2023-03-15",
    responseTime: "Usually responds within 2 hours",
    totalSales: 45,
    verified: true,
  },
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  datePosted: "2024-01-15",
  dateBought: "2023-06-10",
  views: 234,
  likes: 18,
  tags: ["vintage", "denim", "casual", "retro", "classic"],
  featured: true,
  measurements: {
    chest: "42 inches",
    length: "24 inches",
    sleeves: "25 inches",
  },
  careInstructions: "Machine wash cold, hang dry",
  reasonForSelling: "Moving to a warmer climate and won't need heavy jackets",
  shippingInfo: {
    cost: 8.99,
    estimatedDays: "3-5 business days",
    freeShippingOver: 75,
  },
}

const relatedItems = [
  {
    id: 2,
    title: "Vintage Band T-Shirt",
    price: 25,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Mike Chen",
  },
  {
    id: 3,
    title: "High-Waisted Jeans",
    price: 35,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Emma Davis",
  },
  {
    id: 4,
    title: "Leather Boots",
    price: 65,
    image: "/placeholder.svg?height=200&width=200",
    seller: "Alex Rodriguez",
  },
]

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to Python backend
    const fetchItem = async () => {
      try {
        // In real app, this would be:
        // const response = await fetch(`/api/items/${params.id}`)
        // const data = await response.json()
        // setItem(data)

        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setItem(dummyItem)
      } catch (error) {
        console.error("Failed to fetch item:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [params.id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading item details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Item not found</h2>
          <Button onClick={() => router.push("/items")}>Back to Items</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
              <Image
                src={item.images[currentImageIndex] || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Image Counter */}
              {item.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Item Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Title and Actions */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{item.brand}</p>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${item.price}</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Size</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.size}</p>
              </div>
              <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Condition</p>
                <Badge className={getConditionColor(item.condition)} variant="secondary">
                  {item.condition}
                </Badge>
              </div>
             
              <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Material</p>
                <p className="font-semibold text-gray-900 dark:text-white text-xs">{item.material}</p>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <Image
                      src={item.seller.avatar || "/placeholder.svg"}
                      alt={item.seller.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    {item.seller.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.seller.name}</h3>
                      {/* {item.seller.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )} */}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.seller.rating}</span>
                      <span className="text-sm text-gray-500">({item.seller.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{item.seller.location}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Sales</p>
                    <p className="font-semibold">{item.seller.totalSales}</p>
                  </div>
                  
                </div>
                <Link href={`/profile/${item.seller.id}`}>
                  <Button variant="outline" className="w-full mt-3 bg-transparent">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Description and Details */}

        {/* Related Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((relatedItem) => (
              <Link key={relatedItem.id} href={`/items/${relatedItem.id}`}>
                <Card className="group overflow-hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedItem.image || "/placeholder.svg"}
                      alt={relatedItem.title}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{relatedItem.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {relatedItem.seller}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${relatedItem.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
