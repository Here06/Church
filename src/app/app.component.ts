import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SiteFooterComponent} from './components/site-footer/site-footer.component';
import {SiteHeaderComponent} from './components/site-header/site-header.component';

@Component({
  selector: 'app-root',
  imports: [SiteHeaderComponent, SiteFooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NCCC';
}
