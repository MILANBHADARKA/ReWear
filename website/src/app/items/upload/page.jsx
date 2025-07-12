"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Camera, DollarSign, Sparkles, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"
import { useUser } from "@/context/UserContext"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function UploadItemPage() {
  const router = useRouter()
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    color: "",
    price: "",
    originalPrice: "",
    dateBought: "",
    reasonForSelling: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5)) // Max 5 images
  }

  const removeImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData2 = new FormData();

      // Append all form data
      formData2.append('title', formData.title);
      formData2.append('descriptions', formData.description);
      formData2.append('uploaderId', user._id); // Make sure this is a valid ObjectId
      formData2.append('points', formData.price);
      formData2.append('size', formData.size);
      formData2.append('condition', formData.condition);
      formData2.append('type', formData.type);
      formData2.append('description', formData.description);
      formData2.append('brand', formData.brand);
      formData2.append('dateBought', formData.dateBought);
      // Append tags
      tags.forEach(tag => {
        formData2.append('tags', tag);
      });

      // Append images
      let images = [];

      await Promise.all(
        uploadedImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image.file); // Must be a File object

          try {
            const api = await axios.post("/api/images_upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (api.data.success) {
              images.push(api.data.image);
            }
          } catch (err) {
            console.error("Upload error:", err);
          }
        })
      );

      formData2.append('images', JSON.stringify(images));

      // console.log("Submitting form data:",  {
      //   title: formData.title,
      //   descriptions: formData.description,
      //   uploaderId: user._id,
      //   points: formData.price,
      //   size: formData.size,
      //   condition: formData.condition,
      //   type: formData.type,
      //   description: formData.description,
      //   tags: tags,
      // });

      const response = await fetch('/api/cloths/add', {
        method: 'POST',
        body: formData2
        // Don't set Content-Type header - it will be set automatically
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to upload item");
      }

      setCurrentStep(4);
      setTimeout(() => router.push('/items'), 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.message || "Failed to upload item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Photos", description: "Upload item images" },
    { number: 2, title: "Details", description: "Item information" },
    { number: 3, title: "Pricing", description: "Set your price" },
    { number: 4, title: "Complete", description: "Review & submit" },
  ]

  return (
    <ProtectedRoute>
    <div className="mt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* {isSubmitting && (<Loader)} */}
        {/* Header */}

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            List Your Item
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your amazing pieces with the ReWear community
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= step.number
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white"
                    : "border-gray-300 dark:border-gray-600 text-gray-400"
                    }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${currentStep > step.number
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "bg-gray-300 dark:bg-gray-600"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{steps[currentStep - 1]?.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{steps[currentStep - 1]?.description}</p>
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              {/* Step 1: Photos */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                      }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Upload Photos</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Drag and drop your images here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}

                      id="image-upload"
                      className="cursor-pointer float-right bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    />

                    <p className="text-xs text-gray-500 mt-4">Maximum 5 images, up to 10MB each</p>
                  </div>

                  {/* Uploaded Images */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt="Uploaded item"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-2 -right-2 rounded-full p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Vintage Denim Jacket"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Levi's"
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="partywear">Partywear</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="ethnic">Ethnic</SelectItem>
                          <SelectItem value="sportswear">Sportswear</SelectItem>
                          <SelectItem value="sleepwear">Sleepwear</SelectItem>
                          <SelectItem value="streetwear">Streetwear</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="winterwear">Winterwear</SelectItem>
                          <SelectItem value="summerwear">Summerwear</SelectItem>
                          <SelectItem value="rainwear">Rainwear</SelectItem>
                          <SelectItem value="loungewear">Loungewear</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="maternity">Maternity</SelectItem>
                          <SelectItem value="kidswear">Kidswear</SelectItem>
                        </SelectContent>

                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upper">Upper</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="footwear">Footwear</SelectItem>
                          <SelectItem value="outerwear">Outerwear</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Size *</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleInputChange("condition", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                      <Label htmlFor="dateBought">Date Purchased</Label>
                      <Input
                        id="dateBought"
                        type="date"
                        value={formData.dateBought}
                        onChange={(e) => handleInputChange("dateBought", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTag(tag)}
                            className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Selling Points *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                        />
                      </div>
                    </div>

                  </div>

                  {formData.price && formData.originalPrice && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-400">
                          Great Deal! {Math.round((1 - formData.price / formData.originalPrice) * 100)}% off original
                          price
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="reasonForSelling">Why are you selling this item?</Label>
                    <Textarea
                      id="reasonForSelling"
                      placeholder="e.g., Doesn't fit anymore, style change, etc."
                      rows={3}
                      value={formData.reasonForSelling}
                      onChange={(e) => handleInputChange("reasonForSelling", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Item Listed Successfully!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your item has been submitted and will be reviewed shortly. You'll be redirected to the items page.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between mt-8"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={
                  (currentStep === 1 && uploadedImages.length === 0) ||
                  (currentStep === 2 &&
                    (!formData.title ||
                      !formData.description ||
                      !formData.category ||
                      !formData.size ||
                      !formData.condition))
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.price}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isSubmitting ? "Submitting..." : "List Item"}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  )
}
