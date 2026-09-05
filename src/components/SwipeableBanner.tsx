import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import type { BannerSlide } from '../types';

interface SwipeableBannerProps {
  banners: BannerSlide[];
  intervalSeconds?: number;
  onCtaClick?: (link?: string) => void;
}

export const SwipeableBanner: React.FC<SwipeableBannerProps> = ({
  banners,
  intervalSeconds = 3,
  onCtaClick
}) => {
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance every 2-3 seconds
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, Math.max(2000, intervalSeconds * 1000));

    return () => clearInterval(timer);
  }, [activeBanners.length, intervalSeconds, isPaused]);

  if (activeBanners.length === 0) {
    return null;
  }

  const current = activeBanners[currentIndex % activeBanners.length];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped left -> next
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    } else if (distance < -50) {
      // Swiped right -> prev
      setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${current.bgGradient || 'from-blue-600 via-indigo-600 to-blue-800'} text-white shadow-md transition-all duration-500`}
      >
        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-32 h-32 rounded-full bg-blue-300/10 blur-xl pointer-events-none" />

        {/* Banner Content Container */}
        <div className="relative py-4 px-5 sm:py-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left badge & text */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-semibold text-white uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                {current.tag || 'Announcement'}
              </span>
              {current.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                  {current.badge}
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight line-clamp-1">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 line-clamp-1 mt-0.5">
              {current.subtitle}
            </p>
          </div>

          {/* Right Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {current.ctaText && (
              <button
                onClick={() => onCtaClick && onCtaClick(current.ctaLink)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>{current.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            )}

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={handlePrev}
                aria-label="Previous announcement"
                className="p-1 rounded-full bg-black/20 hover:bg-black/35 text-white transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next announcement"
                className="p-1 rounded-full bg-black/20 hover:bg-black/35 text-white transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        {activeBanners.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 pb-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex % activeBanners.length
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
