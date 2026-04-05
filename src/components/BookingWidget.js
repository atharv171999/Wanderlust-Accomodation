"use client";

import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingWidget({ tour }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full lg:w-[400px]">
      <div className="sticky top-32 bg-white rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100 p-8 overflow-hidden relative">
        {/* Decorative top pattern */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="flex flex-col mb-8 pt-2">
          <span className="text-sm text-slate-500 font-black tracking-[0.2em] uppercase mb-2">Starting from</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{tour.price}</h3>
            <span className="text-slate-500 font-bold tracking-tight">/ person</span>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center text-slate-600 font-bold">
              <svg className="w-5 h-5 mr-3 text-primary/60 group-hover/item:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration
            </div>
            <span className="font-black text-slate-900">{tour.days} Days</span>
          </div>
          
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center text-slate-600 font-bold">
              <svg className="w-5 h-5 mr-3 text-primary/60 group-hover/item:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Tour Type
            </div>
            <span className="font-black text-slate-900">Guided Group</span>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary hover:bg-blue-700 text-white text-xl font-black py-5 rounded-2xl transition-all shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] hover:shadow-primary/60 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center group"
        >
          Request to Book
          <svg className="w-6 h-6 ml-3 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <p className="text-center text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest flex items-center justify-center">
          <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure & Verified
        </p>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tour={tour} 
      />
    </div>
  );
}
