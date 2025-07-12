"use client"
import { ListingManagement } from "@/components/admin/listing-management"
import AdminProtectedRoute from "@/components/AdminProtectedRoute"

export default function AdminListingsPage() {
  return (
    <AdminProtectedRoute>
      <ListingManagement />
    </AdminProtectedRoute>
  )
}
