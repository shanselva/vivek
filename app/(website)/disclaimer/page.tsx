import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Scale, Building2, FileCheck, Info } from 'lucide-react';

export const metadata = {
  title: 'Legal Disclaimer | Vivek Vijay & Company',
  description: 'Official statutory and technical disclaimer regarding architectural 3D renders, project estimates, website content, and engineering services.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      {}
      <div className="bg-[#0f172a] text-white py-16 -mt-40 pt-44 mb-16 border-b border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 xl:max-w-[1200px] relative z-10">
          <div className="flex items-center gap-3 text-[#FFB800] font-bold text-sm tracking-widest uppercase mb-3">
            <AlertTriangle size={18} /> Statutory Notice
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Legal <span className="text-[#FFB800]">Disclaimer</span>
          </h1>
          <p className="text-slate-300 mt-3 text-base max-w-2xl">
            Please read this important notice regarding architectural perspectives, project pricing, and website content accuracy.
          </p>
        </div>
      </div>

      {}
      <div className="container mx-auto px-4 xl:max-w-[1000px]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-14 text-slate-700 space-y-10 leading-relaxed">
          
          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Building2 className="text-amber-600 shrink-0" size={24} /> 1. Architectural 3D Renders &amp; Perspectives
            </h2>
            <p>
              All architectural 3D elevations, structural walkthrough animations, interior layout mockups, and conceptual graphics displayed on this website are purely <strong>artistic impressions and conceptual visualizations</strong>. They do not constitute formal engineering blueprints or legal offers. Actual constructed buildings, facade finishing, landscaping, and room dimensions are subject to formal structural drawings, site topography conditions, and statutory approvals by competent municipal authorities (DTCP / CMDA / Local Bodies).
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <FileCheck className="text-amber-600 shrink-0" size={24} /> 2. Cost Estimates &amp; Commercial Tenders
            </h2>
            <p>
              Any rough price per square foot calculations, project budget calculators, or contracting cost ranges mentioned on our website or blog articles are indicative general guidelines only. Construction materials (steel, cement, river sand), labor wages, and GST tax tariffs fluctuate regularly. Final commercial pricing is strictly governed by formal written contracting tender agreements and bill of quantities (BOQ) signed between <strong>VIVEK VIJAY AND COMPANY</strong> and the respective client.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Info className="text-amber-600 shrink-0" size={24} /> 3. General Information Accuracy
            </h2>
            <p>
              While we endeavor to keep project milestones, company statistics, and engineering career postings accurate and up to date, we make no representations or warranties of any kind, express or implied, about the absolute completeness or reliability of digital web content. Any reliance you place on such digital information is strictly at your own independent risk.
            </p>
          </section>

          {}
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
              <Scale className="text-amber-600 shrink-0" size={24} /> 4. Limitation of Liability
            </h2>
            <p>
              In no event will VIVEK VIJAY AND COMPANY, its managing partners, executive board members, or employees be liable for any direct, indirect, incidental, punitive, or consequential loss or damage arising out of or in connection with the use of this website or temporary technical downtime.
            </p>
          </section>

          {}
          <section className="bg-amber-50/50 p-6 rounded-xl border border-amber-200/60 mt-8">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Legal Verification</h3>
            <p className="text-sm text-slate-600">
              For official certified copies of company registration certificates, GST documents, or contractor grade accreditations, prospective clients are advised to visit our registered administrative office during working hours or email <a href="mailto:support@vivekvijayandcompany.in" className="text-[#0a42a8] font-semibold hover:underline">support@vivekvijayandcompany.in</a>.
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
