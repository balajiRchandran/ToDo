import { BrowserModule } from '@angular/platform-browser';
import { NgModule , OnChanges} from '@angular/core';
import { baseURL } from './shared/baseurl';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';


import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core'
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from  '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { GlobalService } from './shared/global.service';
import { TodayComponent } from './today/today.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchievedComponent } from './archieved/archieved.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterComponent } from './filter/filter.component';
import { ToastComponent } from './toast/toast.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AddtaskComponent,
    TodayComponent,
    UpcomingComponent,
    ArchievedComponent,
    LogoutComponent,
    HomeComponent,
    FilterComponent,
    ToastComponent
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDividerModule,
    MatBadgeModule,
    MatChipsModule,
    MatListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents:[AddtaskComponent,LogoutComponent,FilterComponent],
  providers: [{provide: 'BaseURL', useValue: baseURL},MatDatepickerModule,GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
