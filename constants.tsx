
import { Project, WritingPiece } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Acme Architectures',
    description: 'A structural design platform for high-velocity desert engineering.',
    tags: ['React', 'D3.js', 'Physics'],
    imageUrl: 'https://picsum.photos/seed/acme/800/600',
  },
  {
    id: '2',
    title: 'AnvilOS',
    description: 'Operating system optimized for heavy lifting and rapid deployment.',
    tags: ['TypeScript', 'Rust', 'Cloud'],
    imageUrl: 'https://picsum.photos/seed/anvil/800/600',
  },
  {
    id: '3',
    title: 'BirdWatcher Pro',
    description: 'Real-time object detection for fast-moving desert fauna.',
    tags: ['AI', 'Python', 'OpenCV'],
    imageUrl: 'https://picsum.photos/seed/bird/800/600',
  }
];

export const WRITING_PIECES: WritingPiece[] = [
  {
    id: 'w1',
    title: 'The Velocity of Narrative',
    excerpt: 'Exploring how fast-paced storytelling impacts technical documentation engagement.',
    date: 'Oct 2024',
    category: 'Essay',
  },
  {
    id: 'w2',
    title: 'Building in the Abyss',
    excerpt: 'On the philosophy of creating complex systems when your resources are limited to an Acme catalog.',
    date: 'Aug 2024',
    category: 'Technical',
  },
  {
    id: 'w3',
    title: 'The Poetry of Latency',
    excerpt: 'Why the pauses between actions are just as important as the actions themselves.',
    date: 'June 2024',
    category: 'Creative',
  }
];
