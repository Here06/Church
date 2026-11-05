import {Injectable} from '@angular/core';
import {where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {COLLECTIONS} from '../collections';
import {ChurchDocument, parseChurchDocument} from '../models/church-document.model';
import {CollectionRepository} from './collection-repository';

@Injectable({providedIn: 'root'})
export class DocumentRepository extends CollectionRepository<ChurchDocument> {
  constructor() {
    super(COLLECTIONS.documents, parseChurchDocument);
  }

  /** Equality filter only (no composite index). Sort client-side. */
  getPublic(): Observable<ChurchDocument[]> {
    return this.list(where('visibility', '==', 'public'));
  }

  get(id: string): Observable<ChurchDocument | null> {
    return this.getById(id);
  }
}
