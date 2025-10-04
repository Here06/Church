export interface ChurchEvent {
  id: string;
  name: string;
  start: Date;
  end?: Date;
  churchVenue?: string;
  place?: string;
  type?: string;
}
