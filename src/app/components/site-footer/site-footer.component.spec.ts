import {TestBed} from '@angular/core/testing';
import {SiteFooterComponent} from './site-footer.component';

describe('SiteFooterComponent', () => {
  it('shows the copyright line', () => {
    const fixture = TestBed.createComponent(SiteFooterComponent);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('THE NEW COVENANT CHURCH OF CHRIST');
  });
});
