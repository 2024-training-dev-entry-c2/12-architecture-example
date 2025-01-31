// import { Component, inject, OnDestroy, OnInit } from '@angular/core';
// import { GetAllMenusUsecase } from '../../../../application/get-all-menu.usecase';
// import { Observable } from 'rxjs';
// import { IMenu } from '../../../../domain/model/menu.model';
// import { MenuPageComponent } from '../../components/menu-page/menu-page.component';
// import { AsyncPipe } from '@angular/common';
// import { DeleteMenuUsecase } from '../../../../application/delete-menu.usecase';

// @Component({
//   selector: 'lib-get-all-menus-container',
//   imports: [AsyncPipe ,MenuPageComponent],
//   templateUrl: './get-all-menus-container.component.html',
// })
// export class GetAllMenusContainerComponent implements OnInit, OnDestroy {
//   private readonly _useCase = inject(GetAllMenusUsecase);
//   private readonly _deleteUseCase = inject(DeleteMenuUsecase);
//   public menus$: Observable<IMenu[]>;
  
  
//   ngOnInit(): void {
//     this._useCase.initSubscriptions();
//     this.getAllMenus();
//     this.menus$ = this._useCase.menus$();
//   }

//   ngOnDestroy(): void {
//     this._useCase.destroySubscriptions();
//   }

//   getAllMenus() {
//    this._useCase.execute();
//   }

//   deleteMenu(id: number) {
//     this._deleteUseCase.execute(id);
//   }
// }
