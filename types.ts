export interface Professional {
  id: number;
  name: string;
  specialty: string;
  avatarUrl: string;
}

export interface TimeSlot {
  time: string;
}

export interface Appointment {
  id: string;
  dateStr: string; // ISO Date string YYYY-MM-DD
  time: string;
  professionalId: number;
}
