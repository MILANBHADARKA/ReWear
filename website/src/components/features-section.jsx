"use client"
import { motion } from "framer-motion"
import { Repeat, Star, Shield, Zap, Heart, Globe } from "lucide-react"
import MetaMaskGate from "./MetaMaskGate"

export default function FeaturesSection() {
  const features = [
    {
      icon: Repeat,
      title: "Direct Swaps",
      description: "Exchange clothes directly with other community members. Find the perfect match for your style.",
      color: "text-blue-600",
    },
    {
      icon: Star,
      title: "Point System",
      description: "Earn points by donating clothes and redeem them for items you love. Fair and transparent.",
      color: "text-yellow-600",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All items are verified for quality and condition. Only the best clothes make it to exchange.",
      color: "text-green-600",
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Our smart algorithm finds the best matches based on your preferences and style.",
      color: "text-purple-600",
    },
    {
      icon: Heart,
      title: "Sustainable Fashion",
      description: "Reduce textile waste and promote circular fashion. Make a positive environmental impact.",
      color: "text-red-600",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with fashion enthusiasts worldwide. Share styles and discover new trends.",
      color: "text-indigo-600",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose ReWear?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the features that make ReWear the perfect platform for sustainable fashion exchange
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${feature.color} mb-4`}>
                <feature.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
