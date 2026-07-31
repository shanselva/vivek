'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 w-full z-50 flex flex-col transition-all duration-300 shadow-md bg-white ${isScrolled ? '' : ''}`}>
      {}
      <div className="hidden lg:flex bg-[#072465] text-white text-[12px] py-2 px-4 md:px-8">
        <div className="container mx-auto xl:max-w-[1280px] flex justify-between items-center">
          <div className="flex items-center gap-6 font-medium">
            <a href="mailto:info@vivekvijayandcompany.com" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <Mail size={14} /> info@vivekvijayandcompany.com
            </a>
            <a href="tel:+914412345678" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <Phone size={14} /> +91 44 1234 5678
            </a>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Tamilnadu, Erode
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 font-medium">Follow Us :</span>
            <a href="https://www.facebook.com/vivekvijayandcompany/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors bg-white/10 p-1.5 rounded-sm" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.youtube.com/@Vivekvijayandcompany" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors bg-white/10 p-1.5 rounded-sm" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/vivek_vijay_and_company/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors bg-white/10 p-1.5 rounded-sm" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>

      {}
      <div className={`w-full py-1 relative z-10 transition-all duration-300 px-4 md:px-8`}>
        <div className="container mx-auto xl:max-w-[1280px] flex items-center justify-between">

          {}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Vivek Vijay & Co. Logo"
              width={55}
              height={55}
              className="object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center ml-1">
              <span className="text-[14px] sm:text-[18px] leading-none font-serif font-bold uppercase tracking-wide text-[#072465] mb-1 whitespace-nowrap">
                VIVEK VIJAY AND COMPANY
              </span>
              <div className="w-full h-[1px] bg-gray-300 mb-1"></div>
              <span className="text-[7.5px] sm:text-[9.5px] tracking-[0.2em] sm:tracking-[0.25em] text-[#4b5563] font-bold uppercase whitespace-nowrap">
                Engineering Contractors
              </span>
            </div>
          </Link>

          {}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto mr-8">
            <nav className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-semibold tracking-tight transition-all duration-150 hover:text-[#072465] active:scale-95 flex items-center gap-1 pb-1 border-b-2 ${
                    pathname === link.href ? 'text-[#072465] border-[#072465]' : 'text-gray-700 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>


          {}
          <button
            className="lg:hidden text-[#072465] hover:text-gray-600 focus:outline-none p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col pt-24 px-8 h-screen overflow-y-auto">
          {}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-[#072465] transition-colors p-2"
          >
            <X size={32} />
          </button>
          
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-bold tracking-wide transition-all flex justify-between items-center ${
                  pathname === link.href ? 'text-[#072465]' : 'text-gray-700 hover:text-[#072465]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col space-y-4">
            <a href="tel:+914412345678" className="flex items-center gap-3 text-gray-600 hover:text-[#072465]">
              <Phone size={20} className="text-[#FFB800]" /> +91 44 1234 5678
            </a>
            <a href="mailto:info@vivekvijayandcompany.com" className="flex items-center gap-3 text-gray-600 hover:text-[#072465]">
              <Mail size={20} className="text-[#FFB800]" /> info@vivekvijayandcompany.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
