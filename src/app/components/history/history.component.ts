import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  timeline: TimelineEvent[] = [
    {
      year: '1937',
      title: 'Founding of NCCC',
      description: 'Our church was established with a small group of believers...'
    },
    {year: '1995', title: 'First Branch Opened', description: 'We expanded to serve a wider community...'},
    {
      year: '2010',
      title: 'Community Outreach Programs',
      description: 'Launched initiatives to support local families and youth...'
    },
    {
      year: '2020',
      title: 'Digital Ministry',
      description: 'Started livestream services and online fellowship during the pandemic...'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 600,
        once: true
      });
    }
  }
}
