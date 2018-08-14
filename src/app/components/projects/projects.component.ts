import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
//import {InMemoryDataService} from '../../models/in-memory-data.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects : Project[];
  project : Project;
 
  constructor(
    private projectService: ProjectService
  ) { 

    this.project = new Project();
  }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getProjects();
  }
 
  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(projects => {this.projects = projects; console.log(JSON.stringify(projects))});
  }

  add(Project): void {
    
    if (!Project) { return; }
    this.projectService.addProject(Project)
      .subscribe(Project => {
        this.projects.push(Project);
      });
    }

      delete(project : Project): void {
        this.projects = this.projects.filter(p => p !== project);
        this.projectService.deleteProject(project).subscribe();
      }
  }

