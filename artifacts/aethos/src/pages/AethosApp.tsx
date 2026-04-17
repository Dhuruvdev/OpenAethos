import { useState, useCallback } from "react";
import { TopBar } from "@/components/aethos/TopBar";
import { Sidebar } from "@/components/aethos/Sidebar";
import { WorkflowCanvas } from "@/components/aethos/WorkflowCanvas";
import { AIPanel } from "@/components/aethos/AIPanel";

type CanvasState = "empty" | "loading" | "workflow";
type AIState = "idle" | "explaining" | "ready";

export default function AethosApp() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [canvasState, setCanvasState] = useState<CanvasState>("empty");
  const [aiState, setAIState] = useState<AIState>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAiMobile, setShowAiMobile] = useState(false);

  const triggerBuild = useCallback(() => {
    setCanvasState("loading");
    setAIState("idle");
    setTimeout(() => {
      setCanvasState("workflow");
      setTimeout(() => setAIState("explaining"), 350);
    }, 1800);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim() && !searchValue.trim()) return;
    triggerBuild();
  }, [inputValue, searchValue, triggerBuild]);

  const handleChipClick = useCallback((chip: string) => {
    setInputValue(chip);
    setTimeout(triggerBuild, 120);
  }, [triggerBuild]);

  const handleRunAll = useCallback(() => {
    if (searchValue.trim()) setInputValue(searchValue);
    triggerBuild();
  }, [searchValue, triggerBuild]);

  const handleRegenerate = useCallback(() => {
    setCanvasState("loading");
    setAIState("idle");
    setTimeout(() => {
      setCanvasState("workflow");
      setTimeout(() => setAIState("explaining"), 350);
    }, 1500);
  }, []);

  const handleActivate = useCallback(() => setAIState("ready"), []);

  return (
    /* Page background — very light cool blue */
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(160deg, #cddff2 0%, #d9d4ee 35%, #e8d8e0 65%, #ecddd6 100%)",
        /* 1 inch (96px) top/left/right, 0 bottom */
        padding: "clamp(16px, 5vw, 96px) clamp(16px, 5vw, 96px) 0",
      }}
    >
      {/* ── App shell — fills from top-margin to bottom of viewport ── */}
      <div
        className="w-full flex flex-col overflow-hidden"
        style={{
          height: "calc(100vh - clamp(16px, 5vw, 96px))",
          /* Rounded only on top corners; flat at the bottom (no space) */
          borderRadius: "clamp(14px, 2vw, 26px) clamp(14px, 2vw, 26px) 0 0",
          background: "rgba(245,247,250,0.82)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.80)",
          borderBottom: "none",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.90) inset, " +
            "0 40px 80px rgba(0,0,0,0.10), " +
            "0 8px 24px rgba(0,0,0,0.07)",
        }}
      >
        {/* Top bar */}
        <TopBar
          onSearch={setSearchValue}
          searchValue={searchValue}
          onRunAll={handleRunAll}
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        {/* Body row */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (desktop always visible, mobile drawer) */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Canvas */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <WorkflowCanvas
              state={canvasState}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSubmit}
              onChipClick={handleChipClick}
            />

            {/* Mobile: AI panel toggle button */}
            {canvasState !== "empty" && (
              <div className="sm:hidden px-3 pb-3">
                <button
                  onClick={() => setShowAiMobile(o => !o)}
                  className="w-full py-2.5 rounded-2xl text-sm font-medium text-gray-600 flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.09)",
                  }}
                >
                  {showAiMobile ? "Hide AI Panel" : "Show AI Panel"}
                </button>
              </div>
            )}

            {/* Mobile: AI panel inline */}
            {showAiMobile && (
              <div className="sm:hidden px-3 pb-3 h-[320px] shrink-0">
                <AIPanel
                  state={aiState}
                  onEdit={handleRegenerate}
                  onRegenerate={handleRegenerate}
                  onActivate={handleActivate}
                />
              </div>
            )}
          </div>

          {/* AI panel (desktop) */}
          <div
            className="hidden sm:flex shrink-0 flex-col p-3"
            style={{ width: "240px" }}
          >
            <AIPanel
              state={aiState}
              onEdit={handleRegenerate}
              onRegenerate={handleRegenerate}
              onActivate={handleActivate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
