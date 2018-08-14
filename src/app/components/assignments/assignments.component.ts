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
 
  constructor(
    private assignmentService: AssignmentService
  ) { }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getAssignments();
  }
 
  getAssignments(): void {
    this.assignmentService.getAssignments()
    .subscribe(assignments => {this.assignments = assignments; console.log(JSON.stringify(assignments))});
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.assignmentService.addAssignment({ name } as Assignment)
      .subscribe(assignment => {
        this.assignments.push(assignment);
      });
    }

      delete(assignment : Assignment): void {
        this.assignments = this.assignments.filter(a => a !== assignment);
        this.assignmentService.deleteAssignment(assignment).subscribe();
      }
  }

