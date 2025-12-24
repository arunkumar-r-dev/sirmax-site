'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Factory, Settings, Gauge, CheckCircle, MapPin, Phone, Mail, Linkedin } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface HeroItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface IndustryImage {
  src: string;
  label: string;      // short title
  description?: string; // optional longer text
}

interface IndustryData {
  id: 'cement' | 'paper' | 'textile' | 'spares';
  label: string;
  title: string;
  description: string;
 images: IndustryImage[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  technicalSpecs: Array<{
    title: string;
    value: string;
  }>;
}

interface TimelineItem {
  year: number;
  milestone: string;
}

interface ClientData {
  id: string;
  name: string;
  industry: 'cement' | 'paper' | 'textile' | 'general' | 'spares';
  imagePath: string;
}





// --- GLOBAL DATA ---
const CONTACT_EMAIL = 'sirmaxcoimbatore@gmail.com';
const CONTACT_ADDRESS_1 = 'SF.No.7/2 Sathy Road Kovilpalayam Sarkarsamakulam,';
const CONTACT_ADDRESS_2 = 'Coimbatore, Tamil Nadu 641-107, India';
const GMAPS_URL = 'https://maps.app.goo.gl/x1gP63K2bdLcyRQBA';
const CONTACT_PERSONS = [
  { name: 'M.A.Devaraj', phone: '+91 93666 30646' },
  { name: 'K.Sakthivel', phone: '+91 93666 30347' },
];

const HERO_CAROUSEL_DATA: HeroItem[] = [
  { id: 1, image: '/photos/hero_carousal/hero1.jpg', title: 'CNC Cylindrical Roll Grinding', description: 'DIA 1800mm 6000mm Length ' },
  { id: 2, image: '/photos/hero_carousal/hero2.jpg', title: 'CNC Dynamic Balancing', description: 'DIA 1800mm 6500mm Length' },
  { id: 3, image: '/photos/hero_carousal/hero3.jpg', title: 'Vertical Turret Lathe (VTL)', description: 'Swing over bed 1600mm, 1100mm - Day light with 2 axis DRO' },
  { id: 4, image: '/photos/hero_carousal/hero4.jpg', title: 'Horizontal Boring Machine', description: 'DIA 110mm Spindle with 2 axis DRO' },
  { id: 5, image: '/photos/hero_carousal/hero5.jpg', title: 'CNC Plano Miller', description: 'New addition to our factory.' },
  { id: 6, image: '/photos/hero_carousal/hero6.jpg', title: 'Complex Fabrication', description: 'Heavy and structural fabrication with In-house MIG, TIG, Gas Cutting.' },
];

const INDUSTRIES: IndustryData[] = [
  {
    id: 'cement',
    label: 'Cement Machineries',
    title: 'Cement Industry Solutions',
    description: 'Providing high-performance machinery and precision components for the cement manufacturing sector.',
   images: [
            {
              src: '/photos/cement_industry/cement1.jpg',
              label: 'Rotary Kiln Assembly',
              description: 'Kiln shell fabrication and alignment in progress'
            },
            {
              src: '/photos/cement_industry/cement2.jpg',
              label: 'Ball Mill Components',
              description: 'Precision-machined liners and diaphragms'
            },
            {
              src: '/photos/cement_industry/cement3.jpg',
              label: 'Preheater Cyclone',
              description: 'Fabricated cyclone unit before site dispatch'
            },
            {
              src: '/photos/cement_industry/cement4.jpg',
              label: 'VRM Grinding Table',
              description: 'Vertical roller mill grinding table assembly'
            },
            {
              src: '/photos/cement_industry/cement5.jpg',
              label: 'Clinker Cooler',
              description: 'Grate cooler fabrication and fitment'
            }],

    capabilities: [
      {
        title: 'Rotary Kiln Components',
        description: 'Manufacturing and refurbishment of kiln shells, gears, riding rings, and trunnion rollers'
      },
      {
        title: 'Grinding Mill Parts',
        description: 'Precision machining of ball mill liners, diaphragms, and discharge grates'
      },
      {
        title: 'Preheater & Cooler Systems',
        description: 'Fabrication and assembly of cyclone preheaters and grate coolers'
      },
      {
        title: 'Vertical Roller Mill Components',
        description: 'Grinding tables, rollers, and hydraulic systems for VRM applications'
      },
      {
        title: 'Material Handling Systems',
        description: 'Bucket elevators, conveyor systems, and hoppers for raw material and clinker handling'
      }
    ],
    technicalSpecs: [
      { title: 'Max Component Size', value: 'Ø6m × 25m length' },
      { title: 'Weight Capacity', value: 'Up to 120 tons' },
      { title: 'Tolerance', value: '±0.1mm for kiln shells' },
      { title: 'Material Grades', value: 'Mild Steel, SS410, SS304, Hardox' },
      { title: 'Welding Standards', value: 'ASME, EN, IS Standards' },
      { title: 'Testing', value: 'UT, MPI, DPT, Hydro-testing' }
    ]
  },
  {
    id: 'paper',
    label: 'Paper Machineries',
    title: 'Paper Industry Solutions',
    description: 'Supplying and reconditioning large press rolls, dryer cylinders, and other critical parts for the paper production line.',
   images: [
            {
              src: '/photos/paper_industry/paper1.jpg',
              label: 'Press Roll Reconditioning',
              description: 'Grinding and surface finishing of press rolls for uniform sheet formation'
            },
            {
              src: '/photos/paper_industry/paper2.jpg',
              label: 'Dryer Cylinder Fabrication',
              description: 'Steam-heated dryer cylinder with precision machined journals'
            },
            {
              src: '/photos/paper_industry/paper3.jpg',
              label: 'Calender Roll Grinding',
              description: 'High-precision grinding for super and soft nip calender rolls'
            },
            {
              src: '/photos/paper_industry/paper4.jpg',
              label: 'Suction Roll Maintenance',
              description: 'Repair and reconditioning of suction rolls including drilling and sleeving'
            },
            {
              src: '/photos/paper_industry/paper5.jpg',
              label: 'Paper Machine Components',
              description: 'Fabrication of critical paper machine parts and assemblies'
            }
          ],
    capabilities: [
      {
        title: 'Press Roll Reconditioning',
        description: 'Grinding, balancing, and surface finishing of press rolls up to Ø1800mm'
      },
      {
        title: 'Dryer Cylinder Fabrication',
        description: 'Manufacturing of steam-heated dryer cylinders with precision journals'
      },
      {
        title: 'Calender Roll Services',
        description: 'Precision grinding and balancing for super calender and soft nip calender rolls'
      },
      {
        title: 'Suction Roll Maintenance',
        description: 'Repair and reconditioning of suction rolls including drilling and sleeving'
      },
      {
        title: 'Paper Machine Components',
        description: 'Fabrication of headboxes, wire guides, and felt conditioning systems'
      }
    ],
    technicalSpecs: [
      { title: 'Roll Grinding Capacity', value: 'Ø1800mm × 6500mm' },
      { title: 'Surface Finish', value: 'Ra 0.2 - 0.8 µm' },
      { title: 'Balancing Speed', value: 'Up to 1000 RPM' },
      { title: 'Cylinder Pressure Rating', value: 'Up to 12 bar' },
      { title: 'Material Grades', value: 'EN-GJL-250, EN-GJS-400, SS316L' },
      { title: 'Roundness Tolerance', value: '±0.01mm' }
    ]
  },
  {
    id: 'spares',
    label: 'Spares & Equipments',
    title: 'Process Industry Spares',
    description: 'Manufacturing and supplying critical spares and large process equipments tailored to client specifications.',
    images: [
            {
              src: '/photos/spares_equipment/spare1.jpg',
              label: 'Heavy Machined Gear',
              description: 'Large diameter gear manufactured for process industry applications'
            },
            {
              src: '/photos/spares_equipment/spare2.jpg',
              label: 'Custom Fabricated Vessel',
              description: 'Pressure vessel fabricated as per client design and standards'
            },
            {
              src: '/photos/spares_equipment/spare3.jpg',
              label: 'Industrial Shaft Assembly',
              description: 'Precision-machined shaft for heavy-duty rotating equipment'
            },
            {
              src: '/photos/spares_equipment/spare4.jpg',
              label: 'Heat Exchanger Components',
              description: 'Tube sheets and baffles for shell & tube heat exchangers'
            },
            {
              src: '/photos/spares_equipment/spare5.jpg',
              label: 'Structural Fabrication',
              description: 'Heavy structural steel fabrication for industrial installations'
            }
          ],

    capabilities: [
      {
        title: 'Custom Fabrication',
        description: 'Design and fabrication of custom process vessels, tanks, and reactors'
      },
      {
        title: 'Heavy Machining',
        description: 'Precision machining of large gears, shafts, and couplings for industrial applications'
      },
      {
        title: 'Heat Exchanger Components',
        description: 'Manufacturing of tube sheets, baffles, and shells for shell & tube heat exchangers'
      },
      {
        title: 'Valve & Pump Parts',
        description: 'Critical components for valves, pumps, and compressors across industries'
      },
      {
        title: 'Structural Fabrication',
        description: 'Heavy structural steel fabrication for platforms, supports, and frames'
      }
    ],
    technicalSpecs: [
      { title: 'Vessel Diameter', value: 'Up to 4000mm' },
      { title: 'Pressure Rating', value: 'Vacuum to 100 bar' },
      { title: 'Plate Thickness', value: '3mm to 100mm' },
      { title: 'Welding Processes', value: 'SMAW, GTAW, GMAW, SAW' },
      { title: 'NDT Capabilities', value: 'RT, UT, PT, MT' },
      { title: 'Quality Standards', value: 'ISO 9001:2015' }
    ]
  },
];


const CLIENTS_DATA: ClientData[] = [
  { id: 'client_A', name: 'ACC Cements', industry: 'cement', imagePath: '/photos/clients/acccement.png' },
  { id: 'client_B', name: 'Holcim', industry: 'cement', imagePath: '/photos/clients/holcim.png' },
  { id: 'client_C', name: 'ITC Papers', industry: 'paper', imagePath: '/photos/clients/itc.png' },
  { id: 'client_D', name: 'TNPL Papers', industry: 'paper', imagePath: '/photos/clients/tnplpaper.webp' },
  { id: 'client_E', name: 'KPR Mills', industry: 'textile', imagePath: '/photos/clients/kprmills.png' },
  { id: 'client_F', name: 'L&T Valves', industry: 'general', imagePath: '/photos/clients/landtvalves.png' },
  { id: 'client_G', name: 'LNV Technologies', industry: 'general', imagePath: '/photos/clients/lnvtechnology.webp' },
  { id: 'client_H', name: 'West Coast Paper Mills', industry: 'paper', imagePath: '/photos/clients/westcoastmill.png' },
  { id: 'client_I', name: 'JSW Steels', industry: 'spares', imagePath: '/photos/clients/jsw.png' },
  { id: 'client_J', name: 'Suzlon Electricals', industry: 'spares', imagePath: '/photos/clients/suzlon.png' },
  { id: 'client_K', name: 'Gangotri Textiles', industry: 'textile', imagePath: '/photos/clients/gangotri.png' },
  { id: 'client_L', name: 'Ghorahi Cements', industry: 'cement', imagePath: '/photos/clients/ghorahi.png' },
];

const TIMELINE_DATA: TimelineItem[] = [
  { year: 2004, milestone: 'Company Founded & Setup of Rental Facility at Ganapathy, CBE' },
  { year: 2006, milestone: 'Acquired First Heavy Turning Lathe & Expanded Fabrication Bay' },
  { year: 2008, milestone: 'Export Market Entry to UK and Africa' },
  { year: 2010, milestone: 'Upgraded to 13,500 sq.ft. own facility at Kovilpalayam, CBE' },
  { year: 2018, milestone: 'Commissioned VTL and Horizontal Boring Machine for Large Components' },
  { year: 2020, milestone: 'Commissioned CNC Grinding and Dynamic Balancing' },
  { year: 2025, milestone: 'Commissioned CNC Plano Miller' },
];

const CAPABILITIES = [
  {
    icon: Settings,
    title: 'CNC Grinding & Balancing',
    description: 'Advanced CNC cylindrical grinding up to Ø1800mm × 6500mm with dynamic balancing',
    specs: 'Capacity: Ø1800mm × 6500mm'
  },
  {
    icon: Gauge,
    title: 'Vertical Turret Lathe',
    description: 'Heavy-duty VTL for large components with precision 2-axis DRO',
    specs: 'Swing: 1600mm, 1100mm'
  },
  {
    icon: Factory,
    title: 'Horizontal Boring',
    description: 'Large-scale boring operations with Ø110mm spindle capacity',
    specs: 'Spindle: Ø110mm with DRO'
  },
  {
    icon: Settings,
    title: 'CNC Plano Milling',
    description: 'Latest addition for large surface machining and complex geometries',
    specs: 'State-of-the-art facility'
  },
  {
    icon: CheckCircle,
    title: 'Heavy Fabrication',
    description: 'Structural fabrication with in-house MIG, TIG, and gas cutting capabilities',
    specs: 'Full welding bay'
  },
  {
    icon: Gauge,
    title: 'Precision Inspection',
    description: 'Quality assurance with advanced measurement and testing equipment',
    specs: 'ISO standards'
  },
];

// --- HELPER COMPONENTS ---
const FallbackImage = ({ src, alt, className, fallbackText = '' }: { src: string, alt: string, className: string, fallbackText?: string }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-500 text-sm`}>
        {fallbackText || alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};


// --- HEADER COMPONENT ---
const Header = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300      
        bg-white md:${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 md:h-15">

         {/* Logo */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center focus:outline-none"
            aria-label="Go to Home"
          >
            <div className="
              bg-blue-900 text-white
              px-3 py-1.5
              rounded
              font-bold
              md:text-2xl
              tracking-tighter
              shrink-0
              hover:bg-blue-800
              transition-colors
            ">
              SIRMAX
            </div>
          </button>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onTabChange('home')}
              className={`font-medium transition-colors
                ${activeTab === 'home'
                  ? 'text-orange-500'
                  : isScrolled
                    ? 'text-gray-900 hover:text-orange-600'
                    : 'text-black hover:text-orange-400'
                }`}
            >
              Home
            </button>

            {INDUSTRIES.slice(0, 3).map((industry) => (
              <button
                key={industry.id}
                onClick={() => onTabChange(industry.id)}
                className={`font-medium transition-colors
                  ${activeTab === industry.id
                    ? 'text-orange-500'
                    : isScrolled
                      ? 'text-gray-900 hover:text-orange-600'
                      : 'text-black hover:text-orange-400'
                  }`}
              >
                {industry.label}
              </button>
            ))}
          </nav>

         {/* Badges – Desktop only */}
          <div
            className={`
              hidden md:flex items-center space-x-6 pl-6 border-l
              ${isScrolled ? 'border-slate-200' : 'border-white/30'}
            `}
          >
            {/* ISO */}
            <div className="flex flex-col items-center justify-center whitespace-nowrap">
              <FallbackImage
                src="/photos/iso.png"
                alt="ISO Certified"
                className="w-8 h-5 object-contain mb-1"
                fallbackText="ISO"
              />
              <span
                className={`text-[10px] font-bold leading-tight text-slate-600`}            
              >
                ISO CERTIFIED
              </span>
            </div>

            {/* MAKE IN INDIA */}
            <div className="flex flex-col items-center justify-center whitespace-nowrap">
              <FallbackImage
                src="/photos/makeinindia.png"
                alt="Make in India"
                className="w-8 h-5 object-contain mb-1"
                fallbackText="MII"
              />
              <span
                className={`text-[10px] font-bold leading-tight text-slate-600`}            
              >
                MAKE IN INDIA
              </span>
            </div>
          </div>

          {/* Mobile Menu Button - Always dark in mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => {
                onTabChange('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left font-medium text-gray-900 hover:text-orange-600 py-2"
            >
              Home
            </button>

            <div className="space-y-2">
              <div className="font-medium text-gray-500 text-sm uppercase tracking-wide">
                Industries
              </div>
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => {
                    onTabChange(industry.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left pl-4 py-2 text-gray-700 hover:text-orange-600"
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


// --- HERO DESKTOP ---
const HeroDesktop = () => {
  return (
    <section className="relative hidden md:flex h-screen min-h-[600px] items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <FallbackImage
          src="/photos/Sirmax factory.avif"
          alt="Sirmax Factory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl text-white">

          <div className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-400 font-bold mb-6">
            Since 2004
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold mb-6">
            Trusted Supplier
            <span className="block text-orange-400">
              For Cement and Paper Industries
            </span>
          </h1>

          <p className="text-2xl leading-relaxed text-white/90">
            Located in Kovilpalayam, Coimbatore.  <br/>  Our facility combines heavy machining and fabrication under one roof.
          </p>

        </div>
      </div>

    </section>
  );
};

const HeroMobile = () => (
  <section className="md:hidden flex flex-col bg-white">
    {/* Full Image at Top */}
    <div className="w-full">
      <FallbackImage
        src="/photos/Sirmax factory.avif"
        alt="Precision Engineering"
        className="w-full h-auto object-contain"
      />
    </div>

    {/* Content Area Below Image */}
    <div className="px-6 py-10">
      <div className="inline-block px-4 py-1 bg-orange-600/20 rounded-full text-orange-400 font-bold text-sm mb-4">
        Since 2004
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
        Trusted Supplier
        <span className="block text-orange-400">For Cement and Paper Industries</span>
      </h1>
      
      <p className="text-lg text-slate-800 mb-6 leading-relaxed">
        Located in Kovilpalayam, Coimbatore. <br/> Our facility combines heavy machining and fabrication under one roof.
      </p>

    </div>
  </section>
);

// --- STATS SECTION ---
const StatsSection = () => {
  const stats = [
    { number: '20+', label: 'Years of Excellence' },
    { number: '13,500', label: 'Sq. Ft Facility' },
    { number: '100+', label: 'Major Clients' },
    { number: '5+', label: 'Export Countries' },
  ];

  return (
    <section className="
      py-4
      bg-gradient-to-r
      from-slate-900
      via-blue-900
      to-slate-800
      relative
      z-10
    ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">

          {stats.map((stat, index) => (
            <div key={index} className="text-center leading-tight">
              <div className="text-3xl md:text-4xl font-semibold text-orange-400">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* subtle overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
    </section>
  );
};


// --- ABOUT SECTION ---
const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Leading Precision Engineering Partner
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sirmax Engineering delivers world-class machining and fabrication solutions to global manufacturing leaders. Our state-of-the-art 13,500 sq.ft facility in Coimbatore combines advanced CNC technology with expert craftsmanship to serve cement, paper, and industrial sectors across continents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
           {/*  <div className="w-12 h-12 bg-orange-100/20 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div> */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
            <p className="text-gray-600">
              Precision-engineered components meeting international standards for critical industrial applications.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
           {/*  <div className="w-12 h-12 bg-orange-100/20 rounded-xl flex items-center justify-center mb-4">
              <Factory className="w-6 h-6 text-orange-600" />
            </div> */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Facility</h3>
            <p className="text-gray-600">
              Latest CNC machinery including grinding, VTL, boring, and plano milling equipment.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
           {/*  <div className="w-12 h-12 bg-orange-100/20 rounded-xl flex items-center justify-center mb-4">
              <Gauge className="w-6 h-6 text-orange-600" />
            </div> */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
            <p className="text-gray-600">
              Serving clients across India, UK, Africa with timely delivery and export expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CAPABILITIES SECTION ---
const CapabilitiesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Core Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive machining and fabrication services powered by cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((capability, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
             {/*  <div className="w-14 h-14  rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <capability.icon className="w-7 h-7 text-orange-500" />
              </div> */}
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {capability.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {capability.description}
              </p>
              
              <div className="text-sm font-medium text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
                {capability.specs}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- INDUSTRIES SECTION ---
const IndustriesSection = ({ onIndustryClick }: { onIndustryClick: (id: string) => void }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            End-to-End solutions Including Casting, Machining & Fabrication
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => onIndustryClick(industry.id)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <FallbackImage
                  src={industry.images[0].src}
                  alt={industry.images[0].label}                
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/25 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {industry.title}
                </h3>
               {/*  <p className="text-gray-200 mb-4 leading-relaxed">
                  {industry.description}
                </p> */}
                <div className="flex items-center text-orange-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- EQUIPMENT SHOWCASE SECTION ---
const EquipmentSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CAROUSEL_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 bg-gradient-to-br from-blue-500/45 to-blue-700/15 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Capabilities
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            State-of-the-art machineries enabling precision at scale
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Display */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <FallbackImage
                src={HERO_CAROUSEL_DATA[activeIndex].image}
                alt={HERO_CAROUSEL_DATA[activeIndex].title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {HERO_CAROUSEL_DATA.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden transition-all ${
                    activeIndex === index ? 'ring-4 ring-orange-500' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <FallbackImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Details */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">

              <div className="space-y-4">
                {HERO_CAROUSEL_DATA.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeIndex === index
                        ? 'bg-orange-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{item.title}</div>
                    {activeIndex === index && (
                      <div className="text-sm mt-1 opacity-90">{item.description}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};


// --- CLIENTS SECTION ---
const ClientsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cement, Textile, Paper Machinery & Spares
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CLIENTS_DATA.map((client) => {
            const { ref, inView } = useInView();

            return (
              <div
                key={client.id}
                ref={ref}
                className="
                  bg-white p-4 rounded-xl shadow-sm
                  hover:shadow-md transition-all duration-300
                  flex items-center justify-center
                  group border border-gray-100
                "
              >
                <FallbackImage
                  src={client.imagePath}
                  alt={client.name}
                  className={`
                    max-h-10 max-w-[120px]
                    object-contain
                    transition-all duration-500 ease-out
                    grayscale
                    group-hover:grayscale-0
                    ${inView ? 'grayscale-0 scale-105' : ''}
                  `}
                  fallbackText={client.name}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


// --- TIMELINE SECTION (Ultra Compact) ---
const TimelineSection = () => {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        
        {/* Minimal Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Our Journey of Excellence
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-300 via-orange-100 to-orange-500  mx-auto rounded-full"></div>
        </div>

        {/* Compact Timeline with Year Tabs */}
        <div className="relative">
          {/* Year Navigation Tabs */}
         {/*  <div className="flex flex-wrap justify-center gap-2 mb-6">
            {TIMELINE_DATA.map((item, index) => (
              <button
                key={index}
                className="px-3 py-1.5 text-sm font-medium rounded-full 
                         bg-gradient-to-r from-orange-50 to-blue-50 
                         hover:from-orange-100 hover:to-blue-100
                         text-gray-700 hover:text-gray-900
                         border border-gray-200 hover:border-gray-300
                         transition-all"
              >
                {item.year}
              </button>
            ))}
          </div> */}

          {/* Timeline Items - Stacked Vertically */}
          <div className="space-y-3">
            {TIMELINE_DATA.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group hover:bg-blue-50/30 p-2 rounded-lg transition-colors"
              >
                {/* Year Badge */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-lg font-light text-blue-700 group-hover:text-orange-600 transition-colors">
                    {item.year}
                  </div>
                </div>
                
                {/* Milestone */}
                <div className="flex-1">
                  <div className="flex items-center">
                 
                    <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {item.milestone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-orange-100 to-orange-500 
                            animate-[pulse_3s_ease-in-out_infinite]"></div>
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent 
                            animate-[shimmer_2s_infinite]"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>2004</span>
              <span>Present</span>
            </div>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg">
            <div className="text-lg font-bold text-blue-700">7</div>
            <div className="text-xs text-gray-600">Key Milestones</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-orange-50 to-white rounded-lg">
            <div className="text-lg font-bold text-orange-600">21</div>
            <div className="text-xs text-gray-600">Years Strong</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg">
            <div className="text-lg font-bold text-gray-800">∞</div>
            <div className="text-xs text-gray-600">Future Ahead</div>
          </div>
        </div>

      </div>
    </section>
  );
};


// Contact Info Component
const ContactInfo = () => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [showNumbers, setShowNumbers] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setCaptchaValue(num.toString());
    setCaptchaInput('');
    setError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | undefined;
    let errorTimer: NodeJS.Timeout | undefined;
    
    if (showNumbers) {
      hideTimer = setTimeout(() => {
        setShowNumbers(false);
        setShowCaptcha(false);
        generateCaptcha();
        setError('Phone numbers hidden for security. Please verify again.');
      }, 60000);
    }
    
    // Auto-hide error message after 10 seconds, then hide captcha
    if (error) {
      errorTimer = setTimeout(() => {
        setError('');
        setShowCaptcha(false);
      }, 10000);
    }
    
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (errorTimer) clearTimeout(errorTimer);
    };
  }, [showNumbers, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput === captchaValue) {
      setShowNumbers(true);
      setShowCaptcha(false);
      setError('');
    } else {
      setError('Incorrect verification code. Please try again.');
      generateCaptcha();
    }
  };

  const toggleCaptcha = () => {
    if (!showNumbers) {
      setShowCaptcha(!showCaptcha);
      if (!showCaptcha) {
        generateCaptcha();
      }
    }
  };

  return (
    <ul className="space-y-4">
      <li className="flex items-start">
        <MapPin className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
        <div className="flex flex-col">
          <span>
            {CONTACT_ADDRESS_1}<br />
            {CONTACT_ADDRESS_2}
          </span>
          <div className='flex gap-4 mt-2'>
            <a 
              href={GMAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
            >
              View Map
            </a>
          </div>
        </div>
      </li>
      
      <li className="flex items-center">
            <Mail className="w-5 h-5 text-orange-500 mr-4 shrink-0" />
            <span className="cursor-default hover:text-orange-400 transition-colors break-all">
              {CONTACT_EMAIL}
            </span>
      </li>

      <li className="pt-2">
        {/* Header with Phone Icon Toggle */}
        <button 
          onClick={toggleCaptcha}
          className="flex items-center space-x-2 mb-2 group"
          disabled={showNumbers}
        >
          <Phone className={`w-5 h-5 transition-colors ${showNumbers ? 'text-green-400' : 'text-orange-500 group-hover:text-orange-400'}`} />
          <h2 className={`text-sm transition-colors ${showNumbers ? 'text-white' : 'text-white group-hover:text-orange-400'}`}>
            Call Our Team
          </h2>
          {!showNumbers && !showCaptcha && (
            <span className="text-xs text-blue-300 ml-2">Verify to continue</span>
          )}
        </button>

        {showNumbers ? (
          <div className="space-y-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700">
            {CONTACT_PERSONS.map((person) => (
              <div 
                key={person.phone}
                className="flex items-center justify-between px-2 py-2 rounded-md text-slate-200 flex-wrap gap-2"
              >
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span className="font-medium">{person.name}</span>
                </div>                
                  {person.phone}               
              </div>
            ))}
          </div>
        ) : showCaptcha ? (
          <form 
            onSubmit={handleSubmit} 
            className="bg-slate-800/40 p-3 rounded-lg border border-slate-700 space-y-2"
          >
            <p className="text-xs text-slate-400">Enter the code to view phone numbers</p>

            <div className="flex items-center flex-wrap gap-2 sm:gap-3 w-full">
              <div className="bg-yellow-300 text-slate-900 px-3 py-1 
                              rounded-md font-bold text-base tracking-widest select-none">
                {captchaValue}
              </div>

              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Code"
                maxLength={4}
                className="p-1.5 rounded-md bg-white text-slate-900 
                          w-16 sm:w-20 text-center font-semibold text-sm 
                          outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white 
                          font-semibold py-1.5 px-4 rounded-md text-sm transition"
              >
                Verify
              </button>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}
          </form>
        ) : (
          // Show error message even when captcha is hidden
          error && (
            <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )
        )}
      </li>
    </ul>
  );
};



// --- FOOTER ---
const Footer = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-2 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
             {/*  <Factory className="w-8 h-8 text-orange-500" /> */}
              <span className="text-xl font-bold text-white">SIRMAX ENGINEERING INDIA PVT.LTD.</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Leading Cement,Textile, Paper Machineries & Spares Supplier in Coimbatore since 2004.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/sirmax-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onTabChange('home')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </button>
              </li>
              {INDUSTRIES.map((industry) => (
                <li key={industry.id}>
                  <button
                    onClick={() => onTabChange(industry.id)}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {industry.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">          
            <div className="sm:col-span-2 md:col-span-1">             
              <ContactInfo />
            </div>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Sirmax Engineering. All rights reserved.
          </p>         
        </div>
      </div>
    </footer>
  );
};

// --- INDUSTRY DETAIL PAGE ---
const IndustryPage = ({ data, onBackToHome }: { data: IndustryData, onBackToHome: () => void }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <FallbackImage
            src={data.images[0].src}
            alt={data.images[0].label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-900/25 to-blue-900/15"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Capabilities */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Capabilities
          </h2>

          <ul className="space-y-4">
            {data.capabilities.map((capability, index) => (
              <li
                key={index}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {capability.title}
                  </div>
                  <div className="text-gray-600">
                    {capability.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Technical Specifications */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">
            Technical Specifications
          </h2>

          <div className="space-y-5">
            {data.technicalSpecs.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-none"
              >
                <span className="text-orange-400 font-semibold">
                  {spec.title}
                </span>
                <span className="text-gray-200 text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
       </div>

          {/* Image Gallery */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Gallery</h2>
            
          {/* Main Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg aspect-video">
              <FallbackImage
                src={data.images[selectedImage].src}
                alt={data.images[selectedImage].label}
                className="w-full h-full object-cover"
              />

              {/* Overlay – always visible */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/70 via-black/30 to-transparent
                flex items-end
              ">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {data.images[selectedImage].label}
                  </h3>

                  {data.images[selectedImage].description && (
                    <p className="text-sm text-gray-200 mt-1 max-w-2xl">
                      {data.images[selectedImage].description}
                    </p>
                  )}
                </div>
              </div>
            </div>



            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-4">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-4 ring-orange-500 scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <FallbackImage
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover"
                />
                </button>
              ))}
            </div>
          </div>

            

          {/* Related Services */}
          {/* <div className="mt-16 bg-gradient-to-r from-orange-50 to-blue-50 p-8 rounded-2xl border border-orange-100">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Custom Solutions?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Our engineering team can design and manufacture components tailored to your specific requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={onBackToHome}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center"
                >
                  Discuss Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
               
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  const currentIndustry = INDUSTRIES.find(ind => ind.id === activeTab);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      {activeTab === 'home' ? (
        <>
         <>
        <HeroDesktop />
        <HeroMobile />
      </>

          <StatsSection />
         {/*  <AboutSection /> */}
            <ClientsSection />
         {/*  <CapabilitiesSection /> */}
          <IndustriesSection onIndustryClick={handleTabChange} />
          <EquipmentSection />
        
          <TimelineSection />
        
         
        </>
      ) : currentIndustry ? (
        <IndustryPage data={currentIndustry} onBackToHome={() => handleTabChange('home')} />
      ) : null}

      {/* Footer */}
      <Footer onTabChange={handleTabChange} />
    </div>
  );
}
