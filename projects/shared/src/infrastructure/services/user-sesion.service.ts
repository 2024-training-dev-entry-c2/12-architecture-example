import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
 
 @Injectable({
   providedIn: 'root'
 })
 export class UserSessionService {
     private usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
    username$ = this.usernameSubject.asObservable();
   setUsername(username: string): void {
       this.usernameSubject.next(username);
       localStorage.setItem('username', username);
     }
 
     getUsername(): string | null {
       return this.usernameSubject.value;
     }
   
     removeUsername(): void {
       localStorage.removeItem('username');
         this.usernameSubject.next(null);
     }
 }