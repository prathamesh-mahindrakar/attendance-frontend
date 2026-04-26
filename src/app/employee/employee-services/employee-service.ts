import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserStorage } from '../../basic/basic-services/user-storage';

const url = "http://localhost:8080";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  applyLeave(leaveDto: any): Observable<any> {
    return this.http.post(url + `/api/attendance/add/leave`, leaveDto);
  }

  getMyLeaves(): Observable<any> {
    return this.http.get(url + `/api/attendance/leave/employee/` + UserStorage.getUserId());
  }

}
