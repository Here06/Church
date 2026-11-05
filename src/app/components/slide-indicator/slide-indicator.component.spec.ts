import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SlideIndicatorComponent} from './slide-indicator.component';

describe('SlideIndicatorComponent', () => {
  let fixture: ComponentFixture<SlideIndicatorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideIndicatorComponent);
    fixture.componentRef.setInput('count', 3);
  });

  it('renders one current marker and the remaining dots', () => {
    fixture.componentRef.setInput('active', 1);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.current').length).toBe(1);
    expect(el.querySelectorAll('img').length).toBe(2);
  });
});
