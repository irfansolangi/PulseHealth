"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am PulseAI, your health and wellness assistant. How can I help you today? You can ask me about fitness tracking, BMI calculators, circadian rhythm sleep hacks, or nutritional performance.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How do I use the fitness tracker?",
    "Calculate my BMI guidelines",
    "What is circadian rhythm sleep?",
    "Best foods for cognitive focus",
  ];

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with chat service");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const assistantMsg: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my backend service right now. Please verify your FastAPI backend is running on local environments, or ask me another question.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] sm:w-[400px] flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-emerald-950/20 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/60 to-teal-900/60 px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
                  PulseAI Companion
                  <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-emerald-400">Online | Smart Helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 custom-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2.5 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-lg text-[10px]",
                    msg.role === "user"
                      ? "bg-teal-500 text-slate-950"
                      : "bg-slate-900 border border-slate-800 text-emerald-400"
                  )}
                >
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-medium rounded-tr-none"
                      : "bg-slate-900/60 border border-slate-800/80 text-slate-300 rounded-tl-none"
                  )}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <Bot className="h-4 w-4 animate-bounce" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-slate-900/40 border border-slate-800/80 px-4 py-2.5 text-slate-400 text-sm">
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce delay-100" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce delay-200" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-900">
              <p className="text-[10px] text-slate-500 mb-1.5">Suggested Questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-left text-xs bg-slate-900/85 hover:bg-slate-900 text-slate-400 hover:text-emerald-400 rounded-lg px-2.5 py-1 border border-slate-900 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fitness logs, calculators..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Toggle chat assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-950 text-[8px] font-bold text-emerald-400 border border-slate-900 animate-pulse">
              1
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
