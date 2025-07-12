"use client"
import { UserManagement } from "@/components/admin/user-management"
import AdminProtectedRoute from "@/components/AdminProtectedRoute"

export default function AdminUsersPage() {
  return (
    <AdminProtectedRoute>
      <UserManagement />
    </AdminProtectedRoute>
  )
}
