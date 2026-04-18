import { useState, useCallback, useEffect, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { TopBar } from "@/components/aethos/TopBar";
import { Sidebar } from "@/components/aethos/Sidebar";
import { WorkflowCanvas } from "@/components/aethos/WorkflowCanvas";
import { AIPanel } from "@/components/aethos/AIPanel";
import { AethosLogo } from "@/components/aethos/AethosLogo";
import { FolderKanban, Plus, Search, Sparkles } from "lucide-react";

type CanvasState = "empty" | "loading" | "workflow";
type AIState = "idle" | "explaining" | "ready";
type SavedProject = {
  slug: string;
  name: string;
  prompt: string;
  createdAt: number;
};

const PROJECTS_KEY = "openAethosProjects";
const BUILD_DURATION = 5000;

function readProjects(): SavedProject[] {
  try {
    const raw = window.localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: SavedProject[]) {
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, letter => letter.toUpperCase());
}

function makeProjectName(prompt: string) {
  const stopWords = new Set(["a", "an", "and", "the", "to", "for", "with", "into", "from", "that", "this", "please", "make", "create", "build"]);
  const words = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 4);
  return titleCase(words.length ? words.join(" ") : "New Workflow Project");
}

function makeSlug(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
}

function nameFromSlug(slug = "") {
  const words = slug.replace(/-[a-z0-9]{6,}$/i, "").replace(/-/g, " ");
  return titleCase(words || "Workflow Project");
}

