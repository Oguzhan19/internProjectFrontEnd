import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment';
import { AssignmentService } from '../../services/assignment.service';
//import {InMemoryDataService} from '../../models/in-memory-data.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  assignments: Assignment[];
  assignment:Assignment;
 
  constructor(
    private assignmentService: AssignmentService
  ) { }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getAssignments();
    this.assignment=new Assignment();
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

