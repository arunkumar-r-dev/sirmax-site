'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, MapPin, Phone, Mail, ChevronDown, Settings, CheckCircle, Factory, Linkedin, Gauge } from 'lucide-react';

// --- TYPE DEFINITIONS ---

interface HeroItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface IndustryData {
  id: 'cement' | 'paper' | 'textile' | 'spares';
  label: string;
  title: string;
  description: string;
  images: string[];

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

interface IndustryPageProps {
  data: IndustryData;
  scrollToTop: () => void;
}

interface HomePageProps {
  changeTab: (tabId: string) => void;
  scrollToContact: () => void;
}

interface FallbackImageProps {
  src: string;
  alt: string;
  className: string;
  fallbackText?: string;
  isThumb?: boolean;
}

interface FooterProps { 
  changeTab: (tabId: string) => void;
  scrollToTop: () => void;
}

// --- GLOBAL DATA STRUCTURES ---

const CONTACT_EMAIL = 'sirmaxcoimbatore@gmail.com';
const CONTACT_ADDRESS_1 = 'SF.No.7/2 Sathy Road Kovilpalayam Sarkarsamakulam,';
const CONTACT_ADDRESS_2 = 'Coimbatore, Tamil Nadu 641-107, IN';
const GMAPS_URL = 'https://maps.app.goo.gl/x1gP63K2bdLcyRQBA';

const CONTACT_PERSONS = [
  { name: 'M.A.Devaraj', phone: '+91 93666 30646' },
  { name: 'K.Sakthivel', phone: '+91 93666 30347' },
];

const HERO_CAROUSEL_DATA: HeroItem[] = [
  { id: 1, image: '/photos/hero_carousal/hero1.jpg', title: 'Precision Machining', description: 'CNC cylindrical and Roll grinding - DIZ 1800mm 6000 Length ' },
  { id: 2, image: '/photos/hero_carousal/hero2.jpg', title: 'CNC Dynamic Balancing', description: 'DIZ 1800mm 6500 Length' },
  { id: 3, image: '/photos/hero_carousal/hero3.jpg', title: 'Vertical Turret Lathe(VTL)', description: 'Swing over bed 1600mm, 1100mm - Day light with 2 axis DRO' },
  { id: 4, image: '/photos/hero_carousal/hero4.jpg', title: 'Horizontal Boring Machine', description: 'DIA 110mm Spindle with 2 axis DRO' }, 
  { id: 5, image: '/photos/hero_carousal/hero5.jpg', title: 'CNC Plano Miller', description: 'New addition to our factory.' }, 
  { id: 6, image: '/photos/hero_carousal/hero6.jpg', title: 'Complex Fabrication', description: 'Heavy  and structural fabrication with In-house MIG, TIG, Gas Cutting.' },
 ];

const INDUSTRIES: IndustryData[] = [
  { 
    id: 'cement', 
    label: 'Cement Machineries', 
    title: 'Cement Industry Solutions', 
    description: 'Providing high-performance machinery and precision components for the cement manufacturing sector.',
    images: [
      '/photos/cement_industry/cement1.jpg', '/photos/cement_industry/cement2.jpg', '/photos/cement_industry/cement3.jpg', 
      '/photos/cement_industry/cement4.jpg', '/photos/cement_industry/cement5.jpg'
    ],
 
  },
  { 
    id: 'paper', 
    label: 'Paper Machineries', 
    title: 'Paper Industry Solutions', 
    description: 'Supplying and reconditioning large press rolls, dryer cylinders, and other critical parts for the paper production line.',
    images: [
      '/photos/paper_industry/paper1.jpg', '/photos/paper_industry/paper2.jpg', '/photos/paper_industry/paper3.jpg', 
      '/photos/paper_industry/paper4.jpg', '/photos/paper_industry/paper5.jpg'
    ],
  
  },
  /* { 
    id: 'textile', 
    label: 'Textile Machineries', 
    title: 'Textile Industry Solutions', 
    description: 'Precision engineering and components for high-speed textile machinery and processing equipment.',
    images: [
      '/photos/textile_industry/image1.avif', '/photos/textile_industry/image2.avif', '/photos/textile_industry/image3.avif',
      '/photos/textile_industry/image4.avif', '/photos/textile_industry/image5.avif'
    ],
   
  }, */
  { 
    id: 'spares', 
    label: 'Spares & Equipments', 
    title: 'Spare Process & Equipments', 
    description: 'Manufacturing and supplying critical spares and large process equipments tailored to client specifications.',
    images: [
      '/photos/spares_equipment/spare1.jpg', '/photos/spares_equipment/spare2.jpg', '/photos/spares_equipment/spare3.jpg',
      '/photos/spares_equipment/spare4.jpg', '/photos/spares_equipment/spare5.jpg'
    ],
   
  },
];

const NAVIGATION = [
  { id: 'home', label: 'Home' },
  ...INDUSTRIES.map(i => ({ id: i.id, label: i.label })),
];

const CLIENTS_DATA: ClientData[] = [
  { id: 'client_A', name: 'ACC Cements', industry: 'cement', imagePath: '/photos/clients/acccement.png'  },
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


// --- HELPER COMPONENTS ---

const FallbackImage = ({ src, alt, className, fallbackText, isThumb = false }: FallbackImageProps) => {
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) {
    return (
      <div className={`${className} bg-slate-200 flex flex-col items-center justify-center text-center p-4 text-slate-400`}>
        {isThumb ? (
          <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs font-semibold">{fallbackText || `#`}</div>
        ) : (
          <>
            <Factory className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-wider">{fallbackText || alt}</span>
          </>
        )}
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
    />
  );
};


// --- HOOKS ---

const useCarousel = (items: HeroItem[] | string[]) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataArray = items as (HeroItem | string)[];
  const length = dataArray.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  let currentItem: { image: string, title: string, description: string };

  if (length > 0) {
    const item = dataArray[activeIndex];
    
    if (typeof item === 'object' && 'id' in item) {
      const heroItem = item as HeroItem;
      currentItem = { image: heroItem.image, title: heroItem.title, description: heroItem.description };
    } else {
      currentItem = { image: item as string, title: '', description: '' };
    }
  } else {
    currentItem = { image: '', title: 'No Data', description: 'No data available for this carousel.' };
  }

  const nextItem = useCallback(() => {
    setActiveIndex(prevIndex => (prevIndex + 1) % length);
  }, [length]);

  const selectItem = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);


