"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function AddItemPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    images: [""],
    uploaderId: "",
    status: "Available",
    points: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm({ ...form, images: updatedImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cloths/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add item");
      router.push(`/items/${data.itemId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 transition-all duration-500">
      <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Add New Item
        </h1>
        <ThemeToggle />
      </div>

      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        {/* LEFT: Image Preview */}
        <div className="w-full md:w-1/2 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Preview
          </h2>
          {form.images[0] ? (
            <img
              src={form.images[0]}
              alt="Preview"
              className="w-full h-80 object-cover rounded-xl border border-slate-200 dark:border-slate-600 shadow-md"
            />
          ) : (
            <div className="w-full h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-400">
              Image preview here
            </div>
          )}
        </div>

        {/* RIGHT: The Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-6 p-6"
        >
          {error && (
            <p className="text-red-500 bg-red-100 dark:bg-red-900 px-4 py-2 rounded-md">
              {error}
            </p>
          )}

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-medium mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-medium mb-2">
              Image URLs
            </label>
            {form.images.map((url, i) => (
              <input
                key={i}
                type="text"
                value={url}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder={`Image URL ${i + 1}`}
                className="w-full px-4 py-3 mb-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mt-1"
            >
              + Add another image
            </button>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-medium mb-1">
              Uploader ID
            </label>
            <input
              type="text"
              name="uploaderId"
              value={form.uploaderId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-medium mb-1">
              Points
            </label>
            <input
              type="number"
              name="points"
              value={form.points}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {submitting ? "Submitting..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
