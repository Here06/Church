import {Component} from '@angular/core';
import {BranchDetailsComponent} from '../branch-details/branch-details.component';

@Component({
  selector: 'app-branch',
  template: '<app-branch-details></app-branch-details>',
  standalone: true,
  styleUrl: './branch.component.scss',
  imports: [BranchDetailsComponent]
})
export class BranchComponent {
}
