import { Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe } from '@angular/common';
import { ListMenusUseCase } from '../../../../application/menus/list-menus.usecase';
import { MainComponent } from "../../components/main/main.component";
import { MenuHeaderComponent } from "../../components/menu-header/menu-header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';
import { ShareComponent } from 'shared';

@Component({
  selector: 'lib-menu-container',
  imports: [MainComponent, AsyncPipe, MenuHeaderComponent, ShareComponent],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy, OnChanges {
  private readonly _listUsecase = inject(ListMenusUseCase);
  private readonly _createUsecase = inject(CreateMenuUseCase);
  public menu$: Observable<IMenu[]>;
  searchQuery: string = ''; 
  public filteredMenus: Observable<IMenu[]>;

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadMenus();
    this.menu$ = this._listUsecase.menu$();
}

ngOnChanges(): void {
  this.filterMenus();
}


  ngOnDestroy(): void {
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
  }

  loadMenus(): void {
    this._listUsecase.loadMenus();
  }
 
  addMenu(menu: IMenu): void {
    this._createUsecase.addMenu(menu);
    
  }

  onSearchQueryChange(searchQuery: string): void {
      if (this.searchQuery) {
        this.filteredMenus = this._listUsecase.menu$().pipe(
          map(menus => menus.filter(menu => menu.menuName.toLowerCase().includes(searchQuery.toLowerCase())))
        )
      
    }  
  }

  filterMenus(): void {
    
    } 
  
}
