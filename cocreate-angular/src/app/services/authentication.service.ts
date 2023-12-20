import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = ""

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://localhost:8000";
  }

  ping() {
    this.httpClient.get(`${this.apiURL}/ping`).subscribe(res => console.log("API is accessible :)"))
  }

  loginUsername(username: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(this.apiURL, { username: username, pasword: password });
  }

  loginGoogle() {

  }

  register(firstName: string, lastName: string, email: string, username: string, password: string) {
    return this.httpClient.post<HttpResponse<any>>(this.apiURL, { firstName: firstName, lastName: lastName, username: username, pasword: password });
  }

}
