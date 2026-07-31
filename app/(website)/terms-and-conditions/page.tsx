import React from 'react';
import Link from 'next/link';
import { FileText, Gavel, Award, Copyright, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Vivek Vijay & Company',
  description: 'Review the official terms and conditions governing the use of Vivek Vijay and Company digital portals and architectural copyright policies.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      {}
      <div className="bg-[#0f172a] text-white py-16 -mt-40 pt-44 mb-16 border-b border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 text-[#FFB800] font-bold text-sm tracking-widest uppercase mb-3">
            <FileText size={18} /> User Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Terms &amp; <span className="text-[#FFB800]">Conditions</span>
          </h1>
          <p className="text-slate-300 mt-3 text-base max-w-2xl">
            These terms govern your access to and use of our digital platforms and intellectual property.
          </p>
        </div>
      </div>

      {}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-14 text-slate-700 space-y-10 leading-relaxed">
          
          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Gavel className="text-emerald-700 shrink-0" size={24} /> 1. Acceptance of Agreement
            </h2>
            <p>
              By accessing, browsing, or using the official website of <strong>VIVEK VIJAY AND COMPANY</strong>, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any clause stated herein, please refrain from using our digital services or submitting contact inquiries.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Copyright className="text-emerald-700 shrink-0" size={24} /> 2. Intellectual Property &amp; Copyright
            </h2>
            <p className="mb-4">
              All digital assets contained on this portal are the sole intellectual property of VIVEK VIJAY AND COMPANY, protected under Indian and International Copyright Laws. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Corporate branding trademarks, crest logos, and company insignias.</li>
              <li>High-resolution on-site construction photographs, video documentaries, and architectural renders.</li>
              <li>Structural engineering blog articles, technical case studies, and corporate history documentation.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200">
              Unauthorized copying, reproduction, or republication of our project portfolio images on rival contractor websites or marketing brochures will invite strict legal injunctions under applicable copyright statutes.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Award className="text-emerald-700 shrink-0" size={24} /> 3. Website Usage Guidelines
            </h2>
            <p>
              You agree to use this website solely for lawful purposes. You are strictly prohibited from attempting to compromise server security, injecting malware, scraping proprietary project metadata, or submitting fraudulent employment inquiries via our Careers forms.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <ShieldAlert className="text-emerald-700 shrink-0" size={24} /> 4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              This digital agreement and any commercial contracting dispute arising therefrom shall be governed strictly in accordance with the laws of India. Any statutory litigation or arbitration proceedings shall fall under the exclusive legal jurisdiction of the competent civil courts situated in <strong>Erode District, Tamil Nadu</strong> and the Hon&apos;ble High Court of Judicature at Madras.
            </p>
          </section>

          {}
          <section className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200/60 mt-8">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Corporate Headquarters</h3>
            <p className="text-sm text-slate-600">
              VIVEK VIJAY AND COMPANY · 16/5 Kumarasamy Street, Kalaimagal School Road, Erode - 638001, Tamil Nadu. Email: <a href="mailto:support@vivekvijayandcompany.in" className="text-[#0a42a8] font-semibold hover:underline">support@vivekvijayandcompany.in</a>.
            </p>
          </section>

        </div>

        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a42a8] hover:underline">
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
