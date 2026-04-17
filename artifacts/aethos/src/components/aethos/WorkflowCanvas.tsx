import { useState } from "react";
import { AtSign, Send, Calendar, Sheet, FileText, Mail, ChevronRight } from "lucide-react";

interface WorkflowCanvasProps {
  state: "empty" | "loading" | "workflow";
  inputValue: string;
  onInputChange: (v: string) => void;
  onSubmit: () => void;
  onChipClick: (chip: string) => void;
}

/* ── Chip icons ── */
function WeeklyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#4DA8FF" opacity="0.2" />
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="#4DA8FF" strokeWidth="1.5" fill="none" />
      <rect x="6" y="10" width="3" height="7" rx="1" fill="#4DA8FF" />
      <rect x="10.5" y="7" width="3" height="10" rx="1" fill="#4DA8FF" opacity="0.7" />
      <rect x="15" y="12" width="3" height="5" rx="1" fill="#4DA8FF" opacity="0.5" />
    </svg>
  );
}

function ClientIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.5" fill="#F97316" opacity="0.9" />
      <circle cx="17" cy="9" r="2.5" fill="#F97316" opacity="0.6" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M17 13c2.2.5 4 2.3 4 4.5" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M21 2v6h-6" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M3 22v-6h6" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const chips = [
  { label: "Weekly reports", Icon: WeeklyIcon },
  { label: "Client follow-ups", Icon: ClientIcon },
  { label: "Data sync", Icon: SyncIcon },
];

/* Google Sheets green document icon */
function SheetsIcon() {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: "#1FA463" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="white" opacity="0.9" />
        <path d="M14 2v6h6" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="8" y1="13" x2="16" y2="13" stroke="#1FA463" strokeWidth="1.5" />
        <line x1="8" y1="17" x2="16" y2="17" stroke="#1FA463" strokeWidth="1.5" />
        <line x1="8" y1="9" x2="12" y2="9" stroke="#1FA463" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ── Loading state ── */
function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5">
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-[2.5px] border-transparent spin-slow"
          style={{ borderTopColor: "#60A5FA", borderRightColor: "#A78BFA" }}
        />
        <div
          className="absolute inset-1.5 rounded-full border-[2px] border-transparent spin-rev"
          style={{ borderTopColor: "#F97316", borderLeftColor: "#FBBF24" }}
        />
        <div
          className="absolute inset-3 rounded-full"
          style={{ background: "linear-gradient(135deg, #60A5FA, #F97316)", opacity: 0.5 }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">Building your workflow…</p>
        <div className="flex items-center justify-center gap-1.5">
          <div className="dot-1 w-[6px] h-[6px] rounded-full bg-blue-400" />
          <div className="dot-2 w-[6px] h-[6px] rounded-full bg-purple-400" />
          <div className="dot-3 w-[6px] h-[6px] rounded-full bg-orange-400" />
        </div>
      </div>
    </div>
  );
}

/* ── Node cards ── */
const nodes = [
  {
    Icon: Calendar,
    title: "Monday Trigger",
    desc: "Every Monday at 9:00 AM",
    tag: "Trigger",
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    tagBg: "#DBEAFE",
    tagColor: "#1D4ED8",
    borderColor: "rgba(96,165,250,0.3)",
    gradFrom: "rgba(96,165,250,0.06)",
    gradTo: "rgba(167,139,250,0.04)",
  },
  {
    Icon: Sheet,
    title: "Fetch Sheets Data",
    desc: "Sales report spreadsheet",
    tag: "Action",
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    tagBg: "#DCFCE7",
    tagColor: "#15803D",
    borderColor: "rgba(34,197,94,0.3)",
    gradFrom: "rgba(34,197,94,0.06)",
    gradTo: "rgba(134,239,172,0.04)",
  },
  {
    Icon: FileText,
    title: "Generate Report",
    desc: "AI-powered summary",
    tag: "Action",
    iconBg: "#FFF7ED",
    iconColor: "#EA580C",
    tagBg: "#FFEDD5",
    tagColor: "#C2410C",
    borderColor: "rgba(249,115,22,0.3)",
    gradFrom: "rgba(249,115,22,0.06)",
    gradTo: "rgba(251,191,36,0.04)",
  },
  {
    Icon: Mail,
    title: "Send Email",
    desc: "To manager@company.com",
    tag: "Output",
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    tagBg: "#EDE9FE",
    tagColor: "#6D28D9",
    borderColor: "rgba(167,139,250,0.3)",
    gradFrom: "rgba(167,139,250,0.06)",
    gradTo: "rgba(196,181,253,0.04)",
  },
];

