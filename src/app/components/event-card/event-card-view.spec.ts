import {eventTimeLabel, toEventCard} from './event-card-view';
import {EventView} from '../../data/services/events-calendar.service';

const view = (over: Partial<EventView>): EventView => ({
  id: 'e', name: 'Conference', type: 'general', status: 'published', allDay: false,
  start: new Date('2026-12-12T08:00:00Z'), venue: {kind: 'tbd'}, venueLabel: 'To Be Announced', ...over
});

describe('eventTimeLabel', () => {
  it('formats timed events in South African time', () => {
    expect(eventTimeLabel({start: new Date('2026-03-15T08:00:00Z'), end: new Date('2026-03-15T10:00:00Z'), allDay: false}))
      .toBe('10:00 AM – 12:00 PM');
  });

  it('labels single-day all-day events', () => {
    expect(eventTimeLabel({start: new Date('2026-04-17T22:00:00Z'), allDay: true})).toBe('All day');
  });

  it('shows the last day of a multi-day all-day event (end is midnight after it)', () => {
    // 17 Dec 00:00 SAST to 20 Dec 00:00 SAST => runs 17 to 19 Dec
    expect(eventTimeLabel({start: new Date('2026-12-16T22:00:00Z'), end: new Date('2026-12-19T22:00:00Z'), allDay: true}))
      .toBe('17 Dec – 19 Dec');
  });
});

describe('toEventCard', () => {
  it('maps a view to the card shape, using the venue label as the location', () => {
    const card = toEventCard(view({venueLabel: 'Dididi', type: 'youth'}));
    expect(card).toEqual(jasmine.objectContaining({month: 'DEC', day: '12', title: 'Conference', location: 'Dididi'}));
    expect(card.image).toContain('assets/images/');
  });
});
