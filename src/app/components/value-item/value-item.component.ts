import {Component, input} from '@angular/core';

export interface FaithValue {
  label: string;
  caption: string;
  /** Path to the symbol SVG. */
  icon: string;
  /** Rendered size of the symbol inside the tinted circle. Ignored when `framed` is true. */
  iconSize?: number;
  /** True when the SVG already contains its own circle (the Worship cross). */
  framed?: boolean;
}

@Component({
  selector: 'app-value-item',
  standalone: true,
  templateUrl: './value-item.component.html',
  styleUrl: './value-item.component.scss'
})
export class ValueItemComponent {
  readonly value = input.required<FaithValue>();
}
