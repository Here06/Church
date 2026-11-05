import {Component, input} from '@angular/core';

export type ButtonVariant = 'primary' | 'outline';

/**
 * Site button. Apply to a native element so links and buttons keep their semantics:
 * <a appButton routerLink="/">Join Us</a> / <button appButton variant="outline">Watch</button>
 */
@Component({
  selector: 'a[appButton], button[appButton]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button.component.scss',
  host: {'[class.outline]': "variant() === 'outline'"}
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
}
