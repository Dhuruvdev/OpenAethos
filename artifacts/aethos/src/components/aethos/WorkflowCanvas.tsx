import { useState } from "react";
import {
  AtSign,
  Send,
  Calendar,
  Sheet,
  FileText,
  Mail,
  Plus,
  Mic,
  Zap,
  Database,
  Bot,
  SendHorizontal,
  GitBranch,
  CheckCircle2,
  MoreHorizontal,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  Sparkles,
  PlayCircle,
  FileCheck,
} from "lucide-react";
import { AethosLogo } from "./AethosLogo";

interface WorkflowCanvasProps {
  state: "empty" | "loading" | "workflow";
  inputValue: string;
  projectName?: string;
  projectPrompt?: string;
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
      className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
      style={{
        background: "linear-gradient(145deg, rgba(125,199,232,0.16), rgba(255,159,92,0.16))",
        boxShadow: "0 8px 18px rgba(125,199,232,0.22), inset 0 1px 0 rgba(255,255,255,0.72)",
      }}
    >
      <AethosLogo size={27} />
    </div>
  );
}

/* ── Loading state ── */
function LoadingState({ projectName }: { projectName?: string }) {
  return (
    <div className="flex-1 relative overflow-hidden flex items-center justify-center px-5">
      <div className="absolute inset-0 workflow-grid opacity-70" />
      <div className="absolute w-[520px] h-[520px] rounded-full ai-orb-glow" />
      <div className="relative w-full max-w-[680px] rounded-[34px] p-4 ai-build-shell">
        <div className="rounded-[28px] overflow-hidden bg-white/82 border border-white/80 shadow-[0_24px_70px_rgba(91,84,58,0.18)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#eadfcd]/70">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl flex items-center justify-center bg-[#fff7df]">
                <AethosLogo size={32} />
              </div>
              <div>
                <p className="text-[16px] font-semibold tracking-[-0.035em] text-[#18202B]">OpenAethos is building</p>
                <p className="text-[12px] text-[#7a7166]">{projectName ? `Saving “${projectName}” as a new project` : "Reading your request and mapping the flow"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[#eef8fb] text-[#3d8caf] text-[12px] font-semibold">
              <Sparkles size={13} />
              Thinking
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[330px] bg-[#fffdf8] overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 680 330" fill="none">
              <path className="ai-path-draw" d="M122 164 C210 88 286 88 346 154 C400 214 467 226 560 151" stroke="url(#openPath)" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 9" />
              <path className="ai-path-draw path-delay-1" d="M122 164 C215 245 315 248 374 191 C423 143 479 119 560 151" stroke="url(#openPath2)" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 9" />
              <defs>
                <linearGradient id="openPath" x1="110" y1="120" x2="560" y2="170">
                  <stop stopColor="#7DC7E8" />
                  <stop offset="0.5" stopColor="#FFE38A" />
                  <stop offset="1" stopColor="#FF9F5C" />
                </linearGradient>
                <linearGradient id="openPath2" x1="110" y1="210" x2="560" y2="120">
                  <stop stopColor="#FF9F5C" />
                  <stop offset="0.55" stopColor="#FFE38A" />
                  <stop offset="1" stopColor="#7DC7E8" />
                </linearGradient>
              </defs>
            </svg>
            {[
              { icon: Zap, label: "Trigger", x: "13%", y: "39%", delay: "0s" },
              { icon: Database, label: "Data", x: "43%", y: "23%", delay: ".22s" },
              { icon: Bot, label: "AI draft", x: "50%", y: "56%", delay: ".44s" },
              { icon: SendHorizontal, label: "Send", x: "80%", y: "37%", delay: ".66s" },
            ].map(({ icon: Icon, label, x, y, delay }) => (
              <div key={label} className="absolute ai-node-pop" style={{ left: x, top: y, animationDelay: delay }}>
                <div className="w-[112px] rounded-2xl bg-white border border-[#efe4d0] shadow-[0_14px_34px_rgba(91,84,58,0.13)] px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#e6f7ff] via-[#fff6d8] to-[#ffe1c5]">
                      <Icon size={15} className="text-[#18202B]" />
                    </span>
                    <span className="text-[12px] font-semibold text-[#18202B]">{label}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute left-1/2 bottom-7 -translate-x-1/2 w-[78%] max-w-[460px]">
              <div className="h-2 rounded-full bg-[#efe8dc] overflow-hidden">
                <div className="h-full rounded-full ai-progress" />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-[#685f55]">
                <span className="thinking-dot" />
                Naming project
                <span className="thinking-dot dot-delay-1" />
                Connecting logic
                <span className="thinking-dot dot-delay-2" />
              </div>
            </div>
          </div>
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

function WorkflowNodeCard({
  className,
  icon: Icon,
  title,
  subtitle,
  accent,
}: {
  className: string;
  icon: typeof Zap;
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <div className={`absolute workflow-node-card ${className}`}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: accent }}>
          <Icon size={17} className="text-[#18202B]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#18202B] truncate">{title}</p>
          <p className="text-[11px] text-[#766d63] truncate">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function MobileWorkflowNodes({ projectName, projectPrompt }: { projectName?: string; projectPrompt?: string }) {
  const steps = [
    { Icon: Calendar, title: "Trigger", desc: "Start when this task is due", tone: "from-[#e4f7ff] to-[#fff4cb]" },
    { Icon: Sheet, title: "Collect data", desc: "Fetch the right source records", tone: "from-[#edf9ef] to-[#e4f7ff]" },
    { Icon: Bot, title: "AI decision", desc: "Summarize, classify, and prepare output", tone: "from-[#fff4cb] to-[#ffe1c5]" },
    { Icon: Mail, title: "Deliver", desc: "Send the final result to the right place", tone: "from-[#e4f7ff] to-[#ffe1c5]" },
  ];

  return (
    <div className="sm:hidden flex-1 min-h-0 overflow-y-auto workflow-enter px-3 py-3">
      <div className="rounded-[28px] overflow-hidden bg-[#fffdf9] border border-white/90 shadow-[0_22px_60px_rgba(91,84,58,0.18)]">
        <div className="p-4 bg-gradient-to-br from-[#171717] via-[#202836] to-[#3f3327] text-white">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-2xl bg-[#fff4cb] flex items-center justify-center">
              <Zap size={18} className="text-[#171717]" fill="#171717" />
            </div>
            <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold border border-white/15">AI generated</span>
          </div>
          <h2 className="mt-5 text-[27px] leading-[1.02] tracking-[-0.05em] font-semibold">{projectName ?? "Workflow Project"}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/72 line-clamp-3">{projectPrompt ?? "A new OpenAethos workflow project is ready to review."}</p>
        </div>

        <div className="p-4 bg-[#eeeafc] border-b border-[#ded7f6]">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#7a738c] mb-3">Workflow steps</p>
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-white/68 p-2 text-center border border-white/80">
                <span className="mx-auto mb-1 h-5 w-5 rounded-full bg-white flex items-center justify-center text-[10px] text-[#4d4760]">{index + 1}</span>
                <p className="text-[10.5px] leading-tight text-[#5f5971]">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative workflow-grid bg-[#fffdf9] p-4">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-[#7DC7E8] via-[#FFE38A] to-[#FF9F5C]" />
          <div className="space-y-3">
            {steps.map(({ Icon, title, desc, tone }, index) => (
              <div key={title} className={`relative pl-10 workflow-node-pop delay-node-${Math.min(index + 1, 4)}`}>
                <div className={`absolute left-0 top-4 h-8 w-8 rounded-2xl bg-gradient-to-br ${tone} flex items-center justify-center border border-white shadow-[0_8px_20px_rgba(91,84,58,0.12)]`}>
                  <Icon size={15} className="text-[#18202B]" />
                </div>
                <div className="rounded-[22px] bg-white/92 border border-[#efe4d0] p-4 shadow-[0_12px_30px_rgba(91,84,58,0.10)]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-[#18202B]">{title}</h3>
                    <span className="rounded-full bg-[#eef8fb] px-2.5 py-1 text-[10px] font-semibold text-[#3d8caf]">Ready</span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#756c61]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] bg-white border border-[#efe4d0] p-3 shadow-[0_18px_45px_rgba(91,84,58,0.13)]">
            <div className="h-[86px] rounded-2xl mb-3 bg-[radial-gradient(circle_at_50%_35%,#fff8d7,transparent_28%),radial-gradient(circle_at_38%_42%,#dff5ff,transparent_30%),linear-gradient(135deg,#fffdf8,#ffe3bf)] flex items-center justify-center">
              <AethosLogo size={50} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#18202B]">Workflow generated</p>
                <p className="text-[11px] text-[#766d63]">Review output before activation</p>
              </div>
              <button className="h-9 px-4 rounded-xl bg-[#18202B] text-white text-[11px] font-semibold">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowNodes({ projectName, projectPrompt }: { projectName?: string; projectPrompt?: string }) {
  return (
    <>
    <div className="hidden sm:block flex-1 p-4 sm:p-6 overflow-hidden workflow-enter">
      <div className="relative mx-auto h-full max-w-[980px] rounded-[28px] overflow-hidden bg-[#fffdf9] border border-white/90 shadow-[0_34px_80px_rgba(91,84,58,0.18)]">
        <div className="absolute inset-y-0 left-0 w-10 bg-[#171717] z-20 flex flex-col items-center py-4 gap-3">
          <div className="h-6 w-6 rounded-lg bg-[#fff2bd] flex items-center justify-center">
            <Zap size={13} className="text-[#171717]" fill="#171717" />
          </div>
          {[Database, Bot, FileCheck, SlidersHorizontal].map((Icon, index) => (
            <div key={index} className="h-7 w-7 rounded-lg flex items-center justify-center text-white/48 hover:bg-white/10">
              <Icon size={14} />
            </div>
          ))}
          <div className="mt-auto h-7 w-7 rounded-lg bg-white/10" />
        </div>

        <div className="absolute inset-y-0 left-10 w-[154px] bg-[#eeeafc] border-r border-[#ded7f6] z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] font-semibold text-[#252032]">Workflow</p>
            <MoreHorizontal size={15} className="text-[#77718a]" />
          </div>
          <div className="h-2 w-20 rounded-full bg-[#201b2a] mb-5" />
          <div className="space-y-3">
            {["New lead", "Fetch sheet", "AI summary", "Manager email"].map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-[11px] text-[#5f5971]">
                <span className="h-4 w-4 rounded-full flex items-center justify-center text-[9px] bg-white/75 text-[#4d4760]">{index + 1}</span>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#7a738c] mb-2">Status</p>
            {["Running", "Ready", "Needs review"].map((item, index) => (
              <div key={item} className="flex items-center gap-2 py-1.5 text-[11px] text-[#625c70]">
                <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#7DC7E8]" : index === 1 ? "bg-[#FFE38A]" : "bg-[#FF9F5C]"}`} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-[194px] right-0 workflow-grid bg-[#fffdf9]">
          <div className="absolute top-4 left-5 right-5 h-10 rounded-2xl bg-white/82 border border-[#efe4d0] flex items-center justify-between px-4 shadow-[0_10px_26px_rgba(91,84,58,0.08)]">
            <div className="flex items-center gap-2 text-[12px] text-[#6d645b]">
              <PlayCircle size={14} className="text-[#7DC7E8]" />
              {projectName ?? "Weekly report automation"}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 px-2 rounded-full bg-[#eef8fb] flex items-center text-[11px] font-semibold text-[#3d8caf]">AI generated</span>
              <button className="h-7 px-3 rounded-full text-[11px] font-semibold text-white bg-[#18202B]">Activate</button>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 760 520" fill="none">
            <path className="draw-path flow-dash" d="M96 212 C175 123 268 119 346 189 C418 254 495 260 604 178" stroke="url(#flowMain)" strokeWidth="2.2" strokeLinecap="round" />
            <path className="draw-path flow-dash delay-draw-1" d="M96 212 C176 316 283 326 375 253 C438 202 502 184 604 178" stroke="url(#flowAlt)" strokeWidth="2.2" strokeLinecap="round" />
            <path className="draw-path flow-dash delay-draw-2" d="M346 189 C389 160 432 143 493 119" stroke="#d7c7a4" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 8" />
            <defs>
              <linearGradient id="flowMain" x1="90" y1="170" x2="610" y2="190">
                <stop stopColor="#7DC7E8" />
                <stop offset=".52" stopColor="#FFE38A" />
                <stop offset="1" stopColor="#FF9F5C" />
              </linearGradient>
              <linearGradient id="flowAlt" x1="96" y1="290" x2="604" y2="175">
                <stop stopColor="#FF9F5C" />
                <stop offset=".52" stopColor="#FFE38A" />
                <stop offset="1" stopColor="#7DC7E8" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute left-[9%] top-[35%] h-3 w-3 rounded-full bg-[#18202B] shadow-[0_0_0_7px_rgba(24,32,43,0.06)]" />
          <WorkflowNodeCard className="left-[18%] top-[20%] delay-node-1" icon={Calendar} title="Schedule trigger" subtitle={projectPrompt ? "From task request" : "Every Monday at 9 AM"} accent="linear-gradient(135deg,#e4f7ff,#fff4cb)" />
          <WorkflowNodeCard className="left-[39%] top-[36%] delay-node-2" icon={Sheet} title="Fetch sales sheet" subtitle="Read newest rows" accent="linear-gradient(135deg,#edf9ef,#e6f7ff)" />
          <WorkflowNodeCard className="left-[34%] top-[62%] delay-node-3" icon={Bot} title="AI summarizer" subtitle="Draft clean highlights" accent="linear-gradient(135deg,#fff4cb,#ffe1c5)" />
          <WorkflowNodeCard className="left-[66%] top-[24%] delay-node-4" icon={FileText} title="Review report" subtitle="Human-friendly card" accent="linear-gradient(135deg,#f0ecff,#fff4cb)" />
          <WorkflowNodeCard className="left-[69%] top-[58%] delay-node-5" icon={Mail} title="Send to manager" subtitle="manager@company.com" accent="linear-gradient(135deg,#e4f7ff,#ffe1c5)" />

          <div className="absolute right-6 top-[22%] w-[160px] rounded-[22px] bg-white border border-[#efe4d0] shadow-[0_18px_45px_rgba(91,84,58,0.13)] p-3 workflow-node-pop delay-node-6">
            <div className="h-[70px] rounded-2xl mb-3 bg-[radial-gradient(circle_at_50%_35%,#fff8d7,transparent_28%),radial-gradient(circle_at_38%_42%,#dff5ff,transparent_30%),linear-gradient(135deg,#fffdf8,#ffe3bf)] flex items-center justify-center">
              <AethosLogo size={42} />
            </div>
            <p className="text-[12px] font-semibold text-[#18202B]">Update summary in API</p>
            <p className="text-[10.5px] text-[#766d63] mt-1">Clean status handoff</p>
            <button className="mt-3 h-8 w-full rounded-xl bg-[#18202B] text-white text-[11px] font-semibold">View output</button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white/88 border border-[#efe4d0] shadow-[0_14px_30px_rgba(91,84,58,0.10)] p-1.5 flex flex-col gap-1">
            {[ZoomIn, ZoomOut, Plus, SlidersHorizontal].map((Icon, index) => (
              <button key={index} className="h-8 w-8 rounded-xl flex items-center justify-center text-[#756c61] hover:bg-[#fff4dd]">
                <Icon size={14} />
              </button>
            ))}
          </div>

          <div className="absolute left-[44%] top-[50%] rounded-full bg-[#18202B] text-white text-[10px] px-2.5 py-1 shadow-[0_10px_24px_rgba(24,32,43,0.18)] workflow-node-pop delay-node-5">
            AI decision
          </div>
          <div className="absolute bottom-5 left-6 flex items-center gap-2 rounded-full bg-white/82 border border-[#efe4d0] px-3 py-2 shadow-[0_12px_28px_rgba(91,84,58,0.10)]">
            <CheckCircle2 size={14} className="text-[#58a97b]" />
            <span className="text-[11px] font-semibold text-[#5d554b]">Workflow generated</span>
          </div>
        </div>
      </div>
    </div>
    <MobileWorkflowNodes projectName={projectName} projectPrompt={projectPrompt} />
    </>
  );
}

/* ── Empty state ── */
function EmptyState({ inputValue, onInputChange, onSubmit, onChipClick }: Omit<WorkflowCanvasProps, "state">) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-7 px-5 py-8">
      <h1 className="text-[31px] sm:text-[40px] font-semibold tracking-[-0.045em] text-[#18202B] text-center leading-[1.04]">
        Open the work you want
        <br />
        to automate
      </h1>

      <div
        className="w-full max-w-[560px] rounded-[32px] p-2 transition-all duration-300"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.88))",
          border: focused
            ? "1px solid rgba(125,199,232,0.62)"
            : "1px solid rgba(255,255,255,0.78)",
          boxShadow: focused
            ? "0 0 0 6px rgba(125,199,232,0.14), 0 22px 55px rgba(91,84,58,0.17), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 20px 48px rgba(91,84,58,0.15), 0 6px 16px rgba(91,84,58,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
        }}
      >
        <div className="rounded-[26px] px-4 py-3.5" style={{ background: "rgba(255,255,255,0.62)" }}>
          <div className="flex items-start gap-3.5">
            <SheetsIcon />
            <textarea
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ask OpenAethos to turn a task into a flow..."
              className="min-h-[72px] flex-1 bg-transparent text-[15px] text-gray-800 placeholder:text-gray-400 outline-none resize-none leading-relaxed pt-1"
              rows={3}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-100/80">
                <Plus size={17} strokeWidth={2} />
              </button>
              <button className="h-9 px-3 rounded-full flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-100/80">
                <AtSign size={14} />
                Mention
              </button>
              <button className="h-9 w-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-100/80">
                <Mic size={15} />
              </button>
            </div>

            <button
              onClick={onSubmit}
              disabled={!inputValue.trim()}
              className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-35 disabled:scale-95 active:scale-95"
              style={{
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #18202B 0%, #7DC7E8 48%, #FF9F5C 100%)"
                  : "rgba(17,24,39,0.08)",
                boxShadow: inputValue.trim()
                  ? "0 12px 24px rgba(125,199,232,0.28)"
                  : "none",
              }}
            >
              <Send size={16} className={inputValue.trim() ? "text-white" : "text-gray-400"} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {chips.map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => onChipClick(label)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-medium text-gray-600 transition-all duration-150 hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(132,105,72,0.12)",
              boxShadow: "0 1px 4px rgba(70,68,56,0.06)",
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
export function WorkflowCanvas({ state, inputValue, projectName, projectPrompt, onInputChange, onSubmit, onChipClick }: WorkflowCanvasProps) {
  return (
    <div className="flex-1 min-h-0 relative overflow-hidden flex items-stretch p-0 sm:p-0">
      <div
        className="flex-1 min-h-0 overflow-hidden flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 15%, rgba(147,217,249,0.68) 0%, transparent 60%), " +
            "radial-gradient(ellipse 55% 50% at 82% 8%, rgba(255,228,149,0.56) 0%, transparent 55%), " +
            "radial-gradient(ellipse 65% 50% at 50% 95%, rgba(255,177,107,0.54) 0%, transparent 60%), " +
            "radial-gradient(ellipse 48% 40% at 88% 78%, rgba(255,155,95,0.32) 0%, transparent 50%), " +
            "linear-gradient(155deg, #d9f0fb 0%, #eff6ef 42%, #fff0cf 70%, #ffd8ad 100%)",
          border: "1px solid rgba(255,255,255,0.70)",
          boxShadow: "0 2px 20px rgba(70,68,56,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
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
        {state === "loading" && <LoadingState projectName={projectName} />}
        {state === "workflow" && <WorkflowNodes projectName={projectName} projectPrompt={projectPrompt} />}
      </div>
    </div>
  );
}
