import { Component, OnInit, Input } from '@angular/core';
import { Assignment }         from '../../models/assignment';
import { AssignmentService }  from '../../services/assignment.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignment: Assignment;
  constructor(  private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private location: Location) { }

  ngOnInit():void {
    this.getAssignment();
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
    this.assignmentService.updateAssignment(this.assignment)
      .subscribe(() => this.goBack());
  }
}
