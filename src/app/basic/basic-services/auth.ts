import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http: HttpClient) { }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(baseUrl + `/api/auth/login`, loginData);
  }
}
