import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080';


@Injectable({
  providedIn: 'root',
})
export class Admin {

  constructor(private http: HttpClient) { }

  addProject(project: any): Observable<any> {
    return this.http.post(url + "/api/projects/add", project);
  }

  getProjects(): Observable<any> {
    return this.http.get(url + "/api/projects/all");
  }

  addUser(user: any): Observable<any> {
    return this.http.post(url + "/api/admin/create-user", user);
  }

  getAllManagers(): Observable<any> {
    return this.http.get(url + "/api/admin/managers");
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(url + "/api/admin/employees");
  }


}
