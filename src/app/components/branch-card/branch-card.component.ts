import {Router} from '@angular/router';
import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-branch-card',
  standalone: true,
  imports: [],
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.scss'
})
export class BranchCardComponent {
  @Input() name!: string;
  @Input() image?: string;
  @Input() address?: string;
  @Input() district!: string;

  constructor(private router: Router) {
  }

  navigateToDetails() {
    this.router.navigate(['/branches', encodeURIComponent(this.name)], {
      queryParams: {
        imagePath: this.image,
        address: this.address,
        district: this.district,
        branchName: this.name
      }
    });
  }
}
