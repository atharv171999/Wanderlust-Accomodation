"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Full Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+() -]+$/, "Invalid phone number format")
    .min(10, "Phone number is too short")
    .required("Phone is required"),
  travelDate: Yup.date().required("Travel date is required").min(new Date(), "Date cannot be in the past"),
  travelers: Yup.number()
    .min(1, "At least 1 traveler required")
    .max(20, "Maximum 20 travelers allowed")
    .required("Required"),
});

export default function BookingModal({ isOpen, onClose, tour }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Parse numerical price to allow dynamic calculations
  const rawPrice = tour?.price ? parseInt(tour.price.replace(/[^0-9]/g, ""), 10) : 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = "unset";
      setIsVisible(false);
      setTimeout(() => setIsSuccess(false), 300); // Reset after closing animation
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 px-4">
      {/* Dark overlay backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative bg-white w-full max-w-2xl max-h-full overflow-y-auto rounded-3xl shadow-2xl transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-accent/20">
              <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Request Sent!</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg font-medium leading-relaxed">
              We have received your booking request for <strong className="text-primary">{tour?.title}</strong>. Our travel experts will review your request and contact you shortly.
            </p>
            <button 
              onClick={onClose}
              className="bg-slate-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-primary transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Back to Tour
            </button>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <div className="mb-10">
              <span className="text-primary font-black tracking-[0.2em] text-xs uppercase mb-2 block">Booking Request</span>
              <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {tour?.title}
              </h2>
              <div className="flex items-center text-slate-500 mt-3 text-sm font-bold">
                <svg className="w-5 h-5 mr-2 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tour?.days} Days Plan
              </div>
            </div>

            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                travelers: 2,
                travelDate: "",
              }}
              validationSchema={BookingSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  // Process local storage save
                  const bookings = JSON.parse(localStorage.getItem('wanderlust_bookings') || '[]');
                  
                  const estimatedTotal = rawPrice * values.travelers;
                  
                  const newBooking = {
                    id: `BK-${Date.now().toString().slice(-6)}`,
                    tourId: tour?.id,
                    tourName: tour?.title,
                    ...values,
                    totalPrice: estimatedTotal,
                    status: 'Pending',
                    createdAt: new Date().toISOString()
                  };
                  
                  bookings.push(newBooking);
                  localStorage.setItem('wanderlust_bookings', JSON.stringify(bookings));
                  
                  setSubmitting(false);
                  setIsSuccess(true);
                }, 800);
              }}
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">Full Name *</label>
                      <Field name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="John Doe" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1.5 font-bold" />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">Email Address *</label>
                      <Field name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="john@example.com" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1.5 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">Phone Number *</label>
                      <Field name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" placeholder="+1 (555) 000-0000" />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1.5 font-bold" />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">Expected Travel Date *</label>
                      <Field name="travelDate" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" />
                      <ErrorMessage name="travelDate" component="div" className="text-red-500 text-xs mt-1.5 font-bold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">Number of Travelers *</label>
                    <Field name="travelers" type="number" min="1" max="20" className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition" />
                    <ErrorMessage name="travelers" component="div" className="text-red-500 text-xs mt-1.5 font-bold" />
                  </div>

                  {/* Dynamic Pricing Summary */}
                  <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex justify-between items-center mt-10 shadow-sm">
                    <div>
                      <span className="block text-slate-600 text-sm font-bold mb-1 uppercase tracking-wider">Estimated Total</span>
                      <span className="text-primary text-sm font-black">₹{(rawPrice).toLocaleString('en-IN')} × {values.travelers || 0} travelers</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">
                      ₹{((rawPrice) * (values.travelers || 0)).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-blue-700 disabled:opacity-70 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] hover:shadow-primary/50 hover:-translate-y-1 mt-8 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Confirm Request"}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4 font-bold uppercase tracking-widest">No payment required now</p>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
