import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Activity, Settings, Hexagon } from 'lucide-react';
import { NeonBackground } from './NeonBackground';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen text-zinc-900 font-sans">
      <NeonBackground />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white/80 backdrop-blur-sm border-r border-zinc-200 z-50 flex flex-col shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-100">
          <div className="w-8 h-8 flex items-center justify-center">
            <Hexagon size={24} className="text-black fill-black" />
          </div>
          <span className="hidden md:block font-bold text-lg tracking-tight text-zinc-900 font-mono">
            DYAI<span className="text-zinc-400">_</span>CLOUD
          </span>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-1 px-3">
          <NavItem to="/" icon={<LayoutDashboard size={18} />} label="OVERVIEW" />
          <NavItem to="/projects" icon={<FolderKanban size={18} />} label="PROJECTS" />
          <NavItem to="/metrics" icon={<Activity size={18} />} label="TELEMETRY" />
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <NavItem to="/settings" icon={<Settings size={18} />} label="CONFIG" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-20 md:pl-64 relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto p-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border border-transparent rounded-sm ${
        isActive
          ? 'bg-zinc-100 text-black border-zinc-200 font-bold shadow-sm'
          : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
      }`
    }
  >
    <span>{icon}</span>
    <span className="hidden md:block tracking-wide">{label}</span>
  </NavLink>
);