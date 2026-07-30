import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Vivek Vijay & Company',
  description: 'Learn how Vivek Vijay and Company collects, uses, and protects your personal and project information under applicable data protection laws.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      {}
      <div className="bg-[#0f172a] text-white py-16 -mt-40 pt-44 mb-16 border-b border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a42a8]/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 xl:max-w-[1200px] relative z-10">
          <div className="flex items-center gap-3 text-[#FFB800] font-bold text-sm tracking-widest uppercase mb-3">
            <Shield size={18} /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Privacy <span className="text-[#FFB800]">Policy</span>
          </h1>
          <p className="text-slate-300 mt-3 text-base max-w-2xl">
            Last Updated: June 2026. This policy describes how VIVEK VIJAY AND COMPANY protects your data and privacy.
          </p>
        </div>
      </div>

      {}
      <div className="container mx-auto px-4 xl:max-w-[1000px]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-14 text-slate-700 space-y-10 leading-relaxed">
          
          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Lock className="text-[#0a42a8] shrink-0" size={24} /> 1. Introduction &amp; Scope
            </h2>
            <p>
              Welcome to the official website of <strong>VIVEK VIJAY AND COMPANY</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered civil engineering contractors operating from Erode, Tamil Nadu. We value the trust you place in us and are fully committed to protecting your personal information and commercial project details in strict accordance with the Information Technology Act, 2000 and applicable data protection regulations in India.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <FileText className="text-[#0a42a8] shrink-0" size={24} /> 2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when interacting with our digital portals, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Enquiry Data:</strong> Full name, email address, phone number, project location, construction timeline, and architectural requirements submitted via our Contact Us forms.</li>
              <li><strong>Career Applications:</strong> Resumes, educational qualifications, professional work history, and contact details submitted through our Careers portal.</li>
              <li><strong>Technical Metadata:</strong> IP addresses, browser types, operating systems, and access timestamps automatically recorded by web hosting servers for security and analytics.</li>
            </ul>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Eye className="text-[#0a42a8] shrink-0" size={24} /> 3. Use of Collected Information
            </h2>
            <p className="mb-4">
              Your information is collected strictly for legitimate business purposes, specifically to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Evaluate architectural plans and prepare preliminary construction or contracting cost estimates.</li>
              <li>Respond to customer support inquiries and schedule on-site engineering consultations.</li>
              <li>Process employment applications and assess candidates for engineering and administrative roles.</li>
              <li>Maintain internal business records and comply with statutory tax, labor, and municipal building compliance requirements.</li>
            </ul>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <CheckCircle2 className="text-[#0a42a8] shrink-0" size={24} /> 4. Data Protection &amp; Confidentiality
            </h2>
            <p>
              We implement industry-standard physical, electronic, and administrative safeguards to secure your personal data against unauthorized access, disclosure, alteration, or destruction. Architectural CAD blueprints, municipal permission drawings, and financial estimates shared with our engineers are treated under strict commercial confidentiality and are never sold or rented to third-party marketing agencies.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
              5. Third-Party Links &amp; Cookies
            </h2>
            <p>
              Our website may contain links to external municipal portals, architectural suppliers, or social media networks. We are not responsible for the privacy practices of external domains. We use minimal session cookies to ensure site functionality and enhance website performance.
            </p>
          </section>

          {}
          <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Grievance Redressal &amp; Contact</h3>
            <p className="text-sm text-slate-600 mb-4">
              If you have any questions, concerns, or requests regarding the deletion or updating of your personal data, please contact our administrative head office:
            </p>
            <div className="text-sm font-medium text-slate-800 space-y-1">
              <p><strong>VIVEK VIJAY AND COMPANY</strong></p>
              <p>16/5 Kumarasamy Street, Kalaimagal School Road, Erode - 638001, Tamil Nadu.</p>
              <p>Email: <a href="mailto:support@vivekvijayandcompany.in" className="text-[#0a42a8] hover:underline">support@vivekvijayandcompany.in</a></p>
              <p>Phone: +91 98420 44777 / +91 98424 70001</p>
            </div>
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
