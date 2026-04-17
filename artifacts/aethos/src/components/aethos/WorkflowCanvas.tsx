import { useState, useEffect, useRef } from "react";
import { Calendar, Table, FileText, Mail, Play, ArrowRight, Sparkles, ChevronRight, AtSign, Send } from "lucide-react";

interface WorkflowCanvasProps {
  state: "empty" | "loading" | "workflow";
  inputValue: string;
  onInputChange: (v: string) => void;
  onSubmit: () => void;
  onChipClick: (chip: string) => void;
}

const chips = [
  { label: "Weekly reports", emoji: "📊" },
  { label: "Client follow-ups", emoji: "👥" },
  { label: "Data sync", emoji: "🔄" },
];

const workflowNodes = [
  {
    id: 1,
    icon: Calendar,
    color: "from-blue-400/20 to-blue-300/10",
    border: "border-blue-200/60",
    iconColor: "text-blue-500",
    title: "Monday Trigger",
    desc: "Every Monday at 9:00 AM",
    badge: "Trigger",
    badgeColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: Table,
    color: "from-green-400/15 to-green-300/8",
    border: "border-green-200/60",
    iconColor: "text-green-600",
    title: "Fetch Sheets Data",
    desc: "Sales report spreadsheet",
    badge: "Action",
    badgeColor: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    icon: FileText,
    color: "from-orange-400/15 to-orange-300/8",
    border: "border-orange-200/60",
    iconColor: "text-orange-500",
    title: "Generate Report",
    desc: "AI-powered summary",
    badge: "Action",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    icon: Mail,
    color: "from-purple-400/15 to-purple-300/8",
    border: "border-purple-200/60",
    iconColor: "text-purple-500",
    title: "Send Email",
    desc: "To manager@company.com",
    badge: "Output",
    badgeColor: "bg-purple-100 text-purple-600",
  },
];

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-spin border-t-blue-400" />
          <div className="absolute inset-2 rounded-full border-2 border-orange-200 animate-spin border-t-orange-400" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 opacity-60" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 text-center">Building your workflow</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[0,1,2].map(i => (
              <div key={i} className={`loading-dot w-1.5 h-1.5 rounded-full bg-blue-400`} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowNodes({ visible }: { visible: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="flex flex-col h-full px-2 py-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-5 fade-in-up">
        <Sparkles size={14} className="text-blue-400" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow Generated</span>
      </div>

      {/* Nodes container */}
      <div className="relative">
        {/* SVG connecting lines */}
        <svg
          ref={svgRef}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {[0, 1, 2].map(i => (
            <g key={i}>
              <path
                d={`M 50% ${100 + i * 110 + 60} C 50% ${100 + i * 110 + 80}, 50% ${100 + (i+1) * 110 + 10}, 50% ${100 + (i+1) * 110 + 10}`}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 3"
                className="animated-dash draw-line"
                opacity={visible ? 1 : 0}
                style={{ animationDelay: `${i * 0.15 + 0.3}s` }}
              />
              {/* Arrow head */}
              <polygon
                points={`${0},0 ${-4},${-6} ${4},${-6}`}
                fill="#60a5fa"
                opacity={visible ? 0.7 : 0}
                transform={`translate(0, 0)`}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Node cards */}
        <div className="flex flex-col gap-3 relative z-10">
          {workflowNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className={`fade-in-up group cursor-pointer`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r ${node.color} border ${node.border} transition-all duration-200 hover:shadow-md hover:scale-[1.01] node-glow`}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/80 shadow-sm shrink-0`}>
                    <Icon size={18} className={node.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[#1A1A1A] truncate">{node.title}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${node.badgeColor}`}>{node.badge}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{node.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 mt-1 transition-colors shrink-0" />
                </div>

                {/* Connector dot */}
                {i < workflowNodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-0.5 h-2.5 bg-gradient-to-b from-blue-300 to-orange-300 rounded-full opacity-60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 opacity-70" />
                      <div className="w-0.5 h-2.5 bg-gradient-to-b from-orange-300 to-orange-200 rounded-full opacity-60" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ inputValue, onInputChange, onSubmit, onChipClick }: Omit<WorkflowCanvasProps, "state">) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div className="text-center">
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1A1A1A] leading-tight mb-1">
          Describe what you want
          <br />
          to automate
        </h1>
      </div>

      {/* Input area */}
      <div
        className={`w-full max-w-[440px] bg-white/90 border rounded-2xl p-4 transition-all duration-200 ${
          focused
            ? "border-blue-300/80 shadow-[0_0_0_3px_rgba(96,165,250,0.12)]"
            : "border-[#EAEAEA] shadow-sm"
        }`}
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-start gap-3">
          {/* Sheets icon */}
          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
            <Table size={14} className="text-white" />
          </div>
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`"Every Monday send sales report from Google Sheets to my manager"`}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none leading-relaxed"
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
          <div className="flex items-center gap-1.5 shrink-0 self-end">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <AtSign size={15} />
            </button>
            <button
              onClick={onSubmit}
              disabled={!inputValue.trim()}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-40"
              style={{
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #60a5fa, #f97316)"
                  : "transparent",
                color: inputValue.trim() ? "white" : "#9ca3af",
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {chips.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => onChipClick(label)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 border border-[#EAEAEA] text-xs font-medium text-gray-600 hover:bg-white hover:border-blue-200 hover:text-blue-600 hover:shadow-sm transition-all duration-150"
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function WorkflowCanvas({ state, inputValue, onInputChange, onSubmit, onChipClick }: WorkflowCanvasProps) {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Decorative background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(96,165,250,0.07) 0%, rgba(249,115,22,0.05) 50%, transparent 100%)",
        }}
      />

      {/* Main card */}
      <div className="absolute inset-4 glass rounded-3xl overflow-hidden">
        {state === "empty" && (
          <EmptyState
            inputValue={inputValue}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onChipClick={onChipClick}
          />
        )}
        {state === "loading" && <LoadingState />}
        {state === "workflow" && <WorkflowNodes visible={true} />}
      </div>
    </div>
  );
}
