import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Admin } from '../../admin/services/admin';

@Component({
  selector: 'app-manage-projects',
  imports: [SharedModule],
  templateUrl: './manage-projects.html',
  styleUrl: './manage-projects.scss',
})
export class ManageProjects implements OnInit {

  projectForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private adminService: Admin
  ) { }

  projects: any;

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      startDate: [null, [Validators.required]]
    });
    this.getAllProjects();
  }

  submitForm() {
    this.adminService.addProject(this.projectForm.value).subscribe({
      next: (res) => {
        this.message.success('Project added successfully!');
        this.projectForm.reset();
        this.getAllProjects();
      },
      error: (err) => {
        this.message.error('Failed to add project. Please try again.');
      }
    });
  }

  getAllProjects() {
    this.adminService.getProjects().subscribe(res => {

      this.projects = res;
      console.log(this.projects);
      error: (err) => {
        this.message.error('Failed to fetch projects. Please try again.');
      }
    });

  }
}