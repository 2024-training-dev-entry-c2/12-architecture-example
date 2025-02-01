import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../model/user.model";
import { StateFactory } from "./state.factory";
import { ILoginResponse } from "../../infrastructure/services/authenticate-user.service";

@Injectable({
    providedIn: 'root'
  })
  export class UserState {
    private readonly _factory = inject(StateFactory);
  
    
    private readonly user$ = new BehaviorSubject<IUser>(null);
    private readonly authInfo$ = new BehaviorSubject<ILoginResponse>(null);
    private readonly userList$ = new BehaviorSubject<IUser[]>([]);
  
    store() {
      return {
        user: this._factory.state(this.user$),
        authInfo: this._factory.state(this.authInfo$),
        users: this._factory.state(this.userList$)
      }
    }
  }