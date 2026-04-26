import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorage } from '../../basic/basic-services/user-storage';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getAllEmployeesByProjectId(): Observable<any> {
    const projectId = UserStorage.getUserProjectId();
    return this.http.get(url + `/api/managers/employee/${projectId}`);
  }


  markAttendance(attendanceDto: any): Observable<any> {
    return this.http.post(url + `/api/attendance/add`, attendanceDto);
  }

}
