// app/components/ImageGallery.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-96 h-96">
        <Image
          src={selectedImage}
          alt="Selected"
          fill
          className="rounded-xl border-2 border-slate-200 dark:border-slate-600 shadow-xl object-cover"
          priority
        />
      </div>

      <div className="flex gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)}
            className={`relative w-20 h-20 rounded-lg border-2 shadow-md transition-all duration-200 cursor-pointer hover:scale-105 ${
              selectedImage === src
                ? 'border-blue-400 dark:border-blue-500'
                : 'border-slate-200 dark:border-slate-600'
            }`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index}`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
