import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {BranchCardComponent} from "../branch-card/branch-card.component";
import {BranchDirectoryService} from "../../data/services/branch-directory.service";
import {startWith} from "rxjs";


@Component({
  selector: 'app-branches',
  imports: [
    AsyncPipe,
    BranchCardComponent,
  ],
  templateUrl: './branches.component.html',
  standalone: true,
  styleUrl: './branches.component.scss'
})

export class BranchesComponent {
  branchList$ = this.branchService.getBranches().pipe(
    startWith([])
  );

  skeletons = Array(4);

  constructor(private branchService: BranchDirectoryService) {
  }
}

