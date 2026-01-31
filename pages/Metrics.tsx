import React, { useEffect, useState } from 'react';
import { fetchProjects, fetchActivity } from '../lib/data';
import { Project, AgentActivity } from '../lib/types';
import { ProjectCard } from '../components/ProjectCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Clock, GitCommit, PlayCircle } from 'lucide-react';

const KanbanColumn = ({ title, projects, borderColor }: { title: string, projects: Project[], borderColor: string }) => (
  <div className="flex-1 min-w-[300px] bg-zinc-50 border border-zinc-200 p-4 flex flex-col gap-4 rounded-sm">
    <div className={`flex items-center justify-between pb-3 border-b-2 ${borderColor}`}>
      <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-900 font-mono">{title}</h3>
      <span className="bg-zinc-200 px-2 py-0.5 text-xs text-zinc-700 font-bold">{projects.length}</span>
    </div>
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2">
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  </div>
);

const ActivityItem = ({ item }: { item: AgentActivity }) => {
    const icons = {
        commit: <GitCommit size={14} />,
        deploy: <PlayCircle size={14} />,
        create: <Activity size={14} />,
        comment: <Clock size={14} />
    };
    
    return (
        <div className="flex gap-4 p-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors last:border-0 items-start">
            <div className={`mt-1 p-1.5 border border-zinc-200 bg-white text-zinc-900`}>
                {icons[item.type] || icons.create}
            </div>
            <div>
                <div className="text-sm font-medium text-zinc-900 font-mono">{item.description}</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">{item.project_name}</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="text-[10px] text-zinc-400 font-mono">{new Date(item.created_at).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export const MetricsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activity, setActivity] = useState<AgentActivity[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchActivity().then(setActivity);
  }, []);

  const kanbanData = {
    backlog: projects.filter(p => p.status === 'Backlog'),
    active: projects.filter(p => p.status === 'Active' || p.status === 'Refinement'),
    completed: projects.filter(p => p.status === 'Completed'),
  };

  const chartData = [
    { name: 'Backlog', count: kanbanData.backlog.length, color: '#d4d4d8' }, // Zinc 300
    { name: 'Active', count: kanbanData.active.length, color: '#18181b' },   // Zinc 900
    { name: 'Completed', count: kanbanData.completed.length, color: '#71717a' }, // Zinc 500
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-zinc-900 tracking-tight font-mono border-b border-zinc-200 pb-4">SYSTEM_TELEMETRY</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-sm">
            <h3 className="text-xs font-bold text-zinc-500 uppercase mb-6 tracking-widest">Distribution</h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.toUpperCase()} />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderColor: '#000', color: '#000', borderRadius: 0 }}
                            itemStyle={{ color: '#000', fontFamily: 'monospace', fontSize: '12px' }}
                            cursor={{fill: '#f4f4f5'}}
                        />
                        <Bar dataKey="count">
                             {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 flex flex-col h-[300px] lg:h-auto rounded-sm shadow-sm">
             <div className="p-4 border-b border-zinc-100 bg-zinc-50">
                 <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Activity_Log</h3>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {activity.map(a => <ActivityItem key={a.id} item={a} />)}
             </div>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
        <KanbanColumn title="Backlog" projects={kanbanData.backlog} borderColor="border-zinc-300" />
        <KanbanColumn title="Active / Refinement" projects={kanbanData.active} borderColor="border-black" />
        <KanbanColumn title="Completed" projects={kanbanData.completed} borderColor="border-zinc-500" />
      </div>
    </div>
  );
};