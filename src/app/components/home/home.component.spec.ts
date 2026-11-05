import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {ChurchEvent} from '../../data/models/church-event.model';
import {EventsCalendarService, EventView} from '../../data/services/events-calendar.service';

import {HomeComponent} from './home.component';

const event: EventView = {
  id: '2026-12-12-bible-study', name: 'Bible Study', type: 'sundaySchool', status: 'published',
  start: new Date('2026-12-12T08:00:00Z'), end: new Date('2026-12-12T10:30:00Z'), allDay: false,
  venue: {kind: 'tbd'} as ChurchEvent['venue'], venueLabel: 'To Be Announced'
};

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  function setup(events: EventView[]) {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), {provide: EventsCalendarService, useValue: {getUpcoming: () => of(events)}}]
    });
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  }

  it('should create and compose the page sections', () => {
    setup([event]);
    const el = fixture.nativeElement as HTMLElement;
    for (const tag of ['app-hero', 'app-values-strip', 'app-event-list', 'app-about']) {
      expect(el.querySelector(tag)).withContext(tag).not.toBeNull();
    }
  });

  it('shows live events with their venue label', () => {
    setup([event]);
    const text = (fixture.nativeElement as HTMLElement).querySelector('app-event-list')!.textContent!;
    expect(text).toContain('Bible Study');
    expect(text).toContain('To Be Announced');
  });

  it('shows an empty state when there are no upcoming events', () => {
    setup([]);
    expect((fixture.nativeElement as HTMLElement).querySelector('.empty')!.textContent).toContain('No upcoming events');
  });
});
