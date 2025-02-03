import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormByIdDishComponent } from '../../forms/form-by-id-dish/form-by-id-dish.component';
import { IDish } from '../../../../domain/model/dish.model';
import { GetByIdDishUseCase } from '../../../../application/get-by-id-dish.useCase';
import { Observable, Subscription } from "rxjs";
import { GetByIdDishCompComponent } from '../../components/get-by-id-dish-comp/get-by-id-dish-comp.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-form-by-id-dish-container',
  imports: [FormByIdDishComponent, GetByIdDishCompComponent, AsyncPipe],
  templateUrl: './form-by-id-dish-container.component.html',
  styles: ''
})
export class FormByIdDishContainerComponent implements OnInit, OnDestroy{

  private getByIdUseCase = inject(GetByIdDishUseCase);
  public dish: IDish;
  dish$!: Observable<IDish>;
  private subscription: Subscription;

  ngOnInit(): void {
    this.getByIdUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.getByIdUseCase.destroySubscriptions();
    this.subscription?.unsubscribe();
  }

  handleGetId(id: number) {
    this.getByIdUseCase.execute(id);
    this.dish$ = this.getByIdUseCase.dish$();

    this.subscription = this.dish$.subscribe(dish => {
      this.dish = dish;
    });
  }

}
