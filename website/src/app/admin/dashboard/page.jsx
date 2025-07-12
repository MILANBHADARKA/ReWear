"use client"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserManagement } from "@/components/admin/user-management"
import { OrderManagement } from "@/components/admin/order-management"
import { ListingManagement } from "@/components/admin/listing-management"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "orders":
        return <OrderManagement />
      case "listings":
        return <ListingManagement />
      default:
        return <DashboardOverview />
    }
  }


  return (
    <SidebarProvider>
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 float-left">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
