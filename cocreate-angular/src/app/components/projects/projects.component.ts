import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable, of, tap } from 'rxjs';
import { IProject } from '../../models/project';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  $projects: Observable<IProject[]> = of();
  
  constructor(private projectsService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this.$projects = this.projectsService.getProjects().pipe(
      tap(res => console.log(res))
    );
  }

  viewProject(id: string) {
    console.log("🚀 ~ ProjectsComponent ~ viewProject ~ id:", id)
    this.router.navigateByUrl(`/project/${id}`);
  }
}
