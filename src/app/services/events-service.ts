import {Injectable} from '@angular/core';
import {doc, orderBy, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ChurchEvent} from "../components/calendar/i-event";
import {Month} from "date-fns";
import {EventsRepository} from "../repository/events-repository";

export interface IEventsService {

  getUpcomingEvents(): Observable<ChurchEvent[]>;

  getEventsByMonth(year: number, month: Month): Observable<ChurchEvent[]>;

  getEventsByVenue(venuePath: string): Observable<ChurchEvent[]>;

  getEventsByType(type: string): Observable<ChurchEvent[]>;
}

@Injectable({providedIn: 'root'})
export class EventsService implements IEventsService {
  constructor(private readonly repo: EventsRepository) {
  }

  getUpcomingEvents(): Observable<ChurchEvent[]> {
    const today = new Date();
    return this.repo.getEvents([
      where('start', '>=', today),
      orderBy('start', 'asc')
    ]);
  }

  getEventsByMonth(year: number, month: Month): Observable<ChurchEvent[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return this.repo.getEvents([
      where('start', '>=', start),
      where('start', '<=', end),
      orderBy('start', 'asc')
    ]);
  }

  getEventsByVenue(venuePath: string): Observable<ChurchEvent[]> {
    return this.repo.getEvents([
      where('venue', '==', doc(this.repo.firestore, venuePath)),
      orderBy('start', 'asc')
    ]);
  }

  getEventsByType(type: string): Observable<ChurchEvent[]> {
    return this.repo.getEvents([
      where('type', '==', type),
      orderBy('start', 'asc')
    ]);
  }
}

