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
    this.apiURL = "http://localhost:8000/api";
  }

  register(username: string, email: string, password: string) {
    return this.httpClient.post<HttpResponse<any>>(`${this.apiURL}/auth/signup`, { name: username, email: email, password: password });
  }

  loginUsername(username: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(this.apiURL, { name: username, username, password });
  }

  loginGoogle() {

  }
}
