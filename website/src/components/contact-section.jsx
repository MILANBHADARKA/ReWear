"use client"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from "lucide-react"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@rewear.com",
      description: "Get in touch for any questions or support",
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Available Monday to Friday, 9 AM - 6 PM",
      color: "text-green-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Fashion Street, Style City, SC 12345",
      description: "Our headquarters and community center",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9 AM - 6 PM",
      description: "Weekend support via email only",
      color: "text-orange-600",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Instant support through our website",
      color: "text-red-600",
    },
    {
      icon: Users,
      title: "Community Forum",
      content: "forum.rewear.com",
      description: "Connect with other ReWear members",
      color: "text-indigo-600",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions about ReWear? Need help with an exchange? We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${info.color} mb-4`}>
                <info.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{info.content}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Find Our Location</h3>
          <div className="bg-gray-200 dark:bg-slate-700 rounded-xl h-64 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Interactive Map Coming Soon</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
