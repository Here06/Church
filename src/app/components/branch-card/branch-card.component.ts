import { Router } from '@angular/router';
import {Component, Input} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-branch-card',
  imports: [

  ],
  templateUrl: './branch-card.component.html',
  standalone: true,
  styleUrl: './branch-card.component.scss'
})
export class BranchCardComponent {
  @Input() title!: string;
  @Input() image?: string;
  @Input() address?: string;
  @Input() city?: string;
  @Input() province!: string;
  @Input() pastor!: string;
  @Input() contact!: string;
  @Input() service!: string;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/branches', this.title], {
      state: {
        imagePath: this.image,
        branchName: this.title,
        address: this.address,
        city: this.city,
        province: this.province,
        pastor: this.pastor,
        contact: this.contact,
        service: this.service
      }
    });
  }
}
