import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl: string = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  editProfile(id: string, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/users/profile/${id}`, { withCredentials: true });
  }
}
