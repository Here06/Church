import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {BranchCardComponent} from "../branch-card/branch-card.component";
import {BranchesService} from "../../services/branch-services";
import {delay} from "rxjs";


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
  branchList$ = this.branchService.getAllBranches().pipe(
    delay(5000) ///Todo: Remove
  );
  
  skeletons = Array(4);

  constructor(private branchService: BranchesService) {
  }
}

