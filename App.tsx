
import React, { useState } from 'react';
import { AgentType } from './types';
import { AGENTS } from './constants';
import VoiceInterface from './components/VoiceInterface';

type Tab = 'services' | 'about' | 'blog' | 'contact';

const App: React.FC = () => {
  const [activeAgentId, setActiveAgentId] = useState<AgentType | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('services');

  const activeAgent = AGENTS.find(a => a.id === activeAgentId);

  const renderServices = () => (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Our Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Nationwide Furniture Transportation</h3>
          <p className="text-gray-600 leading-relaxed">
            We specialize in safe, reliable furniture transportation across all 50 states. Whether you're moving a single item or an entire home, our team ensures every piece arrives in perfect condition.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="font-bold text-sm mb-2 text-gray-700">What’s included:</p>
            <ul className="grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Professional wrapping and padding
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Secure loading and unloading
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> GPS-tracked trucks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Real-time delivery updates
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Residential Moving</h3>
          <p className="text-gray-600 leading-relaxed">
            Moving homes doesn’t have to be stressful. Our trained movers handle everything with care, from delicate antiques to heavy appliances.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="font-bold text-sm mb-2 text-gray-700">Perfect for:</p>
            <ul className="grid grid-cols-1 gap-1 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Apartments</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Condos</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Single-family homes</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#f4b41a] rounded-full"></span> Long-distance relocations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800">Commercial Moving</h3>
          <p className="text-gray-600 text-sm">Businesses trust us to relocate offices, retail spaces, and commercial equipment with minimal downtime.</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Office furniture & workstations</li>
            <li>• Electronics & retail fixtures</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800">Furniture-Only Transport</h3>
          <p className="text-gray-600 text-sm">If you just need a couch, table, or bedroom set moved — we’ve got you covered. Ideal for furniture stores, interior designers, and homeowners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800">Packing & Unpacking</h3>
          <p className="text-gray-600 text-sm">Our team uses high-quality materials to pack your items safely and efficiently.</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Options:</p>
          <div className="flex gap-2 flex-wrap">
            {['Full-service', 'Partial', 'Fragile-only'].map(opt => (
              <span key={opt} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">{opt}</span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800">Storage Solutions</h3>
          <p className="text-gray-600 text-sm">Need temporary or long-term storage? We offer secure, climate-controlled facilities for furniture and household items.</p>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-10 animate-fadeIn max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">About Busy Bee Moving and Storage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Who We Are</h3>
          <p className="text-gray-600 leading-relaxed">
            Busy Bee Moving and Storage is a nationwide furniture transportation company dedicated to making moves simple, safe, and stress-free. With years of experience and a commitment to excellence, we’ve become a trusted partner for families, businesses, and furniture retailers across America.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To deliver reliable, efficient, and affordable moving services while treating every item with the care it deserves. We believe that every move deserves professional attention and thoughtful planning.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Why Choose Us</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Nationwide coverage',
            'Fully insured and licensed',
            'Professional, trained movers',
            'Transparent pricing',
            'Modern trucks and equipment',
            'Exceptional customer support'
          ].map(reason => (
            <div key={reason} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Our Values</h3>
        <p className="text-lg text-gray-500 font-medium">Care. Reliability. Integrity. Efficiency.</p>
        <p className="text-gray-600 italic">"We treat your belongings as if they were our own."</p>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-10 animate-fadeIn max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Moving Tips & Insights</h2>
      
      {[
        { 
          id: 1, 
          title: '1. 5 Tips for a Smooth Long-Distance Move', 
          content: 'Long-distance moves can feel overwhelming, but with the right preparation, they don’t have to be. In this post, we break down simple steps to stay organized, protect your furniture, and avoid last-minute stress. Start by creating a detailed checklist, labeling every box clearly, and setting aside essentials you’ll need during the first few days.' 
        },
        { 
          id: 2, 
          title: '2. How to Protect Your Furniture During a Move', 
          content: 'From wrapping techniques to choosing the right packing materials, this guide covers the best ways to keep your furniture safe from scratches, dents, and damage. Use moving blankets, stretch wrap, and corner protectors for delicate pieces. Disassemble larger items when possible.' 
        },
        { 
          id: 3, 
          title: '3. The Benefits of Hiring a Professional Moving Company', 
          content: 'DIY moves may seem cheaper, but professional movers save time, reduce risk, and ensure your belongings arrive safely. Here’s why more Americans are choosing full-service moving companies: they provide the right equipment, insurance, and expert planning to turn a stressful move into a predictable experience.' 
        }
      ].map(post => (
        <article key={post.id} className="group">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{post.content}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest cursor-pointer hover:gap-3 transition-all">
            Read Full Post <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </div>
        </article>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We’re here to help with all your moving and furniture transportation needs. Tell us a bit about your move and we’ll get back to you with details and options.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                <p className="text-gray-800 font-bold">(305) 741-9826</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                <p className="text-gray-800 font-bold">info@busybeemoving.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Service Area</p>
                <p className="text-gray-800 font-bold">Nationwide — all 50 states</p>
              </div>
            </div>
          </div>
        </div>

        <form 
          action="https://formspree.io/f/xvzgqrbd"
          method="POST"
          className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100"
        >
          <h3 className="font-bold text-gray-800 mb-2">Send a Quick Message</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Name" required />
            <input name="email" type="email" className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Email" required />
          </div>
          <input name="phone" type="tel" className="w-full p-3 border border-gray-200 rounded-xl text-sm" placeholder="Phone Number" />
          <textarea name="message" className="w-full p-3 border border-gray-200 rounded-xl text-sm h-32" placeholder="Tell us about your move..." required></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Submit Request</button>
        </form>
      </div>

      <div className="space-y-8">
        <div className="bg-[#fff9e6] p-8 rounded-2xl border border-[#f4b41a]/20 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f4b41a]/10 rounded-full blur-2xl"></div>
          <h3 className="text-xl font-bold text-yellow-900 mb-2">Newsletter Signup</h3>
          <p className="text-sm text-yellow-800/70 mb-6">Stay updated with moving tips, promotions, and company news from Busy Bee.</p>
          <form action="https://formspree.io/f/xvzgqrbd" method="POST" className="flex gap-2">
            <input name="newsletter_email" type="email" className="flex-1 p-3 border border-[#f4b41a]/30 rounded-xl text-sm bg-white/80 backdrop-blur-sm" placeholder="Your email address" required />
            <button type="submit" className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-600 transition-colors">Join</button>
          </form>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Social Media</h3>
          <p className="text-sm text-gray-500 mb-6">Follow Busy Bee Moving and Storage for updates and helpful moving advice.</p>
          <div className="flex gap-4">
            {['FB', 'IG', 'LN', 'TT'].map(social => (
              <div key={social} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                {social}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f9] text-[#222] font-sans selection:bg-[#f4b41a]/30">
      {/* Voice Overlay Modal */}
      {activeAgentId && activeAgent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-auto scale-up">
            <VoiceInterface agent={activeAgent} onClose={() => setActiveAgentId(null)} />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentTab('services')}>
            <div className="w-10 h-10 rounded-full bg-[#f4b41a] flex items-center justify-center text-black font-black shadow-lg shadow-yellow-200/50 text-base transform group-hover:rotate-12 transition-transform">
              BB
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none">Busy Bee</h1>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400">Moving & Storage</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center gap-2 text-xl font-black text-gray-900 mb-0.5">
              <svg className="w-5 h-5 text-[#f4b41a]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              (305) 741-9826
            </div>
            <span className="text-sm font-medium text-gray-500">Furniture transportation across America, done right.</span>
          </div>
        </header>

        {/* Dynamic Hero with Integrated Voice Quick-Actions */}
        <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fff9e6] to-transparent pointer-events-none hidden lg:block"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">
                Nationwide Since 2026
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 leading-[1.1]">
                Moving America, <br />
                <span className="text-[#f4b41a]">One Box At A Time.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Safe, reliable furniture transportation and professional moving services across all 50 states. 
                Residential, commercial, and specialty transport.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 800, behavior: 'smooth' }); }} 
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-0 transition-all"
                >
                  Get a Free Quote
                </button>
                <button 
                  onClick={() => setCurrentTab('services')}
                  className="bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all"
                >
                  Browse Services
                </button>
              </div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                Licensed • Insured • Coast to Coast
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-gray-900 text-white p-8 rounded-[1.5rem] shadow-2xl relative">
                <div className="absolute -top-4 -right-4 bg-[#f4b41a] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-bounce">
                  Live Now
                </div>
                <h3 className="font-black text-2xl mb-2 flex items-center gap-3">
                  <span className="text-[#f4b41a]">AI</span> Voice Support
                </h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  Connect instantly to our real-time voice agents. They can quote your move, schedule a pickup, or handle emergency relocations immediately.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveAgentId('service')}
                    className="w-full bg-white text-gray-900 py-4 rounded-xl font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">💬</span> Speak with Support
                  </button>
                  <button 
                    onClick={() => setActiveAgentId('emergency')}
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-black hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20 active:scale-95 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">🚨</span> Emergency Dispatch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs System */}
        <nav className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl w-fit">
          {(['services', 'about', 'blog', 'contact'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                currentTab === tab 
                ? 'bg-white text-gray-900 shadow-md scale-[1.02]' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Tab Content Display */}
        <main className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 p-8 md:p-12 min-h-[500px]">
          {currentTab === 'services' && renderServices()}
          {currentTab === 'about' && renderAbout()}
          {currentTab === 'blog' && renderBlog()}
          {currentTab === 'contact' && renderContact()}
        </main>

        <footer className="py-16 text-center">
          <div className="w-12 h-1 bg-gray-200 mx-auto mb-10 rounded-full"></div>
          <div className="flex justify-center gap-12 mb-8 text-xs font-black text-gray-400 uppercase tracking-widest">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>DOT Compliance</span>
          </div>
          <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-300">
            © 2026 Busy Bee Moving and Storage — Nationwide Transportation Specialists
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
