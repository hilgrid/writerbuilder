export interface AdjectiveDetail {
  word: string;
  usage: string;
}

export interface AdjectiveGroup {
  id: string;
  name: string;
  adjectives: AdjectiveDetail[];
  description?: string;
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  groups: AdjectiveGroup[];
}

export interface Dimension {
  id: string;
  name: string;
  color: string;
  hexColor: string;
  description: string;
  isBidirectional: boolean;
  branches: Branch[];
}

export interface SubItem {
  name: string;
  description: string;
}

export interface HoverContext {
  title: string;
  subtitle: string;
  description: string;
  subItems?: SubItem[];
  details?: AdjectiveDetail[];
  color: string;
  type: 'dimension' | 'branch' | 'group';
}
