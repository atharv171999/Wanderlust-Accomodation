"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour }) {
  if (!tour) return null;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl  transition-all duration-700 border border-slate-100 flex flex-col h-full group perspective-1000">
      
      {/* Image Container with Premium Overlay */}
      <div className="relative h-[250px] w-full overflow-hidden">
        <Image 
          src={tour.image} 
          alt={tour.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" 
        />
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
        
        {/* Glassmorphic Days Badge */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl text-white text-center rounded-[1.25rem] px-4 py-2.5 min-w-[4.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/30 transform group-hover:scale-110 transition-transform duration-500">
          <span className="block text-2xl font-black leading-none mb-1">{tour.days}</span>
          <span className="block text-[10px] font-black tracking-[0.2em] uppercase opacity-90">Days</span>
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-6 left-6 flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <svg className="w-4 h-4 text-accent mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-white text-xs font-bold tracking-wide uppercase italic">{tour.location}</span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-8 md:p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50/30">
        <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
          {tour.title}
        </h3>
        
        {/* Card Footer: Price and Dynamic Button */}
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-300">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-600 font-black mb-1 uppercase tracking-[0.2em]">Start from</span>
            <span className="text-2xl font-black text-primary tracking-tight">{tour.price}</span>
          </div>
          
          <Link href={`/tours/${tour.id}`} className="relative bg-slate-900 text-white hover:bg-primary transition-all duration-500 flex items-center rounded-2xl pl-5 pr-2 py-2 group/btn shadow-xl shadow-slate-900/10 hover:shadow-primary/30 active:scale-95 overflow-hidden">
            <span className="relative z-10 text-sm font-black mr-2 uppercase tracking-widest">Explore</span>
            <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-xl p-2.5 group-hover/btn:bg-white group-hover/btn:text-primary transition-all">
              <svg className="w-4 h-4 stroke-[4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
            {/* Hover Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-[100%] transition-all duration-1000"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
