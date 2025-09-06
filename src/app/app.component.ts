import { Component } from '@angular/core';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NCCC';
}
