import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { EmployeeDetailComponent }  from './components/employee-detail/employee-detail.component';
import { ProjectDetailComponent }  from './components/project-detail/project-detail.component';
import { AssignmentDetailComponent }  from './components/assignment-detail/assignment-detail.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'employees', component:  EmployeesComponent},
  { path: 'projects', component:  ProjectsComponent},
  { path: 'assignments', component:  AssignmentsComponent},
  { path: 'employeeDetail/:id', component: EmployeeDetailComponent },
  { path: 'projectDetail/:id', component: ProjectDetailComponent },
  { path: 'assignmentDetail/:id', component: AssignmentDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
