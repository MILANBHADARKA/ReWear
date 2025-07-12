"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Eye, Heart, Flag } from "lucide-react"

export function ListingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedListing, setSelectedListing] = useState(null)
  const [isAddListingOpen, setIsAddListingOpen] = useState(false)

  const listings = [
    {
      id: "LST-001",
      title: "Vintage Denim Jacket",
      seller: "Sarah Johnson",
      category: "Outerwear",
      size: "M",
      condition: "excellent",
      price: 45,
      status: "active",
      datePosted: "2024-01-15",
      views: 234,
      likes: 18,
      reports: 0,
      image: "/placeholder.svg?height=80&width=80",
      description: "Beautiful vintage denim jacket in excellent condition. Perfect for casual wear.",
    },
    {
      id: "LST-002",
      title: "Designer Handbag",
      seller: "Alex Rodriguez",
      category: "Accessories",
      size: "One Size",
      condition: "good",
      price: 120,
      status: "active",
      datePosted: "2024-01-14",
      views: 456,
      likes: 32,
      reports: 1,
      image: "/placeholder.svg?height=80&width=80",
      description: "Authentic designer handbag with minor wear. Comes with original dust bag.",
    },
    {
      id: "LST-003",
      title: "Summer Dress",
      seller: "Emma Davis",
      category: "Dresses",
      size: "S",
      condition: "like_new",
      price: 35,
      status: "sold",
      datePosted: "2024-01-13",
      views: 189,
      likes: 25,
      reports: 0,
      image: "/placeholder.svg?height=80&width=80",
      description: "Flowy summer dress, worn only once. Perfect for warm weather.",
    },
    {
      id: "LST-004",
      title: "Running Shoes",
      seller: "Mike Chen",
      category: "Footwear",
      size: "10",
      condition: "fair",
      price: 80,
      status: "pending",
      datePosted: "2024-01-12",
      views: 123,
      likes: 8,
      reports: 0,
      image: "/placeholder.svg?height=80&width=80",
      description: "Comfortable running shoes with some wear on the soles. Still have good support.",
    },
    {
      id: "LST-005",
      title: "Wool Sweater",
      seller: "Lisa Thompson",
      category: "Tops",
      size: "L",
      condition: "excellent",
      price: 55,
      status: "inactive",
      datePosted: "2024-01-11",
      views: 67,
      likes: 12,
      reports: 0,
      image: "/placeholder.svg?height=80&width=80",
      description: "Cozy wool sweater, perfect for winter. No pilling or damage.",
    },
  ]

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "sold":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "flagged":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case "like_new":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "excellent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "good":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "fair":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const updateListingStatus = (listingId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating listing ${listingId} to status: ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Listing Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all clothing listings and inventory</p>
        </div>
        <Dialog open={isAddListingOpen} onOpenChange={setIsAddListingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Listing</DialogTitle>
              <DialogDescription>Create a new clothing listing for the platform.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Item Title" />
                <Input placeholder="Seller Name" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="xxl">XXL</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="like_new">Like New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Price ($)" type="number" />
              <Textarea placeholder="Description" rows={3} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddListingOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Create Listing
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Flag className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold">45.2K</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Likes</p>
                <p className="text-2xl font-bold">3.8K</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search listings by title, seller, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="outerwear">Outerwear</SelectItem>
                <SelectItem value="footwear">Footwear</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listings ({filteredListings.length})</CardTitle>
          <CardDescription>Manage all clothing listings and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{listing.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {listing.seller}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{listing.category}</span>
                      <span>•</span>
                      <span>Size {listing.size}</span>
                      <span>•</span>
                      <span>{listing.datePosted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">${listing.price}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {listing.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {listing.likes}
                      </div>
                      {listing.reports > 0 && (
                        <div className="flex items-center text-red-500">
                          <Flag className="h-3 w-3 mr-1" />
                          {listing.reports}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                    <Badge className={getConditionColor(listing.condition)}>
                      {listing.condition.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Listing Details - {listing.id}</DialogTitle>
                          <DialogDescription>Complete listing information and actions</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex space-x-4">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{listing.description}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Seller</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{listing.seller}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Price</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">${listing.price}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Category</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{listing.category}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Size</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{listing.size}</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Update Status</label>
                            <Select onValueChange={(value) => updateListingStatus(listing.id, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select new status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="flagged">Flagged</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
