import { Component, OnInit, Input } from '@angular/core';
import { Employee }         from '../../models/employee';
import { EmployeeService }  from '../../services/employee.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  constructor(  private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location) { }

  ngOnInit():void {
    this.getEmployee();
  }
  getEmployee(): void {
    const empID = +this.route.snapshot.paramMap.get('empID');
    console.log(empID);
    this.employeeService.getEmployee(empID)
      .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeeService.addEmployee(this.employee)
      .subscribe(() => this.goBack());
  }
}
