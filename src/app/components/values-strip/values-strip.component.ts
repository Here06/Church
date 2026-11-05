import {Component, input} from '@angular/core';
import {FaithValue, ValueItemComponent} from '../value-item/value-item.component';

const DEFAULT_VALUES: FaithValue[] = [
  {label: 'WORSHIP', caption: 'Encounter God', icon: 'assets/icons/value-worship-lg.svg', framed: true},
  {label: 'COMMUNITY', caption: 'Belong Together', icon: 'assets/icons/users.svg'},
  {label: 'GROWTH', caption: 'Grow in Faith', icon: 'assets/icons/sprout.svg'},
  {label: 'WORD', caption: 'Learn & Be Equipped', icon: 'assets/icons/book-open.svg'},
  {label: 'LOVE', caption: 'Serve Others', icon: 'assets/icons/heart.svg'},
  {label: 'MISSION', caption: 'Impact the World', icon: 'assets/icons/mission.svg', iconSize: 28}
];

@Component({
  selector: 'app-values-strip',
  standalone: true,
  imports: [ValueItemComponent],
  templateUrl: './values-strip.component.html',
  styleUrl: './values-strip.component.scss'
})
export class ValuesStripComponent {
  readonly values = input<FaithValue[]>(DEFAULT_VALUES);
}
