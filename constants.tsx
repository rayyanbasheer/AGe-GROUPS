import React from 'react';
import { HardHat, Ruler, ShieldCheck, Truck } from 'lucide-react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'res',
    title: 'Residential Architecture & Villas',
    titleTa: 'குடியிருப்பு கட்டிடங்கள் மற்றும் வில்லாக்கள்',
    description: 'Bespoke individual homes, luxury villas, and multi-family residences engineered for generational durability and natural ventilation.',
    descriptionTa: 'நவீன கட்டடக்கலை திறமையுடன் கூடிய கனவு இல்லங்கள் மற்றும் வில்லாக்கள்.',
    icon: 'home',
    details: ['Custom Villas', 'Residential Apartments', 'Individual Homes', 'Structural Renovations'],
    detailsTa: ['வில்லாக்கள்', 'அடுக்குமாடி குடியிருப்புகள்', 'தனி வீடுகள்', 'புதுப்பித்தல் பணிகள்']
  },
  {
    id: 'com',
    title: 'Commercial & Retail Complexes',
    titleTa: 'வணிகத் திட்டங்கள்',
    description: 'High-efficiency office hubs, retail showrooms, and mixed-use commercial structures designed for maximum floor-plate utility.',
    descriptionTa: 'அளவிடக்கூடிய மற்றும் செயல்பாட்டு அலுவலக இடங்கள், மால்கள் மற்றும் வணிக மையங்கள்.',
    icon: 'building',
    details: ['Corporate Office Hubs', 'Retail Showrooms', 'Shopping Complexes', 'Industrial Warehouses'],
    detailsTa: ['அலுவலக மையங்கள்', 'சில்லறை விற்பனை நிலையங்கள்', 'காட்சி அறைகள்', 'வணிக வளாகங்கள்']
  },
  {
    id: 'edu',
    title: 'Educational Institutions',
    titleTa: 'கல்வி நிறுவனங்கள்',
    description: 'Future-ready school and college campuses featuring acoustic classrooms, wide corridors, and seismic-compliant structural frames.',
    descriptionTa: 'பாதுகாப்பான மற்றும் ஊக்கமளிக்கும் கற்றல் சூழல்களுடன் எதிர்காலத்தை உருவாக்குதல்.',
    icon: 'school',
    details: ['K-12 School Blocks', 'College Campuses', 'Research Laboratories', 'Academic Auditoriums'],
    detailsTa: ['பள்ளிகள்', 'கல்லூரிகள்', 'பயிற்சி மையங்கள்', 'ஆடிட்டோரியங்கள்']
  },
  {
    id: 'hea',
    title: 'Healthcare & Clinical Infrastructure',
    titleTa: 'சுகாதார வசதிகள்',
    description: 'Specialized construction for multi-specialty hospitals, diagnostic centers, and sterile clinical environments.',
    descriptionTa: 'மருத்துவமனைகள் மற்றும் மருத்துவ ஆராய்ச்சி மையங்களுக்கான சிறப்பு கட்டுமானம்.',
    icon: 'hospital',
    details: ['Multi-Specialty Hospitals', 'Outpatient Clinics', 'Diagnostic Imaging Centers', 'Medical Pharmacies'],
    detailsTa: ['மருத்துவமனைகள்', 'கிளினிக்குகள்', 'கண்டறியும் மையங்கள்', 'மருந்தகங்கள்']
  }
];

export const WHY_CHOOSE_US = [
  { title: '30+ Years Experience', icon: <HardHat className="w-5 h-5" /> },
  { title: 'Licensed Structural Engineering', icon: <Ruler className="w-5 h-5" /> },
  { title: 'IS-Grade Certified Materials', icon: <ShieldCheck className="w-5 h-5" /> },
  { title: '98% On-Schedule Handover', icon: <Truck className="w-5 h-5" /> }
];

export const DEFAULT_PROJECTS = [
  {
    id: 'mr-kareem-residence',
    title: 'Mr. Kareem Residence',
    category: 'Residential',
    status: 'Residence · G + 1 · ~ 2,200 sq.ft',
    location: 'Kumbakonam, Tamil Nadu',
    description: 'A contemporary home that blends privacy, ventilation, and modern aesthetics through a perforated façade and warm material accents.',
    imageUrl: '/assets/aistudio/image_6414ac5a.png',
    images: [
      { url: '/assets/aistudio/image_6414ac5a.png', type: 'exterior' }
    ]
  },
  {
    id: 'mr-thoufiq-residence',
    title: 'Mr. Thoufiq Residence',
    category: 'Residential',
    status: 'Residence · G + 1 · ~ 1,800 sq.ft',
    location: 'Govindakudi',
    description: 'A modern residence with a clean, minimal façade, elegant textures, and a contemporary architectural design.',
    imageUrl: '/assets/aistudio/image_360e37c9.png',
    images: [
      { url: '/assets/aistudio/image_360e37c9.png', type: 'exterior' }
    ]
  },
  {
    id: 'kumbakonam-residence-project',
    title: 'Residence Project',
    category: 'Residential',
    status: 'Residence · G + 1 · ~ 2,400 sq.ft',
    location: 'Kumbakonam, Tamil Nadu',
    description: 'A modern residential home with a refined façade, contemporary finishes, and thoughtfully designed living spaces.',
    imageUrl: '/assets/aistudio/image_2ec93bdb.png',
    images: [
      { url: '/assets/aistudio/image_2ec93bdb.png', type: 'exterior' }
    ]
  },
  {
    id: 'contemporary-elevation-residence',
    title: 'Contemporary G+1 Residence',
    category: 'Residential',
    status: 'Completed · G + 1',
    location: 'Kumbakonam, Tamil Nadu',
    description: 'A striking two-story contemporary residence featuring geometric stone cladding, terracotta jaali ventilation screens, and warm recessed architectural lighting.',
    imageUrl: '/assets/aistudio/image_e27d6743.png',
    images: [
      { url: '/assets/aistudio/image_e27d6743.png', type: 'exterior' }
    ]
  }
];

export const GALLERY_IMAGES = DEFAULT_PROJECTS.map((p) => ({
  url: p.imageUrl,
  category: p.category,
  title: p.title
}));
