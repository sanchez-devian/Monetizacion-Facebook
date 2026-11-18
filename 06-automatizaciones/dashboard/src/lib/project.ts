import projectState from '@/data/project-state.json';

export type AtomStatus = 'completed' | 'in_progress' | 'pending';

export interface PlanAtom {
  id: string;
  code: string;
  title: string;
  status: AtomStatus;
  action: string;
  deliverable: string;
  criteria: string;
}

export interface PlanPhase {
  id: string;
  code: string;
  title: string;
  atoms: PlanAtom[];
}

export interface ProjectDoc {
  name: string;
  path: string;
  title: string;
  updatedAt: string;
  sizeBytes: number;
}

export interface ProjectSkill {
  name: string;
  description: string;
  path: string;
}

export interface LotePost {
  index: number;
  message: string;
  imagenes: string[];
}

export interface ProjectLote {
  slug: string;
  title: string;
  date: string;
  postsCount: number;
  posts: LotePost[];
}

export interface ProjectState {
  projectName: string;
  syncedAt: string;
  goalMxnMonthly: number;
  currentStatus: {
    activePhase: string;
    workingOn: string;
    nextStep: string;
    policyHealth: string;
    activeTrend: string;
  };
  kpis: {
    monthlyRevenueMxn: number;
    monthlyViews: number;
    avgRpmMxn: number;
    followers: number;
    postsPublished: number;
    retention3sAvgPct: number;
    policyStrikes: number;
    dataSource: string;
  };
  recentUpdates: Array<{
    date: string;
    title: string;
    summary: string;
    type: string;
  }>;
  lotes?: ProjectLote[];
  plan: {
    phases: PlanPhase[];
    totalAtoms: number;
    completedAtoms: number;
    inProgressAtoms: number;
  };
  skills: ProjectSkill[];
  docs: Record<string, ProjectDoc[]>;
  counts: {
    skills: number;
    totalDocs: number;
    investigations: number;
    audits: number;
    logs: number;
  };
}

export function getProjectState(): ProjectState {
  return projectState as ProjectState;
}
