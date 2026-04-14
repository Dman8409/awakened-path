'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

const IntakeForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    whySaidYes: '',
    navigating: '',
    clarityScore: '5',
    stuck: '',
    wouldChange: '',
    ifNothingChanges: '',
    alreadyTried: '',
    whatWorked: '',
    supportNeeded: '',
    readiness: '',
    investmentOpen: '',
    investmentRange: '',
    finalNote: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRAu15NUagFSrnToFlSAOms8sMsJgUhmmo4DV71EEdScsCRvgbopQyRHHUbo8dG4W7TQ/exec';
  const BOOKING_LINK = 'https://cal.com/thenatashapinto';
  const LOGO_URL = 'https://drive.google.com/uc?export=view&id=1mdew_k2DljKzSHtBkCyOR1WiUD7iFqqC';

  const QUALIFIED_INVESTMENT_MIN = '₹2,00,000 to ₹5,00,000';
  const QUALIFIED_INVESTMENT_MAX = '₹5,00,000+';

  const sections = [
    {
      title: 'About You',
      description: 'Let\'s start with the essentials.',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, minLength: 2 },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number (with country code)', type: 'tel', required: true },
        { name: 'location', label: 'City and Country', type: 'text', required: true, minLength: 2 }
      ]
    },
    {
      title: 'Why You\'re Here',
      description: 'Share what brought you to this moment.',
      fields: [
        { name: 'whySaidYes', label: 'What made you say yes to this call right now?', type: 'textarea', required: true, minLength: 10 },
        { name: 'navigating', label: 'What are you currently navigating most in your life, career, or relationships?', type: 'textarea', required: true, minLength: 10 },
        { name: 'clarityScore', label: 'On a scale of 1 to 10, how clear do you feel about your next chapter right now?', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: true }
      ]
    },
    {
      title: 'What Feels Stuck',
      description: 'Honesty here matters most.',
      fields: [
        { name: 'stuck', label: 'What feels most stuck or unresolved in your life right now?', type: 'textarea', required: true, minLength: 10 },
        { name: 'wouldChange', label: 'What would having more clarity, confidence, and alignment change for you in the next 6 months?', type: 'textarea', required: true, minLength: 10 },
        { name: 'ifNothingChanges', label: 'If nothing changes, what concerns you most?', type: 'textarea', required: true, minLength: 10 }
      ]
    },
    {
      title: 'What You\'ve Already Tried',
      description: 'Understanding your journey helps us serve you better.',
      fields: [
        { name: 'alreadyTried', label: 'What have you already tried to move forward?', type: 'textarea', required: true, minLength: 10 },
        { name: 'whatWorked', label: 'What worked, and what did not?', type: 'textarea', required: true, minLength: 10 },
        { name: 'supportNeeded', label: 'What kind of support do you feel you need most right now?', type: 'textarea', required: true, minLength: 10 }
      ]
    },
    {
      title: 'Readiness and Investment',
      description: 'Private coaching is a high-touch, premium space for women who are ready to be honest, supported, and challenged. If we both feel aligned, the next step may be an invitation into deeper work together.',
      fields: [
        { name: 'readiness', label: 'Which best describes where you are right now?', type: 'select', options: ['I am serious and ready for support', 'I am interested, but still unsure', 'I am mostly curious and exploring'], required: true },
        { name: 'investmentOpen', label: 'If we feel aligned, are you open to investing in premium private coaching?', type: 'select', options: ['Yes', 'Possibly', 'No'], required: true },
        { name: 'investmentRange', label: 'What level of investment feels realistic for you right now?', type: 'select', options: ['Below ₹50,000', '₹50,000 to ₹1,00,000', '₹1,00,000 to ₹2,00,000', '₹2,00,000 to ₹5,00,000', '₹5,00,000+'], required: true }
      ]
    },
    {
      title: 'Final Note',
      description: 'Anything else Natasha should know before your conversation?',
      fields: [
        { name: 'finalNote', label: 'Additional notes (optional)', type: 'textarea', required: false, minLength: 0 }
      ]
    }
  ];

  const calculateQualification = (data) => {
    let score = 0, qualificationStatus = 'Not Qualified', suggestedOffer = 'Nurture / No Offer Yet';
    const qualifiedRanges = [QUALIFIED_INVESTMENT_MIN, QUALIFIED_INVESTMENT_MAX];
    const isInvestedInRange = qualifiedRanges.includes(data.investmentRange);

    if (!isInvestedInRange) {
      qualificationStatus = (data.readiness === 'I am serious and ready for support' || data.investmentOpen === 'Possibly') ? 'Did not qualify for higher ticket' : 'Not qualified';
      suggestedOffer = qualificationStatus === 'Did not qualify for higher ticket' ? 'Chaos to Clarity' : 'Nurture / No Offer Yet';
    } else {
      if (data.readiness === 'I am serious and ready for support' && (data.investmentOpen === 'Yes' || data.investmentOpen === 'Possibly')) {
        qualificationStatus = 'Qualified for The Awakened Path';
        suggestedOffer = 'The Awakened Path';
        score = 90;
      } else {
        qualificationStatus = 'Did not qualify for higher ticket';
        suggestedOffer = 'Chaos to Clarity';
        score = data.investmentOpen === 'Possibly' ? 60 : 40;
      }
    }
    return { qualificationStatus, suggestedOffer, leadScore: score };
  };

  const validateField = (name, value, field) => {
    if (field.required && (!value || value.trim() === '')) return 'This field is required';
    if (field.minLength && value.length < field.minLength) return `Please write at least ${field.minLength} characters`;
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validateSection = () => {
    const section = sections[currentSection];
    const newErrors = {};
    let isValid = true;
    section.fields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) { newErrors[field.name] = error; isValid = false; }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (validateSection() && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateSection()) return;
    setIsSubmitting(true);
    const { qualificationStatus, suggestedOffer, leadScore } = calculateQualification(formData);
    const submissionData = { ...formData, leadStatus: qualificationStatus, suggestedOffer, leadScore, timestamp: new Date().toISOString() };

    try {
      await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(submissionData) });
      setSubmissionResult({ status: qualificationStatus, suggestedOffer });
      if (qualificationStatus === 'Qualified for The Awakened Path') {
        setTimeout(() => { window.location.href = BOOKING_LINK; }, 2000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({ status: 'Error', message: 'There was an issue submitting your application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-md text-center">
          {submissionResult.status === 'Qualified for The Awakened Path' ? (
            <>
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <span className="text-2xl">✓</span>
                </div>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e40', fontSize: '28px' }} className="font-bold mb-3">Thank you for sharing so honestly.</h2>
              <p style={{ color: '#1a2e40' }} className="text-lg mb-6">Your reflections have been received, and you can now book your conversation with Natasha.</p>
              <p style={{ color: '#999', fontSize: '14px' }}>Redirecting to booking...</p>
            </>
          ) : submissionResult.status === 'Did not qualify for higher ticket' ? (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e40', fontSize: '28px' }} className="font-bold mb-3">Thank you for sharing so honestly.</h2>
              <p style={{ color: '#1a2e40' }} className="text-lg mb-6">Your responses have been received and will be reviewed carefully. If it feels aligned, someone from Natasha's team may reach out with the next step.</p>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e40', fontSize: '28px' }} className="font-bold mb-3">Thank you for your interest.</h2>
              <p style={{ color: '#1a2e40' }} className="text-lg">Your responses have been received.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const section = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div style={{ backgroundColor: '#faf9f6', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="border-b" style={{ borderColor: '#e0ddd8', backgroundColor: '#fff' }}>
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4">
              <img src={LOGO_URL} alt="The Natasha Pinto" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e40', fontSize: '32px' }} className="font-bold mb-2">The Awakened Path</h1>
            <p style={{ color: '#666', fontSize: '15px' }} className="max-w-md mx-auto leading-relaxed">Before we connect, take a few minutes to answer these questions thoughtfully. This helps Natasha understand where you are, what you are navigating, and whether this is the right space for the support you need.</p>
            <p style={{ color: '#999', fontSize: '14px' }} className="mt-3">This is a reflective and selective process designed for women who are serious about clarity, growth, and meaningful transformation.</p>
          </div>
          <div className="mt-6">
            <div style={{ backgroundColor: '#e0ddd8', height: '2px', borderRadius: '1px' }} className="w-full">
              <div style={{ backgroundColor: '#d4af37', height: '2px', width: `${progress}%`, transition: 'width 0.3s ease' }} />
            </div>
            <p style={{ color: '#999', fontSize: '12px', marginTop: '8px' }} className="text-center">Section {currentSection + 1} of {sections.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1a2e40', fontSize: '26px' }} className="font-bold mb-2">{section.title}</h2>
          {section.description && <p style={{ color: '#666', fontSize: '15px' }} className="leading-relaxed">{section.description}</p>}
        </div>

        <div className="space-y-8">
          {section.fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} style={{ color: '#1a2e40', fontFamily: "'Lato', sans-serif", fontSize: '15px' }} className="block font-medium mb-3">
                {field.label}
                {field.required && <span style={{ color: '#d4af37' }}>*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea id={field.name} name={field.name} value={formData[field.name]} onChange={handleInputChange} placeholder="Write thoughtfully..." rows={5}
                  style={{ fontFamily: "'Lato', sans-serif", borderColor: errors[field.name] ? '#e74c3c' : '#d9d5ce', backgroundColor: '#fff' }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#d4af37'}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors[field.name] ? '#e74c3c' : '#d9d5ce'}
                />
              ) : field.type === 'select' ? (
                <select id={field.name} name={field.name} value={formData[field.name]} onChange={handleInputChange}
                  style={{ fontFamily: "'Lato', sans-serif", borderColor: errors[field.name] ? '#e74c3c' : '#d9d5ce', backgroundColor: '#fff' }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#d4af37'}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors[field.name] ? '#e74c3c' : '#d9d5ce'}
                >
                  <option value="">Select an option...</option>
                  {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input id={field.name} name={field.name} type={field.type} value={formData[field.name]} onChange={handleInputChange}
                  placeholder={field.type === 'email' ? 'your@email.com' : 'Type here...'}
                  style={{ fontFamily: "'Lato', sans-serif", borderColor: errors[field.name] ? '#e74c3c' : '#d9d5ce', backgroundColor: '#fff' }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#d4af37'}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors[field.name] ? '#e74c3c' : '#d9d5ce'}
                />
              )}

              {errors[field.name] && (
                <div className="flex items-center mt-2" style={{ color: '#e74c3c' }}>
                  <AlertCircle size={16} className="mr-2" />
                  <span style={{ fontSize: '13px' }}>{errors[field.name]}</span>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center pt-8 mt-12 border-t" style={{ borderColor: '#e0ddd8' }}>
            {currentSection > 0 ? (
              <button onClick={handleBack} className="flex items-center px-6 py-3 rounded-lg transition" style={{ color: '#1a2e40', fontSize: '14px', fontWeight: '500' }}>
                <ChevronLeft size={18} className="mr-2" />
                Back
              </button>
            ) : <div />}

            {currentSection === sections.length - 1 ? (
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-3 rounded-lg font-medium transition"
                style={{ backgroundColor: '#d4af37', color: '#fff', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            ) : (
              <button onClick={handleNext} className="flex items-center px-6 py-3 rounded-lg transition font-medium"
                style={{ backgroundColor: '#d4af37', color: '#fff' }}>
                Next
                <ChevronRight size={18} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;