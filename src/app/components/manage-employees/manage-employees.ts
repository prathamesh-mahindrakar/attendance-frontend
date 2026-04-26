import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../admin/services/admin';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-employees',
  imports: [SharedModule],
  templateUrl: './manage-employees.html',
  styleUrl: './manage-employees.scss',
})
export class ManageEmployees {

  employeeForm: FormGroup;

  projects: any;

  employees: any;

  constructor(private fb: FormBuilder, private adminService: Admin, private message: NzMessageService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      projectId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      userRole: ['EMPLOYEE']
    });

    this.getAllProjects();

    this.getAllEmployees();
  }

  getAllProjects() {
    this.adminService.getProjects().subscribe((projects: any) => {
      this.projects = projects;
      console.log('Projects:', this.projects);
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      this.adminService.addUser(employeeData).subscribe((response: any) => {
        console.log('Employee added:', response);
        this.message.success('Employee added successfully');
        this.employeeForm.reset();
        this.getAllEmployees();
      }, (error: any) => {
        console.error('Error adding Employee:', error);
        this.message.error('Failed to add Employee');
      });
    }
  }

  getAllEmployees() {
    this.adminService.getAllEmployees().subscribe((employees: any) => {
      this.employees = employees;
      console.log('Employees:', this.employees);
    });
  }
}