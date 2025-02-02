import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent, TableComponent } from 'shared';
import { CreateDishUsecase } from '../../../../application/dish/create-dish.usecase';
import { DeleteDishUsecase } from '../../../../application/dish/delete-dish.usecase';
import { GetDishesUsecase } from '../../../../application/dish/get-dishes.usecase';
import { UpdateDishUsecase } from '../../../../application/dish/update-dish.usecase';
import { GetMenusUsecase } from '../../../../application/menu/get-menus.usecase';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { IMenu } from '../../../../domain/model/menu.model';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';

@Component({
  selector: 'lib-dish',
  imports: [TableComponent, ModalComponent, DishFormComponent, AsyncPipe],
  templateUrl: './dish.component.html'
})
export class DishComponent implements OnInit, OnDestroy {
  private readonly _createUseCase = inject(CreateDishUsecase);
  private readonly _getUseCase = inject(GetDishesUsecase);
  private readonly _deleteUseCase = inject(DeleteDishUsecase);
  private readonly _updateUseCase = inject(UpdateDishUsecase);
  private readonly _modalUseCase = inject(ModalUsecase);
  private readonly _menusUseCase = inject(GetMenusUsecase);

  public dishes$: Observable<IDish[]>;
  public menus$: Observable<IMenu[]>;
  public message$: Observable<string>;
  public isOpen$: Observable<boolean>;
  public currentDish$: Observable<IDish>;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripcion' },
    { field: 'price', header: 'Precio' },
    { field: 'dishType', header: 'Tipo de Plato' },
    { field: 'menuName', header: 'Menu' }
  ];

  ngOnInit(): void {
    this.init();
    this._getUseCase.execute();
    this._menusUseCase.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public deleteMenu(menuId: number): void {
    this._deleteUseCase.execute(menuId);
  }

  public updateById(menuId: number): void {
    this._updateUseCase.selectDish(menuId);
  }

  public submit(dish: IDish): void {
    const usecase = dish.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(dish);
  }

  public openModal(event: boolean): void {
    this._modalUseCase.execute(event);
  }

  private init(): void {
    this._createUseCase.initSubscriptions();
    this._getUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._modalUseCase.initSubscriptions();
    this._menusUseCase.initSubscriptions();
  }

  private destroy(): void {
    this._createUseCase.destroySubscriptions();
    this._getUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._modalUseCase.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.dishes$ = this._getUseCase.dishes$();
    this.menus$ = this._menusUseCase.menus$();
    this.currentDish$ = this._updateUseCase.currentDish$();
    this.message$ = this._createUseCase.message$();
    this.isOpen$ = this._modalUseCase.open$();
  }
}