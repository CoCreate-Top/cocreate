import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getProject(): Observable<Project> {
    return of();
  }

  getProjects(): Observable<Project[]> {
    return of();
  }

  editProject(): Observable<Project> {
    return of();
  }

  deleteProject(): Observable<Project> {
    return of();
  }
}
