import { useEffect, useState } from "react";
import { AethosLogo } from "./AethosLogo";
import { Edit3, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";

interface AIPanelProps {
  state: "idle" | "explaining" | "ready";
  onEdit: () => void;
  onRegenerate: () => void;
  onActivate: () => void;
}

const EXPLANATION =
  "OpenAethos opens a clear path from request to result. This flow fetches your sales data, drafts a polished summary, and sends it to your manager every Monday morning — without another manual step.";

function useTyping(text: string, active: boolean, speed = 16) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setShown(""); setDone(false); return; }
    let i = 0;
    setShown("");
    setDone(false);
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [active, text]);

  return { shown, done };
}

/* ── Idle ── */
function IdlePanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Title block */}
      <div className="px-4 pt-4 pb-3">
        <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-2 leading-snug">
          OpenAethos Studio
        </h3>
        <p className="text-[12.5px] text-gray-500 leading-relaxed">
          Hi <span className="font-semibold text-[#1A1A1A]">David</span>, describe the work once. OpenAethos turns it into a calm, running flow.
        </p>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-3" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />

      {/* How it works */}
      <div className="px-4 mb-4">
        <p className="text-[11.5px] font-semibold text-gray-700 mb-3">How it works</p>
        <div className="flex flex-col gap-3">
          {[
            "Tell OpenAethos the task",
            "Review the flow it creates",
            "Confirm and let it run",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                style={{
                  background: "rgba(0,0,0,0.06)",
                  color: "#6B7280",
                }}
              >
                {i + 1}
              </div>
              <span className="text-[12.5px] text-gray-600">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA card */}
      <div className="mt-auto mx-3 mb-3">
        <div
          className="rounded-2xl p-3.5"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo + text row */}
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(125,199,232,0.16), rgba(255,159,92,0.16))",
                border: "1px solid rgba(125,199,232,0.18)",
              }}
            >
              <AethosLogo size={24} />
            </div>
            <p className="text-[12px] text-gray-500 leading-snug flex-1">
              Turn a plain request into a workflow you can trust.
            </p>
          </div>

          {/* Get started button */}
          <button
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(105deg, #7DC7E8 0%, #FFE38A 50%, #FF9F5C 100%)",
              boxShadow: "0 2px 10px rgba(255,159,92,0.32)",
            }}
          >
            Create a Flow
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Explaining ── */
function ExplainingPanel({ onEdit, onRegenerate, onActivate }: Omit<AIPanelProps, "state">) {
  const { shown, done } = useTyping(EXPLANATION, true);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1">OpenAethos Response</h3>
        <div
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{ background: "rgba(125,199,232,0.12)", border: "1px solid rgba(125,199,232,0.22)" }}
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[#7DC7E8] animate-pulse" />
          <span className="text-[10.5px] font-semibold text-[#3d8caf]">Streaming logic</span>
        </div>
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        <div
          className="rounded-2xl p-3.5"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,250,241,0.66))",
            border: "1px solid rgba(239,228,208,0.9)",
            boxShadow: "0 12px 30px rgba(91,84,58,0.08)",
          }}
        >
          <div className="flex items-start gap-2.5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-[#fff4dd] shrink-0">
              <AethosLogo size={22} />
            </div>
            <p className="text-[12.5px] text-gray-600 leading-relaxed pt-0.5">
              {shown}
              {!done && (
                <span className="cursor-blink inline-block w-[2px] h-[13px] bg-[#7DC7E8] ml-0.5 align-middle rounded-full" />
              )}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2">
          {["Trigger mapped", "Data source connected", "AI summary prepared"].map((item, index) => (
            <div
              key={item}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[11.5px] text-[#665d53] workflow-node-pop delay-node-${Math.min(index + 1, 3)}`}
              style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(239,228,208,0.72)" }}
            >
              <CheckCircle2 size={13} className={index === 0 ? "text-[#7DC7E8]" : index === 1 ? "text-[#d9b94f]" : "text-[#FF9F5C]"} />
              {item}
            </div>
          ))}
        </div>

        {done && (
          <div
            className="mt-4 p-3 rounded-xl fade-in"
            style={{ background: "rgba(125,199,232,0.08)", border: "1px solid rgba(125,199,232,0.18)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-[6px] h-[6px] rounded-full bg-green-400" />
              <span className="text-[11px] font-semibold text-gray-700">Ready to activate</span>
            </div>
            <p className="text-[11px] text-gray-500">Runs every Monday at 9:00 AM</p>
          </div>
        )}
      </div>

      {done && (
        <div
          className="p-3 flex flex-col gap-2 fade-in"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
        >
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium text-gray-600 transition-all duration-150 hover:bg-white/80"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.10)",
              }}
            >
              <Edit3 size={12} />
              Edit Logic
            </button>
            <button
              onClick={onRegenerate}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium text-gray-600 transition-all duration-150 hover:bg-white/80"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.10)",
              }}
            >
              <RefreshCw size={12} />
              Regenerate
            </button>
          </div>
          <button
            onClick={onActivate}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(105deg, #7DC7E8 0%, #FFE38A 50%, #FF9F5C 100%)",
              boxShadow: "0 2px 10px rgba(125,199,232,0.3)",
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

/* ── Ready ── */
function ReadyPanel({ onRegenerate }: { onRegenerate: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 size={15} className="text-green-500" />
          <h3 className="text-[15px] font-bold text-[#1A1A1A]">Workflow Active</h3>
        </div>
        <div
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <div className="w-[6px] h-[6px] rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10.5px] font-semibold text-green-700">Running</span>
        </div>
      </div>

      <div className="flex-1 px-4 flex flex-col gap-3 overflow-y-auto">
        <div
          className="p-3 rounded-xl"
          style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}
        >
          <p className="text-[12px] text-green-700">
            Your OpenAethos flow is live and will run automatically every Monday morning.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Next run</p>
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[12.5px] text-gray-700 font-medium">Monday, Apr 21 · 9:00 AM</span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Stats</p>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "Runs", value: "0" }, { label: "Success rate", value: "—" }].map(({ label, value }) => (
              <div
                key={label}
                className="px-3 py-3 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <p className="text-xl font-bold text-[#1A1A1A]">{value}</p>
                <p className="text-[10.5px] text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <button
          onClick={onRegenerate}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] font-medium text-gray-600 transition-all duration-150 hover:bg-white/80"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <RefreshCw size={13} />
          Create another flow
        </button>
      </div>
    </div>
  );
}

export function AIPanel({ state, onEdit, onRegenerate, onActivate }: AIPanelProps) {
  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,252,246,0.90)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 20px rgba(70,68,56,0.08)",
      }}
    >
      {state === "idle" && <IdlePanel />}
      {state === "explaining" && (
        <ExplainingPanel onEdit={onEdit} onRegenerate={onRegenerate} onActivate={onActivate} />
      )}
      {state === "ready" && <ReadyPanel onRegenerate={onRegenerate} />}
    </div>
  );
}
