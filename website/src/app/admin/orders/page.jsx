"use client"
import { OrderManagement } from "@/components/admin/order-management"
import AdminProtectedRoute from "@/components/AdminProtectedRoute"

export default function AdminOrdersPage() {
  return (
    <AdminProtectedRoute>
      <OrderManagement />
    </AdminProtectedRoute>
  )
}
