'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setError(data.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Thank you! Your enquiry has been submitted successfully. We will get back to you soon.
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Karthik Raja"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="karthik@example.in"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98420 12345"
        />
        <Input
          label="Service of Interest"
          name="service"
          value={formData.service}
          onChange={handleChange}
          placeholder="e.g. Commercial Construction"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text-medium">Message <span className="text-red-500">*</span></label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-dark resize-y"
        ></textarea>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          id="privacyConsent"
          type="checkbox"
          required
          className="mt-1 w-4.5 h-4.5 rounded border-slate-300 text-[#0a42a8] focus:ring-[#0a42a8] cursor-pointer accent-[#0a42a8]"
        />
        <label htmlFor="privacyConsent" className="text-sm text-slate-600 cursor-pointer select-none leading-relaxed">
          I have read and agree to the <Link href="/privacy-policy" className="text-[#0a42a8] font-bold underline hover:text-[#083382]">Privacy Policy</Link> and authorize Vivek Vijay &amp; Co. to contact me regarding my enquiry.
        </label>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-[#0a42a8] hover:bg-[#083382] text-white font-bold tracking-wide rounded-lg shadow-md transition-all">
          {loading ? 'Sending Message...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}