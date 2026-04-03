import {EventType} from "../app/components/calendar/event-type-enum";

export const eventTypeColorMap: Record<EventType, { primary: string; secondary: string }> = {
  [EventType.SundaySchool]: {primary: '#12caf3', secondary: '#fdf2e3'},
  [EventType.Youth]: {primary: '#e91e1e', secondary: '#fce4ec'},
  [EventType.General]: {primary: '#346edb', secondary: '#d6eaf8'},
  [EventType.Women]: {primary: '#b659ae', secondary: '#f5eef8'},
  [EventType.Men]: {primary: '#2c3e50', secondary: '#d5dbdb'},
  [EventType.Branch]: {primary: '#27ae60', secondary: '#d5f5e3'},
};
