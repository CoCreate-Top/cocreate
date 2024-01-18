import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfile } from '../interfaces/profile';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}/db/profile`, { withCredentials: true });
  }

  editProfile(id: string, profile: IProfile): Observable<IProfile> {
    return this.http.patch<IProfile>(`${this.apiUrl}/db/profile/${id}`, profile, { withCredentials: true });
  }
}
