import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-branch-details',
  imports: [],
  templateUrl: './branch-details.component.html',
  standalone: true,
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  @Input() imagePath?: string;
  @Input() branchName?: string;
  @Input() pastor?: { title: string; lastName: string; initials: string };
  @Input() address?: { googleLink?: string };
  @Input() service?: string;
  @Input() contact?: { phone?: string, email?: string };
}
