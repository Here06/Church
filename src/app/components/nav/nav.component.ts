import { Component } from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    SearchBarComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  handleSearch(query: string): void {
    console.log('Search term:', query);
    // Filter data, send HTTP request, update UI, etc.
  }
}
