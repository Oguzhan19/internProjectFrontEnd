import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { EmployeesComponent } from './components/employees/employees.component';
import {HttpClientModule} from '@angular/common/http';
import {Http,HttpModule} from '@angular/http';
import { MessagesComponent } from './components/messages/messages.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataProjectService }  from './models/in-memory-data-project.service';
import { InMemoryDataService }  from './models/in-memory-data.service';
import { UiModule } from './ui/ui.module';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';

//enableProdMode();
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
    ),
    UiModule
  ],
  declarations: [
    AppComponent,
    EmployeesComponent,
    MessagesComponent,
    EmployeeDetailComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    DashboardComponent,
    AssignmentsComponent,
    AssignmentDetailComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
