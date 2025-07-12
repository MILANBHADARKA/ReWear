"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingBag, Package, TrendingUp, DollarSign, Star } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Active Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Listings",
      value: "8,765",
      change: "+15.3%",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+23.1%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
  ]

  const recentActivity = [
    { user: "Sarah Johnson", action: "Listed new dress", time: "2 minutes ago", type: "listing" },
    { user: "Mike Chen", action: "Completed exchange", time: "5 minutes ago", type: "order" },
    { user: "Emma Davis", action: "Joined platform", time: "10 minutes ago", type: "user" },
    { user: "Alex Rodriguez", action: "Updated profile", time: "15 minutes ago", type: "user" },
    { user: "Lisa Thompson", action: "Posted review", time: "20 minutes ago", type: "review" },
  ]

  return (
     <div className="w-full max-w-7xl mx-auto p-6 space-y-6 overflow-x-hidden">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{activity.user.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                <span className="text-sm font-medium">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.8</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="font-semibold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                <span className="text-sm font-medium">Active Exchanges</span>
                <span className="font-semibold">567</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                <span className="text-sm font-medium">New Users Today</span>
                <span className="font-semibold text-blue-600">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
