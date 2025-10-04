import {Injectable} from "@angular/core";
import {collection, collectionData, Firestore, query, QueryConstraint} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {ChurchEvent} from "../components/calendar/i-event";
import {ChurchEventDto} from "../services/church-event-dto";


@Injectable({providedIn: 'root'})
export class EventsRepository {
  constructor(public firestore: Firestore) {
  }

  private eventsRef = collection(this.firestore, 'Events');

  getEvents(queryConstraints: QueryConstraint[]): Observable<ChurchEvent[]> {
    const eventsQuery = query(this.eventsRef, ...queryConstraints);
    return collectionData<any>(eventsQuery, {idField: 'id'}).pipe(
      map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
    );
  }
}
