import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';
import { Testimonial } from '@/lib/models/Testimonial';
import { TeamCard } from '@/components/website/TeamCard';
import { TestimonialCarousel } from '@/components/website/TestimonialCarousel';
import { Target, Shield, Landmark, Handshake, Gem } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember as WebsiteTeamMember, Testimonial as WebsiteTestimonial } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Vivek Vijay and Company — 18+ years of engineering excellence in Tamil Nadu. Our story, mission, values, and the expert team behind every landmark project.',
};

const legacyCards = [
  {
    icon: Landmark,
    title: 'Established in 2007',
    copy: (
      <>
        Established in 2007, <strong>VIVEK VIJAY AND COMPANY</strong>{' '}has grown to become one of Tamil Nadu&apos;s most respected names in engineering and construction. For over 18 years, we have been a driving force behind state-of-the-art commercial complexes, residential properties, and critical infrastructure that redefine the skyline and empower communities.
      </>
    ),
  },
  {
    icon: Gem,
    title: 'Built on Quality',
    copy: (
      <>
        Our success is built on an uncompromising dedication to structural integrity, transparent project management, and cutting-edge construction methodologies. By integrating advanced technology with sustainable building practices, we deliver landmark projects that meet today&apos;s stringent standards and stand the test of time.
      </>
    ),
  },
  {
    icon: Handshake,
    title: 'Trusted Partnership',
    copy: (
      <>
        From concept to completion, we function as a trusted partner to our clients. Our multi-disciplinary team of seasoned engineers, architects, and project managers work cohesively to ensure every structure we build reflects our core ethos: <em>Excellence in every brick, Trust in every transaction.</em>
      </>
    ),
  },
];

type TeamMemberDocument = Omit<WebsiteTeamMember, 'id'> & {
  _id?: { toString(): string };
};

type TestimonialDocument = Omit<WebsiteTestimonial, 'id'> & {
  _id?: { toString(): string };
};

export default async function AboutPage() {
  let teamMembers: WebsiteTeamMember[] = [];
  let testimonials: WebsiteTestimonial[] = [];
  try {
    await connectDB();
    const [rawTeam, rawTestimonials] = await Promise.all([
      TeamMember.find().sort({ order: 1 }).lean(),
      Testimonial.find({ active: true }).lean()
    ]);
    const teamDocs = rawTeam as TeamMemberDocument[];
    const testimonialDocs = rawTestimonials as TestimonialDocument[];
    teamMembers = JSON.parse(JSON.stringify(teamDocs.map((member) => ({ ...member, id: member._id?.toString() || '' }))));
    testimonials = JSON.parse(JSON.stringify(testimonialDocs.map((testimonial) => ({ ...testimonial, id: testimonial._id?.toString() || '' }))));
  } catch (error) {
    console.error('Database error in AboutPage:', error);
  }

  return (
    <>
      {}
      <div className="relative pt-40 pb-20 overflow-hidden bg-[#0f172a] min-h-[65vh] flex flex-col justify-center">
        {}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/building.png"
            alt="Construction background"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover object-[80%_center]"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent w-3/4"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
                Building <span className="text-yellow-500">Tomorrow</span>,<br /> Together
              </h1>
              <p className="text-base md:text-[17px] text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                For over 18 years, VIVEK VIJAY AND COMPANY has been pioneering architectural excellence and delivering world-class infrastructure across Tamil Nadu. We don&apos;t just construct buildings; we forge lasting legacies built on trust, innovation, and uncompromising quality.
              </p>
            </div>

            <div className="engineering-mastery-card rounded-2xl bg-[#0a42a8] p-6 text-white shadow-2xl shadow-black/20 lg:justify-self-end lg:min-w-[320px]">
              <div className="text-5xl font-extrabold leading-none mb-2">
                18+ <span className="text-3xl font-bold">years</span>
              </div>
              <div className="text-lg font-semibold leading-snug">of Engineering Mastery</div>
            </div>
          </div>
        </div>
      </div>

      {}
      <section className="pt-20 pb-10 md:pt-28 md:pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="mb-6">
                <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">Our History</span>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-6 leading-tight">
                  A Legacy of Excellence Since 2007
                </h2>
                <div className="w-16 h-[4px] bg-[#0a42a8] mb-8"></div>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                <strong className="text-[#0f172a]">VIVEK VIJAY AND COMPANY</strong> combines disciplined engineering, accountable project leadership, and long-standing field experience to deliver structures that serve communities for generations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0a42a8] shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">Our Mission</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">To deliver exceptional, high-quality structures that inspire communities and stand the ultimate test of time.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0a42a8] shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">Our Vision</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">To be the most trusted and innovative engineering contractor across Tamil Nadu and South India, setting the gold standard for quality infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-5">
              {legacyCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a42a8] text-white shadow-lg shadow-blue-900/10">
                        <Icon size={26} />
                      </div>
                      <div>
                        <h3 className="mb-3 text-xl font-display font-bold text-[#0f172a]">{card.title}</h3>
                        <p className="text-base leading-relaxed text-slate-600">{card.copy}</p>
                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {}
      <section className="pt-10 pb-20 md:pt-12 md:pb-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-6">Our Core Values</h2>
            <p className="text-slate-600 text-lg">These foundational principles guide every project we undertake and every relationship we build.</p>
          </div>

          <div className="bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-slate-100 md:border-none overflow-hidden md:overflow-visible">
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 divide-y divide-slate-100 md:divide-y-0">
              {[
                {
                  title: "Uncompromising Quality",
                  desc: "We adhere strictly to international standards, ensuring that every brick laid is a testament to perfection."
                },
                {
                  title: "Safety First",
                  desc: "The safety of our workforce and clients is our absolute priority. We maintain zero-tolerance safety policies."
                },
                {
                  title: "Innovation",
                  desc: "We leverage modern technology, from BIM modeling to sustainable materials, pushing construction boundaries."
                },
                {
                  title: "Sustainability",
                  desc: "We are committed to green building practices that minimize environmental impact and maximize energy efficiency."
                }
              ].map((value, idx) => (
                <div key={idx} className="p-6 md:p-8 md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-slate-100 md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-2 md:mb-3 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0a42a8] md:hidden shrink-0"></span>
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed pl-5 md:pl-0">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">The People Behind the Projects</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-4">Meet Our Team</h2>
              <p className="text-slate-600 text-lg">Experienced engineers, project managers, and construction specialists committed to delivering excellence on every build.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm block mb-3">What Our Clients Say</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#0f172a] mb-4">Client Testimonials</h2>
              <p className="text-slate-600 text-lg">Real words from the government bodies, institutions, and businesses that trusted us to build their vision.</p>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {}
      <section className="py-16 bg-[#0a42a8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">Ready to Build with Us?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Let&apos;s discuss how our 18+ years of engineering expertise can bring your next project to life.</p>
          <Link href="/contact">
            <button className="bg-[#FFB800] hover:bg-[#E5A600] text-black font-bold px-10 py-4 text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              Get in Touch →
            </button>
          </Link>
        </div>
      </section>

    </>
  );
}
