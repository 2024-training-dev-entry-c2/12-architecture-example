import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishesFormComponent } from "../../forms/dishes-form/dishes-form.component";
import { ICreateDish } from "../../../../domain/model/create-dishes";
import { CreateDishesUseCase } from '../../../../application/create-dishes.usecase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-create-dish-form-container',
  imports: [DishesFormComponent],
  templateUrl: './create-dish-form-container.component.html'
})
export class CreateDishFormContainerComponent implements OnInit,OnDestroy {
  private readonly _createDishUseCase = inject(CreateDishesUseCase);
  private activedRoute = inject(ActivatedRoute);
  menuId : number = 0;

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => this.menuId = params['id']);
    this._createDishUseCase.initSubscriptions();

  }
  ngOnDestroy(): void {
    this._createDishUseCase.destroySubscriptions();
  }

  handleSubmit(dish: ICreateDish): void{
    this._createDishUseCase.execute(this.menuId, dish);
  }



}
