// Project
export interface ProjectInput {
  title: string;
  topic: string;
  language: 'en' | 'ar' | 'fr';
}

export interface ProjectResponse {
  id: string;
  title: string;
  topic: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

// Research
export interface ResearchRequest {
  projectId: string;
  topic: string;
  language: string;
}

export interface Source {
  id: string;
  url: string;
  title: string;
  type: 'web' | 'academic' | 'image';
  credibilityScore: number;
}

export interface Claim {
  id: string;
  text: string;
  confidence: number;
  sources: Source[];
}

// Presentation
export interface PresentationJSON {
  metadata: {
    title: string;
    topic: string;
    language: 'en' | 'ar' | 'fr';
    direction: 'rtl' | 'ltr';
    version: string;
  };
  slides: Slide[];
  sources: Source[];
}

export interface Slide {
  id: string;
  number: number;
  title: string;
  content: string[];
  layout: string;
  notes: string;
  claims: string[];
}

// Jobs
export interface JobStatus {
  id: string;
  projectId: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
}
