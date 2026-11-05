import {inject, Injectable} from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {ChurchEvent, EventType, venueLabel} from '../models/church-event.model';
import {BranchRepository} from '../repositories/branch.repository';
import {EventRepository} from '../repositories/event.repository';

export interface EventView extends ChurchEvent {
  /** Branch name, custom text, or "To Be Announced". */
  venueLabel: string;
}

export function toEventViews(events: readonly ChurchEvent[], branchNames: ReadonlyMap<string, string>): EventView[] {
  return events.map(event => ({...event, venueLabel: venueLabel(event.venue, branchNames)}));
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

@Injectable({providedIn: 'root'})
export class EventsCalendarService {
  private readonly events = inject(EventRepository);
  private readonly branches = inject(BranchRepository);

  private branchNames$ = this.branches.getAll().pipe(
    map(branches => new Map(branches.map(b => [b.id, b.name] as const)))
  );

  private withVenues(events$: Observable<ChurchEvent[]>): Observable<EventView[]> {
    return combineLatest([events$, this.branchNames$]).pipe(map(([events, names]) => toEventViews(events, names)));
  }

  /** Events from the start of today onwards, so all-day events happening today are included. */
  getUpcoming(max?: number): Observable<EventView[]> {
    return this.withVenues(this.events.getUpcoming(startOfDay(new Date()), max));
  }

  /** `month` is 1-12. */
  getByMonth(year: number, month: number): Observable<EventView[]> {
    const from = new Date(year, month - 1, 1);
    const to = new Date(year, month, 0, 23, 59, 59, 999);
    return this.withVenues(this.events.getBetween(from, to));
  }

  getByType(type: EventType): Observable<EventView[]> {
    return this.withVenues(this.events.getByType(type));
  }

  getByBranch(branchId: string): Observable<EventView[]> {
    return this.withVenues(this.events.getByBranch(branchId));
  }
}
