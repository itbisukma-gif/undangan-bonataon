export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'Pending' | 'Attending' | 'Not Attending';
  uniqueLink: string;
}

export interface DesignDraft {
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  preferences: string;
  design: DesignDraft | null;
  guests: Guest[];
}
