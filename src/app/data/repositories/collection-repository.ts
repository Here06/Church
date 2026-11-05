import {inject, Injector, runInInjectionContext} from '@angular/core';
import {
  collection, collectionData, doc, docData, DocumentData, Firestore, query, QueryConstraint
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {Parser, parseAll} from '../models/firestore-values';

/**
 * Read-only access to one Firestore collection. Documents are parsed into typed models;
 * malformed documents are skipped (and logged) rather than breaking the whole stream.
 */
export abstract class CollectionRepository<T> {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);

  protected constructor(
    private readonly collectionName: string,
    private readonly parse: Parser<T>
  ) {
  }

  protected list(...constraints: QueryConstraint[]): Observable<T[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData(query(collection(this.firestore, this.collectionName), ...constraints), {idField: 'id'}).pipe(
        map(rows => parseAll(rows as DocumentData[], this.parse, this.collectionName))
      )
    );
  }

  protected getById(id: string): Observable<T | null> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.firestore, this.collectionName, id), {idField: 'id'}).pipe(
        map(row => (row ? this.parse(id, (({id: _id, ...rest}) => rest)(row as DocumentData)) : null))
      )
    );
  }
}
