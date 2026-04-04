import {Injectable} from '@angular/core';
import {orderBy, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {BranchesRepository} from '../repository/branches-repository';
import {Branch} from "../components/branch/i-branch";


export interface IBranchesService {
  getAllBranches(): Observable<Branch[]>;

  getBranchesByRegion(region: string): Observable<Branch[]>;

  getBranchById(id: string): Observable<Branch>;
}

@Injectable({providedIn: 'root'})
export class BranchesService implements IBranchesService {
  constructor(private readonly repo: BranchesRepository) {
  }

  getAllBranches(): Observable<Branch[]> {
    return this.repo.getBranches([orderBy('name', 'asc')]);
  }

  getBranchesByRegion(region: string): Observable<Branch[]> {
    return this.repo.getBranches([where('region', '==', region), orderBy('name', 'asc')]);
  }

  getBranchById(id: string): Observable<Branch> {
    return this.repo.getBranchById(id);
  }
}
