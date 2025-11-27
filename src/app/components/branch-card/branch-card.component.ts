import {Router} from '@angular/router';
import {Component, Input} from "@angular/core";
import { BranchInfo } from '../../interfaces/branch-interface';
import { PastorInfo } from '../../interfaces/pastor-interface';

@Component({
  selector: 'app-branch-card',
  standalone: true,
  imports: [],
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.scss'
})
export class BranchCardComponent {
  @Input() branch!: BranchInfo;

  @Input() name!: string;
  @Input() region!: string;          
  @Input() pastorName?: string;       
  @Input() image?: string;
  @Input() address?: string;

  constructor(private router: Router) {
  }

  navigateToDetails() {
    this.router.navigate(['/branches', encodeURIComponent(this.name)], {
      // queryParams: {
      //   imagePath: this.image,
      //   address: this.address,
      //   district: this.branch.region,
      //   branchName: this.branch.name,
      //   pastor: this.branch.pastor,
      //   pastorName: this.pastorName
      // }

      state: {branch: this.branch}
    });
  }
}
