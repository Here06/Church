import { Component } from '@angular/core';
import {BranchDetailsComponent} from "../branch-details/branch-details.component";
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [
    CommonModule,
    BranchDetailsComponent,
  ],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss'
})
export class BranchComponent {
  state = this.router.getCurrentNavigation()?.extras.state;
  constructor(private router: Router) {}

}
