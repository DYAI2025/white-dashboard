import React, { useEffect, useState } from 'react';
import { MetricsCard } from '../components/MetricsCard';
import { ProjectCard } from '../components/ProjectCard';
import { fetchMetrics, fetchProjects } from '../lib/data';
import { Metrics, Project } from '../lib/types';
import { ArrowRight, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Landing: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const m = await fetchMetrics();
      const p = await fetchProjects();
      setMetrics(m);
      setFeaturedProjects(p.filter(x => x.priority === 'High' || x.status === 'Active').slice(0, 3));
    };
    loadData();
  }, []);

  if (!metrics) return <div className="p-10 text-zinc-900 font-mono text-sm tracking-widest">LOADING DATA STREAM...</div>;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-16 space-y-6 border-b border-zinc-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 text-white text-[10px] font-mono tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          SYSTEM_ONLINE
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 font-mono">
          DYAI_ECOSYSTEM<br/>
          <span className="text-zinc-400">CONTROL CENTER</span>
        </h1>
        <p className="text-zinc-600 max-w-xl text-lg border-l-2 border-zinc-900 pl-4">
          Centralized command for agent telemetry and automated deployment pipelines.
        </p>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricsCard label="Projects" value={metrics.total_projects} sublabel="TOTAL COUNT" delay={0.1} />
        <MetricsCard label="Active" value={metrics.active_projects} sublabel="RUNNING" delay={0.2} />
        <MetricsCard label="Tasks" value={metrics.total_tasks} sublabel="GLOBAL LOG" delay={0.3} />
        <MetricsCard label="Workload" value={metrics.tasks_inprogress} sublabel="IN PROGRESS" delay={0.4} />
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <Grid3X3 className="text-zinc-900" />
            <h2 className="text-lg font-bold text-zinc-900 font-mono tracking-wider">PRIORITY_MODULES</h2>
          </div>
          <Link to="/projects" className="text-xs font-bold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 uppercase tracking-widest">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};