import {EventView} from '../../data/services/events-calendar.service';
import {EventType} from '../../data/models/church-event.model';
import {UpcomingEvent} from './upcoming-event';

const TZ = 'Africa/Johannesburg';
const part = (opts: Intl.DateTimeFormatOptions, d: Date) => new Intl.DateTimeFormat('en-US', {timeZone: TZ, ...opts}).format(d);
const dayLabel = (d: Date) => `${part({day: 'numeric'}, d)} ${part({month: 'short'}, d)}`;
const timeLabel = (d: Date) => part({hour: 'numeric', minute: '2-digit', hour12: true}, d);
const ymd = (d: Date) => part({year: 'numeric', month: '2-digit', day: '2-digit'}, d);
const isMidnight = (d: Date) => part({hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}, d) === '24:00' || part({hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}, d) === '00:00';

/** Placeholder photos until events have their own images (e.g. flyers). */
const IMAGE_BY_TYPE: Record<EventType, string> = {
  general: 'assets/images/event-worship.jpg',
  branch: 'assets/images/event-worship.jpg',
  sundaySchool: 'assets/images/event-bible-study.jpg',
  youth: 'assets/images/event-bible-study.jpg',
  men: 'assets/images/event-outreach.jpg',
  women: 'assets/images/event-outreach.jpg'
};

/** "All day", "15 Mar – 17 Mar" for multi-day all-day events, or "10:00 AM – 12:00 PM". */
export function eventTimeLabel(event: Pick<EventView, 'start' | 'end' | 'allDay'>): string {
  const {start, end, allDay} = event;
  if (allDay) {
    // An all-day event ending at midnight ends at the start of that day, i.e. the day before is the last day.
    const last = end && isMidnight(end) ? new Date(end.getTime() - 60_000) : end;
    return last && ymd(last) !== ymd(start) ? `${dayLabel(start)} – ${dayLabel(last)}` : 'All day';
  }
  return end ? `${timeLabel(start)} – ${timeLabel(end)}` : timeLabel(start);
}

export function toEventCard(event: EventView): UpcomingEvent {
  return {
    month: part({month: 'short'}, event.start).toUpperCase(),
    day: part({day: 'numeric'}, event.start),
    title: event.name,
    time: eventTimeLabel(event),
    location: event.venueLabel,
    image: IMAGE_BY_TYPE[event.type]
  };
}
