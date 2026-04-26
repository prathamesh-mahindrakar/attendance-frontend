import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { EmployeeService } from '../employee-services/employee-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../../basic/basic-services/user-storage';

@Component({
  selector: 'app-employee-dashboard',
  imports: [SharedModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.scss',
})
export class EmployeeDashboard {

  leaves: any;

  constructor(private employeeService: EmployeeService, private message: NzMessageService) { }

  ngOnInit() {
    this.getMyLeaves();
  }

  applyLeave() {

    const data = {
      employeeId: UserStorage.getUserId(),      // Changed from 'empId' to 'employeeId'
      projectId: UserStorage.getUserProjectId()
    }

    this.employeeService.applyLeave(data).subscribe({
      next: (response) => {
        console.log('Leave applied successfully:', response);
        this.message.success('Leave applied successfully');
      },
      error: (error) => {
        console.error('Error applying leave:', error);
        this.message.error('Failed to apply leave');
      }
    });
  }

  getMyLeaves() {
    this.employeeService.getMyLeaves().subscribe({
      next: (response) => {
        console.log('My leaves:', response);
        this.leaves = response;
        console.log(this.leaves);

      },
      error: (error) => {
        console.error('Error fetching my leaves:', error);
      }
    });
  }
}