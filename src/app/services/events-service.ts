import {Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, orderBy, query, where} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {ChurchEvent} from "../components/calendar/i-event";
import {ChurchEventDto} from "./church-event-dto";
import {Month} from "date-fns";

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private firestore: Firestore) {
  }

  getEvents(): Observable<any[]> {
    const EventsRef = collection(this.firestore, 'Events');
    return collectionData(EventsRef, {idField: 'id'});
  }


  getUpcomingEvents(): Observable<ChurchEvent[]> {
    const eventsRef = collection(this.firestore, 'Events');
    const today = new Date();

    const eventsQuery = query(
      eventsRef,
      where('start', '>=', today),
      orderBy('start', 'asc')
    );

    return collectionData<any>(eventsQuery, {idField: 'id'}).pipe(
      map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
    );
  }

  getEventsByMonth(year: number, month: Month): Observable<ChurchEvent[]> {
    const eventsRef = collection(this.firestore, 'Events');

    const startOfMonth = new Date(year, month - 1, 1); // month is 0-indexed
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // last day of month

    const eventsQuery = query(
      eventsRef,
      where('start', '>=', startOfMonth),
      where('start', '<=', endOfMonth),
      orderBy('start', 'asc')
    );

    return collectionData<any>(eventsQuery, {idField: 'id'}).pipe(
      map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
    );
  }

  getEventsByVenue(venuePath: string): Observable<ChurchEvent[]> {
    const eventsRef = collection(this.firestore, 'Events');

    const eventsQuery = query(
      eventsRef,
      where('venue', '==', doc(this.firestore, venuePath)),
      orderBy('start', 'asc')
    );

    return collectionData<any>(eventsQuery, {idField: 'id'}).pipe(
      map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
    );
  }

  getEventsByType(type: string): Observable<ChurchEvent[]> {
    const eventsRef = collection(this.firestore, 'Events');

    const eventsQuery = query(
      eventsRef,
      where('type', '==', type),
      orderBy('start', 'asc')
    );

    return collectionData<any>(eventsQuery, {idField: 'id'}).pipe(
      map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
    );
  }

}
