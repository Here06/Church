import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {BranchCardComponent} from "../branch-card/branch-card.component";
import {BranchesService} from "../../services/branch-services";


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
  branchList$ = this.branchService.getAllBranches();

  constructor(private branchService: BranchesService) {
  }
}

