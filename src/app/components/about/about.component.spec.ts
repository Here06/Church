import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {AboutComponent} from './about.component';

describe('AboutComponent', () => {
  it('renders the about copy and a Learn More link', () => {
    TestBed.configureTestingModule({providers: [provideRouter([])]});
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.componentRef.setInput('image', 'assets/images/about-community.jpg');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('p')!.textContent).toContain('Christ-centred community');
    expect(el.querySelector('a[appButton]')!.textContent).toContain('Learn More');
  });
});