  return { activeIndex, currentItem, selectItem, nextItem, length };
}


// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderContent = () => {
    const industryData = INDUSTRIES.find(i => i.id === activeTab);

    if (industryData) {
      return <IndustryPage data={industryData} scrollToTop={scrollToTop} />;
    }

    return <HomePage changeTab={setActiveTab} scrollToContact={scrollToContact} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Fixed Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Area */}
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => {setActiveTab('home'); scrollToTop();}}>
              <div className="bg-blue-900 text-white p-2 rounded font-bold text-2xl tracking-tighter">
                SIRMAX
              </div>
            <div className="block">
              <p className="text-[10px] xs:text-xs sm:text-sm text-blue-600 font-bold tracking-wide uppercase">
                20 Years of Excellence
              </p>
            </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                {NAVIGATION.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {setActiveTab(item.id); scrollToTop();}}
                    className={`text-sm font-semibold uppercase tracking-wider transition-colors py-2 border-b-2 ${
                      activeTab === item.id 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              
              {/* Badges */}
              <div className="flex items-center space-x-6 pl-6 border-l border-slate-200">

                {/* ISO */}
                <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <FallbackImage
                    src="/photos/iso.png"
                    alt="ISO Certified"
                    className="w-8 h-5 object-contain mb-1 mx-auto"
                    fallbackText="ISO"
                  />
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">
                    ISO CERTIFIED
                  </span>
                </div>

                {/* MAKE IN INDIA */}
                <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <FallbackImage
                    src="/photos/makeinindia.png"
                    alt="Make In India"
                    className="w-8 h-5 object-contain mb-1 mx-auto"
                    fallbackText="MII"
                  />
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">
                    MAKE IN INDIA
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {NAVIGATION.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                    scrollToTop();
                  }}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

     

      <main>
        {renderContent()}
      </main>

      {/* Shared Footer (Contact Section) */}
      <Footer changeTab={setActiveTab} scrollToTop={scrollToTop} />
    </div>
  );
};


// --- HOME PAGE & RELATED SECTIONS ---


 const HomePage = ({ changeTab, scrollToContact }: HomePageProps) => {
  const { activeIndex, currentItem, selectItem, nextItem } = useCarousel(HERO_CAROUSEL_DATA);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to initialize/reset the interval
  const startAutoAdvance = useCallback(() => {
    // 1. Clear the existing timer if one is running
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    
    // 2. Start the new timer and store its ID in the ref
    timerRef.current = setInterval(() => {
      nextItem(); 
    }, 9000); // 9 seconds auto-advance
  }, [nextItem]);

  // Initial timer setup and cleanup on mount/unmount
  useEffect(() => {
    startAutoAdvance();

    // Cleanup function
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [startAutoAdvance]);


  // Handler for manual selection
 const handleManualSelect = (index: number) => {
  selectItem(index);

  if (timerRef.current !== null) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  // Restart auto-advance AFTER full delay
  timerRef.current = setTimeout(() => {
    startAutoAdvance();
  }, 9000);
};


  // Scroll function for the down arrow (unchanged)
  const handleScrollDown = () => {
    const sectionHeight = document.getElementById('hero-section')?.clientHeight || window.innerHeight;
    window.scrollBy({ top: sectionHeight, behavior: 'smooth' });
  };

return (
    <div className="flex flex-col">
      {/* Hero Section: 
        FIXED HEIGHT CALCULATION: min-h-[calc(100vh-96px)] subtracts 96px 
        (the height of your largest header placeholder h-24) from the viewport height.
      */}
      <section 
        className="relative text-white overflow-hidden flex items-center w-full" 
        id="hero-section"
        style={{ minHeight: 'calc(100vh - 96px)' }} // Explicitly subtract max header height (h-24 = 96px)
      >

        {/* 1. Full Background Image */}
        <div className="absolute inset-0 z-0">
          <FallbackImage
            key={currentItem.image}
            src={currentItem.image}
            alt={currentItem.title}
            // Ensure the image covers the dynamic height
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-in-out" 
            fallbackText="Industrial Background"
          />
        </div>

        {/* 2. Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>

        {/* Soft Glow Corners (Visual Interest) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full z-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full z-20"></div>

        {/* Content Container (Text is positioned right) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-12 items-center py-16 lg:py-0">

            {/* Empty Left Column (Spacer) */}
            <div className="hidden lg:block lg:col-span-6">
              {/* Intentional spacer */}
            </div>

            {/* Right Column: Text Description */}
            <div className="col-span-12 lg:col-span-6 max-w-lg lg:max-w-none ml-auto">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-xl">
                <span className="text-blue-400">{currentItem.title}</span>
              </h2>

              <p className="text-lg md:text-xl text-slate-200/90 mb-8 leading-relaxed drop-shadow">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Carousel Dot Navigation */}
        <div className="absolute bottom-4 left-0 right-0 z-40 flex justify-center gap-2 w-full">
          {HERO_CAROUSEL_DATA.map((item, index) => (
           <button
          key={item.id}
          onClick={() => handleManualSelect(index)}
          className={`h-2.5 rounded-full transition-all ${
            activeIndex === index
              ? "bg-blue-600 w-8"
              : "bg-white/40 hover:bg-white w-2.5"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />

          ))}
        </div>

        {/* Floating Scroll Down Arrow */}
        <button 
          onClick={handleScrollDown}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40 p-3 rounded-full 
                     bg-gray-600/30 backdrop-blur-sm hover:bg-blue-600 transition-all 
                     shadow-xl animate-bounce focus:outline-none"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>

      </section>
  

      {/* Section 2: Facility & Info */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Block */}
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-2xl transform -rotate-2"></div>
              <FallbackImage 
                src="/photos/Sirmax factory.avif" 
                alt="Sirmax Factory Floor"
                className="relative rounded-lg shadow-xl w-full h-[400px] object-cover"
                fallbackText="Sirmax Factory Facility - Kovilapalyam"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600 hidden md:block">
                <p className="text-4xl font-bold text-slate-900">13,500</p>
                <p className="text-sm text-slate-500 uppercase font-semibold">Sq. Ft. Build Up Area</p>
              </div>
            </div>
            
            {/* Text Block */}
            <div className="order-1 md:order-2">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Infrastructure</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">World-Class Manufacturing Facility</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Located in Kovilapalyam, Coimbatore, our state-of-the-art facility combines advanced machining, fabrication, and inspection areas under one roof.
              </p>
              
              <div className="space-y-4">
                {[
                  'Heavy machining capabilities',
                  'Dedicated fabrication zones',
                  'In-house quality control',
                  'Specialized packing and despatch areas for exports'
                 
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 2.5: Timeline - New Simplified Design */}
      <TimelineSection />

      {/* Section 3: Machines & Process (Core Capabilities) */}
      <section id="expertise" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Capabilities & Machinery</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our machine shop is equipped with cutting-edge technology to handle large-scale and precision engineering tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14  rounded-lg flex items-center justify-center mb-6">
            <Settings className="w-8 h-8 stroke-blue-600" />

              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Heavy Machining</h3>
              
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Vertical Turning Lathe (VTL)</li>
                <li>• Horizontal Boring</li>
                <li>• Turning Centers</li>
              </ul>
            </div>

            {/* Capability 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6">
               <Gauge className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precision Grinding</h3>
             
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• CNC Cylindrical Grinding</li>
                <li>• Dynamic Balancing</li>
                <li>• Surface Finishing</li>
              </ul>
            </div>

            {/* Capability 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Factory className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fabrication & Assembly</h3>
              
              <ul className="text-sm text-slate-500 space-y-2">
                <li>• Robotic Mig, Tig Welding</li>
                <li>• Gas Cutting</li>
                <li>• Specialised Complex Fabrication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Clients */}
      <AutoScrollClientsSection industryFilter="general" />
    </div>
  );
};

