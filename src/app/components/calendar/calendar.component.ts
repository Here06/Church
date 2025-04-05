import { Component } from '@angular/core';
import {CalendarEvent, CalendarModule} from 'angular-calendar';
import {CommonModule} from "@angular/common";
import {addMonths, subMonths} from "date-fns";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  viewDate: Date = new Date();
  hoveredEvent: CalendarEvent | null = null;

  events: CalendarEvent[] = [
    {
      start: new Date('2025-07-15'),
      title: 'Leadership Summit',
      color: { primary: '#e74c3c', secondary: '#f9c0c0' },
      meta: { description: 'Annual leadership meeting for all departments.', venue: "Nzhelele" }
    },
    {
      start: new Date('2025-07-18'),
      title: 'Youth Outreach',
      color: { primary: '#3498db', secondary: '#cce5ff' },
      meta: { description: 'Community engagement day led by youth teams.', venue: "Ha-Matsa"}
    },
    {
      start: new Date('2025-07-22'),
      title: 'Finance Workshop',
      color: { primary: '#27ae60', secondary: '#d5f5e3' },
      meta: { description: 'Internal training on financial stewardship and budgeting.' , venue: "Pretoria"}
    }
  ];

  goToPreviousMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  goToNextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  goToToday() {
    this.viewDate = new Date();
  }

}
