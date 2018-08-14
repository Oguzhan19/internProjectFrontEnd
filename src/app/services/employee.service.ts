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
 
  private employeesUrl = 'api/employees';  // URL to web api
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
getEmployee(id: number): Observable<Employee> {
  const url = `${this.employeesUrl}/${id}`;
  return this.http.get<Employee>(url).pipe(
    tap(_ => this.log(`fetched employee id=${id}`)),
    catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  );
}
/** PUT: update the hero on the server */
updateEmployee (employee: Employee): Observable<any> {
  return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
    tap(_ => this.log(`updated employee id=${employee.id}`)),
    catchError(this.handleError<any>('updateEmployee'))
  );
}

/** POST: add a new hero to the server */
addEmployee (employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
    tap((employee: Employee) => this.log(`added employee w/ id=${employee.id}`)),
    catchError(this.handleError<Employee>('addEmployee'))
  );
}

/** DELETE: delete the hero from the server */
deleteEmployee (employee: Employee | number): Observable<Employee> {
  const id = typeof employee === 'number' ? employee : employee.id;
  const url = `${this.employeesUrl}/${id}`;

  return this.http.delete<Employee>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted employee id=${id}`)),
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