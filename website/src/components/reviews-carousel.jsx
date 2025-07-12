"use client"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useRef, useEffect } from "react"

export default function ReviewsCarousel() {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      content:
        "ReWear has completely transformed my wardrobe! I've found amazing pieces while giving my unused clothes a new life.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mike Chen",
      role: "Sustainability Advocate",
      content:
        "The point system is brilliant! It's so satisfying to earn points and discover unique clothing items from the community.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Davis",
      role: "College Student",
      content:
        "As a student, ReWear helps me stay fashionable on a budget while being environmentally conscious. Love it!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Alex Rodriguez",
      role: "Designer",
      content: "The quality of items on ReWear is impressive. I've found vintage pieces that inspire my own designs.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Thompson",
      role: "Working Professional",
      content: "ReWear made it easy to refresh my work wardrobe. The matching system is incredibly accurate!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Create a duplicated array for seamless looping
  const carouselItems = [...reviews, ...reviews, ...reviews]
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of satisfied members who are revolutionizing their wardrobes sustainably
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          ref={carouselRef}
          className="flex"
          animate={{
            x: ["0%", `-${(100 / 3) * 2}%`], // Move two-thirds of the way (since we have 3 copies)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {carouselItems.map((review, index) => (
            <div 
              key={`${review.name}-${index}`} 
              className="flex-shrink-0 w-80 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mx-3"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="h-8 w-8 text-blue-600 opacity-20 absolute -top-2 -left-2" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6">{review.content}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}