import Image from "next/image";
import Link from "next/link";
import { tourPackages } from "../../data/tours";

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4 sm:px-6 lg:px-8 font-sans text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          At Wanderlust Accommodation, it is a profound return to oneself.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-[50rem] mx-auto">
         The world is a vast, unread book, and every journey you take is a masterpiece in the making. It is the quiet stillness of a Himalayan sunrise in Rishikesh, the rhythmic pulse of Tokyo’s neon streets, and the emerald reflection of a Kerala backwater at dusk. We don’t just book stays; we curate the moments that become your favorite stories.
        </p>
      </div>
      
      {/* Tour Cards Grid */}
      <div className="mt-16 max-w-[1400px] mx-auto text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <div key={tour.id} className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_-20px_rgba(37,99,235,0.2)] transition-all duration-500 border border-slate-100 flex flex-col h-full group">
              
              {/* Image Container */}
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image 
                  src={tour.image} 
                  alt={tour.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" 
                />
                {/* Dark gradient overlay for bottom shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Days Badge */}
                <div className="absolute top-6 right-6 bg-slate-900/90 text-white text-center rounded-2xl px-3 py-2 min-w-[4rem] shadow-2xl backdrop-blur-md border border-white/10">
                  <span className="block text-2xl font-black leading-none mb-0.5">{tour.days}</span>
                  <span className="block text-[9px] font-black tracking-[0.2em]">DAYS</span>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow ">
                <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight tracking-tight">{tour.title}</h3>
                <p className="text-base text-slate-600 mb-8 flex-grow font-medium leading-relaxed">{tour.location}</p>
                
                {/* Footer: Price and Button */}
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold mb-0.5 uppercase tracking-wider">Start from</span>
                    <span className="text-2xl font-black text-primary tracking-tight">{tour.price}</span>
                  </div>
                  
                  <Link href={`/tours/${tour.id}`} className="bg-secondary text-white hover:bg-primary transition-all duration-300 flex items-center rounded-2xl pl-6 pr-2 py-2 group/btn shadow-lg shadow-secondary/20 hover:shadow-primary/30 active:scale-95">
                    <span className="text-sm font-black mr-4">Explore</span>
                    <div className="bg-white rounded-xl p-2 text-secondary group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all shadow-sm">
                      <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
