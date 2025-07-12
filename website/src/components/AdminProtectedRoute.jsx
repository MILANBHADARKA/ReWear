'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import Loader from '@/components/loader/Loader'

const AdminProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, isLoading, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo])

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return children
}

export default AdminProtectedRoute
