import Link from "next/link";
import React from "react";

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactData = [
    {
      title: "Our Office",
      icon: <MapPinIcon />,
      details: ["Bhagwantpur, Mussoorie road", "Dehradun, 248008", "Uttarakhand "],
      subText: null
    },
    {
      title: "Call Us",
      icon: <PhoneIcon />,
      details: ["+91 7302016767"],
      subText: "Mon-Fri from 10am to 6pm IST"
    },
    {
      title: "Email Us",
      icon: <MailIcon />,
      details: ["support@wanderlust","accommodations.com"],
      subText: "We aim to respond within 24 hours."
    }
  ];

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-8 mb-16">
          {contactData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.1)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-slate-900 text-xl font-bold mb-4">{item.title}</h3>
              <div className="space-y-1">
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-600 text-base leading-relaxed font-medium">{detail}</p>
                ))}
              </div>
              {item.subText && (
                <p className="text-slate-500 text-sm mt-4 font-bold">{item.subText}</p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col items-center text-slate-500 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-bold text-center">
            <span>&copy; {currentYear} Wanderlust. All rights reserved.</span>
            <span className="hidden md:inline text-slate-200">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200 underline decoration-2 decoration-primary/20 underline-offset-4">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
