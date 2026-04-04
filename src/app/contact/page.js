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
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24">
      
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

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
          <div className="w-full lg:w-[400px] flex flex-col gap-6 pt-6 lg:pt-0">
            
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

          </div>
          
        </div>
      </div>
    </div>
  );
}
