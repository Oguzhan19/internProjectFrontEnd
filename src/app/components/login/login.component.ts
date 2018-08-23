import { Component, OnInit } from '@angular/core';
import {Employee} from'../../models/employee';
import {EmployeeService} from'../../services/employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
employees:Employee[];
employee:Employee;
  constructor(private employeeService:EmployeeService) { 
    this.employee = new Employee();
  }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => {this.employees = employees; console.log(JSON.stringify(employees))});
  }

}
