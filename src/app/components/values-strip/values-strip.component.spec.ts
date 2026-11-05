import {TestBed} from '@angular/core/testing';
import {ValuesStripComponent} from './values-strip.component';

describe('ValuesStripComponent', () => {
  it('renders the six faith values by default', () => {
    const fixture = TestBed.createComponent(ValuesStripComponent);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('app-value-item').length).toBe(6);
  });
});
