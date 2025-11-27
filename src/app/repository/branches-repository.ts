import { collection, collectionData, Firestore, query, QueryConstraint } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { BranchInfo } from '../interfaces/branch-interface';
import { BranchDto } from '../services/branch-dto';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BranchRepository {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);
  private readonly branchesRef = collection(this.firestore, 'Branches');

  getBranches(queryConstraints: QueryConstraint[] = []): Observable<BranchInfo[]> {
      return runInInjectionContext(this.injector, () => {
      const q = queryConstraints.length > 0 
        ? query(this.branchesRef, ...queryConstraints)
        : this.branchesRef;
        
      return collectionData<any>(q, { idField: 'id' }).pipe(
        map(branches => branches.map(branch => 
          BranchDto.fromFirestore(branch, branch.id)
        ))
      );
    });
  }
}