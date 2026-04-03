import Link from "next/link";
import React from "react";
import Image from "next/image";
import logoImg from "../assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Logo Column */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <div className="mb-4">
              <Link href="/">
                <Image 
                  src={logoImg} 
                  alt="Wanderlust Accommodation" 
                  className="w-24 h-24 object-contain rounded-full shadow-sm mb-4" 
                />
              </Link>
              <p className="text-[#0e76e8] text-sm font-semibold tracking-wider uppercase">
                Seamless<br/>
                <span className="font-light">Adventures</span>
              </p>
            </div>
          </div>

          {/* Tours Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#0e76e8] text-lg font-medium mb-6">Tours</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Seasonal Tours</Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">All Tours</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Our Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#0e76e8] text-lg font-medium mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Cancellation Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Website Terms Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#0e76e8] text-lg font-medium mb-6">Website Terms</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#0e76e8] text-sm transition-colors">Terms Of Use</Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#0e76e8] text-lg font-medium mb-6">Get in Touch</h3>
            <p className="text-gray-700 text-sm mb-4 font-medium">+91 33 7967 0907</p>
            
            <button className="bg-[#2a2a2a] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors mb-6 shadow-sm">
              Contact us
            </button>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-gray-200 mb-6"></div>

        {/* Bottom Footer Area */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <div className="flex items-center mb-4 md:mb-0 font-medium">
            <span className="text-lg mr-2">&copy;</span>
            <span>All right reserved | 2025</span>
          </div>
          
          <Image 
            src={logoImg} 
            alt="Wanderlust Logo" 
            className="w-12 h-12 object-contain rounded-full shadow-sm flex-shrink-0" 
          />
        </div>

      </div>
    </footer>
  );
}
