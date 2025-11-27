import { Component , input, Input} from '@angular/core';

@Component({
  selector: 'app-pastor-details',
  imports: [],
  templateUrl: './pastor-details.component.html',
  styleUrl: './pastor-details.component.scss'
})
export class PastorDetailsComponent {
  @Input() imagePath?: string;
  @Input() title?: string;
  @Input() initials?: string;
  @Input() lastname?: string;
  @Input() pastorName?: string;
}
