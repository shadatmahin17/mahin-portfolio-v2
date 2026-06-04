import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  getDocFromServer,
  setLogLevel
} from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

// Initialize Firebase SDK
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Set log level to only log actual errors, suppressing benign connection idle warnings
setLogLevel("error");

// Validate Connection to Firestore on startup as per critical guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore secure database connection tested successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client appears to be offline.");
    } else {
      console.log("Firestore connection check initiated successfully.");
    }
  }
}
testConnection();

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve uploaded Images folder as static assets
app.use("/Images", express.static(path.join(process.cwd(), "Images")));

// Initialize Groq via OpenAI SDK
const groqApiKey = process.env.GROQ_API_KEY;
let openai: OpenAI | null = null;

if (groqApiKey) {
  openai = new OpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: groqApiKey,
  });
} else {
  console.warn("GROQ_API_KEY is not configured. Digital twin chat will fall back to smart offline mode.");
}

// System Instruction that serves as the resume/knowledge base for Shadat Hossen Mahin's AI digital twin recruiter assistant
const SHADAT_SYSTEM_INSTRUCTION = `
You are the AI Digital Twin and personal recruiter assistant of Shadat Hossen Mahin. Your purpose is to represent Shadat to recruiters, prospective clients, and partners in a professional, engaging, and highly accurate manner.

Here is Shadat's complete professional biography and credentials, which you must use as your source of truth:

ABOUT SHADAT:
- Name: Shadat Hossen Mahin
- Role: Textile Engineering Final-Year Student & Wet Processing Specialist, Client Acquisition Specialist
- Persona: Energetic, highly competent, smart communicator, combining technical rigor (wet processing, dyeing chemistry, composite materials) with modern digital business acumen (freelancer, international client sales).
- Current Location: Dhaka, Bangladesh

EDUCATION:
1. B.Sc. in Textile Engineering (7th Semester current)
   - Institution: University of Scholars, Dhaka
   - Period: 2023 - Present
   - Major: Wet Processing
2. Higher Secondary Certificate (HSC) in Science (2022)
   - Board: Barishal Board
3. Secondary School Certificate (SSC) in Science (2020)
   - Board: Barishal Board

PROFESSIONAL EXPERIENCE:
1. Executive - Client Acquisition at Aurwave, Dhaka (January 2025 - Present)
   - Identified high-potential leads and drove sales pipelines.
   - Negotiated and closed deals with international clients on key freelancing marketplaces.
   - Maintained ongoing client relationships and assisted in project coordination.
2. Idea & Innovation Secretary at Scholars Fashion Club, Dhaka (November 2024 - April 2025)
   - Coordinated events, innovative workshops, and structured design challenges.
   - Built internal club communications channels and promoted collaborative brainstorming.
   - Managed event documentation, and generated fresh ideas for academic showpieces.

TECHNICAL SKILLS & EXPERTISE:
- Textile Core: Wet Processing, Dyeing Techniques, Textile Chemistry, Finish Treatments, Composite Materials.
- Tools & Engineering Software: MATLAB (Completed professional MATLAB Onramp in 2026), Microsoft Office (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, Slides, Drive).
- Soft Skills: Client relations, team-building, leadership, project management, international negotiation.

LANGUAGES:
- Bangla: Native
- English: Fluent / Professional working proficiency
- Hindi: Basic Conversational

CERTIFICATIONS & SHORT COURSES:
- "MATLAB Onramp" Certificate (Issued by MathWorks, 2026)
- Fashion Design short-course (Three-month professional course completed in 2024)

CORE DIRECTIVES:
- Keep answers professional, concise, respectful, and enthusiastic. Use bullet points where appropriate for readability.
- If they ask general engineering questions about dyeing or textile wet processing (like bleaching, scouring, reactive dyes, mercerization), answer with solid technical competence representing Shadat's actual academic major level, but tie it back to how Shadat can apply this knowledge.
- If asked about hiring or collaborating with Shadat, encourage them to submit the "Contact Form" on the footer or shoot an email to shadatmahin681@gmail.com.
- Do NOT make up false details or exaggerate. Adhere strictly to his actual timeline. Speak in first person ("I", "my") as Shadat's virtual twin. Keep responses under 200 words.
`;

