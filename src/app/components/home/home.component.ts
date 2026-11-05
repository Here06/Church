import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {map, Observable, startWith} from 'rxjs';
import {EventsCalendarService} from '../../data/services/events-calendar.service';
import {AboutComponent} from '../about/about.component';
import {toEventCard} from '../event-card/event-card-view';
import {UpcomingEvent} from '../event-card/upcoming-event';
import {EventListComponent} from '../event-list/event-list.component';
import {HeroComponent} from '../hero/hero.component';
import {ValuesStripComponent} from '../values-strip/values-strip.component';

const HOME_EVENT_COUNT = 3;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, HeroComponent, ValuesStripComponent, EventListComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly eventsService = inject(EventsCalendarService);

  /** `null` while loading. */
  protected readonly upcoming$: Observable<UpcomingEvent[] | null> = this.eventsService
    .getUpcoming(HOME_EVENT_COUNT)
    .pipe(map(events => events.map(toEventCard)), startWith(null));
}
