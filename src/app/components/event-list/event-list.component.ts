import {Component, input, signal} from '@angular/core';
import {EventCardComponent} from '../event-card/event-card.component';
import {UpcomingEvent} from '../event-card/upcoming-event';
import {SectionHeadingComponent} from '../section-heading/section-heading.component';
import {SlideIndicatorComponent} from '../slide-indicator/slide-indicator.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent, SectionHeadingComponent, SlideIndicatorComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  readonly events = input.required<UpcomingEvent[]>();
  protected readonly activeIndex = signal(0);

  /** On mobile the cards form a horizontal snap carousel; keep the indicator in sync with it. */
  protected onScroll(list: HTMLElement): void {
    if (list.clientWidth > 0) {
      this.activeIndex.set(Math.round(list.scrollLeft / list.clientWidth));
    }
  }
}
