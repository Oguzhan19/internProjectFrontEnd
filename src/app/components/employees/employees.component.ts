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
 
  constructor(
    private employeeService: EmployeeService
  ) { }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getEmployees();
  }
 
  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => {this.employees = employees; console.log(JSON.stringify(employees))});
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeeService.addEmployee({ name } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
    }

      delete(employee : Employee): void {
        this.employees = this.employees.filter(e => e !== employee);
        this.employeeService.deleteEmployee(employee).subscribe();
      }
  }

