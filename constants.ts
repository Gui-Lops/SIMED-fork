import { Professional, TimeSlot } from './types';

export const PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: 'Dr. Kleber Russo',
    specialty: 'Clínico Geral',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: 2,
    name: 'Dra. Maria Santos',
    specialty: 'Cardiologista',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: 3,
    name: 'Dr. Carlos Silva',
    specialty: 'Dermatologista',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { time: '08:00' }, { time: '08:30' },
  { time: '09:00' }, { time: '09:30' },
  { time: '10:00' }, { time: '10:30' },
  { time: '11:00' }, { time: '11:30' },
  { time: '14:00' }, { time: '14:30' },
  { time: '15:00' }, { time: '15:30' },
  { time: '16:00' }, { time: '16:30' },
  { time: '17:00' }, { time: '17:30' },
];
