import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable, of } from 'rxjs';
import { IProject } from '../../models/project';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  $projects: Observable<IProject[]> = of();
  
  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.$projects = this.projectsService.getProjects();
  }
}
