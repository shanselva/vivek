import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white pt-16 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Vivek Vijay & Co. Logo" 
                width={70} 
                height={70} 
                className="brand-logo-bright object-contain"
              />
              <div>
                <div className="text-lg font-display font-bold uppercase tracking-wider leading-tight text-white">
                  VIVEK VIJAY &amp; CO.
                </div>
                <div className="text-[10px] tracking-widest text-yellow-500 font-semibold uppercase mt-1">Engineering Contractors</div>
              </div>
            </Link>
            <p className="text-slate-200 mb-6 leading-relaxed text-sm font-normal">
              Tamil Nadu's trusted engineering contractor since 2007 — delivering landmark infrastructure, institutional, and commercial projects with quality, safety, and precision.
            </p>
            <div className="flex items-start gap-3 text-sm text-white font-medium bg-white/5 p-3.5 rounded-xl border border-white/10">
              <Clock size={18} className="text-[#FFB800] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                <span className="text-[#FFB800] font-bold text-xs uppercase tracking-wider">Sunday: Closed</span>
              </div>
            </div>
          </div>

          {}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-white tracking-wide border-b border-yellow-500/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3.5 text-slate-200 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">Our Services</Link></li>
              <li><Link href="/projects" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">Featured Projects</Link></li>
              <li><Link href="/gallery" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">Image Gallery</Link></li>
              <li><Link href="/careers" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all flex items-center gap-2">Careers <span className="bg-[#FFB800] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">Hiring</span></Link></li>
              <li><Link href="/contact" className="hover:text-[#FFB800] hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-white tracking-wide border-b border-yellow-500/30 pb-2 inline-block">Our Expertise</h3>
            <ul className="space-y-3.5 text-slate-200 text-sm font-medium">
              <li className="hover:text-[#FFB800] transition-colors">Hospitals &amp; Healthcare</li>
              <li className="hover:text-[#FFB800] transition-colors">Commercial Buildings</li>
              <li className="hover:text-[#FFB800] transition-colors">Institutional Projects</li>
              <li className="hover:text-[#FFB800] transition-colors">Industrial &amp; Warehouses</li>
              <li className="hover:text-[#FFB800] transition-colors">Road &amp; Bridge Works</li>
              <li className="hover:text-[#FFB800] transition-colors">Landscapes &amp; Green Spaces</li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-white tracking-wide border-b border-yellow-500/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-slate-200 text-sm font-medium">
              <li className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <MapPin size={20} className="text-[#FFB800] shrink-0 mt-0.5" />
                <span className="leading-snug">16/5 Kumarasamy Street, Kalaimagal School Road, Erode – 638001, Tamilnadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FFB800] shrink-0" />
                <div className="flex flex-col gap-1 font-bold tracking-wide">
                  <a href="tel:+919842044777" className="hover:text-[#FFB800] transition-colors">+91 98420 44777</a>
                  <a href="tel:+919842470001" className="hover:text-[#FFB800] transition-colors">+91 98424 70001</a>
                  <a href="tel:+919655372227" className="hover:text-[#FFB800] transition-colors">+91 96553 72227</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FFB800] shrink-0" />
                <a href="mailto:support@vivekvijayandcompany.in" className="hover:text-[#FFB800] transition-colors underline decoration-white/30 hover:decoration-[#FFB800]">
                  support@vivekvijayandcompany.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {}
        <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-300 font-medium gap-4 pb-4">
          <p className="text-white drop-shadow">&copy; {new Date().getFullYear()} VIVEK VIJAY AND COMPANY. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <Link href="/privacy-policy" className="hover:text-[#FFB800] transition-colors">Privacy Policy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms-and-conditions" className="hover:text-[#FFB800] transition-colors">Terms &amp; Conditions</Link>
            <span className="text-white/20">·</span>
            <Link href="/disclaimer" className="hover:text-[#FFB800] transition-colors">Disclaimer</Link>
          </div>
          <p className="text-slate-400 text-xs tracking-wider uppercase font-semibold">Erode, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
