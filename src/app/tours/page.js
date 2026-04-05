import Image from "next/image";
import Link from "next/link";
import TourCard from "../../components/TourCard";
import { tourPackages } from "../../data/tours";

export const metadata = {
  title: "Tours",
  description: "Browse our collection of 30+ hand-picked tour packages. Find your next adventure in Europe, Asia, Africa, or the Americas.",
};

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          At Wanderlust Accommodation, it is a profound return to oneself.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-[50rem] mx-auto">
         The world is a vast, unread book, and every journey you take is a masterpiece in the making. It is the quiet stillness of a Himalayan sunrise in Rishikesh, the emerald reflection of a Kerala backwater at dusk. We don’t just book stays; we curate the moments that become your favorite stories.
        </p>
      </div>
      
      {/* Tour Cards Grid */}
      <div className="mt-16 max-w-[1400px] mx-auto text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
}
