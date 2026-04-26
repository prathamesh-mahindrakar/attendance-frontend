import { Injectable } from '@angular/core';

const USER = 'att_user';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {

  constructor() { }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER));
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : ' ';
  }

  static getUserProjectId(): string {
    const user = this.getUser();
    return user ? user.projectId : ' ';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.userRole : ' ';  // ✅ FIXED: Changed from 'role' to 'userRole'
  }

  static isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.userRole === 'ADMIN';  // ✅ FIXED: Changed from 'role' to 'userRole'
  }

  static isEmployeeLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.userRole === 'EMPLOYEE';  // ✅ FIXED: Already correct
  }

  static isManagerLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.userRole === 'MANAGER';  // ✅ FIXED: Already correct
  }

  static signOut(): void {
    window.localStorage.removeItem(USER);
  }
}