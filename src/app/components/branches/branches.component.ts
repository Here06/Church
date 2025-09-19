import {Component} from '@angular/core';
import {BranchService} from "../../services/branch-services";
import {AsyncPipe} from "@angular/common";
import {BranchCardComponent} from "../branch-card/branch-card.component";


@Component({
  selector: 'app-branches',
  imports: [
    AsyncPipe,
    BranchCardComponent
  ],
  templateUrl: './branches.component.html',
  standalone: true,
  styleUrl: './branches.component.scss'
})

export class BranchesComponent {
  branchList$ = this.branchService.getBranches();

  constructor(private branchService: BranchService) {
  }
}

