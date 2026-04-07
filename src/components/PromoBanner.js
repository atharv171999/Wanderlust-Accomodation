'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import popBanner from "../assets/images/sqBanner.jpeg" 

export default function PromoBanner() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 5 seconds
    const timer = setTimeout(() => {
      setShow(true);
      // Small delay to ensure the element is in DOM before triggering animation
      setTimeout(() => setIsVisible(true), 50);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // Remove from DOM after fade-out completes
    setTimeout(() => setShow(false), 500);
  };

  if (!show) return null;

  return (
    <div 
      className={`fixed  hidden md:block inset-0 z-9999 justify-center transition-all duration-500 ${
        isVisible ? 'bg-black/60 pointer-events-auto' : 'bg-transparent pointer-events-none'
      } backdrop-blur-sm px-4`}
      onClick={closeBanner}
    >
      <div 
        className={`relative m-auto top-50 w-[90%] max-w-100 bg-white overflow-visible rounded-2xl shadow-[0_30px_100px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={closeBanner}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:bg-slate-50 transition-all z-20 border border-slate-100 group"
          aria-label="Close banner"
        >
          <svg 
            className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Banner Image Container */}
        <Link 
          href="https://www.viator.com/" 
          target="_blank" 
          className="block w-full overflow-hidden rounded-2xl group relative"
        >
          <div className="relative aspect-[4/5] sm:aspect-square w-full">
            <Image 
              src={popBanner} 
              alt="Viator Experiences Special Offer" 
              fill
              className="object-cover "
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
