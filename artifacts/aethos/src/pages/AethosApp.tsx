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
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #cddff2 0%, #d9d4ee 35%, #e8d8e0 65%, #ecddd6 100%)",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
      }}
    >
      <div
        className="w-full flex flex-col overflow-hidden"
        style={{
          height: "100vh",
          borderRadius: 0,
          background: "rgba(245,247,250,0.82)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderTop: "1px solid rgba(255,255,255,0.80)",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.90) inset, " +
            "0 40px 80px rgba(0,0,0,0.10), " +
            "0 8px 24px rgba(0,0,0,0.07)",
        }}
      >
        <TopBar
          onSearch={setSearchValue}
          searchValue={searchValue}
          onRunAll={handleRunAll}
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 overflow-hidden flex flex-col">
            <WorkflowCanvas
              state={canvasState}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSubmit}
              onChipClick={handleChipClick}
            />

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
