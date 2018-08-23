import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
//import {InMemoryDataService} from '../../models/in-memory-data.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  employee: Employee;
 
  constructor(
    private employeeService: EmployeeService
  ) {
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

      delete(employee : Employee): void {
        this.employees = this.employees.filter(e => e !== employee);
        this.employeeService.deleteEmployee(employee).subscribe();
      }
  }

