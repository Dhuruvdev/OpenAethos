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

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim() && !searchValue.trim()) return;
    setCanvasState("loading");
    setAIState("idle");

    // Simulate loading then show workflow
    setTimeout(() => {
      setCanvasState("workflow");
      // Slight delay before AI starts explaining
      setTimeout(() => {
        setAIState("explaining");
      }, 400);
    }, 1800);
  }, [inputValue, searchValue]);

  const handleChipClick = useCallback((chip: string) => {
    setInputValue(chip);
    setTimeout(() => {
      setCanvasState("loading");
      setAIState("idle");
      setTimeout(() => {
        setCanvasState("workflow");
        setTimeout(() => setAIState("explaining"), 400);
      }, 1800);
    }, 100);
  }, []);

  const handleRunAll = useCallback(() => {
    if (searchValue.trim()) {
      setInputValue(searchValue);
    }
    handleSubmit();
  }, [searchValue, handleSubmit]);

  const handleRegenerate = useCallback(() => {
    setCanvasState("loading");
    setAIState("idle");
    setTimeout(() => {
      setCanvasState("workflow");
      setTimeout(() => setAIState("explaining"), 400);
    }, 1500);
  }, []);

  const handleActivate = useCallback(() => {
    setAIState("ready");
  }, []);

  const handleReset = useCallback(() => {
    setCanvasState("empty");
    setAIState("idle");
    setInputValue("");
    setSearchValue("");
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #e8eef8 0%, #f0e8f8 30%, #f8ece8 60%, #f8f4e8 100%)",
      }}
    >
      {/* Main app shell */}
      <div
        className="w-full max-w-[1100px] h-[640px] rounded-[28px] overflow-hidden flex flex-col"
        style={{
          background: "rgba(247, 247, 248, 0.82)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Top bar */}
        <TopBar
          onSearch={setSearchValue}
          searchValue={searchValue}
          onRunAll={handleRunAll}
        />

        {/* Body */}
        <div className="flex flex-1 overflow-hidden gap-0">
          {/* Left sidebar */}
          <Sidebar />

          {/* Canvas */}
          <WorkflowCanvas
            state={canvasState}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            onChipClick={handleChipClick}
          />

          {/* AI panel */}
          <div className="w-[256px] shrink-0 p-3 flex flex-col">
            <AIPanel
              state={aiState}
              onEdit={handleRegenerate}
              onRegenerate={() => {
                handleRegenerate();
              }}
              onActivate={handleActivate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
