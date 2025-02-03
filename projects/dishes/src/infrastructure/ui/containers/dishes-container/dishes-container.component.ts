import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishesComponent } from "../../components/dishes/dishes.component";
import { ListsDishesUseCase } from '../../../../application/dishes/list-dishes.useCase';
import { CreateDishsUseCase } from '../../../../application/dishes/create-dishes.useCase';
import { UpdateDishesUseCase } from '../../../../application/dishes/update-dishes.useCase';
import { DeleteDishUseCase } from '../../../../application/dishes/delete-dishes.useCase';
import { Observable } from 'rxjs';
import { IDish } from '../../../../domain/model/dishes.model';
import { ModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-dishes-container',
  imports: [DishesComponent, AsyncPipe],
  templateUrl: './dishes-container.component.html',
  styleUrl: './dishes-container.component.scss',
})
export class DishesContainerComponent implements OnInit, OnDestroy {

  private readonly _getUseCase = inject(ListsDishesUseCase);
  private readonly _createUseCase = inject(CreateDishsUseCase);
  private readonly _updateUseCase = inject(UpdateDishesUseCase);
  private readonly _deleteUseCase = inject(DeleteDishUseCase);
  public dishes$: Observable<IDish[]>;
  public currentDish$: Observable<IDish>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.dishes$ = this._getUseCase.dish$();
    this.currentDish$ = this._updateUseCase.currentDish$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleCreateDishes( {dish, modal} :{dish: IDish; modal: ModalComponent}) {
   const useCase = dish.id ? this._updateUseCase : this._createUseCase;
    setTimeout(() => {
      useCase.execute(dish, modal);
    }, 500);
  }

  handleSelectDish(id: string) {
    setTimeout(() => {
      this._updateUseCase.selectDish(id);
    }, 500);
  }

  handleDeleteDish(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este plato?')) {
      setTimeout(() => {
        this._deleteUseCase.execute(id);
      }, 500);
    }
  }
}
