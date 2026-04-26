import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../basic-services/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../basic-services/user-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          UserStorage.saveUser(response);


          if (UserStorage.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (UserStorage.isEmployeeLoggedIn()) {
            this.router.navigateByUrl('/employee/dashboard');
          } else if (UserStorage.isManagerLoggedIn()) {
            this.router.navigateByUrl('/manager/dashboard');
          }

          console.log('Login successful', response);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

}
