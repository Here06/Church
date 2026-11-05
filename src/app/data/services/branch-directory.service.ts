import {inject, Injectable} from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {Branch} from '../models/branch.model';
import {Pastor} from '../models/pastor.model';
import {BranchRepository} from '../repositories/branch.repository';
import {PastorRepository} from '../repositories/pastor.repository';

export interface BranchWithPastors extends Branch {
  pastors: Pastor[];
}

/** Lead pastor first, then alphabetically by last name. */
export function sortPastors(pastors: readonly Pastor[]): Pastor[] {
  return [...pastors].sort((a, b) =>
    Number(b.isLead) - Number(a.isLead) || a.lastName.localeCompare(b.lastName));
}

/** Joins pastors to their branch (pastors store the link in `branchId`). Inactive branches are dropped. */
export function attachPastors(branches: readonly Branch[], pastors: readonly Pastor[]): BranchWithPastors[] {
  const byBranch = new Map<string, Pastor[]>();
  for (const pastor of pastors) {
    if (pastor.branchId && pastor.status !== 'inactive') {
      byBranch.set(pastor.branchId, [...(byBranch.get(pastor.branchId) ?? []), pastor]);
    }
  }
  return branches
    .filter(branch => branch.status === 'active')
    .map(branch => ({...branch, pastors: sortPastors(byBranch.get(branch.id) ?? [])}));
}

@Injectable({providedIn: 'root'})
export class BranchDirectoryService {
  private readonly branches = inject(BranchRepository);
  private readonly pastors = inject(PastorRepository);

  getBranches(): Observable<BranchWithPastors[]> {
    return combineLatest([this.branches.getAll(), this.pastors.getAll()]).pipe(
      map(([branches, pastors]) => attachPastors(branches, pastors))
    );
  }

  getBranchesByRegion(region: string): Observable<BranchWithPastors[]> {
    return combineLatest([this.branches.getByRegion(region), this.pastors.getAll()]).pipe(
      map(([branches, pastors]) => attachPastors(branches, pastors))
    );
  }

  getBranch(id: string): Observable<BranchWithPastors | null> {
    return combineLatest([this.branches.get(id), this.pastors.getByBranch(id)]).pipe(
      map(([branch, pastors]) => (branch ? {...branch, pastors: sortPastors(pastors)} : null))
    );
  }
}
