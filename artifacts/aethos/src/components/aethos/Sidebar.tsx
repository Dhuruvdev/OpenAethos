import { Workflow, LayoutTemplate, Activity, Plug, Settings } from "lucide-react";
import { AethosLogo } from "./AethosLogo";

const navItems = [
  { icon: Workflow, label: "My Workflows", active: true },
  { icon: LayoutTemplate, label: "Templates", active: false },
  { icon: Activity, label: "Activity", active: false },
  { icon: Plug, label: "Integrations", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export function Sidebar() {
  return (
    <div className="w-[200px] shrink-0 glass border-r border-white/50 flex flex-col py-4 px-3 gap-1">
      {navItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full group ${
            active
              ? "text-[#1A1A1A]"
              : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
          }`}
          style={
            active
              ? {
                  background: "linear-gradient(135deg, rgba(96,165,250,0.12) 0%, rgba(249,115,22,0.07) 100%)",
                  border: "1px solid rgba(96,165,250,0.2)",
                }
              : {}
          }
        >
          {active ? (
            <span className="relative flex items-center justify-center w-5 h-5">
              <AethosLogo size={18} />
            </span>
          ) : (
            <Icon size={16} strokeWidth={1.8} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          )}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
