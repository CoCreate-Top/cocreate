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
    return of<Project[]>([
      {
        id: "1",
        title: "IPIRI",
        creator: "Luka Žohar",
        status: "Doing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus eros quis sollicitudin sagittis. Ut bibendum luctus ex, quis rutrum magna dignissim in. Quisque et tortor magna. Praesent at ipsum urna. Vivamus sodales imperdiet hendrerit. Fusce eu fermentum elit. Nunc aliquam consectetur erat, in dictum augue malesuada a. Donec mauris elit, tempus at ante a, mollis congue odio. Sed non arcu quam. Aenean tortor diam, blandit ac blandit non, feugiat non turpis. Aliquam tristique eleifend diam. Nullam dapibus nulla mauris, et sagittis lacus congue sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum vel venenatis lectus, a tristique lorem. Nam tincidunt justo sit amet ex laoreet pharetra."
      },
      {
        id: "2",
        title: "EIP",
        creator: "Ambrož Klančar",
        status: "Stuck",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus eros quis sollicitudin sagittis. Ut bibendum luctus ex, quis rutrum magna dignissim in. Quisque et tortor magna. Praesent at ipsum urna. Vivamus sodales imperdiet hendrerit. Fusce eu fermentum elit. Nunc aliquam consectetur erat, in dictum augue malesuada a. Donec mauris elit, tempus at ante a, mollis congue odio. Sed non arcu quam. Aenean tortor diam, blandit ac blandit non, feugiat non turpis. Aliquam tristique eleifend diam. Nullam dapibus nulla mauris, et sagittis lacus congue sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum vel venenatis lectus, a tristique lorem. Nam tincidunt justo sit amet ex laoreet pharetra."
      },
      {
        id: "3",
        title: "TPO",
        creator: "Tim Rekelj",
        status: "Almost finished",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus eros quis sollicitudin sagittis. Ut bibendum luctus ex, quis rutrum magna dignissim in. Quisque et tortor magna. Praesent at ipsum urna. Vivamus sodales imperdiet hendrerit. Fusce eu fermentum elit. Nunc aliquam consectetur erat, in dictum augue malesuada a. Donec mauris elit, tempus at ante a, mollis congue odio. Sed non arcu quam. Aenean tortor diam, blandit ac blandit non, feugiat non turpis. Aliquam tristique eleifend diam. Nullam dapibus nulla mauris, et sagittis lacus congue sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum vel venenatis lectus, a tristique lorem. Nam tincidunt justo sit amet ex laoreet pharetra."
      }
    ]);
  }

  editProject(): Observable<Project> {
    return of();
  }

  deleteProject(): Observable<Project> {
    return of();
  }
}
