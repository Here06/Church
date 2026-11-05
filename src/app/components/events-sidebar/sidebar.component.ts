import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    DatePipe
  ],
  standalone: true
})
export class SidebarComponent {
  @Input() events: CalendarEvent[] = [];
  @Output() eventSelected = new EventEmitter<CalendarEvent>();

  onEventClick(event: CalendarEvent) {
    this.eventSelected.emit(event);
  }
}
