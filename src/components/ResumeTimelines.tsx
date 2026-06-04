import React, { useEffect, useState } from "react";
import { Experience, Education, Training, Language } from "../types";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Building, 
  Calendar, 
  Heart, 
  Globe 
} from "lucide-react";

const EXPERIENCES: Experience[] = [
  {
    role: "Executive – Client Acquisition",
    company: "Aurwave (Web Devlopment Company)",
    location: "Dhaka, Bangladesh",
    date: "Jan 2025 – Present",
    highlights: [
      "Identified and cultivated strategic high-potential leads for textile design production pipelines.",
      "Communicated and negotiated successfully with international clients through freelance marketplaces, closing major active contracts.",
      "Maintained key global client relationships and assisted lead developers in custom project specification coordination."
    ],
    icon: "briefcase"
  },
  {
    role: "Idea & Innovation Secretary",
    company: "Scholars Fashion Club",
    location: "Dhaka, Bangladesh",
    date: "Nov 2024 – Apr 2025",
    highlights: [
      "Organized creative interdisciplinary workshops, innovation debates, and club activities.",
      "Coordinated active communication networks among club members and external workshop participants.",
      "Managed essential project documentation and innovative runway asset planning."
    ],
    icon: "users"
  }
];

const EDUCATIONS: Education[] = [
  {
    degree: "B.Sc. in Textile Engineering",
    institution: "University of Scholars",
    location: "Dhaka, Bangladesh",
    date: "2023 – Present",
    badge: "7th Semester • Major: Wet Processing"
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Barishal Board",
    location: "Barishal, Bangladesh",
    date: "2022"
  },
  {
    degree: "Secondary School Certificate (Science)",
    institution: "Barishal Board",
    location: "Barishal, Bangladesh",
    date: "2020"
  }
];

const TRAININGS: Training[] = [
  {
    title: "MATLAB Onramp",
    institution: "MathWorks",
    date: "2026",
    description: "Rigorous self-paced training centered on matrix calculations, raw data manipulation, visualization scripts, and technical project automation structures.",
    icon: "code"
  },
  {
    title: "Fashion Design Course",
    institution: "University of Scholars",
    date: "2024",
    description: "Three-month intensive professional short course covering commercial apparel mock-ups, draping fundamentals, activewear patterns, and runway aesthetics.",
    icon: "palette"
  }
];

const LANGUAGES: Language[] = [
  { name: "Bangla", level: "Native", percentage: 100 },
  { name: "English", level: "Fluent / Working Professional", percentage: 85 },
];

export default function ResumeTimelines() {
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Delay slightly to trigger smooth load animation
    const timer = setTimeout(() => setAnimateProgress(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Experience & Education Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Experience Column */}
        <div id="experience" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="p-2 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">Work Experience</h3>
          </div>

          <div className="relative border-l-2 border-dashed border-neutral-200 pl-6 ml-3 space-y-10">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Node counter dot */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-all shadow-[0_0_8px_var(--accent-glow)]" />
                
                <div className="bg-[var(--card-bg)] border border-neutral-200/60 rounded-2xl p-5 shadow-sm group-hover:border-[var(--accent)] group-hover:bg-neutral-50/20 transition-all space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-neutral-900 group-hover:text-[var(--accent)] transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[var(--accent)]" /> {exp.company} &bull; {exp.location}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[var(--accent)] bg-[var(--accent-glow)] px-2.5 py-1 rounded-full border border-[var(--accent)]/15 flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3 h-3" /> {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-2 mt-2">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-neutral-600 leading-relaxed list-disc list-inside">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div id="education" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="p-2 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">Education</h3>
          </div>

          <div className="relative border-l-2 border-dashed border-neutral-200 pl-6 ml-3 space-y-10">
            {EDUCATIONS.map((edu, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-all shadow-[0_0_8px_var(--accent-glow)]" />
                
                <div className="bg-[var(--card-bg)] border border-neutral-200/60 rounded-2xl p-5 shadow-sm group-hover:border-[var(--accent)] group-hover:bg-neutral-50/20 transition-all space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-neutral-900 group-hover:text-[var(--accent)] transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-neutral-500 font-semibold">
                        {edu.institution} &bull; {edu.location}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full shrink-0">
                      {edu.date}
                    </span>
                  </div>

                  {edu.badge && (
                    <span className="inline-block mt-1 text-[10px] font-extrabold tracking-wider bg-[var(--accent-glow)] border border-[var(--accent)]/30 text-[var(--accent)] px-3 py-1 rounded-full uppercase">
                      {edu.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certifications & Languages side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
        
        {/* Trainings & Certificates */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="p-2 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">Academic Training & Certs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAININGS.map((train, idx) => (
              <div 
                key={idx} 
                className="bg-[var(--card-bg)] border border-neutral-200/60 p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-[var(--accent)] transition-all hover:bg-neutral-50/20"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[var(--accent)] uppercase tracking-wider bg-[var(--accent-glow)] px-2 py-0.5 rounded">
                      {train.institution}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">{train.date}</span>
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">{train.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                    {train.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Languages Proficiency */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="p-2 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl">
              <Languages className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">Language Proficiencies</h3>
          </div>

          <div className="bg-[var(--card-bg)] border border-neutral-200/60 p-6 rounded-2xl space-y-5">
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">{lang.name}</span>
                  <span className="font-semibold text-[var(--accent)] bg-[var(--accent-glow)] px-2 py-0.5 rounded-full text-[10px]">
                    {lang.level}
                  </span>
                </div>
                {/* Visual loading bar */}
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[var(--accent)] to-[var(--gold-light)] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateProgress ? `${lang.percentage}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
            
            <p className="text-[11px] text-neutral-400 italic text-center pt-2 flex items-center justify-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[var(--accent)] animate-spin-slow" /> Facilitating seamless communication across diverse multicultural buyer environments.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
