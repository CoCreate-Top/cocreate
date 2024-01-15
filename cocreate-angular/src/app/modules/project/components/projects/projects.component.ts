import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable, of } from 'rxjs';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  $projects: Observable<Project[]> = of();
  
  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.$projects = this.projectsService.getProjects();
  }
}
