'use client'
import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
 const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string()
      .required("Subject is required"),
    message: Yup.string()
      .min(10, "Message is too short")
      .required("Message is required"),
  });

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  
 
  
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
                    
                    <Link href={`/tours/${tour.id}`} className="bg-[#fd4c4c] text-white hover:bg-blue-700 transition-colors flex items-center rounded-2xl pl-5 pr-1.5 py-1.5 group/btn shadow-md shadow-blue-500/20 active:scale-95">
                      <span className="text-[13px] font-medium mr-4">Know More</span>
                      <div className="bg-white rounded-xl p-1.5 text-[#fd4c4c] group-hover/btn:translate-x-0.5 transition-transform shadow-sm">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px] relative z-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left Column: Contact Form */}
                <div className="flex-1 bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-12 overflow-hidden relative">
                  {/* Decorative top pattern */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-[#0e76e8]"></div>
                  
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animation-fade-in">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100 shadow-lg shadow-green-500/20">
                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-black text-gray-900 mb-4">Message Sent Successfully!</h2>
                      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                        Thank you for reaching out to Wanderlust. One of our concierges will respond to your inquiry within the next 24 hours.
                      </p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-gray-100 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-10">
                        <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">Send us a Message</h2>
                        <p className="text-gray-500 font-medium">Please fill out the form below and we will get back to you promptly.</p>
                      </div>
      
                      <Formik
                        initialValues={{
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        }}
                        validationSchema={ContactSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          setTimeout(() => {
                            // Save message dynamically to browser storage
                            const messages = JSON.parse(localStorage.getItem('wanderlust_messages') || '[]');
                            const newMessage = {
                              id: `MSG-${Date.now().toString().slice(-6)}`,
                              ...values,
                              status: 'Unread',
                              submittedAt: new Date().toISOString()
                            };
                            messages.push(newMessage);
                            localStorage.setItem('wanderlust_messages', JSON.stringify(messages));
      
                            setSubmitting(false);
                            setIsSuccess(true);
                            resetForm();
                          }, 1200);
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                <Field name="name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="John Doe" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1.5 font-medium pl-1" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <Field name="email" type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="john@example.com" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1.5 font-medium pl-1" />
                              </div>
                            </div>
      
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                              <Field name="subject" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="How can we help you?" />
                              <ErrorMessage name="subject" component="div" className="text-red-500 text-xs mt-1.5 font-medium pl-1" />
                            </div>
      
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                              <Field as="textarea" rows="5" name="message" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none" placeholder="Write your message here..." />
                              <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1.5 font-medium pl-1" />
                            </div>
      
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full sm:w-auto px-10 bg-[#0e76e8] hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(14,118,232,0.3)] mt-2 flex justify-center items-center"
                            >
                              {isSubmitting ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : "Send Message"}
                            </button>
                            
                          </Form>
                        )}
                      </Formik>
                    </>
                  )}
                </div>
      
                {/* Right Column: Contact Info Cards */}
                {/* <div className="w-full lg:w-[400px] flex flex-col gap-6 pt-6 lg:pt-0">
                  
                  <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#0e76e8]">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Headquarters</h3>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      124 Global Way, Suite 400<br/>
                      San Francisco, CA 94107<br/>
                      United States
                    </p>
                  </div>
      
                  <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#0e76e8]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-500 leading-relaxed font-medium mb-1">
                      <a href="tel:+18001234567" className="hover:text-blue-600 transition">+1 (800) 123-4567</a>
                    </p>
                    <p className="text-sm text-gray-400 font-medium">Mon-Fri from 8am to 8pm EST</p>
                  </div>
      
                  <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#0e76e8]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-500 leading-relaxed font-medium mb-1">
                      <a href="mailto:support@wanderlust.com" className="hover:text-blue-600 transition">support@wanderlust.com</a>
                    </p>
                    <p className="text-sm text-gray-400 font-medium">We aim to respond within 24 hours.</p>
                  </div>
      
                </div> */}
                
              </div>
            </div>
    </div>
  );
}
