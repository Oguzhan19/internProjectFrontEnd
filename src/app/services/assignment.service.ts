import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Assignment } from '../models/assignment';
import { Project } from '../models/project';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class AssignmentService {
 
  private assignmentsUrl = 'http://localhost:8080/assignment';  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) { }

    private log(message: string) {
      this.messageService.add(`AssignmentService: ${message}`);
    }
    /** GET employees from the server */
getAssignments (): Observable<Assignment[]> {
  return this.http.get<Assignment[]>(this.assignmentsUrl)
    .pipe(
      tap(assignments => this.log('fetched assignments')),
      catchError(this.handleError('getAssignments', []))
    );
}
/** GET employee by id. Will 404 if id not found */
getAssignment(id: number): Observable<Assignment> {
  const url = `http://localhost:8080/getAssignment?id=${id}`;
  return this.http.get<Assignment>(url).pipe(
    tap(_ => this.log(`fetched assignment id=${id}`)),
    catchError(this.handleError<Assignment>(`getAssignment id=${id}`))
  );
}
/** PUT: update the hero on the server */
updateAssignment (assignment: Assignment): Observable<any> {
  
  return this.http.put(this.assignmentsUrl, assignment, httpOptions).pipe(
    tap(_ => this.log(`updated assignment id=${assignment.id}`)),
    catchError(this.handleError<any>('updateAssignment'))
  );
}

/** POST: add a new hero to the server */
addAssignment (assignment: Assignment): Observable<Assignment> {
  const url=`http://localhost:8080/newAssignment`;
  return this.http.post<Assignment>(url, assignment, httpOptions).pipe(
    
   // tap((assignment: Assignment) => this.log(`added assignment w/ id=${assignment.id}`)),
    catchError(this.handleError<Assignment>('addAssignment'))
  );
}

/** DELETE: delete the hero from the server */
deleteAssignment (assignment: Assignment | number): Observable<Assignment> {
  const id = typeof assignment === 'number' ? assignment : assignment.id;
  const url = `http://localhost:8080/deleteAssignment?id=${id}`;

  return this.http.delete<Assignment>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted assignment id=${id}`)),
    catchError(this.handleError<Assignment>('deleteAssignment'))
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