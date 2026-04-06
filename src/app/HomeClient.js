'use client'
import React, {useState} from "react";
import TourCard from "../components/TourCard";
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
    name: "Kerela",
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
    name: "Spain",
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
    name: "Rishikesh",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M2 18h20M2 22h20M12 14v4M7 16l5-8 5 8M12 4v2M6 6l1.5 1.5M18 6l-1.5 1.5" />
      </svg>
    )
  },
  {
    name: "Europe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M12 2l-6 20h12L12 2zM8 14h8M10 8h4M9 22h6" />
      </svg>
    )
  },
  {
    name: "Japan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 22l4-6 4 6 4-6 4 6" />
      </svg>
    )
  },
  {
    name: "Rajasthan",
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

export default function HomeClient() {
  const [isSuccess, setIsSuccess] = useState(false);
  
 
  
  return (
    <div className="min-h-screen w-full bg-background pb-12 font-sans">
      <div className="w-full flex flex-col items-center">
        
        {/* Redesigned Luxury Hero Banner with Quote Gradient */}
        <div className="w-full relative overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center px-6 min-h-screen md:min-h-[700px] bg-slate-900">

<div className=" z-10 hidden md:block absolute right-1 top-20 h-[600px] w-[120px] transition-all duration-700 hover:scale-105">
            <div className="sticky top-32 group">
              <div className="absolute -inset-2 bg-gradient-to-b from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Link href="https://www.viator.com/" target="_blank" className="relative block overflow-hidden rounded-xl shadow-2xl border border-slate-200">
                <Image 
                  src="/viator_banner.jpg" 
                  alt="Viator Experiences Ad" 
                  width={120} 
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </div>
          </div>
          {/* Viator Partner Banner Section (Mobile/Tablet Version) */}
          <div className="w-full absolute z-20 top-178 md:hidden mb-16 px-4 flex justify-center pointer-events-none">
            <Link 
              href="https://www.viator.com/" 
              target="_blank" 
              className="block w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-500 pointer-events-auto bg-white"
            >
              <Image 
                src="/viator_mobile_banner.jpg" 
                alt="Viator Experiences Ad" 
                width={500} 
                height={120}
                className="w-full h-auto object-cover"
                priority
              />
            </Link>
          </div>

          {/* Background Image with Overlay */}
          <Image
            src="/heroSection.jpg"
            alt="Luxury Travel Hero"
            fill
            className="  object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0"></div>
          
          {/* Subtle decorative overlays */}
          <div className="absolute inset-0 bg-white/5 opacity-10"></div>
          

          {/* Luxury Hero Content */}
          <div className="relative z-10 w-full max-w-5xl mt-24">
            <div className="mb-8 inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></span>
              <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Private & Bespoke Tours</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-4 leading-none">
              WANDERLUST <br className="hidden md:block" />
              <span className="font-serif italic italic font-medium opacity-90">&</span> BEYOND
            </h1>
            
            <p className="text-lg md:text-2xl text-white/90 font-medium tracking-wide mb-14 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
              It is a profound return to oneself.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/tours" className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-primary bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:shadow-white/40">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center">
                  Explore Journeys
                  <svg className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </Link>
              
              <Link href="/about" className="px-10 py-5 text-lg font-black text-white border-2 border-white/50 rounded-full hover:bg-white/20 transition-all backdrop-blur-md">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Text Below Banner */}
        <div className="mt-20 text-center max-w-3xl px-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-serif tracking-tight">
            Every Journey Has a Story
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
            Experience the world through crafted journeys. Discover beauty, meaning, and memory in every mile.
          </p>
        </div>
        
        {/* Region Grid Section */}
        <div className="w-full mt-16 max-w-6xl relative">
          {/* Floating Skyscraper Ad Banner (Desktop Only) */}
          
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
                className="bg-white rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] transition-all duration-500 py-10 px-4 flex flex-col items-center justify-center text-center group cursor-pointer border border-slate-100 hover:border-primary/20 hover:-translate-y-2"
              >
                <div className="mb-5 transform group-hover:scale-110 transition-transform duration-500">
                  {region.icon}
                </div>
                <h3 className="text-sm font-black text-slate-700 group-hover:text-primary leading-snug tracking-tight">
                  {region.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Tours Grid Section */}
        <div className="w-full mt-8 max-w-[1400px] pb-24">
          <div className="flex justify-between items-end mb-10 px-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Featured Journeys</h2>
              <p className="text-slate-500 font-bold mt-2">Handpicked tours to make your dream vacation a reality.</p>
            </div>
            <Link href="/tours" className="hidden sm:inline-flex items-center text-primary font-black hover:text-blue-700 transition group/all">
              View All Tours
              <svg className="w-5 h-5 ml-1.5 transform group-hover/all:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
            {tourPackages.slice(0, 12).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          
          {/* Mobile View All Button */}
          <div className="mt-8 text-center sm:hidden px-4">
            <Link href="/tours" className="inline-flex items-center justify-center w-full bg-white border border-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition">
              View All Tours
            </Link>
          </div>
        </div>

      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px] relative z-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left Column: Contact Form */}
                <div className="flex-1 bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-14 overflow-hidden relative">
                  {/* Decorative top pattern */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-primary via-primary/80 to-accent"></div>
                  
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
                              className="w-full sm:w-auto px-12 bg-primary hover:bg-blue-700 disabled:opacity-70 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] hover:shadow-primary/50 hover:-translate-y-1 mt-4 flex justify-center items-center"
                            >
                              {isSubmitting ? (
                                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
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
              </div>
            </div>
    </div>
  );
}
