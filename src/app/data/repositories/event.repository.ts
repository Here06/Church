import {Injectable} from '@angular/core';
import {limit, orderBy, QueryConstraint, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {COLLECTIONS} from '../collections';
import {ChurchEvent, EventType, parseChurchEvent} from '../models/church-event.model';
import {CollectionRepository} from './collection-repository';

const PUBLISHED = where('status', '==', 'published');

/**
 * Composite indexes required (add to firestore.indexes.json):
 *  - events(status ASC, start ASC)
 *  - events(status ASC, type ASC, start ASC)
 *  - events(status ASC, branchId ASC, start ASC)
 */
@Injectable({providedIn: 'root'})
export class EventRepository extends CollectionRepository<ChurchEvent> {
  constructor() {
    super(COLLECTIONS.events, parseChurchEvent);
  }

  getUpcoming(from: Date, max?: number): Observable<ChurchEvent[]> {
    const constraints: QueryConstraint[] = [PUBLISHED, where('start', '>=', from), orderBy('start', 'asc')];
    if (max) {
      constraints.push(limit(max));
    }
    return this.list(...constraints);
  }

  getBetween(from: Date, to: Date): Observable<ChurchEvent[]> {
    return this.list(PUBLISHED, where('start', '>=', from), where('start', '<=', to), orderBy('start', 'asc'));
  }

  getByType(type: EventType): Observable<ChurchEvent[]> {
    return this.list(PUBLISHED, where('type', '==', type), orderBy('start', 'asc'));
  }

  getByBranch(branchId: string): Observable<ChurchEvent[]> {
    return this.list(PUBLISHED, where('branchId', '==', branchId), orderBy('start', 'asc'));
  }
}
