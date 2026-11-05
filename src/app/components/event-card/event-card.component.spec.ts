import {TestBed} from '@angular/core/testing';
import {EventCardComponent} from './event-card.component';

describe('EventCardComponent', () => {
  it('renders the event details', () => {
    const fixture = TestBed.createComponent(EventCardComponent);
    fixture.componentRef.setInput('event', {
      month: 'MAR', day: '15', title: 'Sunday Worship', time: '10:00 AM – 12:00 PM',
      location: 'Main Sanctuary', image: 'assets/images/event-worship.jpg'
    });
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent!;
    expect(text).toContain('Sunday Worship');
    expect(text).toContain('MAR');
    expect(text).toContain('Main Sanctuary');
  });
});
