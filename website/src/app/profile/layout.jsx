import Footer from '@/components/footer'
import { MetaMaskProvider } from '@/components/MetaMaskProvider'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/context/ThemeContext'
import { UserProvider } from '@/context/UserContext'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <ThemeProvider>
          <UserProvider>
            <Navbar />
            {children}
            <Footer />
          </UserProvider>
        </ThemeProvider>
    </div>
  )
}

export default layout