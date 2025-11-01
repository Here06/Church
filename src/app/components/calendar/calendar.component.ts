import {Component, inject, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {EventsService} from "../../services/events-service";
import {SidebarComponent} from "../events-sidebar/sidebar.component";
import {addMonths, subMonths} from "date-fns";
import {eventTypeColorMap} from "../../../design/event-type-colours";
import {mapToEventType} from "./event-type-enum";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule, SidebarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private readonly eventsService = inject(EventsService);

  viewDate: Date = new Date();
  allEvents: CalendarEvent[] = [];
  events: CalendarEvent[] = [];


  ngOnInit(): void {
    this.loadUpComingEvents();
  }

  loadUpComingEvents(): void {
    this.eventsService.getUpcomingEvents().subscribe(churchEvents => {
      this.allEvents = churchEvents.map(event => {
        const eventType = mapToEventType(event.type ?? '');
        const color = eventType ? eventTypeColorMap[eventType] : {primary: '#7f8c8d', secondary: '#ecf0f1'};
        return {
          id: event.id,
          start: event.start,
          title: event.name,
          color,
          meta: {
            description: eventType ?? 'No description',
            venue: event.place,
          }
        };
      });

      this.filterEventsForMonth(this.viewDate);
    });
  }


  filterEventsForMonth(date: Date): void {
    const month = date.getMonth();
    const year = date.getFullYear();

    this.events = this.allEvents.filter(e => {
      const eventDate = new Date(e.start);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  }


  scrollToCalendarDate(date: Date) {
    this.viewDate = new Date(date);
    this.filterEventsForMonth(this.viewDate);
  }

  onCalendarEventClick(event: CalendarEvent) {
    const el = document.getElementById('event-' + event.id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 2000);
    }
  }

  goToPreviousMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
    this.filterEventsForMonth(this.viewDate);
  }

  goToNextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
    this.filterEventsForMonth(this.viewDate);
  }

  goToToday() {
    this.viewDate = new Date();
    this.filterEventsForMonth(this.viewDate);
  }

}
