"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../assets/images/logo.png" 
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tours", href: "/tours" },
    { name: "About Us", href: "/about" },
    { name: "Terms", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-1 border-b border-gray-100/50"
          : "bg-white shadow-sm py-2 px-2 border-b border-gray-50/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center p-0">
            <Link href="/" className="group relative">
              {/* Premium Circular Logo Container */}
              <div 
                className={`relative  transition-all duration-500 group-hover:-translate-y-0.5 group-hover:scale-105 h-20 w-20  ${
                  scrolled ? 'scale-90' : 'scale-100'
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-50 bg-white shadow-sm group-hover:shadow-md transition-shadow">
                  <Image 
                    src={Logo} 
                    alt="Wanderlust Accommodation" 
                    fill
                    // sizes=""
                    className="  object-contain transition-transform duration-700" 
                    // priority
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[15px] font-medium transition-colors duration-300 hover:text-blue-600 ${
                  pathname === link.href ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open State */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 visible h-auto"
            : "opacity-0 scale-y-0 invisible h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-xl shadow-xl mt-3 mx-4 rounded-2xl border border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                pathname === link.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
