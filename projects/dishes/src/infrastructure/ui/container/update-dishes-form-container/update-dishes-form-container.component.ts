import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { ICreateDish } from '../../../../domain/model/create-dishes';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDishesUseCase } from '../../../../application/update-dishes.usecase';
import { DishesFormComponent } from '../../forms/dishes-form/dishes-form.component';

@Component({
  selector: 'lib-dishes-form-container',
  imports: [DishesFormComponent],
  templateUrl: './update-dishes-form-container.component.html',
})
export class UpdateDishesFormContainerComponent implements OnInit, OnDestroy {

  private readonly _updateDishesUseCase = inject(UpdateDishesUseCase);
  private activatedRoute = inject(ActivatedRoute);
  private id: number = 0;
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this._updateDishesUseCase.initSubscriptions();
  }
  ngOnDestroy(): void {
    this._updateDishesUseCase.destroySubscriptions();

  }

  handleSubmit(dish: ICreateDish): void {
    this._updateDishesUseCase.execute(this.id, dish);
    this.router.navigate(['/dashboard/dishes']);

  }



}
