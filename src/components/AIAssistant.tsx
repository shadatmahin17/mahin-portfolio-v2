import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  X, 
  CornerDownRight, 
  HelpCircle, 
  Loader2 
} from "lucide-react";
import { ChatMessage } from "../types";

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I am Mahin's AI Twin. Ask me anything about my wet processing major, lead generation at Aurwave, or technical projects!",
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll automatically
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (presetText?: string) => {
    const queryText = presetText || input;
    if (!queryText.trim()) return;

    // Add user message to state
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    if (!presetText) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg),
          message: queryText
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I was unable to establish a smart connection. Let's talk directly via email at shadatmahin681@gmail.com!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "bot",
          text: "I experienced a brief server loss. Please contact Shadat directly at shadatmahin681@gmail.com for prompt follow-ups!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const presetSuggestions = [
    "Verify your Wet Processing major details.",
    "Tell me about Aurwave Client Acquisition.",
    "Do you know MATLAB or fashion design?",
    "How can I hire you?"
  ];

  return (
    <>
      {/* Floating activation button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--gold-light)] text-white shadow-2xl hover:scale-115 active:scale-95 transition-all z-[4000] flex items-center gap-2 group border border-amber-400/25"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-black" />
          <span className="text-xs font-semibold text-neutral-900 tracking-wider uppercase max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
            Chat with AI Twin
          </span>
          {/* Unread dot indicator */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-bounce" />
        </button>
      )}

      {/* Main chat layout */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[350px] md:w-[390px] h-[480px] sm:h-[520px] bg-white rounded-3xl shadow-2xl border border-neutral-200/80 z-[4900] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex items-center justify-between border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--accent-glow)] text-[var(--accent)] rounded-2xl border border-amber-400/25">
                <Bot className="w-5 h-5 animate-bounce-slow" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs tracking-wide text-[var(--accent)] uppercase">AI Recruiter Assistant</h4>
                <p className="text-[10px] text-neutral-400">Mahin's Virtual Twin Mode</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages layout */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${
                  msg.sender === "user" ? "bg-[var(--accent)] text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed text-left shadow-sm ${
                  msg.sender === "user"
                    ? "bg-neutral-900 text-white rounded-tr-none"
                    : "bg-white text-neutral-800 border border-neutral-200/50 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 bg-neutral-200 text-neutral-600">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white text-neutral-400 border border-neutral-200/50 rounded-2xl rounded-tl-none font-medium text-xs flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" /> 
                  Generating response...
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick preset chips */}
          <div className="px-3 py-2 bg-neutral-50 border-t border-neutral-100 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {presetSuggestions.map((suggest) => (
              <button
                key={suggest}
                onClick={() => sendMessage(suggest)}
                disabled={isLoading}
                className="text-[10px] font-semibold text-neutral-600 bg-white border border-neutral-200 px-3 py-1.5 rounded-full hover:border-[var(--accent)] hover:text-neutral-900 transition-all shrink-0 flex items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <CornerDownRight className="w-3 h-3 text-[var(--accent)]" /> {suggest.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Chat input box */}
          <div className="p-3 bg-white border-t border-neutral-200/80 flex gap-2 items-center flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder="Query Shadat's wet processing or work experience..."
              className="flex-1 text-xs border border-neutral-200 px-3.5 py-2.5 rounded-xl focus:border-[var(--accent)] focus:outline-none placeholder:text-neutral-300 transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-30 disabled:hover:bg-neutral-900 transition-colors shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
