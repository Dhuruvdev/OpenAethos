import { AethosLogo } from "./AethosLogo";
import { useLocation } from "wouter";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function TemplateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.2l1.8 2H18.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
      <path d="M7 12h10" />
      <path d="M7 15h6" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IntegrationsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const navItems = [
  { icon: null, label: "My Workflows", href: "/" },
  { icon: ProjectsIcon, label: "Projects", href: "/projects" },
  { icon: TemplateIcon, label: "Templates", href: "/templates" },
  { icon: ActivityIcon, label: "Activity", href: "/activity" },
  { icon: IntegrationsIcon, label: "Integrations", href: "/integrations" },
  { icon: SettingsIcon, label: "Settings", href: "/settings" },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [location, navigate] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          shrink-0 flex flex-col py-3 px-2.5 gap-0.5 z-40
          sm:relative sm:translate-x-0 sm:w-[195px]
          ${isOpen
            ? "fixed top-0 left-0 h-full w-[220px] translate-x-0"
            : "fixed top-0 left-0 h-full w-[220px] -translate-x-full sm:translate-x-0"}
          transition-transform duration-300
        `}
        style={{
          background: "rgba(255,252,246,0.76)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(132,105,72,0.12)",
        }}
      >
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = href === "/" ? location === "/" : location.startsWith(href);
          return (
          <button
            key={label}
            onClick={() => {
              navigate(href);
              onClose?.();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-left w-full group transition-all duration-150"
            style={
              active
                ? {
                    background:
                      "linear-gradient(108deg, rgba(125,199,232,0.22) 0%, rgba(255,227,138,0.20) 55%, rgba(255,159,92,0.14) 100%)",
                    border: "1px solid rgba(125,199,232,0.24)",
                    color: "#18202B",
                  }
                : {
                    color: "#6E716F",
                    border: "1px solid transparent",
                  }
            }
            onMouseEnter={(e) => {
              if (!active) {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(132,105,72,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                (e.currentTarget as HTMLButtonElement).style.background = "";
              }
            }}
          >
            <span className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
              {active ? (
                <AethosLogo size={18} />
              ) : Icon ? (
                <Icon />
              ) : null}
            </span>
            <span className={active ? "font-semibold" : ""}>{label}</span>
          </button>
        )})}
      </aside>
    </>
  );
}
