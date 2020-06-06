import { Routes } from '@angular/router';
import {TodayComponent} from '../today/today.component'
import {UpcomingComponent} from '../upcoming/upcoming.component'
import {ArchievedComponent} from '../archieved/archieved.component'
import {LoginComponent} from '../login/login.component'
export const routes: Routes = [
  { path: 'Auth',  component: LoginComponent },
  { path: 'Today',  component: TodayComponent },
  { path: 'Upcoming',  component: UpcomingComponent },
  { path: 'Archived',  component: ArchievedComponent },
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },
];