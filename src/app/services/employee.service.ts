import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class EmployeeService {
 
  private employeesUrl = 'http://localhost:8080/employee';  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add(`EmployeeService: ${message}`);
    }
    /** GET employees from the server */
getEmployees (): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      tap(employees => this.log('fetched employees')),
      catchError(this.handleError('getEmployees', []))
    );
}
/** GET employee by id. Will 404 if id not found */
getEmployee(empID: number): Observable<Employee> {
  const url = `http://localhost:8080/getEmployee?id=${empID}`;
  return this.http.get<Employee>(url).pipe(
    tap(_ => this.log(`fetched employee empID=${empID}`)),
    catchError(this.handleError<Employee>(`getEmployee empID=${empID}`))
  );
}
/** PUT: update the hero on the server */
updateEmployee (employee: Employee): Observable<any> {
  const url = `http://localhost:8080/updateEmployee`;
  return this.http.post<Employee>(url, employee, httpOptions).pipe(
   // tap((employee: Employee) => this.log(`added employee w/ empID=${employee.empID}`)),
    catchError(this.handleError<Employee>('addEmployee')));
}

/** POST: add a new hero to the server */
addEmployee (employee: Employee): Observable<Employee> {
  const url = `http://localhost:8080/newEmployee`;
  return this.http.post<Employee>(url, employee, httpOptions).pipe(
   // tap((employee: Employee) => this.log(`added employee w/ empID=${employee.empID}`)),
    catchError(this.handleError<Employee>('addEmployee'))
  );
}

/** DELETE: delete the hero from the server */
deleteEmployee (employee: Employee | number): Observable<Employee> {
  const empID = typeof employee === 'number' ? employee : employee.empID;
  const url = `http://localhost:8080/deleteEmployee?empID=${empID}`;

  return this.http.delete<Employee>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted employee empID=${empID}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      }; 
    }
}