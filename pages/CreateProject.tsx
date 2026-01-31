import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProject } from '../lib/data';
import { Project, Priority, Status } from '../lib/types';
import { ArrowLeft, Save, Square } from 'lucide-react';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Backlog' as Status,
    priority: 'Medium' as Priority,
    tech_stack: '',
    is_public: true,
    repo_url: '',
    demo_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Parse tech stack
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
      repo_url: formData.repo_url || undefined,
      demo_url: formData.demo_url || undefined
    });

    setIsSubmitting(false);
    navigate('/projects');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
        <Link to="/projects" className="p-2 border border-zinc-200 hover:border-black text-zinc-500 hover:text-black transition-all">
            <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight font-mono uppercase">INITIALIZE_PROTOCOL</h1>
      </div>

      <div className="bg-white border border-zinc-200 p-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-20 h-20 border-b border-l border-zinc-100 bg-zinc-50"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Project Name</label>
                <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-zinc-400 font-mono text-sm rounded-none"
                    placeholder="E.G. NEURAL_NEXUS"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Priority Level</label>
                    <div className="relative">
                        <select 
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all appearance-none font-mono text-sm rounded-none"
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
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all appearance-none font-mono text-sm rounded-none"
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
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all placeholder:text-zinc-400 resize-none font-sans text-sm rounded-none"
                    placeholder="Define protocol objectives..."
                />
            </div>

            <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Tech Stack (Comma Separated)</label>
                <input 
                    type="text" 
                    name="tech_stack"
                    value={formData.tech_stack}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black transition-all placeholder:text-zinc-400 font-mono text-sm rounded-none"
                    placeholder="React, Supabase, Python..."
                />
            </div>
            
            <div className="pt-4 flex items-center gap-3">
                 <input 
                    type="checkbox" 
                    id="is_public"
                    name="is_public"
                    checked={formData.is_public}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded-none border-zinc-400 text-black focus:ring-black"
                 />
                 <label htmlFor="is_public" className="text-zinc-700 text-sm select-none font-mono uppercase">Public Visibility</label>
            </div>

            <div className="pt-6 border-t border-zinc-100 flex items-center justify-end gap-4">
                <Link to="/projects" className="px-6 py-2 text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors text-sm font-bold font-mono">
                    CANCEL
                </Link>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-black text-white font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm uppercase rounded-none"
                >
                    {isSubmitting ? (
                        <>PROCESSING...</>
                    ) : (
                        <>
                            <Save size={16} /> CONFIRM_INIT
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};