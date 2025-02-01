import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IMenuItem, SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LogoutUseCase } from 'users';

@Component({
  selector: 'lib-sidebar-container',
  imports: [SidebarComponent],
  templateUrl: './sidebar-container.component.html',
})
export class SidebarContainerComponent implements OnInit, OnDestroy {


  private  readonly _useCase = inject(LogoutUseCase);
  menus: IMenuItem[] =  [
    {
      iconSrc: "assets/shared/svg/user_side.svg",
      menuTitle: "User",
      href: "/users/dashboard/create"
    }
  ];

  ngOnInit(): void {
    this._useCase.initSubscriptions();
  }
  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  logout(){
    this._useCase.execute();
    
  }

}
