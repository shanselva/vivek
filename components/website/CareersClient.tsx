'use client';

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Award, 
  IndianRupee, 
  Search, 
  Send, 
  CheckCircle2, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  description: string;
  requirements?: string;
  isActive: boolean;
  order: number;
}

export function CareersClient({ initialCareers }: { initialCareers: Career[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);

  
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appResume, setAppResume] = useState('');
  const [appMessage, setAppMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const departments = useMemo(() => {
    const deps = new Set(initialCareers.map(c => c.department));
    return ['all', ...Array.from(deps)];
  }, [initialCareers]);

  const filteredCareers = useMemo(() => {
    return initialCareers.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDep = selectedDepartment === 'all' || career.department === selectedDepartment;
      return matchesSearch && matchesDep;
    });
  }, [initialCareers, searchQuery, selectedDepartment]);

  const handleOpenModal = (job: Career) => {
    setSelectedJob(job);
    setAppName('');
    setAppEmail('');
    setAppPhone('');
    setAppResume('');
    setAppMessage('');
    setSubmitted(false);
    setError('');
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true);
    setError('');

    const finalMessage = `Position: ${selectedJob.title} (${selectedJob.department})\nLocation: ${selectedJob.location}\nResume/Portfolio: ${appResume || 'Not provided'}\n\nCover Note:\n${appMessage}`;

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appName,
          email: appEmail,
          phone: appPhone,
          service: `Job Application: ${selectedJob.title}`,
          message: finalMessage,
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      setError('Network error occurred. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-[#F8F9FA] text-[#1A1A1A] min-h-[70vh] relative overflow-hidden">
      <div className="container mx-auto px-4 xl:max-w-[1280px] relative z-10">
        
        {/* Search and Filters Bar (Sleek Dark Card on Light Background to stop Glare) */}
        <div className="bg-[#0f172a] text-white p-4 sm:p-6 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-800">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by role, skill or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl pl-11 pr-8 py-2.5 sm:py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FFB800] transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setSelectedDepartment(dep)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                  selectedDepartment === dep
                    ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20 font-bold scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/5'
                }`}
              >
                {dep === 'all' ? '✨ All Departments' : dep}
              </button>
            ))}
          </div>
        </div>

        {}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCareers.map((job) => (
              <div 
                key={job.id}
                className="group bg-white rounded-2xl p-7 border border-slate-200/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-[#FFB800] shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFB800]/15 text-[#996b00] border border-[#FFB800]/30">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F8F9FA] text-slate-700 flex items-center gap-1 border border-slate-200">
                      <Clock size={12} className="text-[#d99b00]" /> {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mb-3 group-hover:text-[#b37d00] transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-[#4A4A4A] mb-5 pb-5 border-b border-slate-100 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#d99b00]" />
                      <span>{job.location}</span>
                    </div>
                    {job.experience && (
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-[#d99b00]" />
                        <span>{job.experience} Exp</span>
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <IndianRupee size={14} />
                        <span>{job.salary}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-[#4A4A4A] leading-relaxed line-clamp-3 mb-6">
                    {job.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenModal(job)}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0f172a] hover:bg-[#FFB800] text-white hover:text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>Apply Now</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 max-w-2xl mx-auto shadow-sm p-8">
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#d99b00]">
              <Briefcase size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">No Openings Found</h3>
            <p className="text-[#4A4A4A] text-sm max-w-md mx-auto mb-6">
              {searchQuery || selectedDepartment !== 'all' 
                ? 'Try adjusting your search filter or selecting another department.'
                : 'We currently do not have any active postings. Please check back soon or send us a general application.'}
            </p>
            {(searchQuery || selectedDepartment !== 'all') && (
              <Button onClick={() => { setSearchQuery(''); setSelectedDepartment('all'); }} className="bg-[#FFB800] text-black hover:bg-yellow-400 font-bold shadow-md">
                Reset Filters
              </Button>
            )}
          </div>
        )}

      </div>

      {}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-scale-up text-left text-[#1A1A1A]">
            
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-full bg-[#F8F9FA] hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-12 px-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-3">Application Received!</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  Thank you for applying for <span className="text-[#d99b00] font-bold">{selectedJob.title}</span>. Our HR &amp; Engineering leadership team will review your credentials and contact you shortly.
                </p>
                <Button 
                  onClick={() => setSelectedJob(null)}
                  className="w-full bg-[#FFB800] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-md"
                >
                  Return to Careers
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFB800]/20 text-[#996b00] border border-[#FFB800]/30 mb-3">
                    <Sparkles size={12} /> Applying for Role
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-[#4A4A4A] mt-1.5 font-medium">
                    {selectedJob.department} • {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>

                {selectedJob.requirements && (
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-slate-200 text-xs text-[#4A4A4A] space-y-1">
                    <p className="font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Key Requirements:</p>
                    <p className="whitespace-pre-line leading-relaxed">{selectedJob.requirements}</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#1A1A1A]">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Rajesh Sharma"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#1A1A1A]">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="rajesh@example.com"
                        value={appEmail}
                        onChange={(e) => setAppEmail(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#1A1A1A]">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={appPhone}
                        onChange={(e) => setAppPhone(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#1A1A1A]">Resume Link / Portfolio URL</label>
                      <input 
                        type="url" 
                        placeholder="Google Drive / LinkedIn link"
                        value={appResume}
                        onChange={(e) => setAppResume(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1A1A1A]">Cover Letter / Why are you a good fit? *</label>
                    <textarea 
                      rows={4} 
                      required 
                      placeholder="Briefly describe your experience in construction projects..."
                      value={appMessage}
                      onChange={(e) => setAppMessage(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl p-4 text-sm text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                  <button 
                    type="button" 
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 rounded-xl bg-[#F8F9FA] hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-8 py-3.5 rounded-xl bg-[#FFB800] hover:bg-yellow-400 text-black font-bold text-sm tracking-wide flex items-center gap-2 shadow-md shadow-[#FFB800]/20 disabled:opacity-50 transition-all"
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
