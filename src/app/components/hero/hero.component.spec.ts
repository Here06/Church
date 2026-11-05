import {TestBed} from '@angular/core/testing';
import {HeroComponent} from './hero.component';

describe('HeroComponent', () => {
  it('renders the headline and the scripture caption', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentRef.setInput('image', 'assets/images/hero-cross.jpg');
    fixture.componentRef.setInput('scriptureReference', 'Matthew 28:19–20');
    fixture.componentRef.setInput('scriptureText', '“Go and make disciples of all nations...”');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')!.textContent).toContain('A Renewed World');
    expect(el.querySelector('.reference')!.textContent).toContain('Matthew 28:19–20');
  });
});
