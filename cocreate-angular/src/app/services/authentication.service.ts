import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = ""

  constructor(private httpClient: HttpClient) {
    // TODO: zrihtaj api url iz environment spremenljivke
    this.apiURL = "https://api.cocreate.top/api";
  }

  register(username: string, email: string, password: string): Observable<HttpResponse<any>> {
    // TODO: polepšaj poslani object
    return this.httpClient.post<HttpResponse<any>>(`${this.apiURL}/auth/signup`, { name: username, email: email, password: password }, { withCredentials: true });
  }

  loginUsername(email: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${this.apiURL}/auth/login`, { email, password }, { withCredentials: true });
  }

  loginGoogle() {

  }

  logout(): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${this.apiURL}/auth/logout`, { withCredentials: true });
  }
}
