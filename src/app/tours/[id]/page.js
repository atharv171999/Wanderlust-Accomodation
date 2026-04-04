import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tourPackages } from "../../../data/tours";
import BookingWidget from "../../../components/BookingWidget";

export default async function TourDetailPage({ params }) {
  const resolvedParams = await params;
  const tourId = parseInt(resolvedParams.id, 10);
  const tour = tourPackages.find((t) => t.id === tourId);

  // If ID doesn't match any tour, trigger Next.js 404 page
  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] 2xl:h-[80vh] min-h-[500px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Deep luxurious gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Back Button Container */}
        <div className="absolute top-24 left-4 md:left-12 z-10">
          <Link href="/tours" className="inline-flex items-center text-white/90 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 transition-all text-sm font-medium border border-white/10 group">
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tours
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 lg:p-24 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/20 shadow-xl">
                {tour.days} Days
              </span>
              <span className="flex items-center text-white/80 text-sm font-medium">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {tour.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl">
              {tour.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Details & Highlights */}
          <div className="flex-1">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Journey</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                <p>{tour.overview}</p>
                <p className="mt-4">
                  This meticulously planned {tour.days}-day itinerary ensures you experience the absolute best of the region, balancing thrilling exploration with necessary relaxation. Every touchpoint is curated for premium quality and deep immersion.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tour.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                    <div className="flex-shrink-0 mt-1 pl-1">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0e76e8]">
                        <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium leading-snug pt-1.5">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          {/* Right Column: Sticky Booking Widget via Client Component */}
          <BookingWidget tour={tour} />
          
        </div>
      </div>
    </div>
  );
}
