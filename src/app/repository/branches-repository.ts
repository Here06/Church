import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query, QueryConstraint} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BranchesRepository {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);
  private readonly branchesRef = collection(this.firestore, 'Branches');

  getBranches(queryConstraints: QueryConstraint[] = []): Observable<any[]> {
    return runInInjectionContext(this.injector, () =>
      collectionData(query(this.branchesRef, ...queryConstraints), {idField: 'id'})
    );
  }

  getBranchById(id: string): Observable<any> {
    const branchRef = doc(this.firestore, `Branches/${id}`);
    return docData(branchRef, {idField: 'id'});
  }
}
