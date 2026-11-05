import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BranchDirectoryService, BranchWithPastors} from '../../data/services/branch-directory.service';
import {map, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  standalone: true,
  imports: [AsyncPipe],
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  /** `'not-found'` when no branch has the requested id. */
  branch$: Observable<BranchWithPastors | 'not-found'> = this.route.params.pipe(
    switchMap(params => this.directory.getBranch(params['id'])),
    map(branch => branch ?? 'not-found' as const)
  );

  constructor(private route: ActivatedRoute, private directory: BranchDirectoryService) {
  }
}
