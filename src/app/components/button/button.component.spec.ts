import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ButtonComponent} from './button.component';

@Component({
  imports: [ButtonComponent],
  template: '<button appButton variant="outline">Watch</button><a appButton>Join</a>'
})
class HostComponent {}

describe('ButtonComponent', () => {
  it('applies the outline variant class only when requested', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('button')!.classList).toContain('outline');
    expect(el.querySelector('a')!.classList).not.toContain('outline');
  });
});
