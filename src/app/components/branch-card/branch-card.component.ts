import {Router} from '@angular/router';
import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-branch-card',
  standalone: true,
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.scss'
})
export class BranchCardComponent {
  @Input() id!: string;
  @Input() image?: string;
  @Input() loading = false;

  constructor(private router: Router) {
  }

  navigateToDetails() {
    console.log('Navigating to branch ID:', this.id);
    this.router.navigate(['/branches', this.id]);
  }
}
