import {Component, OnInit, inject} from '@angular/core';
import {BranchDetailsComponent} from "../branch-details/branch-details.component";
import {ActivatedRoute, Router} from '@angular/router';
import { PastorInfo } from '../../interfaces/pastor-interface';
import { BranchInfo } from '../../interfaces/branch-interface';

@Component({
  selector: 'app-branch',
  imports: [BranchDetailsComponent],
  templateUrl: './branch.component.html',
  standalone: true,
  styleUrl: './branch.component.scss'
})


export class BranchComponent {


  private router = inject(Router);
  branch?: BranchInfo;

  constructor(){
    const nav = this.router.getCurrentNavigation();
    this.branch = nav?.extras.state?.['branch'];
  }


  // branchData: {
  //   branchName?: string;
  //   imagePath?: string;
  //   address?: string;
  //   district?: string;
  //   pastorName?: string;

  //   pastor?: PastorInfo;
  // } = {};

  // constructor(private route: ActivatedRoute) {
  //   this.route.queryParams.subscribe(params => {
  //     this.branchData = {
  //       branchName: params['branchName'],
  //       imagePath: params['imagePath'],
  //       address: params['address'],
  //       district: params['district'],
  //       pastorName: params['pastorName'],
  //       pastor: params['pastor']
  //     };
  //   });
  // }
}

