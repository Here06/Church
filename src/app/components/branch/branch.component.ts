import {Component} from '@angular/core';
import {BranchDetailsComponent} from "../branch-details/branch-details.component";
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-branch',
  imports: [BranchDetailsComponent],
  templateUrl: './branch.component.html',
  standalone: true,
  styleUrl: './branch.component.scss'
})
export class BranchComponent {
  branchData: {
    branchName?: string;
    imagePath?: string;
    address?: string;
    district?: string;
  } = {};

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.branchData = {
        branchName: params['branchName'],
        imagePath: params['imagePath'],
        address: params['address'],
        district: params['district']
      };
    });
  }
}

