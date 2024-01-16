import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { IProject } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:8000/api"; // TODO: popravi URLje, da se naložijo iz lokalni spremenljivk: environment.API_URL
  }

  getProject(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiUrl}/db/project/${id}`, { withCredentials: true });
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiUrl}/db/project/all`, { withCredentials: true });
  }

  addProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(`${this.apiUrl}/db/project/new`, project, { withCredentials: true });
  }

  editProject(id: string, project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.apiUrl}/db/project/${id}`, project, { withCredentials: true });
  }

  deleteProject(id: string): Observable<IProject> {
    return this.http.delete<IProject>(`${this.apiUrl}/db/project/${id}`, { withCredentials: true });
  }
}
