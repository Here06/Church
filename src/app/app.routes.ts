import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CalendarComponent} from "./components/calendar/calendar.component";
import {BranchesComponent} from "./components/branches/branches.component";
import {BranchComponent} from "./components/branch/branch.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'branches/:name', component: BranchComponent },
];
