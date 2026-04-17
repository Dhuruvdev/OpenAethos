import { useState, useEffect } from "react";
import { Sparkles, Edit3, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";
import { AethosLogo } from "./AethosLogo";

interface AIPanelProps {
  state: "idle" | "explaining" | "ready";
  onEdit: () => void;
  onRegenerate: () => void;
  onActivate: () => void;
}

const explanationText =
  "This workflow runs every Monday morning. It automatically fetches your sales data from Google Sheets, uses AI to generate a concise summary report, then sends it directly to your manager's inbox — all without any manual effort.";

function useTypingEffect(text: string, active: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active]);

  return { displayed, done };
}

function IdlePanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/40">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-[#1A1A1A]">AI Workflow Builder</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Hi <span className="font-medium text-[#1A1A1A]">David</span>, I'm here to help you automate your repetitive tasks easily.
        </p>
      </div>

      {/* How it works */}
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-gray-700 mb-3">How it works</p>
        <div className="flex flex-col gap-2.5">
          {[
            "Describe your workflow",
            "Aethos builds it for you",
            "Confirm & activate it..",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold text-gray-500 bg-gray-100">
                {i + 1}
              </div>
              <span className="text-xs text-gray-600">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="mx-3 mt-auto mb-3 rounded-2xl p-3 bg-gradient-to-br from-white/60 to-blue-50/40 border border-blue-100/60" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(249,115,22,0.2))" }}>
            <AethosLogo size={22} />
          </div>
          <p className="text-xs text-gray-600 leading-snug">
            Describe what you need, and I'll set it up!
          </p>
        </div>
        <button
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
            boxShadow: "0 2px 10px rgba(249,115,22,0.3)",
          }}
        >
          Get started
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ExplainingPanel({ onEdit, onRegenerate, onActivate, done }: { onEdit: () => void; onRegenerate: () => void; onActivate: () => void; done: boolean; displayedText: string }) {
  const { displayed, done: typingDone } = useTypingEffect(explanationText, true);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/40">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-[#1A1A1A]">AI Explanation</h3>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs text-gray-600 leading-relaxed">
          {displayed}
          {!typingDone && (
            <span className="cursor-blink inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 align-middle" />
          )}
        </p>

        {typingDone && (
          <div className="mt-4 fade-in-up">
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-50/60 to-orange-50/40 border border-blue-100/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[11px] font-medium text-gray-600">Ready to activate</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span>Runs every Monday at 9:00 AM</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {typingDone && (
        <div className="p-3 flex flex-col gap-2 border-t border-white/40 fade-in-up">
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 bg-white/80 border border-[#EAEAEA] hover:bg-white hover:shadow-sm transition-all duration-150"
            >
              <Edit3 size={12} />
              Edit Logic
            </button>
            <button
              onClick={onRegenerate}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 bg-white/80 border border-[#EAEAEA] hover:bg-white hover:shadow-sm transition-all duration-150"
            >
              <RefreshCw size={12} />
              Regenerate
            </button>
          </div>
          <button
            onClick={onActivate}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #f97316 100%)",
              boxShadow: "0 2px 10px rgba(96,165,250,0.3)",
            }}
          >
            <CheckCircle2 size={15} />
            Confirm & Activate
          </button>
        </div>
      )}
    </div>
  );
}

function ReadyPanel({ onRegenerate }: { onRegenerate: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/40">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-green-500" />
          <h3 className="text-sm font-semibold text-[#1A1A1A]">Workflow Active</h3>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/40 border border-green-200/60">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-700">Running</span>
          </div>
          <p className="text-xs text-green-600">
            Your workflow is live and will run automatically every Monday morning.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Next run</p>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/80 border border-[#EAEAEA]">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-gray-700 font-medium">Monday, Apr 21 · 9:00 AM</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Stats</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Runs", value: "0" },
              { label: "Success rate", value: "—" },
            ].map(({ label, value }) => (
              <div key={label} className="px-3 py-2.5 rounded-xl bg-white/80 border border-[#EAEAEA] text-center">
                <p className="text-lg font-semibold text-[#1A1A1A]">{value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-white/40">
        <button
          onClick={onRegenerate}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white/80 border border-[#EAEAEA] hover:bg-white hover:shadow-sm transition-all duration-150"
        >
          <RefreshCw size={13} />
          Create another workflow
        </button>
      </div>
    </div>
  );
}

export function AIPanel({ state, onEdit, onRegenerate, onActivate }: AIPanelProps) {
  return (
    <div
      className="w-[240px] shrink-0 glass rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      {state === "idle" && <IdlePanel />}
      {state === "explaining" && (
        <ExplainingPanel
          onEdit={onEdit}
          onRegenerate={onRegenerate}
          onActivate={onActivate}
          done={true}
          displayedText={explanationText}
        />
      )}
      {state === "ready" && <ReadyPanel onRegenerate={onRegenerate} />}
    </div>
  );
}
