import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IDish, IRestaurant } from '../../../../domain/model/restaurant.model';
import { GetRestaurantUseCase } from '../../../../application/usecase/get-restaurant.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RestaurantComponent } from '../../components/restaurant/restaurant.component';
import { RestaurantState } from '../../../../domain/state/restaurant.state';


@Component({
  selector: 'lib-restaurant-container',
  imports: [RestaurantComponent, AsyncPipe],
  templateUrl: './restaurant-container.component.html',

})
export class RestaurantContainerComponent implements OnInit, OnDestroy{
  private readonly _restaurantUseCase = inject( GetRestaurantUseCase);
  private readonly restaurantState = inject(RestaurantState);
  restaurant$: Observable<IRestaurant>;

  ngOnInit(): void {
    this. _restaurantUseCase.initSubscriptions();
    this._restaurantUseCase.execute(1);
    this.restaurant$ = this._restaurantUseCase.restaurant$();

  }

  ngOnDestroy(): void {
    this. _restaurantUseCase.destroySubscriptions();
  }
}
