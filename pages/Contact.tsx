import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactProps {
  embedded?: boolean;
}

const Contact: React.FC<ContactProps> = ({ embedded = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Residential',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSubmitError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

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
      setSubmitError('Unable to submit your proposal request right now. Please call us directly at +91 98425 69545.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={embedded ? 'py-20 lg:py-24 bg-white' : 'pt-16 pb-20 bg-white'}>
      {!embedded && (
        <section className="bg-slate-900 py-20 text-center border-b border-slate-800 mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm font-medium text-blue-300 mb-2">Direct Engineering Consultation</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Contact &amp; Site Visit Request
            </h1>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#000080] mb-1">
            06. Start Your Project
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight text-balance">
            Request a site inspection &amp; structural proposal
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Office Details Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-8 sm:p-10 flex flex-col justify-between border border-slate-800">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Headquarters &amp; Engineering Office
              </h3>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Meet directly with our principal structural engineers to review plots, architectural drawings, and material specifications.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 text-blue-300 rounded-md shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-1">Office Address</h4>
                    <p className="text-sm text-white leading-relaxed">
                      1st Floor, Annai Complex,<br />
                      Gothandapani St, Anna Nagar,<br />
                      Kumbakonam, Tamil Nadu 612001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 text-blue-300 rounded-md shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-1">Direct Engineering Line</h4>
                    <p className="font-mono-tabular text-sm font-semibold text-white">
                      +91 98425 69545
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-800 text-blue-300 rounded-md shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-1">Email</h4>
                    <p className="text-sm text-white break-all">
                      agegroupskum@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800">
              <p className="text-xs font-semibold text-blue-300 mb-1">Service Radius Policy</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                We exclusively undertake projects in Kumbakonam, Thanjavur, Thiruvarur, and surrounding towns within a 50 km radius to guarantee daily engineer supervision.
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-8 sm:p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
                  Proposal Request Received
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md leading-relaxed">
                  Thank you for contacting AGe Groups Construction. A senior civil engineer will review your project details and call you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#000080] hover:bg-blue-900 text-white px-6 py-2.5 rounded-md font-display font-semibold text-sm transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-1">
                    Project Brief
                  </h3>
                  <p className="text-sm text-slate-600">
                    Provide your plot location and construction requirements below.
                  </p>
                </div>

                {submitError && (
                  <div role="alert" className="p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Ahmed"
                      className="w-full bg-white border border-slate-300 focus:border-[#000080] focus:ring-2 focus:ring-blue-900/20 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-white border border-slate-300 focus:border-[#000080] focus:ring-2 focus:ring-blue-900/20 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98425 69545"
                      className="w-full bg-white border border-slate-300 focus:border-[#000080] focus:ring-2 focus:ring-blue-900/20 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Project Sector
                    </label>
                    <select
                      id="contact-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-300 focus:border-[#000080] focus:ring-2 focus:ring-blue-900/20 rounded-md px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Educational</option>
                      <option>Consultation Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Site Location &amp; Requirements
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Share your plot location (e.g., Kumbakonam / Thanjavur), approximate square footage, and timeline..."
                    className="w-full bg-white border border-slate-300 focus:border-[#000080] focus:ring-2 focus:ring-blue-900/20 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#000080] hover:bg-blue-900 disabled:bg-slate-400 text-white py-3.5 px-6 rounded-md font-display font-semibold text-sm transition-colors flex items-center justify-center whitespace-nowrap"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Proposal Request'}
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
