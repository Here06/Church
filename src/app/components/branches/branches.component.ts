import {Component, inject, OnInit} from '@angular/core';
import {BranchService} from "../../services/branch-services";
import {AsyncPipe} from "@angular/common";
import {BranchCardComponent} from "../branch-card/branch-card.component";
import { BranchInfo } from '../../interfaces/branch-interface';
import { map, Observable } from 'rxjs';

export interface BranchesByRegion {
  region: string;
  branches: BranchInfo[];
}

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
  private readonly branchService = inject(BranchService)

  branchList$ = this.branchService.getBranchesWithPastors();
  branchesByRegion$: Observable<BranchesByRegion[]> = this.branchList$.pipe(
    map(branches => this.groupByRegion(branches))
  );
  // constructor(private branchService: BranchService) {
  // }


  private groupByRegion(branches: BranchInfo[]): BranchesByRegion[] {
    const grouped = branches.reduce((acc, branch) => {
      if (!acc[branch.region]) {
        acc[branch.region] = [];
      }
      acc[branch.region].push(branch);
      return acc;
    }, {} as { [key: string]: BranchInfo[] });

    return Object.keys(grouped)
      .sort()
      .map(region => ({
        region,
        branches: grouped[region]
      }));
  }

  getPastorFullName(branch: BranchInfo): string{
    if (!branch.pastor) {
      return '--';
    }
    return `${branch.pastor.initials} ${branch.pastor.lastname}`;
  }
 
}

