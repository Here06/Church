import {EventType} from "../app/data/models/church-event.model";

export const eventTypeColorMap: Record<EventType, { primary: string; secondary: string }> = {
  sundaySchool: {primary: '#12caf3', secondary: '#fdf2e3'},
  youth: {primary: '#e91e1e', secondary: '#fce4ec'},
  general: {primary: '#346edb', secondary: '#d6eaf8'},
  women: {primary: '#b659ae', secondary: '#f5eef8'},
  men: {primary: '#2c3e50', secondary: '#d5dbdb'},
  branch: {primary: '#27ae60', secondary: '#d5f5e3'},
};
