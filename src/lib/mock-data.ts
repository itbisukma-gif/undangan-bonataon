import type { Event } from './types';
import { getPlaceholderImage } from './placeholder-images';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Annual Tech Summit 2024',
    date: new Date('2024-10-26T09:00:00'),
    location: 'Silicon Valley Conference Center',
    description: 'A summit for tech enthusiasts and professionals.',
    preferences: 'Modern, minimalist, with blue and silver colors.',
    design: {
      description: 'A sleek, modern design with a cityscape background.',
      imageUrl: getPlaceholderImage('event-design-1').imageUrl,
      imageHint: getPlaceholderImage('event-design-1').imageHint,
    },
    guests: [
      {
        id: 'g1',
        name: 'Alice',
        email: 'alice@example.com',
        status: 'Attending',
        uniqueLink: '/invite/tech-summit-alice',
      },
      {
        id: 'g2',
        name: 'Bob',
        email: 'bob@example.com',
        status: 'Pending',
        uniqueLink: '/invite/tech-summit-bob',
      },
      {
        id: 'g3',
        name: 'Charlie',
        email: 'charlie@example.com',
        status: 'Not Attending',
        uniqueLink: '/invite/tech-summit-charlie',
      },
    ],
  },
  {
    id: '2',
    name: 'Marketing Excellence Awards',
    date: new Date('2024-11-15T18:00:00'),
    location: 'Grand Ballroom, Plaza Hotel',
    description: 'An awards night celebrating the best in marketing.',
    preferences: 'Elegant, luxurious, with gold and black.',
    design: {
      description: 'An elegant design with golden confetti.',
      imageUrl: getPlaceholderImage('event-design-2').imageUrl,
      imageHint: getPlaceholderImage('event-design-2').imageHint,
    },
    guests: [
      {
        id: 'g4',
        name: 'David',
        email: 'david@example.com',
        status: 'Pending',
        uniqueLink: '/invite/marketing-awards-david',
      },
      {
        id: 'g5',
        name: 'Eve',
        email: 'eve@example.com',
        status: 'Attending',
        uniqueLink: '/invite/marketing-awards-eve',
      },
    ],
  },
];
