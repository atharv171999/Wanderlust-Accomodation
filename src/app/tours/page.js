import Image from "next/image";
import Link from "next/link";
import { tourPackages } from "../../data/tours";

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fb] pt-20 pb-24 px-4 sm:px-6 lg:px-8 font-sans text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-[2.75rem] font-bold text-[#3a3f47] mb-6 tracking-tight">
          Stories around the World, One Journey at a Time
        </h1>
        <p className="text-[1.1rem] md:text-lg text-[#858d99] font-normal leading-relaxed max-w-[50rem] mx-auto">
          Going beyond sightseeing, our tours are crafted to immerse you in stories, cultures, and experiences that move you. Each journey is a thoughtfully designed package that excites, engages, and celebrates the joy of true discovery.
        </p>
      </div>
      
      {/* Tour Cards Grid */}
      <div className="mt-16 max-w-[1400px] mx-auto text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
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
      </div>
    </div>
  );
}
