import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BranchesService} from '../../services/branch-services';
import {docData, DocumentReference} from '@angular/fire/firestore';
import {delay, map, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  standalone: true,
  imports: [AsyncPipe],
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  branch$ = this.route.params.pipe(
    delay(5000), ///Todo: Remove
    switchMap(params => this.branchService.getBranchById(params['id'])),
    switchMap(branch => {
      if (branch.pastor instanceof DocumentReference) {
        return docData(branch.pastor).pipe(
          map(pastorDoc => ({...branch, pastor: pastorDoc}))
        );
      }
      return of(branch);
    })
  );


  constructor(private route: ActivatedRoute, private branchService: BranchesService) {
  }
}
