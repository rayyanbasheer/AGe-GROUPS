
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Residential',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        phone: formData.phone,
        message: `Email: ${formData.email} | Category: ${formData.category} | Message: ${formData.message}`,
        source: 'contact_form',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', category: 'Residential', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-blue-950 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Get In Touch</h1>
          <p className="text-xl text-slate-400 font-medium tracking-wide">Ready for your project consultation? We're here to help.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-20">
        <div className="bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
          {/* Info Side */}
          <div className="lg:w-1/3 bg-[#000080] p-12 text-white">
            <h2 className="text-2xl font-black mb-12 uppercase tracking-[0.2em] border-b-2 border-white/20 pb-4">Office Info</h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="p-3 bg-white text-blue-900 rounded-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 opacity-60">Location</h4>
                  <p className="font-bold text-sm leading-relaxed">
                    1st floor, Annai Complex, <br />
                    Gothandapani St, Anna Nagar, <br />
                    Kumbakonam, Tamil Nadu 612001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 bg-white text-blue-900 rounded-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 opacity-60">Hotline</h4>
                  <p className="font-bold text-sm">+91 98425 69545</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 bg-white text-blue-900 rounded-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 opacity-60">Email Address</h4>
                  <p className="font-bold text-sm break-all">agegroupskum@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-24 p-8 border border-white/10 bg-white/5">
              <h5 className="font-black uppercase tracking-widest text-xs mb-3">Operating Regions</h5>
              <p className="text-xs text-white/70 font-medium leading-relaxed">
                Kumbakonam, Thanjavur, Thiruvarur, and surrounding areas within a 50km radius.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 p-12 md:p-20 bg-slate-50/50">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black text-blue-950 mb-4 tracking-tight uppercase">Inquiry Received</h3>
                <p className="text-slate-500 mb-8 max-w-md font-medium">
                  Thank you for your interest in AGe GROUPS. An engineer will be assigned to your case shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-900 text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all"
                >
                  New Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <h2 className="text-3xl font-black text-blue-950 mb-4 tracking-tighter uppercase">Request a Proposal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contact Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91" className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Project Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Educational</option>
                      <option>Consultation Only</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Requirements Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={5} required placeholder="Describe your site location and construction goals..." className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider"></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-950 text-white py-6 rounded-sm font-black text-sm uppercase tracking-[0.4em] transition-all flex items-center justify-center disabled:bg-slate-300 shadow-xl"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Submit Proposal Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
