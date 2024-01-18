import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  register(username: string, email: string, password: string): Observable<HttpResponse<any>> {
    // TODO: polepšaj poslani object
    return this.httpClient.post<HttpResponse<any>>(`${this.apiUrl}/auth/signup`, { name: username, email: email, password: password });
  }

  loginUsername(email: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${this.apiUrl}/auth/login`, { email, password });
  }

  loginGoogle() {

  }

  // TODO: implement logout
  logout() {

  }
}
