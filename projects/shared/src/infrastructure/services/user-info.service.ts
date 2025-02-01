import { Injectable } from '@angular/core';



export interface UserInfo {
  username: string;
  accountNumber?: string;

}


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userInfoKey = 'user_info';

  constructor() { }

  getUserInfo(): UserInfo {
    const userInfoString = localStorage.getItem(this.userInfoKey);
    if (userInfoString) {
      try {
        return JSON.parse(userInfoString) as UserInfo;
      } catch (error) {
        console.error('Error parsing user info from localStorage', error);
        return {
          username: ''
        };
      }

    }
    return {
      username: ''
    };
  }

  setUserInfo(userinfo: UserInfo): void {
    localStorage.setItem(this.userInfoKey, JSON.stringify(userinfo));
  }

  removeInfo(): void {
    localStorage.removeItem(this.userInfoKey);
  }

  updateUserInfo(key: keyof UserInfo, value: string): void {
    const currentUserInfo = this.getUserInfo();
    currentUserInfo[key] = value;
    this.setUserInfo(currentUserInfo);
  }

}
