import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {EventListComponent} from './event-list.component';

describe('EventListComponent', () => {
  it('renders a card per event', () => {
    TestBed.configureTestingModule({providers: [provideRouter([])]});
    const fixture = TestBed.createComponent(EventListComponent);
    const event = {month: 'MAR', day: '15', title: 'A', time: 't', location: 'l', image: 'i'};
    fixture.componentRef.setInput('events', [event, {...event, title: 'B'}]);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('app-event-card').length).toBe(2);
  });
});
