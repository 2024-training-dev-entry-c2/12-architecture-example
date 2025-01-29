import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SectionDishesComponent } from '../../components/section-dishes/section-dishes.component';
import { GetDishesUseCase } from '../../../../application/dishes/get-dishes.usescase';
import { IDishes } from '../../../../domain/model/dishes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-section-dishes-content',
  imports: [SectionDishesComponent],
  templateUrl: './section-dishes-content.component.html',
})
export class SectionDishesContentComponent implements OnInit, OnDestroy {

private readonly _getDishesUseCase = inject(GetDishesUseCase);
  public dishes$: Observable<IDishes[]>;

  ngOnInit(): void {
    this.dishes$ = this._getDishesUseCase.dish$();
    this._getDishesUseCase.execute();
  }

  ngOnDestroy(): void {
    this._getDishesUseCase.ngOnDestroy();
  }


}
