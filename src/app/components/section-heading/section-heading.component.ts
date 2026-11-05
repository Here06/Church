import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

/** Serif section title, a thin rule, and an optional trailing link. */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss'
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly linkLabel = input<string>();
  /** Optional words appended to the link label from tablet width up (e.g. "View All" + "Events"). */
  readonly linkLabelExtra = input<string>();
  readonly linkPath = input<string>('/');
}
