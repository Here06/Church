import {Component, input} from '@angular/core';
import {UpcomingEvent} from './upcoming-event';

@Component({
  selector: 'app-event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  readonly event = input.required<UpcomingEvent>();
}
