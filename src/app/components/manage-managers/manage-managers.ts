import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Admin } from '../../admin/services/admin';
import { log } from 'ng-zorro-antd/core/logger';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-managers',
  imports: [SharedModule],
  templateUrl: './manage-managers.html',
  styleUrl: './manage-managers.scss',
})
export class ManageManagers {

  projects: any;
  manageForm!: FormGroup;
  managers: any;

  constructor(private adminService: Admin,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.manageForm = this.fb.group({
      projectId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      userRole: ['MANAGER']
    });
    this.getAllProjects();

    this.getAllManagers();
  }

  getAllProjects() {
    this.adminService.getProjects().subscribe((projects: any) => {
      this.projects = projects;
      console.log('Projects:', this.projects);
    });
  }

  addManager() {
    if (this.manageForm.valid) {
      const managerData = this.manageForm.value;
      this.adminService.addUser(managerData).subscribe((response: any) => {
        console.log('Manager added:', response);
        this.message.success('Manager added successfully');
        this.manageForm.reset();
      }, (error: any) => {
        console.error('Error adding manager:', error);
        this.message.error('Failed to add manager');
      });
    }
  }

  getAllManagers() {
    this.adminService.getAllManagers().subscribe((managers: any) => {
      console.log('Managers:', managers);
      this.managers = managers;
    }, (error: any) => {
      console.error('Error fetching managers:', error);
    });
  }
}
