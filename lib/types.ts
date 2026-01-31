export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Backlog' | 'Active' | 'Refinement' | 'Completed';

export interface Task {
  id: string;
  title: string;
  status: Status;
  project_id: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  tech_stack: string[];
  thumbnail_url?: string;
  repo_url?: string;
  demo_url?: string;
  updated_at: string;
  is_public: boolean;
  tasks?: { count: number } | Task[];
}

export interface Metrics {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  pending_projects: number;
  total_tasks: number;
  tasks_todo: number;
  tasks_inprogress: number;
  tasks_done: number;
}

export interface AgentActivity {
  id: string;
  type: 'commit' | 'deploy' | 'comment' | 'create';
  description: string;
  created_at: string;
  project_name: string;
  task_title?: string;
}

export interface KanbanColumn {
  status: Status;
  count: number;
  projects: Project[];
}