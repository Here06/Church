import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-branch-details',
  imports: [],
  templateUrl: './branch-details.component.html',
  standalone: true,
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  @Input() imagePath!: string;
  @Input() branchName!: string;
  @Input() pastor?: string;
  @Input() address?: {googleLink?: string, city?: string, province?: string};
  @Input() service!: string;
  @Input() contact?: { phone?: string, email?: string };
}
