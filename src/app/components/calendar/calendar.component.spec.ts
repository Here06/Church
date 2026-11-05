import {ComponentFixture, TestBed} from '@angular/core/testing';
import {importProvidersFrom} from '@angular/core';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {of} from 'rxjs';
import {EventsCalendarService} from '../../data/services/events-calendar.service';

import {CalendarComponent} from './calendar.component';

describe('CalenderComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [importProvidersFrom(CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})), {
        provide: EventsCalendarService,
        useValue: {
          getUpcoming: () => of([{
            id: 'e1', name: 'Youth Seminar', type: 'youth', status: 'published', allDay: true,
            start: new Date(), venue: {kind: 'tbd'}, venueLabel: 'To Be Announced'
          }])
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('maps events to calendar entries with a type label and venue', () => {
    const [entry] = fixture.componentInstance.allEvents;
    expect(entry.title).toBe('Youth Seminar');
    expect(entry.meta).toEqual({description: 'Youth', venue: 'To Be Announced'});
    expect(entry.allDay).toBeTrue();
  });
});
