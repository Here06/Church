import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CalendarEvent, CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {EventsCalendarService} from "../../data/services/events-calendar.service";
import {EVENT_TYPE_LABELS} from "../../data/models/church-event.model";
import {SidebarComponent} from "../events-sidebar/sidebar.component";
import {addMonths, subMonths} from "date-fns";
import {eventTypeColorMap} from "../../../design/event-type-colours";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule, SidebarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private readonly eventsService = inject(EventsCalendarService);
  private readonly destroyRef = inject(DestroyRef);

  viewDate: Date = new Date();
  allEvents: CalendarEvent[] = [];
  events: CalendarEvent[] = [];


  ngOnInit(): void {
    this.loadUpComingEvents();
  }

  loadUpComingEvents(): void {
    this.eventsService.getUpcoming().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(churchEvents => {
      this.allEvents = churchEvents.map(event => ({
        id: event.id,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        title: event.name,
        color: eventTypeColorMap[event.type],
        meta: {
          description: EVENT_TYPE_LABELS[event.type],
          venue: event.venueLabel,
        }
      }));

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
