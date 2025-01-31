import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent, TableComponent } from 'shared';
import { CreateDishUsecase } from '../../../../application/dish/create-dish.usecase';
import { DeleteDishUsecase } from '../../../../application/dish/delete-dish.usecase';
import { GetDishesUsecase } from '../../../../application/dish/get-dishes.usecase';
import { UpdateDishUsecase } from '../../../../application/dish/update-dish.usecase';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';

@Component({
  selector: 'lib-dish',
  imports: [TableComponent, ModalComponent, DishFormComponent, AsyncPipe],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent implements OnInit, OnDestroy {
  private readonly _useCaseCreate = inject(CreateDishUsecase);
  private readonly _useCaseGet = inject(GetDishesUsecase);
  private readonly _useCaseDelete = inject(DeleteDishUsecase);
  private readonly _useCaseUpdate = inject(UpdateDishUsecase);
  public readonly _useCaseModal = inject(ModalUsecase);

  public dishes$: Observable<IDish[]>;
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

  openModal(event: boolean) {
    this._useCaseModal.execute(event);
  }

  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();

    this._useCaseGet.execute();
    this.dishes$ = this._useCaseGet.dishes$();
    
    this.currentDish$ = this._useCaseUpdate.currentDish$();
    this.message$ = this._useCaseCreate.message$();
    this.isOpen$ = this._useCaseModal.open$();
  }

  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseGet.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
  }

  public deleteMenu(menuId: number): void {
    this._useCaseDelete.execute(menuId);
  }

  public updateById(menuId: number): void {
    this._useCaseUpdate.selectDish(menuId);
  }

  public submit(dish: IDish) {
    const usecase = dish.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(dish);
  }
}