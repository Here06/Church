import {Component, computed, input} from '@angular/core';

/** Carousel position: a gold pill for the current slide and dots for the others. */
@Component({
  selector: 'app-slide-indicator',
  standalone: true,
  templateUrl: './slide-indicator.component.html',
  styleUrl: './slide-indicator.component.scss'
})
export class SlideIndicatorComponent {
  readonly count = input.required<number>();
  readonly active = input(0);

  protected readonly slides = computed(() => Array.from({length: this.count()}, (_, i) => i));
}