function WorkflowNodes() {
  return (
    <div className="flex-1 flex flex-col gap-0 px-3 py-4 overflow-y-auto">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1 fade-in">
        Workflow Generated
      </p>
      <div className="flex flex-col gap-0">
        {nodes.map((node, i) => {
          const Icon = node.Icon;
          const delay = ["fade-in", "fade-in-delay-1", "fade-in-delay-2", "fade-in-delay-3"][i];
          return (
            <div key={node.title} className={`flex flex-col items-center ${delay}`}>
              {/* Card */}
              <div
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer group transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(120deg, ${node.gradFrom}, ${node.gradTo})`,
                  border: `1px solid ${node.borderColor}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: node.iconBg }}
                >
                  <Icon size={17} style={{ color: node.iconColor }} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-[#1A1A1A]">{node.title}</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: node.tagBg, color: node.tagColor }}
                    >
                      {node.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{node.desc}</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
              </div>

              {/* Connector */}
              {i < nodes.length - 1 && (
                <div className="flex flex-col items-center py-0.5 gap-[2px]">
                  <div className="w-px h-3" style={{ background: "linear-gradient(to bottom, rgba(96,165,250,0.5), rgba(167,139,250,0.5))" }} />
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)" }} />
                  <div className="w-px h-3" style={{ background: "linear-gradient(to bottom, rgba(167,139,250,0.5), rgba(249,115,22,0.4))" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState({ inputValue, onInputChange, onSubmit, onChipClick }: Omit<WorkflowCanvasProps, "state">) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8">
      {/* Heading */}
      <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#1A1A1A] text-center leading-tight">
        Describe what you want
        <br />
        to automate
      </h1>

      {/* Input card */}
      <div
        className="w-full max-w-[440px] rounded-2xl px-4 py-3.5 transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: focused
            ? "1px solid rgba(96,165,250,0.5)"
            : "1px solid rgba(0,0,0,0.10)",
          boxShadow: focused
            ? "0 0 0 3px rgba(96,165,250,0.10), 0 4px 16px rgba(0,0,0,0.08)"
            : "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-start gap-3">
          <SheetsIcon />
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`"Every Monday send sales report from Google Sheets to my manager"`}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none leading-relaxed pt-1"
            rows={2}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
          <div className="flex items-center gap-1 shrink-0 self-end pb-0.5">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <AtSign size={14} />
            </button>
            <button
              onClick={onSubmit}
              disabled={!inputValue.trim()}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30"
              style={{
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #60A5FA, #F97316)"
                  : "transparent",
              }}
            >
              <Send size={13} className={inputValue.trim() ? "text-white" : "text-gray-400"} />
            </button>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {chips.map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => onChipClick(label)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-medium text-gray-600 transition-all duration-150 hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(0,0,0,0.10)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export function WorkflowCanvas({ state, inputValue, onInputChange, onSubmit, onChipClick }: WorkflowCanvasProps) {
  return (
    <div className="flex-1 relative overflow-hidden flex items-stretch p-3 sm:p-4">
      {/* Outer canvas card */}
      <div
        className="flex-1 rounded-3xl overflow-hidden flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 15%, rgba(147,210,255,0.65) 0%, transparent 60%), " +
            "radial-gradient(ellipse 55% 50% at 80% 10%, rgba(190,170,255,0.50) 0%, transparent 55%), " +
            "radial-gradient(ellipse 65% 50% at 50% 95%, rgba(255,175,100,0.50) 0%, transparent 60%), " +
            "radial-gradient(ellipse 45% 40% at 90% 85%, rgba(255,120,80,0.30) 0%, transparent 50%), " +
            "linear-gradient(155deg, #dae8f8 0%, #e5ddf8 45%, #f5e0cc 100%)",
          border: "1px solid rgba(255,255,255,0.70)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {state === "empty" && (
          <EmptyState
            inputValue={inputValue}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onChipClick={onChipClick}
          />
        )}
        {state === "loading" && <LoadingState />}
        {state === "workflow" && <WorkflowNodes />}
      </div>
    </div>
  );
}
