import {collection, collectionData, Firestore, query, QueryConstraint} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {ChurchEvent} from '../components/calendar/i-event';
import {ChurchEventDto} from '../services/church-event-dto';
import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';

@Injectable({providedIn: 'root'})
export class EventsRepository {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector); // or EnvironmentInjector if preferred
  private readonly eventsRef = collection(this.firestore, 'Events');

  getEvents(queryConstraints: QueryConstraint[]): Observable<ChurchEvent[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData<any>(query(this.eventsRef, ...queryConstraints), {idField: 'id'}).pipe(
        map(events => events.map(event => ChurchEventDto.fromFirestore(event, event.id)))
      )
    );
  }
}

