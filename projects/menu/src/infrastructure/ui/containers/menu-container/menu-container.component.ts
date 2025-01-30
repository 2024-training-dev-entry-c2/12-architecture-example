import { Component, inject, OnChanges, OnDestroy, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListMenusUseCase } from '../../../../application/menus/list-menus.usecase';
import { MainComponent } from "../../components/main/main.component";
import { MenuHeaderComponent } from "../../components/menu-header/menu-header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';
import { ShareComponent, ModalService } from 'shared';
import { SearchMenusUseCase } from '../../../../application/menus/search-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/menus/delete-menu.usecase';


@Component({
  selector: 'lib-menu-container',
  imports: [MainComponent, AsyncPipe, MenuHeaderComponent, ShareComponent, CommonModule],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _listUsecase = inject(ListMenusUseCase);
  private readonly _createUsecase = inject(CreateMenuUseCase);
  private readonly _searchUsecase = inject(SearchMenusUseCase);
  private readonly _deleteUsecase = inject(DeleteMenuUseCase);
  private readonly _modalService = inject(ModalService);
  
  public menu$: Observable<IMenu[]>;
  public isModalOpen = signal<boolean>(false);
  public selectedMenuId = signal<number | null>(null);

  @ViewChild('deleteModalTemplate') deleteModalTemplate!: TemplateRef<any>;
  private menuIdToDelete!: number;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadMenus();
    // this.menu$ = this._listUsecase.menu$();
    this.menu$ = this._searchUsecase.filteredMenus$(); 
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

  updateSearchQuery(query: string): void {
    this._searchUsecase.setSearchQuery(query);
  }

  openDeleteModal(idMenu: number): void {
    this.menuIdToDelete = idMenu;
    this._modalService.open(this.deleteModalTemplate, this.viewContainerRef, {
      title: 'Confirmar Eliminación',
      buttonName: 'Eliminar'
    }).subscribe((response) => {
      if (response === 'confirm') {
        this.deleteMenu();
      }
    });
  }

  private deleteMenu(): void {
    if (this.menuIdToDelete) {
      this._deleteUsecase.deleteMenu(this.menuIdToDelete).subscribe(() => {
        this.loadMenus();
      });
    }
  }
  
}
