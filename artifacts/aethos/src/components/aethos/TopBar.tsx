import { useState } from "react";
import { AethosLogo } from "./AethosLogo";
import { Bell, Mail, Search, Menu } from "lucide-react";

interface TopBarProps {
  onSearch: (query: string) => void;
  searchValue: string;
  onRunAll: () => void;
  onMenuToggle?: () => void;
}

export function TopBar({ onSearch, searchValue, onRunAll, onMenuToggle }: TopBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="glass-topbar flex items-center gap-3 px-5 py-3.5 border-b relative z-20"
      style={{ borderColor: "rgba(132,105,72,0.12)" }}
    >
      {/* Mobile menu button */}
      <button
        className="sm:hidden w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white/60 transition-colors shrink-0"
        onClick={onMenuToggle}
      >
        <Menu size={18} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <AethosLogo size={28} />
        <span className="hidden sm:block text-[19px] font-semibold tracking-[-0.035em] text-[#18202B]">OpenAethos</span>
      </div>

      {/* Search bar — centered, takes most space */}
      <div className="flex-1 max-w-[500px] mx-auto">
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-200"
          style={{
            background: focused ? "rgba(255,255,255,0.96)" : "rgba(255,252,246,0.82)",
            border: focused
              ? "1px solid rgba(114,184,222,0.58)"
              : "1px solid rgba(132,105,72,0.12)",
            boxShadow: focused
              ? "0 0 0 3px rgba(114,184,222,0.16)"
              : "0 1px 4px rgba(70,68,56,0.06)",
          }}
        >
          <Search size={15} className="text-gray-400 shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Open a workflow..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none min-w-0"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue.trim()) onRunAll();
            }}
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        {/* Mail */}
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 hover:bg-white/70"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(132,105,72,0.12)",
            boxShadow: "0 1px 3px rgba(70,68,56,0.06)",
          }}
        >
          <Mail size={16} className="text-gray-500" strokeWidth={1.8} />
        </button>

        {/* Bell */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 hover:bg-white/70"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(132,105,72,0.12)",
            boxShadow: "0 1px 3px rgba(70,68,56,0.06)",
          }}
        >
          <Bell size={16} className="text-gray-500" strokeWidth={1.8} />
          <span
            className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full border border-white"
            style={{ background: "#FFA552" }}
          />
        </button>

        {/* Run All */}
        <button
          onClick={onRunAll}
          className="flex items-center gap-1.5 px-4 py-[9px] rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap"
          style={{
            background: "linear-gradient(105deg, #7DC7E8 0%, #FFE38A 48%, #FF9F5C 100%)",
            boxShadow: "0 2px 12px rgba(255,159,92,0.32)",
          }}
        >
          Open Flow
        </button>
      </div>
    </div>
  );
}
