import {Injectable} from '@angular/core';
import {where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {COLLECTIONS} from '../collections';
import {parsePastor, Pastor} from '../models/pastor.model';
import {CollectionRepository} from './collection-repository';

@Injectable({providedIn: 'root'})
export class PastorRepository extends CollectionRepository<Pastor> {
  constructor() {
    super(COLLECTIONS.pastors, parsePastor);
  }

  getAll(): Observable<Pastor[]> {
    return this.list();
  }

  /** Equality filter only, so no composite index is needed. Sort with `sortPastors`. */
  getByBranch(branchId: string): Observable<Pastor[]> {
    return this.list(where('branchId', '==', branchId));
  }
}
