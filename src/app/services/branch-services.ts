import {Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BranchService {
  constructor(private firestore: Firestore) {
  }

  getBranches(): Observable<any[]> {
    const branchesRef = collection(this.firestore, 'Branches');
    return collectionData(branchesRef, {idField: 'id'});
  }
}
