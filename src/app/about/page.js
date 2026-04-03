export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f8fb] font-sans pb-24">
      {/* Hero Section */}
      <div className="bg-white pt-32 pb-24 px-4 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-50 opacity-60 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 text-[#3a3f47]">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b7bc0] to-[#45c391]">Wanderlust Accommodation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light tracking-wide mb-10">
            Your Gateway to Seamless Adventures
          </p>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#2b7bc0] to-[#45c391] mx-auto rounded-full mb-10"></div>
          
          <p className="text-[1.1rem] md:text-xl leading-relaxed text-gray-600 font-medium max-w-[50rem] mx-auto mb-6">
            At Wanderlust Accommodation, we believe that travel is more than just a change of scenery—it’s a change of heart. Founded on the principle that the journey should be as restorative as the destination, we’ve dedicated ourselves to curating travel experiences that blend the thrill of discovery with the comforts of a home away from home.
          </p>
          <p className="text-[1.1rem] md:text-xl leading-relaxed text-gray-600 font-medium max-w-[50rem] mx-auto">
            We aren't just another booking engine. We are a team of passionate explorers, local experts, and hospitality enthusiasts who believe that where you stay defines how you remember your trip.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-24">
        
        {/* What We Do Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 drop-shadow-sm tracking-tight">What We Do</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
              We bridge the gap between "tourist" and "traveler." Whether you’re looking for a secluded villa in the Mediterranean, a boutique hotel in the heart of Tokyo, or a luxury glamping experience under the stars, we hand-pick every accommodation to ensure it meets our standards of soul, style, and service.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Curated Stays", desc: "We vet every property to ensure it offers more than just a bed; we look for character, convenience, and quality." },
              { title: "Tailored Itineraries", desc: "Beyond the stay, we help you plan the 'what' and the 'how,' providing insider tips that you won't find in a guidebook." },
              { title: "24/7 Peace of Mind", desc: "From the moment you start dreaming to the moment you return home, our team is here to ensure your journey is smooth and stress-free." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-[#2b7bc0] group-hover:scale-110 group-hover:bg-[#2b7bc0] group-hover:text-white transition-all">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-[1.15rem] font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Wanderlust Quote Block */}
        <div className="bg-gradient-to-br from-[#45c391] to-[#2b7bc0] rounded-[2rem] p-10 md:p-16 lg:p-24 text-center text-white shadow-xl relative overflow-hidden group">
          {/* Dynamic background shape pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,100 100,0 100,100"/>
          </svg>
          <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -top-20 -left-10"></div>
          <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -bottom-20 -right-10"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-medium italic mb-10 leading-[1.2] drop-shadow-md font-serif text-white/95">
              "To travel is to live, but <br className="hidden md:block" />to travel well is an art."
            </h2>
            <div className="w-16 h-1 bg-white/40 mx-auto rounded-full mb-10"></div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide drop-shadow-sm">Why Wanderlust?</h3>
            <p className="text-lg md:text-[1.15rem] text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
              We understand that your time is your most precious commodity. That’s why we focus on authentic experiences over cookie-cutter tours. We prioritize sustainable tourism, supporting local communities and eco-friendly stays so that the world stays beautiful for generations of wanderers to come.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="w-full pt-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">The principles that guide every booking, interaction, and recommendation we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
             {[
               { val: "Authenticity", com: "No tourist traps. Just real places and real people.", icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 12l2 2 4-4" },
               { val: "Comfort", com: "We believe exploration shouldn't mean sacrificing a good night's sleep.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
               { val: "Integrity", com: "Transparent pricing and honest recommendations, every single time.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
               { val: "Passion", com: "We travel the world ourselves to make sure we’re giving you the best.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
             ].map((v, i) => (
                <div key={i} className="bg-white rounded-[1.5rem] p-8 lg:p-10 flex shadow-sm border border-gray-100/80 hover:border-blue-200 hover:shadow-md transition-all group">
                   <div className="flex-shrink-0 mr-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl flex items-center justify-center text-[#2b7bc0] shadow-sm border border-white group-hover:scale-105 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={v.icon}></path>
                        </svg>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-2xl font-bold text-gray-900 mb-2">{v.val}</h4>
                     <p className="text-gray-500 leading-relaxed text-[0.95rem]">{v.com}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Join the Journey CTA */}
        <div className="bg-white rounded-[2rem] p-12 md:p-16 text-center max-w-5xl mx-auto border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2b7bc0] to-[#45c391]"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Join the Journey</h2>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium">
            Ready to fill your passport with stories instead of just stamps? Let Wanderlust Accommodation handle the details while you focus on the horizon.
          </p>
          <a href="/tours" className="inline-flex items-center justify-center px-10 py-4.5 text-[1.1rem] font-bold text-white bg-[#0e76e8] rounded-full hover:bg-blue-700 transition-all shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] hover:-translate-y-0.5 active:scale-95">
            Explore Our Tours
            <svg className="w-5 h-5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>

      </div>
    </div>
  );
}
