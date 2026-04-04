import React from "react";
import Image from "next/image";
import Link from "next/link";

import { tourPackages } from "../data/tours";
// Icon Data mapping to regions with simple SVG implementations
const regions = [
  {
    name: "Americas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M12 2v20M8 5v14M16 5v14M5 8v8M19 8v8M2 12h20" />
      </svg>
    )
  },
  {
    name: "Australasia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M2 20h20M5 20c0-6 3-10 7-10M12 10c0-4 2-6 5-6M17 4c1-1 3-1 5 1v15" />
      </svg>
    )
  },
  {
    name: "Central & Eastern Europe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M6 21v-8l6-4 6 4v8M6 13l-4 3M18 13l4 3M12 9V5M9 5h6M12 3v2" />
      </svg>
    )
  },
  {
    name: "East Asia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M3 21h18M5 21v-4M19 21v-4M3 17h18l-2-4H5l-2 4zM7 13v-4M17 13v-4M5 9h14l-2-4H7L5 9zM12 5V2" />
      </svg>
    )
  },
  {
    name: "Latin America",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M12 2v20M4 7h16M11 2h2v5h-2z" />
      </svg>
    )
  },
  {
    name: "Polar Frontier",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M4 14c-1-2-1-5 1-6s5-1 7 1c2-1 5 0 6 3 2 0 4 2 4 4s-2 3-4 3h-2v-3l-2 3H8v-3l-2 3H4z" />
      </svg>
    )
  },
  {
    name: "Scandinavia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M2 18h20M2 22h20M12 14v4M7 16l5-8 5 8M12 4v2M6 6l1.5 1.5M18 6l-1.5 1.5" />
      </svg>
    )
  },
  {
    name: "Western Europe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M12 2l-6 20h12L12 2zM8 14h8M10 8h4M9 22h6" />
      </svg>
    )
  },
  {
    name: "Northern Lights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 22l4-6 4 6 4-6 4 6" />
      </svg>
    )
  },
  {
    name: "Wanderlust Exclusives",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
      </svg>
    )
  },
  {
    name: "Africa & Wildlife",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M19 19H5c-2 0-3-1-3-3s2-2 4-2c1-3 3-4 6-4s4 2 5 4c2 0 4 1 4 3s-1 2-2 2zM12 10V5M9 5h6M7 19v3M17 19v3" />
      </svg>
    )
  },
  {
    name: "Middle East & North Africa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M4 22h16M7 22v-8h10v8M12 14v-6a4 4 0 00-8 0v6M17 6c1 1 2 2 2 4M20 7c1 1 1 3 0 4" />
      </svg>
    )
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f8fb] pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Main Hero Banner with Rounded Corners */}
        <div 
          className="w-full relative rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center px-4"
          style={{
            minHeight: "500px",
            backgroundImage: "url('https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Content inside banner */}
          <div className="relative z-10 w-full max-w-4xl mx-auto pt-16 pb-8">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white tracking-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] leading-none">
              DISCOVERY & BEYOND
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-medium tracking-wide mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl mx-auto">
              Embark on unforgettable, hand-crafted journeys designed for the modern explorer.
            </p>

            <a href="/tours" className="inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)] hover:-translate-y-1 active:scale-95 mb-16">
              Explore Our Journeys
              <svg className="w-5 h-5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>

            {/* Stats section */}
            <div className="flex flex-row justify-center items-center gap-12 sm:gap-24 mb-6">
              {/* Stat 1 */}
              <div className="flex items-center text-left">
                <span className="text-white text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md">
                  71
                </span>
                <span className="ml-3 text-white/90 text-sm md:text-base font-medium leading-tight drop-shadow-md max-w-[80px]">
                  Countries Covered
                </span>
              </div>
              
              {/* Stat 2 */}
              <div className="flex items-center text-left">
                <span className="text-white text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md">
                  240
                </span>
                <span className="ml-3 text-white/90 text-sm md:text-base font-medium leading-tight drop-shadow-md max-w-[90px]">
                  Incredible Journeys
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Below Banner */}
        <div className="mt-16 text-center max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-serif tracking-tight">
            Every Journey Has a Story to Tell
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            Experience the world through crafted journeys. Discover beauty, meaning, and memory in every mile.
          </p>
        </div>
        
        {/* Region Grid Section */}
        <div className="w-full mt-16 max-w-6xl">
          {/* SVG Gradient Defintion */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
            <defs>
              <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" /> {/* bright blue (tailwind blue-500) */}
                <stop offset="100%" stopColor="#10b981" /> {/* emerald green (tailwind emerald-500) */}
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 pb-12">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 py-8 px-4 flex flex-col items-center justify-center text-center group cursor-pointer border border-gray-100 hover:-translate-y-1"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {region.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900 leading-snug">
                  {region.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Tours Grid Section */}
        <div className="w-full mt-8 max-w-[1400px] pb-24">
          <div className="flex justify-between items-end mb-8 px-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Journeys</h2>
              <p className="text-gray-500 mt-2">Handpicked tours to make your dream vacation a reality.</p>
            </div>
            <a href="/tours" className="hidden sm:inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
              View All Tours
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
            {tourPackages.slice(0, 12).map((tour) => (
              <div key={tour.id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100/50 flex flex-col h-full group">
                
                {/* Image Container */}
                <div className="relative h-[280px] w-full overflow-hidden">
                  <Image 
                    src={tour.image} 
                    alt={tour.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  {/* Dark gradient overlay for bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Days Badge */}
                  <div className="absolute top-5 right-5 bg-[#111] text-white text-center rounded-xl px-2.5 py-1.5 min-w-[3.5rem] shadow-lg backdrop-blur-sm">
                    <span className="block text-[22px] font-bold leading-none mb-0.5">{tour.days}</span>
                    <span className="block text-[8px] font-bold tracking-[0.2em]">DAYS</span>
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-[20px] font-bold text-gray-900 mb-1.5 leading-snug">{tour.title}</h3>
                  <p className="text-[15px] text-gray-500 mb-8 flex-grow tracking-wide">{tour.location}</p>
                  
                  {/* Footer: Price and Button */}
                  <div className="flex justify-between items-end mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-500 font-medium mb-0.5">Price Starts at</span>
                      <span className="text-xl font-bold text-gray-900 tracking-tight">{tour.price}</span>
                    </div>
                    
                    <Link href={`/tours/${tour.id}`} className="bg-[#0e76e8] text-white hover:bg-blue-700 transition-colors flex items-center rounded-2xl pl-5 pr-1.5 py-1.5 group/btn shadow-md shadow-blue-500/20 active:scale-95">
                      <span className="text-[13px] font-medium mr-4">Know More</span>
                      <div className="bg-white rounded-xl p-1.5 text-[#0e76e8] group-hover/btn:translate-x-0.5 transition-transform shadow-sm">
                        <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile View All Button */}
          <div className="mt-8 text-center sm:hidden px-4">
            <a href="/tours" className="inline-flex items-center justify-center w-full bg-white border border-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition">
              View All Tours
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
