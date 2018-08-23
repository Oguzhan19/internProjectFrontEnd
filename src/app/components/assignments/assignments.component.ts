import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment';
import { AssignmentService } from '../../services/assignment.service';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  [x: string]: any;

  assignments: Assignment[];
  assignment:Assignment;
  employees:Employee[];
  employee:Employee;
  projects:Project[];
  project:Project;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private employeeService: EmployeeService,
    private projectService:ProjectService
  ) { 
    this.assignment=new Assignment();
    this.assignment.employee = new Employee();
    this.assignment.project = new Project();
  }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getAssignments();
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
  getAssignments(): void {
    this.assignmentService.getAssignments()
    .subscribe(assignments => {this.assignments = assignments; console.log(JSON.stringify(assignments))});
  }
  add(Assignment): void {
    if (!Assignment) { return; }

    this.assignmentService.addAssignment(Assignment)
      .subscribe(Assignment => {
        this.assignments.push(Assignment);
      });
    }

      delete(assignment : Assignment): void {
        this.assignments = this.assignments.filter(a => a !== assignment);
        this.assignmentService.deleteAssignment(assignment).subscribe();
      }
  }

