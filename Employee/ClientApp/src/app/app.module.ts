import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EmployeeComponent } from './employee/employee.component';

import { EmployeeService } from './Services/employee.service';
import { EmergencyContactService } from './Services/emergency-contact.service';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { ImgComponent } from './img/img.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    EmergencyContactComponent,
    ImgComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'create-employees', component: CreateEmployeeComponent },
      { path: 'edit-employees/:id', component: CreateEmployeeComponent },
      { path: 'view-image/:id', component: ImgComponent },
      { path: 'emergency-contacts/:id', component: EmergencyContactComponent },
    ])
  ],
  providers: [EmployeeService, EmergencyContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
