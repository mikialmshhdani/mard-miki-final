import { useState } from "react";

export function GenieAvatar() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full bg-cyan-400/30 blur-md transition-all duration-300 ${
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-70"
          }`}
        />
        
        {/* Ping effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
        )}
        
        {/* Avatar container */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
            {/* Genie mascot SVG */}
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8"
              style={{ filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.5))" }}
            >
              {/* Genie body */}
              <ellipse cx="20" cy="24" rx="10" ry="12" fill="url(#genieGradient)" />
              
              {/* Genie head */}
              <circle cx="20" cy="12" r="8" fill="url(#genieGradient)" />
              
              {/* Eyes */}
              <ellipse cx="17" cy="11" rx="2" ry="2.5" fill="#0f172a" />
              <ellipse cx="23" cy="11" rx="2" ry="2.5" fill="#0f172a" />
              
              {/* Eye glow */}
              <circle cx="17" cy="10.5" r="1" fill="#22d3ee" className={isHovered ? "animate-pulse" : ""} />
              <circle cx="23" cy="10.5" r="1" fill="#22d3ee" className={isHovered ? "animate-pulse" : ""} />
              
              {/* Smile */}
              <path
                d="M 15 15 Q 20 19 25 15"
                stroke="#22d3ee"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Smoke wisps */}
              <path
                d="M 8 28 Q 6 32 8 36"
                stroke="#22d3ee"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
              />
              <path
                d="M 32 28 Q 34 32 32 36"
                stroke="#22d3ee"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="genieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Floating particles on hover */}
        {isHovered && (
          <>
            <div
              className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "100ms" }}
            />
            <div
              className="absolute top-1/2 -right-2 w-1 h-1 bg-indigo-400 rounded-full animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
          </>
        )}
      </div>
    </div>
  );
}