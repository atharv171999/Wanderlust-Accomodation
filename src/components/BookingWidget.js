"use client";

import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingWidget({ tour }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full lg:w-[400px]">
      <div className="sticky top-32 bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-gray-100 p-8 overflow-hidden relative">
        {/* Decorative top pattern */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-[#0e76e8]"></div>
        
        <div className="flex flex-col mb-8 pt-2">
          <span className="text-sm text-gray-500 font-bold tracking-wider uppercase mb-1">Starting from</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-gray-900">{tour.price}</h3>
            <span className="text-gray-500 font-medium tracking-wide">/ person</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center text-gray-600 font-medium">
              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration
            </div>
            <span className="font-bold text-gray-900">{tour.days} Days</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center text-gray-600 font-medium">
              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Tour Type
            </div>
            <span className="font-bold text-gray-900">Guided Group</span>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#0e76e8] hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(14,118,232,0.4)] hover:shadow-[0_15px_40px_rgba(14,118,232,0.5)] hover:-translate-y-1 active:translate-y-0 active:shadow-none flex items-center justify-center group"
        >
          Request to Book
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <p className="text-center text-sm text-gray-400 mt-5 font-medium flex items-center justify-center">
          <svg className="w-4 h-4 mr-1.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure payment & satisfaction guarantee
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
