
import React from 'react';
import { Building2, Home, School, Hospital, Landmark, HardHat, Ruler, ShieldCheck, Zap, Droplets, Truck } from 'lucide-react';
import { Service, ProjectCategory } from './types';

// Updated SERVICES array with missing Tamil translation properties
export const SERVICES: Service[] = [
  {
    id: 'res',
    title: 'Residential Buildings',
    titleTa: 'குடியிருப்பு கட்டிடங்கள்',
    description: 'Expertly crafted dream homes and villas with modern architectural flair.',
    descriptionTa: 'நவீன கட்டடக்கலை திறமையுடன் கூடிய கனவு இல்லங்கள் மற்றும் வில்லாக்கள்.',
    icon: 'home',
    details: ['Villas', 'Apartments', 'Individual Homes', 'Renovations'],
    detailsTa: ['வில்லாக்கள்', 'அடுக்குமாடி குடியிருப்புகள்', 'தனி வீடுகள்', 'புதுப்பித்தல் பணிகள்']
  },
  {
    id: 'com',
    title: 'Commercial Projects',
    titleTa: 'வணிகத் திட்டங்கள்',
    description: 'Scalable and functional office spaces, malls, and business centers.',
    descriptionTa: 'அளவிடக்கூடிய மற்றும் செயல்பாட்டு அலுவலக இடங்கள், மால்கள் மற்றும் வணிக மையங்கள்.',
    icon: 'building',
    details: ['Office Hubs', 'Retail Outlets', 'Showrooms', 'Business Complexes'],
    detailsTa: ['அலுவலக மையங்கள்', 'சில்லறை விற்பனை நிலையங்கள்', 'காட்சி அறைகள்', 'வணிக வளாகங்கள்']
  },
  {
    id: 'edu',
    title: 'Educational Institutions',
    titleTa: 'கல்வி நிறுவனங்கள்',
    description: 'Building the future with safe and inspiring learning environments.',
    descriptionTa: 'பாதுகாப்பான மற்றும் ஊக்கமளிக்கும் கற்றல் சூழல்களுடன் எதிர்காலத்தை உருவாக்குதல்.',
    icon: 'school',
    details: ['Schools', 'Colleges', 'Training Centers', 'Auditoriums'],
    detailsTa: ['பள்ளிகள்', 'கல்லூரிகள்', 'பயிற்சி மையங்கள்', 'ஆடிட்டோரியங்கள்']
  },
  {
    id: 'hea',
    title: 'Healthcare Facilities',
    titleTa: 'சுகாதார வசதிகள்',
    description: 'Specialized construction for hospitals and medical research centers.',
    descriptionTa: 'மருத்துவமனைகள் மற்றும் மருத்துவ ஆராய்ச்சி மையங்களுக்கான சிறப்பு கட்டுமானம்.',
    icon: 'hospital',
    details: ['Hospitals', 'Clinics', 'Diagnostic Centers', 'Pharmacies'],
    detailsTa: ['மருத்துவமனைகள்', 'கிளினிக்குகள்', 'கண்டறியும் மையங்கள்', 'மருந்தகங்கள்']
  }
];

export const WHY_CHOOSE_US = [
  { title: '30+ Years Experience', icon: <HardHat className="w-6 h-6" /> },
  { title: 'Skilled Engineering', icon: <Ruler className="w-6 h-6" /> },
  { title: 'Quality Materials', icon: <ShieldCheck className="w-6 h-6" /> },
  { title: 'On-Time Delivery', icon: <Truck className="w-6 h-6" /> }
];

export const GALLERY_IMAGES = [
  { url: 'https://picsum.photos/800/600?random=1', category: 'Residential', title: 'Luxury Villa' },
  { url: 'https://picsum.photos/800/600?random=2', category: 'Commercial', title: 'Tech Park' },
  { url: 'https://picsum.photos/800/600?random=3', category: 'Educational', title: 'New School Block' },
  { url: 'https://picsum.photos/800/600?random=4', category: 'Religious', title: 'Community Hall' },
  { url: 'https://picsum.photos/800/600?random=5', category: 'Residential', title: 'Modern Duplex' },
  { url: 'https://picsum.photos/800/600?random=6', category: 'Healthcare', title: 'Specialty Clinic' },
];
