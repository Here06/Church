import {Component, Input} from '@angular/core';
import { PastorDetailsComponent } from '../pastor-details/pastor-details.component';
import { PastorInfo } from '../../interfaces/pastor-interface';

@Component({
  selector: 'app-branch-details',
  imports: [PastorDetailsComponent],
  templateUrl: './branch-details.component.html',
  standalone: true,
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent {
  @Input() imagePath?: string;
  @Input() branchName?: string;
  @Input() district?: string;
  @Input() pastorName?: string;
  @Input() address?: { googleLink?: string };
  @Input() service?: string;
  @Input() contact?: { phone?: string, email?: string };
  @Input() pastor ?: PastorInfo;
}
