import {Component, inject, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {addMonths, subMonths} from 'date-fns';
import {EventsService} from "../../services/events-service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private readonly eventsService = inject(EventsService);

  viewDate: Date = new Date();
  hoveredEvent: CalendarEvent | null = null;
  events: CalendarEvent[] = [];

  ngOnInit(): void {
    this.loadEventsForMonth(this.viewDate);
  }

  loadEventsForMonth(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month enum is 1-based
    this.eventsService.getEventsByMonth(year, month).subscribe(churchEvents => {
      this.events = churchEvents.map(e => ({
        start: e.start,
        title: e.name,
        color: {primary: '#1abc9c', secondary: '#d1f2eb'},
        meta: {
          description: e.type ?? 'No description',
          venue: e.place ?? 'Unknown'
        }
      }));
    });
  }

  goToPreviousMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
    this.loadEventsForMonth(this.viewDate);
  }

  goToNextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
    this.loadEventsForMonth(this.viewDate);
  }

  goToToday() {
    this.viewDate = new Date();
    this.loadEventsForMonth(this.viewDate);
  }
}
