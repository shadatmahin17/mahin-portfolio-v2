import React, { useState } from "react";
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MapPin, 
  GraduationCap 
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setFeedbackMsg("Please construct a complete submission with your name, email, and description.");
      return;
    }

    try {
      setStatus("submitting");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFeedbackMsg(data.message || "Thank you! Shadat got your message.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Execution failed.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setFeedbackMsg("Could not process online transmission. Please send an inquiry directly to shadatmahin681@gmail.com!");
    }
  };

  return (
    <div id="contact" className="space-y-10 scroll-mt-24">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold font-sans tracking-tight text-neutral-900 inline-block relative pb-2 border-b-4 border-[var(--accent)] rounded">
          Get In Touch
        </h2>
        <p className="text-neutral-500 max-w-xl mx-auto text-sm">
          Have a textile engineering proposal, lead-acquisition goal, or want to say hello? Drop a line here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact credentials */}
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] border border-neutral-200/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-neutral-950">Direct Channels</h3>
            
            <div className="space-y-4">
              <a 
                href="mailto:shadatmahin681@gmail.com" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/50 hover:border-[var(--accent)] hover:bg-neutral-100/50 transition-all group"
              >
                <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-semibold text-neutral-800">shadatmahin681@gmail.com</p>
                </div>
              </a>

              <a 
                href="www.linkedin.com/in/shadat-mahin-1394a734a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/50 hover:border-[var(--accent)] hover:bg-neutral-100/50 transition-all group"
              >
                <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">LinkedIn Personal</p>
                  <p className="text-sm font-semibold text-neutral-800">Shadat Mahin</p>
                </div>
              </a>

              <a 
                href="https://github.com/shadatmahin17" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/50 hover:border-[var(--accent)] hover:bg-neutral-100/50 transition-all group"
              >
                <div className="p-3 bg-[var(--accent-glow)] text-[var(--accent)] rounded-xl group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">GitHub Repository</p>
                  <p className="text-sm font-semibold text-neutral-800">Shadat ahin</p>
                </div>
              </a>
            </div>

            <div className="pt-6 border-t border-neutral-100/60 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                <GraduationCap className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>University of Scholars &bull; Wet Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="name-input" className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Jane Recruiter"
                  required
                  className="w-full text-sm border border-neutral-200 px-4 py-3 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-all placeholder:text-neutral-300"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label htmlFor="email-input" className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., manager@cottonco.com"
                  required
                  className="w-full text-sm border border-neutral-200 px-4 py-3 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-all placeholder:text-neutral-300"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="subject-input" className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                Inquiry Subject
              </label>
              <input
                id="subject-input"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g., Lead-Acquisition Collaboration"
                className="w-full text-sm border border-neutral-200 px-4 py-3 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-all placeholder:text-neutral-300"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="message-input" className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                Project Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message-input"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Let me know how Shadat can contribute to your team..."
                required
                className="w-full text-sm border border-neutral-200 px-4 py-3 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-all placeholder:text-neutral-300 resize-none"
              />
            </div>

            {/* Display status notifications */}
            {status === "success" && (
              <div className="p-3 bg-green-50 text-green-700 border border-green-200 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 bg-red-50/50 text-red-700 border border-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <button
              id="submit-contact"
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--gold-light)] text-white text-xs font-bold uppercase tracking-widest hover:scale-[1.01] hover:brightness-105 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SEND SECURE INQUIRY</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
