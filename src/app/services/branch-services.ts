import {inject, Injectable} from '@angular/core';
import {collection, collectionData, orderBy, where, Firestore} from '@angular/fire/firestore';
import {from, Observable, switchMap} from 'rxjs';
import { BranchRepository } from '../repository/branches-repository';
import { BranchInfo } from '../interfaces/branch-interface';
import { BranchDto } from './branch-dto';

export interface IBranchService{
  getBranchesWithPastors(): Observable<BranchInfo[]>;
  getBranchesByRegion(region: string): Observable<BranchInfo[]>;
}

@Injectable({providedIn: 'root'})
export class BranchService implements IBranchService{
  private readonly firestore = inject(Firestore);

  constructor(private readonly repo: BranchRepository) {}

  getBranchesWithPastors(): Observable<BranchInfo[]> {
    return this.repo.getBranches([orderBy('name', 'asc')]).pipe(
      switchMap(branches =>
        from(Promise.all(
          branches.map(branch => BranchDto.enrich(this.firestore, branch))
        ))
      )
    );
  }

  getBranchesByRegion(region: string): Observable<BranchInfo[]> {
    return this.repo.getBranches([
      where('region', '==', region),
      orderBy('name', 'asc')
    ]).pipe(
      switchMap(branches =>
        from(Promise.all(
          branches.map(branch => BranchDto.enrich(this.firestore, branch))
        ))
      )
    );
  }

  // getBranches(): Observable<any[]> {
  //   const branchesRef = collection(this.firestore, 'Branches');
  //   return collectionData(branchesRef, {idField: 'id'});
  // }
  
}
