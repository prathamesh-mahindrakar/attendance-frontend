import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { ManagerService } from '../../services/manager-service';
import { UserStorage } from '../../../basic/basic-services/user-storage';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manager-dashboard',
  imports: [SharedModule],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.scss',
})
export class ManagerDashboard {

  employeeDetails: any;

  constructor(private managerService: ManagerService, private message: NzMessageService) { }

  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.managerService.getAllEmployeesByProjectId().subscribe((response) => {
      this.employeeDetails = response;
      console.log(this.employeeDetails);

    }, (error) => {
      this.message.error('Error fetching employee details');
      console.error('Error fetching employee details:', error);
    });
  }

  markAttendance(type: string, employeeId: number, projectId: number) {
    const attendanceDto = {
      employeeId: employeeId,
      projectId: projectId,
      managerId: UserStorage.getUserId(),
      attendanceStatus: type
    };

    this.managerService.markAttendance(attendanceDto).subscribe((response) => {
      console.log('Attendance marked successfully:', response);
      this.message.success('Attendance marked successfully');
    }, (error) => {
      console.error('Error marking attendance:', error);
      this.message.error('Error marking attendance');
    });
  }
}