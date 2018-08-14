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

  projects: Project[];
 
  constructor(
    private projectService: ProjectService
  ) { }
 
  ngOnInit() {
   // this.employees = InMemoryDataService.
    this.getProjects();
  }
 
  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(projects => {this.projects = projects; console.log(JSON.stringify(projects))});
  }

  add(pname: string): void {
    pname = pname.trim();
    if (!pname) { return; }
    this.projectService.addProject({ pname } as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
    }

      delete(project : Project): void {
        this.projects = this.projects.filter(p => p !== project);
        this.projectService.deleteProject(project).subscribe();
      }
  }

