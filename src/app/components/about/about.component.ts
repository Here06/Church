import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../button/button.component';
import {SectionHeadingComponent} from '../section-heading/section-heading.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonComponent, RouterLink, SectionHeadingComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly image = input.required<string>();
}
