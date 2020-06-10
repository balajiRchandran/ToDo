import { Routes } from '@angular/router';
import {TodayComponent} from '../today/today.component'
import {UpcomingComponent} from '../upcoming/upcoming.component'
import {ArchievedComponent} from '../archieved/archieved.component'
import {LoginComponent} from '../login/login.component'
import {HeaderComponent} from '../header/header.component'
import {AuthGuard} from '../auth.guard'
import {HomeComponent} from '../home/home.component'
import {FilterComponent} from '../filter/filter.component'
export const routes: Routes = [
  {path: '', component:HeaderComponent, canActivate:[AuthGuard]  , children:[
    {path:'',component:HomeComponent},
    { path: 'Today',  component: TodayComponent },
    { path: 'Upcoming',  component: UpcomingComponent },
    { path: 'Archived',  component: ArchievedComponent }
  ]},
  { path: 'Auth',  component: LoginComponent},
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },
  { path: 'Home', redirectTo: '/', pathMatch: 'full' }
];