import {TestBed} from '@angular/core/testing';
import {ValueItemComponent} from './value-item.component';

describe('ValueItemComponent', () => {
  it('renders label and caption', () => {
    const fixture = TestBed.createComponent(ValueItemComponent);
    fixture.componentRef.setInput('value', {label: 'LOVE', caption: 'Serve Others', icon: 'assets/icons/heart.svg'});
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent!;
    expect(text).toContain('LOVE');
    expect(text).toContain('Serve Others');
  });
});
