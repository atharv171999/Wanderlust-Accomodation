"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import contactHeroImg from "../../assets/images/contact_hero.png";

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

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px]">
        <Image
          src={contactHeroImg}
          alt="Contact Wanderlust"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Deep luxurious gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 pt-20">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border border-white/20 shadow-xl mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white text-center leading-tight drop-shadow-2xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl text-center font-medium leading-relaxed drop-shadow-lg">
            Whether you have a question about our exclusive tours, pricing, or need assistance booking your next dream journey, our dedicated luxury travel team is ready to answer all your questions.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px] relative z-10">
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
                          <label className="block text-sm font-black text-slate-700 mb-2">Full Name *</label>
                          <Field name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="John Doe" />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1.5 font-bold pl-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-black text-slate-700 mb-2">Email Address *</label>
                          <Field name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="john@example.com" />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1.5 font-bold pl-1" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-black text-slate-700 mb-2">Subject *</label>
                        <Field name="subject" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="How can we help you?" />
                        <ErrorMessage name="subject" component="div" className="text-red-500 text-xs mt-1.5 font-bold pl-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-black text-slate-700 mb-2">Message *</label>
                        <Field as="textarea" rows="5" name="message" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition resize-none" placeholder="Write your message here..." />
                        <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1.5 font-bold pl-1" />
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

          {/* Right Column: The Wanderlust Concierge Advantage */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 pt-6 lg:pt-0">
            
            <div className="bg-primary rounded-[2rem] p-8 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden group">
              {/* Decorative background circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              
              <h3 className="text-2xl font-black mb-6 relative z-10 leading-tight">The Wanderlust<br/>Concierge</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tailored Journeys</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Our experts craft itineraries that are as unique as your own fingerprint.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">24/7 Global Support</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Travel with confidence knowing our dedicated team is always just a call away.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Local Hidden Gems</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Go beyond the postcards with exclusive access to local secrets and treasures.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ / Info card */}
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-50 text-[#0e76e8] rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Quick Info
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <p className="text-sm font-bold text-gray-700 mb-1">Corporate Events</p>
                  <p className="text-xs text-gray-500 font-medium">For group inquiries or corporate packages, select \&quot;Corporate\&quot; in the subject line.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <p className="text-sm font-bold text-gray-700 mb-1">Partnerships</p>
                  <p className="text-xs text-gray-500 font-medium">Interested in partnering with Wanderlust? Please email our marketing team directly.</p>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