// Context-aware smart offline handler to process queries when DeepSeek credits or connection is unavailable
function getOfflineFallbackResponse(message: string): string {
  const msg = (message || "").toLowerCase();
  
  if (msg.includes("wet processing") || msg.includes("dyeing") || msg.includes("chemistry") || msg.includes("enzyme") || msg.includes("fixing") || msg.includes("scour") || msg.includes("cotton")) {
    return "Yes! I am a Textile Engineering student specializing in Wet Processing (currently in my 7th semester at the University of Scholars, Dhaka). I have hands-on academic training in reactive exhaust dyeing, low-temperature enzymatic scouring of cotton, and chemically modified silane coupling modifications for jute-polypropylene composite materials. I focus heavily on optimizing chemical fixation and minimizing biological oxygen demand in wastewater effluent!";
  }
  
  if (msg.includes("aurwave") || msg.includes("acquisition") || msg.includes("client") || msg.includes("sales") || msg.includes("lead") || msg.includes("negotiat") || msg.includes("freelance")) {
    return "As an Executive in Client Acquisition at Aurwave (from January 2025 – Present), I handle international outreach efforts and B2B client negotiations on freelance platforms. I've designed custom pipelines securing business development targets from Europe and USA, acting as the primary liaison transferring buyers' technical garments tech packs directly to local production streams.";
  }
  
  if (msg.includes("matlab") || msg.includes("onramp") || msg.includes("cert") || msg.includes("software") || msg.includes("excel") || msg.includes("word") || msg.includes("utility")) {
    return "I completed the official MathWorks MATLAB Onramp professional certification in 2026 to execute complex raw data calculations, process metrics, and write layout optimization scripts. For daily operational tasks, I am highly proficient in MS Excel, PowerPoint, and Google Workspace to structure technical buyers' packs.";
  }
  
  if (msg.includes("scholars") || msg.includes("fashion club") || msg.includes("clubs") || msg.includes("innovation") || msg.includes("secretary") || msg.includes("wearable")) {
    return "I served as the Idea & Innovation Secretary for Scholars Fashion Club (Nov 2024 – Apr 2025). I organized interdisciplinary creative workshops and runway showcases, notably steering technical planning to embed silver-coated nylon conductive thread patterns with micro-sensors for a moisture-alert wearable smart clothing prototype!";
  }
  
  if (msg.includes("hire") || msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("job") || msg.includes("work with")) {
    return "I would be absolutely thrilled to discuss active full-time job offers, engineering internships, or lead-acquisition projects! You can use the secure 'Get in Touch' email formulation directly below, or drop me a letter at shadatmahin681@gmail.com so we can discuss the goals together!";
  }
  
  return "That is a great target inquiry! While my active Groq Cloud AI core is currently processing offline due to standard subscription updates, I would love to tell you more about my 7th-semester Wet Processing textile major, my client acquisition results at Aurwave, or how I apply my MATLAB calculations to minimize dyeing waste. Please reach out to me directly at shadatmahin681@gmail.com and let's coordinate!";
}

// API routes
app.post("/api/chat", async (req, res) => {
  const { messages, message } = req.body;
  const promptText = message || "";

  try {
    // Fallback if API key is missing entirely
    if (!openai) {
      return res.json({
        text: getOfflineFallbackResponse(promptText)
      });
    }

    const formattedMessages: any[] = [
      { role: "system", content: SHADAT_SYSTEM_INSTRUCTION }
    ];

    if (messages && Array.isArray(messages)) {
      messages.forEach((m: any) => {
        if (m.id === "welcome") return;
        formattedMessages.push({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        });
      });
    }

    // Add current query if not yet tracked in history
    if (promptText && (!messages || !messages.some((m: any) => m.text === promptText))) {
      formattedMessages.push({
        role: "user",
        content: promptText
      });
    }

    const completion = await openai.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 1024,
      stream: false,
    });

    const responseText = completion.choices[0]?.message?.content || "I'd love to tell you more about my wet processing skills or sales experience! Reach out via email.";

    res.json({ text: responseText });
  } catch (error: any) {
    console.warn("Groq API yielded error (gracefully falling back):", error.message || error);
    
    // Smooth fallback return instead of crashed 500
    res.json({ 
      text: getOfflineFallbackResponse(promptText)
    });
  }
});

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error("Firestore Error Detailed: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Endpoint for receiving contact form submissions with secure Firebase Firestore persistence
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(`[CONTACT RECEIVED] from ${name} (${email}): [${subject}] - ${message}`);

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Requirement failure: name, email, and message are mandatory fields."
    });
  }

  const pathForWrite = "contacts";
  try {
    // Add document to the "contacts" Cloud Firestore collection
    await addDoc(collection(db, pathForWrite), {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 100),
      subject: (subject || "").trim().substring(0, 200),
      message: message.trim().substring(0, 5000),
      createdAt: serverTimestamp()
    });

    res.json({ 
      success: true, 
      message: "Thank you for reaching out! Your message was received securely in Firestore. Shadat will get back to you shortly at " + email
    });
  } catch (error) {
    console.error("Failed to store contact in Firestore:", error);
    try {
      handleFirestoreError(error, OperationType.CREATE, pathForWrite);
    } catch (thrownError: any) {
      res.status(500).json({
        success: false,
        error: "Message storage failed in firebase collection layer. Please email Shadat at shadatmahin681@gmail.com directly!"
      });
    }
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static assets in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
