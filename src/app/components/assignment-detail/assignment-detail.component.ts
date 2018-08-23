import { Component, OnInit, Input } from '@angular/core';
import { Assignment }         from '../../models/assignment';
import { AssignmentService }  from '../../services/assignment.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignment: Assignment;
  employees:Employee[];
  employee:Employee;
  projects:Project[];
  project:Project;
  constructor(  private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private employeeService: EmployeeService,
    private projectService:ProjectService,
    private location: Location) { 
      this.assignment=new Assignment();
    this.assignment.employee = new Employee();
    this.assignment.project = new Project();
    }

  ngOnInit():void {
    this.getAssignment();
    this.getEmployees();
    this.getProjects();
    this.getEmployee();
    this.getProject();
  }

  getEmployee(): void {
    const empID = +this.route.snapshot.paramMap.get('empID');
    console.log(empID);
    this.employeeService.getEmployee(empID)
      .subscribe(employee => this.employee = employee);
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  getEmployees():void{
    this.employeeService.getEmployees()
    .subscribe(employees => {this.employees =employees; console.log(JSON.stringify(employees))});
  }
  getProjects():void{
    this.projectService.getProjects()
    .subscribe(projects => {this.projects =projects; console.log(JSON.stringify(projects))});
  }

  getAssignment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignment = assignment);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.assignmentService.addAssignment(this.assignment)
      .subscribe(() => this.goBack());
  }
}
