import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
employees: Employee[];
employee: Employee;
  constructor( private employeeService: EmployeeService) { 
    this.employee = new Employee();
  }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => {this.employees = employees; console.log(JSON.stringify(employees))});
  }
  add(Employee): void {
    
    if (!Employee) { return; }
    this.employeeService.addEmployee(Employee)
      .subscribe(Employee => {
        this.employees.push(Employee);
      });
    }
}