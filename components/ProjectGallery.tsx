// components/ProjectGallery.tsx

"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4); // Shows 4 images initially

  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  // Keyboard navigation while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  if (!images || images.length === 0) return null;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4); // Increases by 4 items per click
  };

  return (
    <div className="mt-5">
      {/* ── Section header ─────────────────────────── */}
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-4 h-4 text-violet-700" />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          More Images
        </h2>
        <span className="text-xs text-violet-700 font-semibold tracking-widest">({images.length})</span>
      </div>

      {/* ── Thumbnail grid ─────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {images.slice(0, visibleCount).map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-gray-900 border border-violet-200 dark:border-gray-800 cursor-pointer"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity duration-200">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Show More Button ───────────────────────── */}
      {visibleCount < images.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 text-sm bg-violet-700 text-white rounded-xl hover:bg-violet-600 transition cursor-pointer"
          >
            Show More
          </button>
        </div>
      )}

      {/* ── Lightbox ────────────────────────────────── */}
      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-slate-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {title} — Image {activeIndex + 1}
              </h3>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-full text-violet-700 dark:bg-violet-900/30 dark:text-violet-50 dark:hover:bg-violet-900/50 dark:border-violet-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image stage */}
            <div className="relative bg-slate-50 dark:bg-black">
              <div className="relative w-full aspect-video">
                <Image
                  src={images[activeIndex]}
                  alt={`${title} screenshot ${activeIndex + 1}`}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2 border-t border-violet-100 dark:border-violet-300">
              <span className="text-xs font-medium text-slate-400">
                {activeIndex + 1} / {images.length}
              </span>
              <a
                href={images[activeIndex]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-violet-700 hover:bg-violet-600 transition-colors"
              >
                Open full image <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

