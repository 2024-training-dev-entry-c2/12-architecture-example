import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { ListMenusUsecase } from '../../../../application/menus/list-menus.usecase';
import { CreateMenuUsecase } from '../../../../application/menus/create-menu.usecase';
import { UpdateMenuUsecase } from '../../../../application/menus/update-menu.usecase';
import { DeleteMenuUsecase } from '../../../../application/menus/delete-menu.usecase';
import { ModalComponent } from 'shared';
import { Observable } from 'rxjs';
import { MenuSectionComponent } from '../../components/menu-section/menu-section.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'lib-menu-container',
  imports: [MenuSectionComponent, AsyncPipe],
  providers: [ListMenusUsecase, CreateMenuUsecase, UpdateMenuUsecase, DeleteMenuUsecase],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  public menus$: Observable<IMenu[]>;
  public currentMenu$: Observable<IMenu>;
  private _listUsecase = inject(ListMenusUsecase);
  private _createUsecase = inject(CreateMenuUsecase);
  private _updateUsecase = inject(UpdateMenuUsecase);
  private _deleteUsecase = inject(DeleteMenuUsecase);

  ngOnInit(): void {
    this.initSubscriptions();    
    this._listUsecase.execute();
    this.menus$ = this._listUsecase.menus$();
    this.currentMenu$ = this._updateUsecase.currentMenu$();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  handlePatchMenu({menu, modal}:{menu: IMenu; modal: ModalComponent}){
    const usecase= menu.id ? this._updateUsecase : this._createUsecase;
    usecase.execute(menu, modal);
  }

  handleSelectUpdateMenu(id : number){
    this._updateUsecase.selectMenu(id);
  }

  handleDeleteMenu(id: number){
    this._deleteUsecase.execute(id);
  }

  initSubscriptions(){
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();    
    this._updateUsecase.initSubscriptions();    
    this._deleteUsecase.initSubscriptions();    
  }

  destroySubscriptions(){
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
    this._updateUsecase.destroySubscriptions();    
    this._deleteUsecase.destroySubscriptions(); 
  }
}
