"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../assets/images/logo-removebg-preview.png";
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
      className={` fixed top-5 left-0 right-0 z-50 transition-all w-[80%] m-auto rounded-[30rem] duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-4xl shadow-2xl py-1 border-b border-gray-500"
          : "bg-white py-2 px-2 "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center p-0">
            <Link href="/" className="group relative">
              {/* Premium Circular Logo Container */}
              <div
                className={`relative  transition-all duration-500 group-hover:-translate-y-0.5 group-hover:scale-150 h-20 w-20  ${
                  scrolled ? "scale-150" : "scale-150"
                }`}
              >
                <Image
                  src={Logo}
                  alt="Wanderlust Accommodation"
                  fill
                  
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[15px] font-bold tracking-tight transition-colors duration-300 hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-slate-900"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
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
              className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-slate-900 hover:bg-slate-50 hover:text-primary"
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
