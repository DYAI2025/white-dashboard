import React, { useEffect, useState } from 'react';
import { fetchProjects, createProject } from '../lib/data';
import { Project, Status, Priority } from '../lib/types';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Plus, ListFilter, X, Save, Square } from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [search, setSearch] = useState('');
  
  // Creation State
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Backlog' as Status,
    priority: 'Medium' as Priority,
    tech_stack: '',
    is_public: true
  });

  const loadProjects = () => fetchProjects().then(setProjects);

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const techStackArray = formData.tech_stack
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    await createProject({
      name: formData.name,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      tech_stack: techStackArray,
      is_public: formData.is_public,
    });

    await loadProjects();
    setIsSubmitting(false);
    setIsCreating(false);
    // Reset form
    setFormData({
      name: '',
      description: '',
      status: 'Backlog',
      priority: 'Medium',
      tech_stack: '',
      is_public: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filtered = projects.filter(p => {
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchPriority = filterPriority === 'All' || p.priority === filterPriority;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight font-mono">PROJECT_REGISTRY</h1>
        
        {!isCreating && (
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button 
                  onClick={() => setIsCreating(true)}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-700 text-white font-mono text-sm font-bold shadow-md transition-all rounded-sm"
              >
                  <Plus size={16} />
                  <span className="hidden md:inline">INIT_PROTOCOL</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="SEARCH_INDEX..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-white border border-zinc-300 text-zinc-900 pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-zinc-900 w-full md:w-64 rounded-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2 border border-zinc-300 bg-white px-2 rounded-sm">
                  <ListFilter size={14} className="text-zinc-400" />
                  <select 
                    className="bg-transparent text-zinc-900 py-2 text-sm font-mono focus:outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                  >
                    <option value="All">STATUS: ALL</option>
                    <option value="Active">ACTIVE</option>
                    <option value="Backlog">BACKLOG</option>
                    <option value="Refinement">REFINEMENT</option>
                    <option value="Completed">COMPLETED</option>
                  </select>
                </div>

                <select 
                  className="bg-white border border-zinc-300 text-zinc-900 px-4 py-2 text-sm font-mono focus:outline-none focus:border-zinc-900 rounded-sm"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                >
                  <option value="All">PRIORITY: ALL</option>
                  <option value="High">HIGH</option>
                  <option value="Medium">MEDIUM</option>
                  <option value="Low">LOW</option>
                </select>
              </div>
          </div>
        )}
      </div>

      {/* Inline Creation Form */}
      {isCreating && (
        <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-sm animate-in slide-in-from-top-4 duration-300 shadow-inner">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold font-mono text-zinc-900 uppercase tracking-widest">Create New Protocol</h2>
             <button onClick={() => setIsCreating(false)} className="text-zinc-400 hover:text-black transition-colors">
               <X size={20} />
             </button>
          </div>
          
          <form onSubmit={handleCreateSubmit} className="space-y-6 max-w-4xl">
            <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Project Name</label>
                <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name} 
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all placeholder:text-zinc-400 font-mono text-sm rounded-none"
                    placeholder="E.G. NEURAL_NEXUS"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Priority</label>
                    <div className="relative">
                        <select 
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all appearance-none font-mono text-sm rounded-none"
                        >
                            <option value="High">HIGH</option>
                            <option value="Medium">MEDIUM</option>
                            <option value="Low">LOW</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Square size={8} fill="black" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Initial Status</label>
                    <div className="relative">
                        <select 
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all appearance-none font-mono text-sm rounded-none"
                        >
                            <option value="Backlog">BACKLOG</option>
                            <option value="Refinement">REFINEMENT</option>
                            <option value="Active">ACTIVE</option>
                            <option value="Completed">COMPLETED</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Square size={8} fill="black" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Description</label>
                <textarea 
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all placeholder:text-zinc-400 resize-none font-sans text-sm rounded-none"
                    placeholder="Define protocol objectives..."
                />
            </div>

            <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Tech Stack (Comma Separated)</label>
                <input 
                    type="text" 
                    name="tech_stack"
                    value={formData.tech_stack}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all placeholder:text-zinc-400 font-mono text-sm rounded-none"
                    placeholder="React, Supabase, Python..."
                />
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-4">
                <button 
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 text-zinc-500 hover:text-black hover:bg-zinc-200 transition-colors text-sm font-bold font-mono"
                >
                    CANCEL
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-black text-white font-bold shadow-md transition-all disabled:opacity-50 font-mono text-sm uppercase rounded-none"
                >
                    {isSubmitting ? 'PROCESSING...' : <><Save size={16} /> CONFIRM_INIT</>}
                </button>
            </div>
          </form>
        </div>
      )}

      {/* Project Grid */}
      {!isCreating && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-20 border border-dashed border-zinc-300 bg-zinc-50">
              <p className="text-zinc-500 font-mono text-sm">NO_RECORDS_FOUND</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};