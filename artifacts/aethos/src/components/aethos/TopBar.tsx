import { useState } from "react";
import { AethosLogo } from "./AethosLogo";
import { Bell, Mail, ChevronRight, Search } from "lucide-react";

interface TopBarProps {
  onSearch: (query: string) => void;
  searchValue: string;
  onRunAll: () => void;
}

export function TopBar({ onSearch, searchValue, onRunAll }: TopBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="glass-strong flex items-center gap-4 px-5 py-3 border-b border-white/60 relative z-20">
      {/* Logo */}
      <div className="flex items-center gap-2.5 shrink-0">
        <AethosLogo size={30} />
        <span className="text-[17px] font-semibold tracking-tight text-[#1A1A1A]">Aethos</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-[520px] mx-auto">
        <div
          className={`flex items-center gap-2.5 bg-white/80 border rounded-2xl px-4 py-2.5 transition-all duration-200 ${
            focused
              ? "border-blue-300/80 shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
              : "border-[#EAEAEA] shadow-[var(--shadow-xs)]"
          }`}
        >
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Describe a workflow..."
            className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue.trim()) {
                onRunAll();
              }
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/60 border border-[#EAEAEA] hover:bg-white/90 hover:shadow-sm transition-all duration-150 group">
          <Mail size={16} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
        </button>
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-white/60 border border-[#EAEAEA] hover:bg-white/90 hover:shadow-sm transition-all duration-150 group">
          <Bell size={16} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400 rounded-full border border-white" />
        </button>
        <button
          onClick={onRunAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #f97316 60%, #fbbf24 100%)",
            boxShadow: "0 2px 8px rgba(96,165,250,0.3)",
          }}
        >
          Run All
          <ChevronRight size={14} />
        </button>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 flex items-center justify-center text-xs font-semibold text-white shadow-sm ml-1 cursor-pointer hover:opacity-85 transition-opacity">
          D
        </div>
      </div>
    </div>
  );
}
