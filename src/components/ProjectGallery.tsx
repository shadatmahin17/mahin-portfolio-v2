import React, { useState } from "react";
import { Project } from "../types";
import { 
  FlaskConical, 
  ExternalLink, 
  Settings, 
  Workflow, 
  Cpu, 
  X, 
  CheckCircle, 
  ChevronRight, 
  Zap, 
  Code 
} from "lucide-react";

const PROJECTS_DATA: Project[] = [
  {
    id: "dyeing-optimization",
    title: "Dyeing of Woven Cotton Fabric with Reactive Dyes",
    category: "dyeing",
    description: "Exhaustion dyeing of scoured and bleached woven cotton fabric using fiber-reactive dyes to form covalent bonds with cellulose molecules for excellent wash fastness.",
    details: [
    "Prepared a dye bath recipe utilizing a 1:10 to 1:20 liquor ratio, 1-3% owf dye concentration, 40-80 g/L salt, and 15-25 g/L soda ash.",
    "Executed a phased exhaustion and fixation process, ramping temperatures to 60-80°C before applying alkali to reach a target pH of 10.5-11.5.",
    "Conducted a rigorous after-treatment boiling rinse with non-ionic detergent to completely clear unfixed, hydrolyzed dyestuff from the fabric substrate."
    ],
    tags: ["Exhaustion Method", "Reactive Dyes", "Soda Ash Fixation", "Woven Cotton Fabric"]
  },
  {
  "id": "probabilistic-digital-twin-3d-composites",
  "title": "Probabilistic Digital Twin Framework for 3D Woven and Braided Composites",
  "category": "innovations",
  "description": "Developed a reduced-order probabilistic digital twin integrating textile architecture, manufacturing process conditions, defect prediction, and structural performance for aerospace-grade 3D woven composites under uncertainty.",
  "details": [
    "Linked architecture parameters (fibre volume fraction 0.48–0.60, waviness 0.02–0.08, braid angle 25°–40°) with manufacturing defects (voids 1–4%, resin-rich regions, waviness amplification) using empirically calibrated models.",
    "Applied Monte Carlo simulation (N=3000) to propagate uncertainty; predicted CAI strength range 380–560 MPa (mean 448.0 MPa) and void fraction mean 2.85%, matching literature benchmarks with mean absolute deviation of 2.0 MPa.",
    "Identified fibre volume fraction and waviness as dominant parameters (Pearson r = +0.48 and –0.41) and performed reliability analysis showing 42.2% of configurations satisfy a 450 MPa certification threshold."
  ],
  "tags": ["Digital Twin", "3D Woven Composites", "Manufacturing Defects", "Compression After Impact", "Monte Carlo Simulation", "Uncertainty Quantification"]
  },
  {
    id: "freelance-pipeline",
    title: "Aurwave International Client Acquisition Funnel",
    category: "client-acquisition",
    description: "Designed a conversational outreach system on major freelancing marketplaces, connecting with B2B clients across Europe and North America to scale project pipelines.",
    details: [
      "Researched niche apparel markets to source qualified leads and negotiate customized development contracts.",
      "Automated lead qualification flow, boosting active client meetings by 40% and shortening negotiation cycles.",
      "Coordinated custom product tech packs from design team directly to overseas buyers' operations teams."
    ],
    tags: ["Marketplace Outreach", "Lead Qualification", "Technical Packs", "B2B Sales"],
  },
  {
  "id": "textile-dyeing-bangladesh",
  "title": "Textile Dyeing Industries in Bangladesh: Towards Eco-Friendly and Sustainable Development",
  "category": "innovations",
  "description": "Comprehensive review of environmental impacts from conventional textile dyeing in Bangladesh and assessment of sustainable alternatives including waterless technologies, advanced wastewater treatment, and circular economy approaches.",
  "details": [
    "Quantifies resource intensity: 164 L groundwater, 119 L wastewater, 2.58 kWh electricity, 449 g chemicals per kg of textile processed; national wastewater projected to reach 349 million m³ by 2021 under business-as-usual.",
    "Evaluates eco-friendly techniques: supercritical CO₂ waterless dyeing, natural/bio-based dyes, sustainable chemicals, membrane filtration (UF/NF/RO), advanced oxidation processes (Fenton, ozone, photocatalysis), and bio-electrochemical systems.",
    "Identifies key barriers: high capital costs, limited technical capacity, weak regulatory enforcement, and price competition; opportunities include market benefits, green financing, and pilot-proven reuse achieving 100% treated effluent in denim facilities.",
    "Provides phased roadmap: short-term regulatory enforcement and low-cost cleaner production, medium-term technology scaling and capacity building, long-term zero liquid discharge and renewable energy integration."
  ],
  "tags": ["Textile Dyeing", "Wastewater Treatment", "Sustainable Development", "Bangladesh", "Eco-friendly Technologies", "Water-Energy Nexus"]
},
  {
    "id": "jute-reactive-dyeing",
    "title": "Jute Fabric Dyeing with Reactive Dyes at 50°C",
    "category": "wet-processing",
    "description": "Academic wet-processing project demonstrating jute fabric dyeing using a trichromatic reactive dye mixture (red, yellow, blue) at 50°C with a 1:30 material-to-liquor ratio and alkali fixation.",
    "details": [
      "Applied a 1:30 M:L ratio with 40 g/L salt, 10 g/L soda ash, and 5 ml each of leveling, sequestering, and wetting agents – suitable for jute’s low dye affinity.",
      "Used 0.5 g each of Reactive Red, Yellow, and Blue (total 1.5 g per 10 g fabric) to achieve a deep grey‑brown shade via primary mixing.",
      "Conducted dyeing at 50 °C for 25 minutes after soda ash addition – though shorter than ideal, it yields moderate fixation; longer treatment (45‑60 min) is recommended for better wash fastness.",
      "Required thorough bio‑scouring or alkaline pretreatment of jute to remove lignin and waxes, ensuring uniform dye uptake and color yield."
    ],
    "tags": ["Reactive Dyes", "Jute Fabric", "Low-Temperature Dyeing", "Trichromatic Mixture", "Alkali Fixation"],
},
  {
    id: "sales-conversion",
    title: "The Freelancer client-outreach Playbook",
    category: "client-acquisition",
    description: "Synthesized standard operating guidelines for technical engineers managing business development, optimizing proposal response architectures.",
    details: [
      "Drafted high-conversion inquiry scripts addressing critical client pain-points under five seconds flat.",
      "Created structured proposal templates emphasizing technical certifications and MATLAB simulation capabilities.",
      "Lowered cold response drops by 30%, resulting in a highly solid client trust rating and consistent five-star portal reviews."
    ],
    tags: ["Negotiation SOG", "Proposal Architecture", "Conversion Strategy", "Client Relations"],
  }
];

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState<Project["category"]>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter(
    (proj) => activeTab === "all" || proj.category === activeTab
  );

  const tabIcons: Record<string, React.ReactNode> = {
    all: <Workflow className="w-4 h-4" />,
    "wet-processing": <Settings className="w-4 h-4" />,
    dyeing: <FlaskConical className="w-4 h-4" />,
    "client-acquisition": <ExternalLink className="w-4 h-4" />,
    innovations: <Cpu className="w-4 h-4" />,
  };

  const formattedTabName = (tab: string) => {
    return tab
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div id="projects" className="space-y-10 scroll-mt-24">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold font-sans tracking-tight text-neutral-900 inline-block relative pb-2 border-b-4 border-[var(--accent)] rounded">
          Project Showcases
        </h2>
        <p className="text-neutral-500 max-w-xl mx-auto text-sm">
          Bridging physical chemical engineering parameters with advanced client acquisition and club innovation.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {(["all", "wet-processing", "dyeing", "client-acquisition", "innovations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeTab === tab
                ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent-glow)] scale-105"
                : "bg-[var(--surface)] text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
            }`}
          >
            {tabIcons[tab]}
            {formattedTabName(tab)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="group cursor-pointer bg-[var(--card-bg)] border border-neutral-200/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:bg-neutral-50/50 hover:border-[var(--accent)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent)] bg-[var(--accent-glow)] px-2.5 py-1 rounded-full">
                  {proj.category.split("-").join(" ")}
                </span>
                <span className="p-1 rounded bg-neutral-100 group-hover:bg-[var(--accent-glow)] text-neutral-400 group-hover:text-[var(--accent)] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                {proj.title}
              </h3>
              <p className="text-sm text-neutral-500 line-clamp-3 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200/50 flex flex-wrap gap-1.5">
              {proj.tags.slice(0, 3).map((tg) => (
                <span key={tg} className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                  {tg}
                </span>
              ))}
              {proj.tags.length > 3 && (
                <span className="text-[10px] font-bold text-neutral-400 self-center">
                  +{proj.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Screen */}
      {selectedProject && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-[5000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
            {/* Header banner background */}
            <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 p-6 relative flex-shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="inline-block text-[10px] uppercase font-extrabold tracking-widest text-white bg-[var(--accent)] px-3 py-1 rounded-full mb-3 shadow-[var(--accent-glow)]">
                {selectedProject.category.split("-").join(" ")}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 pr-8">
                {selectedProject.title}
              </h2>
            </div>

            {/* Content area */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--accent)]" /> Project Objective & Background
                </h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Key Engineering Implementation & Outcomes
                </h4>
                <ul className="space-y-3">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-neutral-600 text-sm leading-relaxed items-start">
                      <ChevronRight className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[var(--accent)]" /> Applied Competency tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tg) => (
                    <span
                      key={tg}
                      className="text-xs font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200/50 px-3 py-1 rounded-full"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="bg-neutral-50/50 border-t border-neutral-100 p-4 flex justify-end flex-shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                Done viewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
