import {Component, input} from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly image = input.required<string>();
  readonly imageAlt = input('');
  readonly scriptureReference = input('');
  readonly scriptureText = input('');
}
