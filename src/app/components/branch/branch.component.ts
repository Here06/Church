import {Component} from '@angular/core';
import {BranchDetailsComponent} from "../branch-details/branch-details.component";
import {ActivatedRoute} from '@angular/router';
import {docData, DocumentReference} from "@angular/fire/firestore";
import {BranchesService} from "../../services/branch-services";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  standalone: true,
  styleUrl: './branch.component.scss',
  imports: [BranchDetailsComponent]
})
export class BranchComponent {
  branchData: any;

  constructor(private route: ActivatedRoute, private branchService: BranchesService) {
    this.route.params.subscribe(params => {
      const branchId = params['id'];
      console.log('Fetching branch by ID:', branchId);

      this.branchService.getBranchById(branchId).subscribe(branch => {
        console.log('Fetched branch data:', branch);
        this.branchData = branch;
        if (branch.pastor && branch.pastor instanceof DocumentReference) {
          docData(branch.pastor).subscribe(pastorDoc => {
            console.log('Fetched pastor data:', pastorDoc);
            this.branchData.pastor = pastorDoc;
          });
        }
      });
    });
  }
}


