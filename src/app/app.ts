import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared-module';
import { UserStorage } from './basic/basic-services/user-storage';
import { NzMessageService } from 'ng-zorro-antd/message'; // ✅ Add this import

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('attendance-frontend');

  isEmployeeLoggedIn: boolean = UserStorage.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();
  isManagerLoggedIn: boolean = UserStorage.isManagerLoggedIn();

  constructor(
    private router: Router,
    private message: NzMessageService  // ✅ Add this
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isEmployeeLoggedIn = UserStorage.isEmployeeLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
      this.isManagerLoggedIn = UserStorage.isManagerLoggedIn();
    });
  }

  // ✅ Add this logout method
  logout() {
    UserStorage.signOut();
    this.message.success('Logged out successfully');
    this.router.navigate(['/']);

    // Update the boolean flags
    this.isAdminLoggedIn = false;
    this.isEmployeeLoggedIn = false;
    this.isManagerLoggedIn = false;
  }
}