function ProjectsOverview({
  projects,
  onOpen,
  onCreate,
}: {
  projects: SavedProject[];
  onOpen: (slug: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-7">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[30px] p-5 sm:p-7 border border-white/75 shadow-[0_26px_70px_rgba(91,84,58,0.14)] bg-white/58 backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#3d8caf] bg-[#eef8fb] border border-[#d6eff7] mb-3">
                <FolderKanban size={14} />
                Projects
              </div>
              <h1 className="text-[30px] sm:text-[42px] leading-[1.02] font-semibold tracking-[-0.045em] text-[#18202B]">
                Your generated workflows
              </h1>
              <p className="mt-2 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-[#6d645b]">
                Every task you submit becomes a named OpenAethos project, saved from the first few meaningful words of your request.
              </p>
            </div>
            <button
              onClick={onCreate}
              className="h-12 px-5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 shrink-0 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #18202B 0%, #7DC7E8 50%, #FF9F5C 100%)", boxShadow: "0 16px 30px rgba(125,199,232,0.25)" }}
            >
              <Plus size={16} />
              New workflow
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="mt-5 rounded-[28px] bg-white/68 border border-white/80 p-8 sm:p-12 text-center shadow-[0_20px_55px_rgba(91,84,58,0.12)]">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-[#fff4dd] flex items-center justify-center mb-4">
              <AethosLogo size={42} />
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#18202B]">No projects yet</h2>
            <p className="mt-2 text-sm text-[#746b61]">Create a task from My Workflows and OpenAethos will save it here automatically.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map(project => (
              <button
                key={project.slug}
                onClick={() => onOpen(project.slug)}
                className="group text-left rounded-[24px] bg-white/72 border border-white/80 p-4 shadow-[0_16px_42px_rgba(91,84,58,0.11)] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#e4f7ff] via-[#fff4cb] to-[#ffe1c5] flex items-center justify-center">
                    <AethosLogo size={30} />
                  </div>
                  <span className="rounded-full bg-[#eef8fb] px-2.5 py-1 text-[11px] font-semibold text-[#3d8caf]">Ready</span>
                </div>
                <h3 className="mt-4 text-[18px] font-semibold leading-tight tracking-[-0.035em] text-[#18202B]">{project.name}</h3>
                <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-[#756c61]">{project.prompt}</p>
                <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#18202B]">
                  <Sparkles size={13} className="text-[#FF9F5C]" />
                  Open workflow
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AethosApp() {
  const params = useParams<{ slug?: string }>();
  const [location, navigate] = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [canvasState, setCanvasState] = useState<CanvasState>("empty");
  const [aiState, setAIState] = useState<AIState>("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAiMobile, setShowAiMobile] = useState(false);
  const [projects, setProjects] = useState<SavedProject[]>(() => readProjects());
  const [activeProject, setActiveProject] = useState<SavedProject | null>(null);

  const isProjectsIndex = location === "/projects";
  const isProjectPage = location.startsWith("/projects/") && Boolean(params.slug);
  const currentProject = useMemo(() => {
    if (!isProjectPage) return activeProject;
    return projects.find(project => project.slug === params.slug) ?? activeProject ?? {
      slug: params.slug ?? "workflow-project",
      name: nameFromSlug(params.slug),
      prompt: inputValue || "AI generated workflow project",
      createdAt: Date.now(),
    };
  }, [activeProject, inputValue, isProjectPage, params.slug, projects]);

  useEffect(() => {
    if (isProjectPage) {
      setCanvasState("workflow");
      setAIState("explaining");
      setShowAiMobile(false);
      const project = projects.find(item => item.slug === params.slug);
      if (project) setActiveProject(project);
    } else if (isProjectsIndex) {
      setCanvasState("empty");
      setAIState("idle");
      setActiveProject(null);
    }
  }, [isProjectPage, isProjectsIndex, params.slug, projects]);

  const startProjectBuild = useCallback((text: string) => {
    const cleanPrompt = text.trim();
    if (!cleanPrompt) return;
    const project: SavedProject = {
      name: makeProjectName(cleanPrompt),
      slug: makeSlug(makeProjectName(cleanPrompt)),
      prompt: cleanPrompt,
      createdAt: Date.now(),
    };
    const nextProjects = [project, ...projects.filter(item => item.slug !== project.slug)].slice(0, 12);
    setProjects(nextProjects);
    saveProjects(nextProjects);
    setActiveProject(project);
    setInputValue(cleanPrompt);
    setCanvasState("loading");
    setAIState("idle");
    setShowAiMobile(false);
    setTimeout(() => {
      navigate(`/projects/${project.slug}`);
    }, BUILD_DURATION);
  }, [navigate, projects]);

  const handleSubmit = useCallback(() => {
    const prompt = inputValue.trim() || searchValue.trim();
    if (!prompt) return;
    startProjectBuild(prompt);
  }, [inputValue, searchValue, startProjectBuild]);

  const handleChipClick = useCallback((chip: string) => {
    setInputValue(chip);
    setTimeout(() => startProjectBuild(chip), 120);
  }, [startProjectBuild]);

  const handleRunAll = useCallback(() => {
    const prompt = searchValue.trim() || inputValue.trim();
    if (!prompt) return;
    setInputValue(prompt);
    startProjectBuild(prompt);
  }, [inputValue, searchValue, startProjectBuild]);

  const handleRegenerate = useCallback(() => {
    setCanvasState("loading");
    setAIState("idle");
    setTimeout(() => {
      setCanvasState("workflow");
      setTimeout(() => setAIState("explaining"), 650);
    }, 1500);
  }, []);

  const handleActivate = useCallback(() => setAIState("ready"), []);

  return (
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #d8effb 0%, #e9f2f4 30%, #fff0ce 62%, #ffd6a7 100%)",
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
          background: "rgba(255,252,246,0.82)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderTop: "1px solid rgba(255,255,255,0.80)",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.90) inset, " +
            "0 40px 80px rgba(70,68,56,0.10), " +
            "0 8px 24px rgba(70,68,56,0.07)",
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
            {isProjectsIndex ? (
              <ProjectsOverview
                projects={projects}
                onOpen={(slug) => navigate(`/projects/${slug}`)}
                onCreate={() => navigate("/")}
              />
            ) : (
              <WorkflowCanvas
                state={canvasState}
                inputValue={inputValue}
                projectName={currentProject?.name}
                projectPrompt={currentProject?.prompt}
                onInputChange={setInputValue}
                onSubmit={handleSubmit}
                onChipClick={handleChipClick}
              />
            )}

            {!isProjectsIndex && canvasState !== "empty" && (
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

            {!isProjectsIndex && showAiMobile && (
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

          {!isProjectsIndex && (
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
          )}
        </div>
      </div>
    </div>
  );
}
