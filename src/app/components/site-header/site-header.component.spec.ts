import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {SiteHeaderComponent} from './site-header.component';

describe('SiteHeaderComponent', () => {
  let fixture: ComponentFixture<SiteHeaderComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [provideRouter([])]});
    fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('renders the primary navigation links', () => {
    const labels = Array.from(el.querySelectorAll('.links a')).map(a => a.textContent!.trim());
    expect(labels).toEqual(['Home', 'Events', 'Branches', 'About Us', 'Resources', 'Contact']);
  });

  it('toggles the mobile menu', () => {
    const toggle = el.querySelector<HTMLButtonElement>('.menu-toggle')!;
    expect(el.querySelector('#mobile-menu')).toBeNull();
    toggle.click();
    fixture.detectChanges();
    expect(el.querySelector('#mobile-menu')).not.toBeNull();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});
