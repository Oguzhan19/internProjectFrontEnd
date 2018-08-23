import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from '../models/project';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class ProjectService {
 
  private projectsUrl = 'http://localhost:8080/project';  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add(`ProjectService: ${message}`);
    }
    /** GET employees from the server */
getProjects (): Observable<Project[]> {
  return this.http.get<Project[]>(this.projectsUrl)
    .pipe(
      tap(projects => this.log('fetched projects')),
      catchError(this.handleError('getProjects', []))
    );
}
/** GET employee by id. Will 404 if id not found */
getProject(id: number): Observable<Project> {
  const url = `http://localhost:8080/getProject?id=${id}`;
  return this.http.get<Project>(url).pipe(
    tap(_ => this.log(`fetched project id=${id}`)),
    catchError(this.handleError<Project>(`getProject id=${id}`))
  );
}
/** PUT: update the hero on the server */
updateProject (project: Project): Observable<any> {
  return this.http.put(this.projectsUrl, project, httpOptions).pipe(
    tap(_ => this.log(`updated project id=${project.id}`)),
    catchError(this.handleError<any>('updateProject'))
  );
}

/** POST: add a new hero to the server */
addProject (project: Project): Observable<Project> {
  const url='http://localhost:8080/newProject'
  return this.http.post<Project>(url, project, httpOptions).pipe(
    tap((project: Project) => this.log(`added project w/ id=${project.id}`)),
    catchError(this.handleError<Project>('addProject'))
  );
}

/** DELETE: delete the hero from the server */
deleteProject (project: Project | number): Observable<Project> {
  const id = typeof project === 'number' ? project : project.id;
  const url = `http://localhost:8080/deleteProject?id=${id}`;

  return this.http.delete<Project>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted project id=${id}`)),
    catchError(this.handleError<Project>('deleteProject'))
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