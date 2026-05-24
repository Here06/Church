import {Component} from '@angular/core';
import {HistoryComponent} from "../history/history.component";
import {MissionComponent} from "../mission/mission.component";
import {VisionComponent} from "../vision/vision.component";
import {MottoComponent} from "../motto/motto.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    HistoryComponent,
    MissionComponent,
    VisionComponent,
    MottoComponent
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
