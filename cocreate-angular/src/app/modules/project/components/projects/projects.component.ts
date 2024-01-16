import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable, of } from 'rxjs';
import { IProject } from '../../../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  $projects: Observable<IProject[]> = of();
  
  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.$projects = this.projectsService.getProjects();
  }
}
