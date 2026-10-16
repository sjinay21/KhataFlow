'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission failure/notice since there's no backend for this yet
    setSubmitStatus({
      type: 'info',
      message: 'This is a placeholder contact form. Backend functionality will be implemented in a future phase. Your message was not sent.'
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* CONTACT HERO */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have a question, feedback, or need help with KhataFlow? Get in touch with us.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: INFO */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* CONTACT INFORMATION */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="font-semibold text-slate-700">Name:</strong> Jinay Shah</p>
                <p><strong className="font-semibold text-slate-700">Email:</strong> jinay1489@gmail.com</p>
                <p><strong className="font-semibold text-slate-700">Phone:</strong> 9313493149</p>
                <p><strong className="font-semibold text-slate-700">Company / Organization:</strong> KhataFlow</p>
              </div>
            </Card>

            {/* EMAIL / SUPPORT */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Email / Support</h3>
              <p className="text-sm text-slate-600 mb-3">
                Contact the KhataFlow team for questions about the application, feedback, bug reports, feature suggestions, or general support.
              </p>
              <p className="text-sm">
                <strong className="font-semibold text-slate-700">Email:</strong> <span className="text-primary-600">[YOUR SUPPORT EMAIL]</span>
              </p>
            </Card>

            {/* FEEDBACK */}
            <Card className="p-6 bg-primary-50 border-primary-100">
              <h3 className="text-lg font-bold text-primary-900 mb-2">Have feedback?</h3>
              <p className="text-sm text-primary-800 mb-4">
                Your feedback helps us improve KhataFlow. If you have an idea, found an issue, or have a suggestion for a future feature, we'd like to hear from you.
              </p>
              <p className="text-sm">
                <strong className="font-semibold text-primary-900">Feedback Email:</strong> <span className="text-primary-700">[YOUR FEEDBACK EMAIL]</span>
              </p>
            </Card>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-2">
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-md text-sm ${submitStatus.type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <div>
                  <Button type="submit" variant="primary" className="w-full sm:w-auto px-8">
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
}
