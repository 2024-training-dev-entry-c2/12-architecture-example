import { Component, inject } from '@angular/core';
import { ViewMenuComponent } from "../../components/view-menu/view-menu.component";
import { FindAllMenusUseCase } from '../../../../application/find-all-menus.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';

@Component({
  selector: 'lib-view-menu-container',
  imports: [ViewMenuComponent],
  templateUrl: './view-menu-container.component.html',

})
export class ViewMenuContainerComponent {
  private readonly _findAllMenusUseCase = inject(FindAllMenusUseCase);
  private readonly _deleteMenuUseCase = inject(DeleteMenuUseCase);
  menus$: Observable<IMenu[]>;


  ngOnInit(): void {
    this._findAllMenusUseCase.initSubscriptions();
    this._findAllMenusUseCase.execute();
    this.menus$ = this._findAllMenusUseCase.menus$();
    this._deleteMenuUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._findAllMenusUseCase.destroySubscriptions();
    this._deleteMenuUseCase.destroySubscriptions();
  }

  handleOnDeleteMenu(menu: IMenu){
    this._deleteMenuUseCase.execute(menu);
  }


}
