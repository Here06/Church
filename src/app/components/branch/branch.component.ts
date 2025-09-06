import { Component } from '@angular/core';
import {BranchDetailsComponent} from "../branch-details/branch-details.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-branch',
  imports: [
    BranchDetailsComponent
],
  templateUrl: './branch.component.html',
  standalone: true,
  styleUrl: './branch.component.scss'
})
export class BranchComponent {
  state = this.router.currentNavigation()?.extras.state;
  constructor(private router: Router) {}

}
