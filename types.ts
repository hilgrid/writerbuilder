
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface WritingPiece {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link?: string;
}

export type SectionType = 'home' | 'writer' | 'builder' | 'contact';