/* --- NEW SIMPLIFIED TIMELINE SECTION --- */
const TimelineSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-100 overflow-hidden"> 
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Journey of Growth</h2>
          <p className="text-base md:text-lg text-slate-600 mt-4">
            Key milestones of Sirmax Engineering.
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-blue-200"></div>
            
            {/* Timeline Items */}
            <div className="flex justify-between">
              {TIMELINE_DATA.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center" style={{ width: `${100 / TIMELINE_DATA.length}%` }}>
                  {/* Dot */}
                  <div className="w-4 h-4 bg-blue-800/95 rounded-full border-4 border-slate-100 z-10 mb-4"></div>
                  
                  {/* Content */}
                  <div className="text-center px-2">
                    <p className="text-2xl lg:text-3xl  text-blue-800/95 mb-2">{item.year}</p>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed max-w-[160px] mx-auto">{item.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {TIMELINE_DATA.map((item, index) => (
                <div key={index} className="relative flex items-start pl-12">
                  {/* Dot */}
                  <div className="absolute left-2 top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-slate-100 z-10"></div>
                  
                  {/* Content */}
                  <div>
                    <p className="text-xl font-bold text-blue-600 mb-1">{item.year}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


// --- INDUSTRY PAGE ---

const IndustryPage = ({ data }: IndustryPageProps) => {
  const { id, title, description, images } = data;
  const { activeIndex, currentItem, selectItem } = useCarousel(images);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active thumbnail into view on mobile
  useEffect(() => {
    if (thumbnailContainerRef.current && window.innerWidth < 768) {
      const container = thumbnailContainerRef.current;
      const activeThumb = container.children[activeIndex] as HTMLElement;
      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const scrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);


  const currentDescription =  description;
  const industryFilter = id as 'cement'|'paper'|'textile'|'spares'; 

  return (
    <div className="bg-white min-h-screen">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pt-28 md:pb-12">
        {/* Breadcrumb / Title */}
        <div className="mb-6 md:mb-8 border-b border-slate-200 pb-6 md:pb-8">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Industry Focus / {title.split(' ')[0]}</h2>
          <h1 className="text-2xl sm:text-2xl md:text-4xl font-semibold text-slate-900">{title}</h1>
        </div>

        {/* Main Image with Overlay (Desktop) / Stacked (Mobile) */}
       <div className="mb-6 md:hidden">

          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            {/* Main Image - Full Width */}
            <div className="aspect-[16/10] md:aspect-video w-full relative group">
              <FallbackImage 
                key={currentItem.image} 
                src={currentItem.image} 
                alt={`${title} Main View ${activeIndex + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                fallbackText="Select an image from the gallery"
              />
              
              {/* Desktop Overlay - Bottom of Image */}
              <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 pt-16">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-bold text-white mb-2">Overview</h3>
                  <p className="text-white/90 leading-relaxed text-sm lg:text-base">
                    {currentDescription} 
                  </p>
                </div>
              </div>

              {/* Image Counter Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          </div>
          
          {/* Mobile Overview - Below Image */}
          <div className="md:hidden mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Overview</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {currentDescription} 
            </p>
          </div>
        </div>

        {/* Thumbnails - Separate Section */}
        {/* Mobile: Horizontal Scroll | Desktop: Grid */}
        <div className="mb-8">
          {/* Mobile Scrollable Thumbnails */}
          <div 
            ref={thumbnailContainerRef}
            className="md:hidden flex gap-3 overflow-x-auto pb-2 -mx-4 px-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          > 
            {images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => selectItem(idx)}
                className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeIndex === idx 
                    ? 'border-blue-600 ring-2 ring-blue-200' 
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <FallbackImage 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                  fallbackText={`#${idx + 1}`}
                  isThumb={true}
                />
              </button>
            ))}
          </div>

         {/* DESKTOP SPLIT VIEW */}
         <div className="hidden md:flex gap-6">
          {/* 20% VERTICAL THUMBNAILS*/}
          <div className="w-1/5 max-h-[60vh] overflow-y-auto flex flex-col gap-3 pr-1">
            {images.map((img, idx) => (
              <div key={idx} className="p-1">
                <button
                  onClick={() => selectItem(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 aspect-[16/10] w-full
                    ${activeIndex === idx 
                      ? 'border-blue-600 ring-2 ring-blue-200 scale-[1.03]'
                      : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                >
                  <FallbackImage
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    fallbackText={`#${idx + 1}`}
                    isThumb={true}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* 80% MAIN IMAGE */}
          <div className="w-4/5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[60vh]">
              <FallbackImage
                key={currentItem.image}
                src={currentItem.image}
                alt={`${title} Main View ${activeIndex + 1}`}
                className="w-full h-full object-cover"
                fallbackText="Select an image from the gallery"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 pt-16">
                <h3 className="text-xl font-bold text-white mb-2">Overview</h3>
                <p className="text-white/90 leading-relaxed text-sm lg:text-base">
                  {currentDescription}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          </div>

        </div>
        {/*split ends here */}
        </div>
      </div>
      
      {/* Client Section */}
      <AutoScrollClientsSection industryFilter={industryFilter} />
    </div>
  );
};


/* --- AUTO-SCROLLING CLIENTS SECTION --- */
const AutoScrollClientsSection = ({ industryFilter }: { industryFilter: 'cement' | 'paper' | 'textile' | 'spares' | 'general' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const filteredClients = industryFilter === 'general' 
    ? CLIENTS_DATA 
    : CLIENTS_DATA.filter(client => client.industry === industryFilter);

  // Animation using requestAnimationFrame for smooth scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += speed;
        
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, filteredClients.length]);

  if (filteredClients.length === 0) {
    return null; 
  }

  // Ensure minimum logos so loop has no gaps
    let repeatedClients = filteredClients;
    while (repeatedClients.length < 15) {
      repeatedClients = [...repeatedClients, ...filteredClients];
    }


  const clientsToDisplay = repeatedClients;

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-10">
        <h3 className="text-base md:text-lg font-bold text-slate-400 uppercase tracking-widest">
          Trusted By {industryFilter === 'general' ? 'Industry Leaders' : `${filteredClients[0]?.industry?.toUpperCase() || ''} Industry Clients`}
        </h3>
      </div>
      
      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Content */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-12 md:gap-16 lg:gap-20 py-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {clientsToDisplay.map((client, i) => (
            <a 
              key={`${client.id}-${i}`}            
              target="_blank" 
              rel="noreferrer" 
              className="flex-shrink-0 flex flex-col items-center justify-center p-2 group w-28 md:w-36"
            >
              <FallbackImage 
                src={client.imagePath} 
                alt={`${client.name} logo`}
                className="h-10 md:h-12 w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                fallbackText={client.name}
              />
              <span className="mt-2 text-[10px] md:text-xs font-semibold text-slate-400 group-hover:text-slate-600 uppercase transition-colors text-center truncate w-full">
                {client.name}
              </span>
            </a>
          ))}
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
        <MapPin className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
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
              className="text-xs text-blue-400 hover:text-blue-200 font-semibold"
            >
              View Map
            </a>
          </div>
        </div>
      </li>
      
      <li className="flex items-center">
        <Mail className="w-5 h-5 text-blue-500 mr-4" />
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-blue-400 transition-colors break-all">{CONTACT_EMAIL}</a>
      </li>

      <li className="pt-2">
        {/* Header with Phone Icon Toggle */}
        <button 
          onClick={toggleCaptcha}
          className="flex items-center space-x-2 mb-2 group"
          disabled={showNumbers}
        >
          <Phone className={`w-5 h-5 transition-colors ${showNumbers ? 'text-green-400' : 'text-blue-500 group-hover:text-blue-400'}`} />
          <h4 className={`text-sm transition-colors ${showNumbers ? 'text-white' : 'text-white group-hover:text-blue-400'}`}>
            Call Our Team
          </h4>
          {!showNumbers && !showCaptcha && (
            <span className="text-xs text-blue-400 ml-2">Verify to continue</span>
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
                  <Phone className="w-4 h-4 text-blue-400" />
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


// Footer component
const Footer = ({ changeTab, scrollToTop }: FooterProps) => {

  const handleTabChangeAndScroll = (tabId: string) => {
    changeTab(tabId);
    scrollToTop(); 
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-6">SIRMAX ENGINEERING INDIA PVT LTD.</h3>
            <p className="mb-6 leading-relaxed text-sm md:text-base">
              Reliable supplier of machineries and spares for cement, paper and textile industries since 2004.
            </p>
           <div className="flex items-center space-x-3">
          <p className="leading-relaxed text-sm md:text-base">
            Follow Us on LinkedIn
          </p>
          <a 
            href="https://www.linkedin.com/company/sirmax-engineering/" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

          </div>
          
          {/* Quick Links Section */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAVIGATION.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleTabChangeAndScroll(item.id)} 
                    className="hover:text-blue-400 transition-colors w-full text-left text-sm md:text-base"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ContactInfo />
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Sirmax Engineering India Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


export default App;
