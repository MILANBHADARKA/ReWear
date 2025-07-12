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
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: "ORD-001",
      buyer: "Sarah Johnson",
      seller: "Mike Chen",
      item: "Vintage Denim Jacket",
      type: "direct_swap",
      status: "pending",
      date: "2024-01-15",
      value: 45,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: null,
    },
    {
      id: "ORD-002",
      buyer: "Emma Davis",
      seller: "Alex Rodriguez",
      item: "Designer Handbag",
      type: "points",
      status: "shipped",
      date: "2024-01-14",
      value: 120,
      shippingAddress: "456 Oak Ave, Chicago, IL 60601",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-003",
      buyer: "Lisa Thompson",
      seller: "Sarah Johnson",
      item: "Summer Dress",
      type: "direct_swap",
      status: "completed",
      date: "2024-01-13",
      value: 35,
      shippingAddress: "789 Pine St, Los Angeles, CA 90210",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-004",
      buyer: "Mike Chen",
      seller: "Emma Davis",
      item: "Running Shoes",
      type: "points",
      status: "cancelled",
      date: "2024-01-12",
      value: 80,
      shippingAddress: "321 Elm St, San Francisco, CA 94102",
      trackingNumber: null,
    },
    {
      id: "ORD-005",
      buyer: "Alex Rodriguez",
      seller: "Lisa Thompson",
      item: "Wool Sweater",
      type: "direct_swap",
      status: "processing",
      date: "2024-01-11",
      value: 55,
      shippingAddress: "654 Maple Dr, Miami, FL 33101",
      trackingNumber: null,
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "direct_swap":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "points":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Order Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage all exchange orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Transit</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold">$12,450</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
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
                placeholder="Search orders by ID, buyer, seller, or item..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="direct_swap">Direct Swap</SelectItem>
                <SelectItem value="points">Points Exchange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>Manage all exchange orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{order.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.item}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {order.buyer} ← → {order.seller}
                      </span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">${order.value}</div>
                    {order.trackingNumber && <div className="text-xs text-gray-500">Track: {order.trackingNumber}</div>}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <Badge className={getTypeColor(order.type)}>
                      {order.type === "direct_swap" ? "Direct Swap" : "Points"}
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
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>Complete order information and actions</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Buyer</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{order.buyer}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Seller</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{order.seller}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Item</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{order.item}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Value</label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">${order.value}</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Shipping Address</label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Update Status</label>
                            <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select new status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
