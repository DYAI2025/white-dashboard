import { supabase } from './supabase';
import { Project, Metrics, AgentActivity, KanbanColumn } from './types';

// Fallback data mirroring the "31.01.2026" status from prompt
let MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Bazodiac',
    description: 'Astrology meets Data Science. A high-precision horoscope engine.',
    status: 'Active',
    priority: 'High',
    tech_stack: ['Next.js', 'Supabase', 'Python'],
    updated_at: '2026-01-31T10:00:00Z',
    is_public: true,
    tasks: { count: 12 }
  },
  {
    id: '2',
    name: 'Stoppclock',
    description: 'Advanced time tracking with AI categorization.',
    status: 'Active',
    priority: 'High',
    tech_stack: ['React Native', 'Firebase'],
    updated_at: '2026-01-30T14:20:00Z',
    is_public: true,
    tasks: { count: 8 }
  },
  {
    id: '3',
    name: 'TTS-STT',
    description: 'Real-time speech processing module.',
    status: 'Refinement',
    priority: 'High',
    tech_stack: ['FastAPI', 'Whisper'],
    updated_at: '2026-01-28T09:15:00Z',
    is_public: true,
    tasks: { count: 15 }
  },
  {
    id: '4',
    name: 'MOLT Dashboard',
    description: 'Mission Operations & Logistics Tracker.',
    status: 'Active',
    priority: 'High',
    tech_stack: ['Vue', 'Go'],
    updated_at: '2026-01-29T11:45:00Z',
    is_public: true,
    tasks: { count: 3 }
  },
  {
    id: '5',
    name: 'Astro-Identity',
    description: 'Identity management system for the ecosystem.',
    status: 'Backlog',
    priority: 'Medium',
    tech_stack: ['Supabase Auth'],
    updated_at: '2026-01-25T16:00:00Z',
    is_public: true,
    tasks: { count: 0 }
  }
];

const MOCK_ACTIVITY: AgentActivity[] = [
  { id: '1', type: 'commit', description: 'Updated resonance algorithm', project_name: 'Bazodiac', created_at: '2026-01-31T09:30:00Z' },
  { id: '2', type: 'deploy', description: 'Deployed v1.2.0 to production', project_name: 'Stoppclock', created_at: '2026-01-30T15:00:00Z' },
  { id: '3', type: 'create', description: 'Created new task: "Implement Audio Stream"', project_name: 'TTS-STT', created_at: '2026-01-30T11:20:00Z' },
];

export const fetchMetrics = async (): Promise<Metrics> => {
  try {
    const { data, error } = await supabase.from('v_current_metrics').select('*').single();
    if (error || !data) throw error;
    return data;
  } catch (e) {
    console.warn("Supabase fetch failed, using mock data", e);
    return MOCK_METRICS;
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, tasks(count)')
      .eq('is_public', true)
      .order('priority')
      .order('updated_at', { ascending: false });
    
    if (error || !data) throw error;
    return data as unknown as Project[];
  } catch (e) {
    return MOCK_PROJECTS;
  }
};

export const fetchActivity = async (): Promise<AgentActivity[]> => {
  try {
    const { data, error } = await supabase
      .from('agent_activity')
      .select('*, task:tasks(title), project:projects(name)')
      .order('created_at', { ascending: false })
      .limit(20);
    if (error || !data) throw error;
    return data.map((d: any) => ({
      id: d.id,
      type: d.type || 'commit',
      description: d.description || 'Activity logged',
      project_name: d.project?.name || 'Unknown',
      created_at: d.created_at
    }));
  } catch (e) {
    return MOCK_ACTIVITY;
  }
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
   const project = MOCK_PROJECTS.find(p => p.id === id);
   return project || null;
}

export const createProject = async (project: Omit<Project, 'id' | 'updated_at' | 'tasks'>): Promise<Project> => {
  const newProjectPayload = {
    ...project,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([newProjectPayload])
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  } catch (e) {
    console.warn("Supabase create failed, using mock data", e);
    // Fallback: update local mock
    const mockId = Math.random().toString(36).substr(2, 9);
    const mockProject: Project = {
        id: mockId,
        ...newProjectPayload,
        tasks: { count: 0 }
    };
    MOCK_PROJECTS.unshift(mockProject);
    return mockProject;
  }
};

// Internal Mock Metrics (kept immutable for now as metrics are derived)
const MOCK_METRICS: Metrics = {
  total_projects: 12,
  active_projects: 4,
  completed_projects: 0,
  pending_projects: 8,
  total_tasks: 38,
  tasks_todo: 30,
  tasks_inprogress: 8,
  tasks_done: 0
};