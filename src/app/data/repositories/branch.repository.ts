import {Injectable} from '@angular/core';
import {orderBy, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {COLLECTIONS} from '../collections';
import {Branch, parseBranch} from '../models/branch.model';
import {CollectionRepository} from './collection-repository';

@Injectable({providedIn: 'root'})
export class BranchRepository extends CollectionRepository<Branch> {
  constructor() {
    super(COLLECTIONS.branches, parseBranch);
  }

  /** All branches by name. Single-field index only. */
  getAll(): Observable<Branch[]> {
    return this.list(orderBy('name', 'asc'));
  }

  /** Needs composite index: branches(region ASC, name ASC). */
  getByRegion(region: string): Observable<Branch[]> {
    return this.list(where('region', '==', region), orderBy('name', 'asc'));
  }

  get(id: string): Observable<Branch | null> {
    return this.getById(id);
  }
}
