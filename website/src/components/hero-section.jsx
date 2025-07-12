"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import {
  TShirtIcon,
  DressIcon,
  JacketIcon,
  PantsIcon,
  ShoesIcon,
  HatIcon,
  SweaterIcon,
  SkirtIcon,
} from "./clothing-icons"

export default function HeroSection() {
  const clothingItems = [
    {
      icon: TShirtIcon,
      name: "T-Shirt",
      position: { top: "10%", left: "15%" },
      rotation: 15,
      color: "text-blue-500",
      size: "w-16 h-16",
    },
    {
      icon: DressIcon,
      name: "Dress",
      position: { top: "20%", right: "20%" },
      rotation: -20,
      color: "text-pink-500",
      size: "w-20 h-20",
    },
    {
      icon: JacketIcon,
      name: "Jacket",
      position: { top: "60%", left: "10%" },
      rotation: 10,
      color: "text-green-500",
      size: "w-18 h-18",
    },
    {
      icon: PantsIcon,
      name: "Pants",
      position: { bottom: "25%", right: "15%" },
      rotation: -15,
      color: "text-purple-500",
      size: "w-16 h-16",
    },
    {
      icon: ShoesIcon,
      name: "Shoes",
      position: { bottom: "40%", left: "20%" },
      rotation: 25,
      color: "text-orange-500",
      size: "w-14 h-14",
    },
    {
      icon: HatIcon,
      name: "Hat",
      position: { top: "35%", left: "5%" },
      rotation: -10,
      color: "text-red-500",
      size: "w-12 h-12",
    },
    {
      icon: SweaterIcon,
      name: "Sweater",
      position: { top: "45%", right: "10%" },
      rotation: 20,
      color: "text-indigo-500",
      size: "w-20 h-20",
    },
    {
      icon: SkirtIcon,
      name: "Skirt",
      position: { bottom: "15%", left: "50%" },
      rotation: -25,
      color: "text-teal-500",
      size: "w-16 h-16",
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 mt-16 lg:mt-14">
      {/* Animated Background Clothing Items */}
      <div className="absolute inset-0 overflow-hidden">
        {clothingItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              scale: 0,
              rotate: 0,
              ...item.position,
            }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [0, item.rotation * 2, item.rotation],
            }}
            transition={{
              duration: 2.5,
              delay: index * 0.4,
              ease: "easeOut",
            }}
            style={item.position}
            className={`float-animation absolute ${item.color} opacity-20 dark:opacity-30`}
          >
            <item.icon className={`${item.size} drop-shadow-lg`} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
              <Recycle className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ReWear
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
            Community Clothing Exchange
          </p>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your wardrobe sustainably. Exchange unused clothing through direct swaps or our point-based
            system. Join the fashion revolution that reduces waste and promotes reuse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup" className="hover:cursor-pointer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
              >
                Start Exchanging
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold rounded-full border-2 hover:bg-gray-50 dark:hover:bg-slate-800 bg-transparent hover:cursor-pointer"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10K+</h3>
                <p className="text-gray-600 dark:text-gray-400">Active Members</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Recycle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">50K+</h3>
                <p className="text-gray-600 dark:text-gray-400">Items Exchanged</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">95%</h3>
                <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
              </div>
            </motion.div>
          </div> */}
        </motion.div>
      </div>
    </section>
  )
}
