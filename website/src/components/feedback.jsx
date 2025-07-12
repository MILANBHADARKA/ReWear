"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function FeedbackForm({ itemId, sellerId, userId }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [sentiment, setSentiment] = useState("positive")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          itemId,
          sellerId,
          description: data.description,
          sentiment
        })
      })

      if (!response.ok) throw new Error("Failed to submit feedback")

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      })
      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Leave Feedback</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="description" className="block mb-2 text-gray-700 dark:text-gray-300">
            Your Feedback
          </Label>
          <Textarea
            id="description"
            className="min-h-[120px]"
            placeholder="Share your experience with this item..."
            {...register("description", { required: "Feedback is required" })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label className="block mb-2 text-gray-700 dark:text-gray-300">
            Overall Experience
          </Label>
          <RadioGroup 
            defaultValue="positive" 
            className="flex gap-4"
            onValueChange={(value) => setSentiment(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="positive" id="positive" />
              <Label htmlFor="positive" className="text-green-600 dark:text-green-400">
                Positive
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="negative" id="negative" />
              <Label htmlFor="negative" className="text-red-600 dark:text-red-400">
                Negative
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </form>
    </motion.div>
  )
}