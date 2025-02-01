import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { UserInfoService } from '../../../services/user-info.service';


@Component({
  selector: 'lib-header-container',
  imports: [HeaderComponent],
  templateUrl: './header-container.component.html',
})
export class HeaderContainerComponent  implements OnInit {
  userInfoService = inject(UserInfoService);
  public username: string = 'empty';

  constructor() {

  }

  ngOnInit(): void {
    this.username = this.userInfoService.getUserInfo()?.username;
    console.log("OK",this.username);

  }

}
