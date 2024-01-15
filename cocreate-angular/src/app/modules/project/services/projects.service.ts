import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  apiURL: string = "";
  constructor(private httpClient: HttpClient) {
    this.apiURL = "http:/api.cocreate.top/api";
  }

  getProject(): Observable<Project> {
    return of();
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<{projects: Project[]}>(`${this.apiURL}/db/project/all`, { withCredentials: true }).pipe(
      map(res => res.projects)
    );
  }

  addProject(project: Project) {
    return this.httpClient.post(`${this.apiURL}/db/project/new`, project, { withCredentials: true }).pipe(
      tap(res => console.log(res))
    );
  }

  editProject(): Observable<Project> {
    return of();
  }

  deleteProject(): Observable<Project> {
    return of();
  }
}
