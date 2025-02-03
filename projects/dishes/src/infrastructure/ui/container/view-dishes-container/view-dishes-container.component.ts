import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ViewDishesComponent } from "../../components/view-dishes/view-dishes.component";
import { Observable } from 'rxjs';
import { IDish } from '../../../../domain/model/dishes.model';
import { CommonModule } from '@angular/common';
import { FindAllDishesUseCase } from '../../../../application/find-all-dishes.usecase';
import { DeleteDishesUseCase } from '../../../../application/delete-dishes.usecase';

@Component({
  selector: 'lib-view-dishes-container',
  imports: [CommonModule, ViewDishesComponent],
  templateUrl: './view-dishes-container.component.html',

})
export class ViewDishesContainerComponent implements OnInit, OnDestroy {
  private readonly _findAllDishesUseCase = inject(FindAllDishesUseCase);
  private readonly _deleteDishesUseCase = inject(DeleteDishesUseCase);
  dishes$: Observable<IDish[]>;

  header: string[] = ['id', 'nombre', 'categoria', 'precio'];

  ngOnInit(): void {
    this._findAllDishesUseCase.initSubscriptions();
    this._findAllDishesUseCase.execute();
    this.dishes$ = this._findAllDishesUseCase.dishes$();
    this._deleteDishesUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._findAllDishesUseCase.destroySubscriptions();
    this._deleteDishesUseCase.destroySubscriptions();
  }

  handleDelete(dish: IDish){
    this._deleteDishesUseCase.execute(dish);
  }

}
