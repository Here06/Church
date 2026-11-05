import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {SectionHeadingComponent} from './section-heading.component';

describe('SectionHeadingComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [provideRouter([])]}));

  it('renders the title and only shows the link when a label is given', () => {
    const fixture = TestBed.createComponent(SectionHeadingComponent);
    fixture.componentRef.setInput('title', 'Upcoming events');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')!.textContent).toContain('Upcoming events');
    expect(el.querySelector('a')).toBeNull();

    fixture.componentRef.setInput('linkLabel', 'View All');
    fixture.detectChanges();
    expect(el.querySelector('a')!.textContent).toContain('View All');
  });
});
