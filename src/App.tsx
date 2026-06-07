import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronUp, 
  FileText, 
  Mail, 
  ArrowRight, 
  Briefcase, 
  Languages, 
  Award, 
  Target, 
  Linkedin, 
  Github, 
  Globe,
  Eye
} from "lucide-react";
import BackgroundStars from "./components/BackgroundStars";
import ProjectGallery from "./components/ProjectGallery";
import ResumeTimelines from "./components/ResumeTimelines";
import ContactSection from "./components/ContactSection";
import AIAssistant from "./components/AIAssistant";
import { SkillCategory } from "./types";

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Technical Skills",
    icon: "layers",
    skills: ["Textile Processes", "Wet Processing", "Dyeing Chemistry", "Composite Materials"]
  },
  {
    title: "Engineering Tools & Software",
    icon: "cpu",
    skills: ["MATLAB (Certs)", "MS Word", "MS Excel", "MS PowerPoint", "Google Sheets / Docs"]
  },
  {
    title: "Professional Soft Skills",
    icon: "handshake",
    skills: ["B2B Negotiation", "Client Relations", "Teamwork Coordinating", "Idea Innovation Team-Lead"]
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  const phrases = [
    "Textile Engineering Final-Year Student",
    "Wet Processing Major Specialist",
    "International B2B Client Acquisition Executive"
  ];

  // Typewriter Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 75);
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Scroll details tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgressWidth(pct);

      setScrolled(scrollTop > 45);
      setShowScrollTop(scrollTop > 380);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#E5C97A] selection:text-[#1A1A1A] overflow-x-hidden">
      
      {/* Scroll indicator bar */}
      <div 
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-[#C9A34E] via-[#E5C97A] to-[#C9A34E] z-[9999] transition-all duration-100 ease-out"
        style={{ width: `${progressWidth}%` }}
      />

      {/* Background Interactive Particles */}
      <BackgroundStars />

      {/* Sticky Header Nav */}
      <nav className={`fixed top-0 inset-x-0 z-[3000] transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3 border-b border-neutral-100" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center transition-transform active:scale-95"
          >
            <div className="w-30 h-10 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src="/Images/Logo.png" 
                alt="SM logo" 
                className="w-full h-full object-contain" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
          </button>

          {/* Nav tags list */}
          <div className="hidden md:flex items-center gap-1">
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 transition-all uppercase tracking-wider"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] hover:brightness-105 active:scale-95 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md shadow-amber-400/10 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> Direct Inquiry
            </button>
          </div>

          {/* Hamburger activator */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-neutral-100 text-neutral-700 active:scale-95 transition-all"
            aria-label="Toggle Navigation Options"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[2900] bg-neutral-900/40 backdrop-blur-md md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-16 right-5 w-64 bg-white/95 backdrop-blur-xl rounded-3xl border border-neutral-200/80 p-6 flex flex-col gap-2 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {(["about", "experience", "education", "projects", "contact"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="w-full text-left px-4 py-3 rounded-2xl text-xs font-bold text-neutral-700 hover:bg-[var(--accent-glow)] hover:text-[#C9A34E] transition-all uppercase tracking-wider"
              >
                {sec}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] text-white text-xs font-bold tracking-widest uppercase text-center justify-center flex items-center gap-2 shadow-md shadow-amber-500/15"
            >
              <Mail className="w-4 h-4" /> Get In Touch
            </button>
          </div>
        </div>
      )}

      {/* Main hero segment */}
      <section id="hero" className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 pt-8 pb-16 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* Profile Card & fallback image */}
        <div className="relative shrink-0 select-none animate-fade-in text-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A34E] to-[#E5C97A] rounded-full scale-102 blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
          
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-xl bg-neutral-100 flex items-center justify-center transition-transform hover:scale-102 duration-300">
            {imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-[#F5F5F5] to-neutral-200 flex flex-col items-center justify-center select-none text-center p-4">
                <span className="text-3xl font-black text-[#C9A34E] tracking-tight">SH</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1">Shadat Mahin</span>
              </div>
            ) : (
              <img
                src="/Images/shadatmahin.png"
                alt="Shadat Hossen Mahin Portrait"
                className="w-full h-full object-cover origin-center"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          
          {/* Active status bubble */}
          <span className="absolute bottom-2.5 right-4 w-5.5 h-5.5 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-md shadow-green-500/20" title="Active Client Lead Mode" />
        </div>

        {/* Hero Bio Introduction */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[#C9A34E]/25 text-xs text-[#C9A34E] font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-[#C9A34E] rounded-full animate-ping" /> Wet Processing major &amp; Lead Agent
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-none">
              Shadat Hossen Mahin
            </h1>
            
            {/* Dynamic Typewriter description box */}
            <div className="min-h-[28px] text-[#C9A34E] font-semibold text-sm md:text-base leading-relaxed tracking-wide flex items-center justify-center md:justify-start gap-1">
              <span>{typewriterText}</span>
              <span className="w-[2.5px] h-[1.1em] bg-[#C9A34E] animate-pulse" />
            </div>
          </div>

          <p className="text-[#666666] text-sm md:text-md max-w-xl leading-relaxed">
            I combine robust mechanical and chemical parameters of modern textile chemistry with freelance platform negotiation strategies to source, acquire, and complete projects with prestigious B2B buyers globally.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#C9A34E] to-[#E5C97A] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase hover:brightness-105 transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              Get In Touch <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-neutral-300 hover:border-neutral-500 text-neutral-700 hover:text-neutral-900 text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              Verify Experience
            </button>
            <button
              onClick={() => setIsCvOpen(true)}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" /> Download Resume
            </button>
          </div>


        </div>
      </section>

      {/* Metrics bento cards grid */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Professional Tasks</p>
              <p className="text-3xl font-black text-[#C9A34E]">2 Roles</p>
              <p className="text-[11px] text-neutral-500">Aurwave + Scholars Club</p>
            </div>
            <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-2xl">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Languages</p>
              <p className="text-3xl font-black text-[#C9A34E]"> 2 Spoken</p>
              <p className="text-[11px] text-neutral-500">Bangla, English</p>
            </div>
            <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-2xl">
              <Languages className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-1 text-left">
              <p className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400">Academic Training</p>
              <p className="text-3xl font-black text-[#C9A34E]">2 Certs</p>
              <p className="text-[11px] text-neutral-500">MATLAB Onramp + Fashion</p>
            </div>
            <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-2xl">
              <Award className="w-6 h-6" />
            </div>
          </div>

        </div>
      </section>

      {/* Deep About Details */}
      <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-12 scroll-mt-24 relative z-10">
        <div className="bg-[var(--card-bg)] border border-neutral-200/50 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-[#C9A34E] rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">About Me</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left text-sm leading-relaxed text-[#666666]">
            <p className="font-medium text-neutral-700">
              I am a final-year Textile Engineering student specializing in Wet Processing chemistry and lead-generation methodologies. I combine detailed engineering calculations of fabric chemistry, exhaustive reactive dyeing fixations, and low-temperature enzymatic scouring with direct outreach methods on freelance networks to help overseas buyers launch premium apparel products.
            </p>
            <p>
              Whether negotiating directly on freelancing marketplaces, planning club documentation as Idea & Innovation Secretary for Scholars Fashion Club, processing MATLAB simulation algorithms, or conducting high-accuracy fiber testing, I approach each challenge with high energy, critical analytical skills, and client satisfaction targets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left">
            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Major Specialized Area</p>
              <p className="text-xs font-bold text-neutral-800 mt-0.5">Wet Processing Major</p>
            </div>
            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Active Academic Status</p>
              <p className="text-xs font-bold text-neutral-800 mt-0.5">7th Semester B.Sc.</p>
            </div>
            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Lead Source Location</p>
              <p className="text-xs font-bold text-neutral-800 mt-0.5">Dhaka, Bangladesh</p>
            </div>
            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/40">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">B2B Freelancing portals</p>
              <p className="text-xs font-bold text-[#C9A34E] mt-0.5">International Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience, Education and Training Section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 relative z-10 text-left">
        <ResumeTimelines />
      </section>

      {/* Filterable Galleries section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 relative z-10 text-left">
        <ProjectGallery />
      </section>

      {/* Custom Skills List Section */}
      <section id="skills" className="max-w-6xl mx-auto px-5 md:px-8 py-12 scroll-mt-24 relative z-10">
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-neutral-900">Skills &amp; Expertise Cloud</h2>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              A comprehensive view of technical textile chemistry, computer software utilities, and sales metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-[#FDFDFD] border border-neutral-200/40 rounded-2xl p-5 space-y-4 text-left">
                <h4 className="font-bold text-sm text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#C9A34E]" /> {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold text-neutral-700 bg-[var(--surface)] hover:bg-[#C9A34E] hover:text-white transition-all cursor-default border border-neutral-200/20 px-3.5 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual contact form section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 pb-24 relative z-10 text-left">
        <ContactSection />
      </section>

      {/* Footer copyright */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900 relative z-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-white uppercase tracking-widest">Shadat Hossen Mahin</p>
            <p className="text-[11px] text-neutral-500">Textile Engineer &bull; Major in Wet Processing &bull; Leading client operations</p>
          </div>
          
          <div className="text-[11px] text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Shadat Hossen Mahin. All Rights Reserved.</p>
            <p className="mt-1">Designed with precise technical parameters &bull; Dhaka, BD.</p>
          </div>
        </div>
      </footer>

      {/* AI Twins Recruiter Bot sidebar component */}
      <AIAssistant />

      {/* CV Preview Modal */}
      {isCvOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#C9A34E]" />
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-neutral-800">CV / Resume Preview</span>
              </div>
              <button 
                onClick={() => setIsCvOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-200/50 text-neutral-500 hover:text-neutral-800 transition-colors active:scale-95 cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-neutral-100 relative">
              <iframe 
                src="/Images/shadat_mahin_cv-v1.pdf" 
                title="Shadat Mahin CV Preview" 
                className="w-full h-full border-0 select-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-neutral-400 font-semibold text-center sm:text-left">
                Scroll on the Preview paper layer or zoom in using the toolbar.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <a
                  href="/Images/shadat_mahin_cv-v1.pdf"
                  download="shadat_mahin_cv-v1-download.pdf"
                  className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button
                  onClick={() => setIsCvOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-400 text-neutral-700 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop click zone layer */}
          <div className="absolute inset-0 -z-10 cursor-pointer" onClick={() => setIsCvOpen(false)} />
        </div>
      )}

      {/* Simple active back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 p-3.5 sm:p-4 rounded-full bg-neutral-900 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all z-[4000] border border-neutral-800"
          aria-label="Back to raw top page"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
