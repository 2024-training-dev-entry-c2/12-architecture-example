import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllDishUseCase } from '../../../../application/get-all-dish.useCase';
import { IDish } from '../../../../domain/model/dish.model';
import { GetAllDishCompComponent } from '../../components/get-all-dish-comp/get-all-dish-comp.component';
import { AsyncPipe } from '@angular/common';
import { DeleteDishUseCase } from '../../../../application/delete-dish.useCase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-get-all-dish-container',
  imports: [GetAllDishCompComponent, AsyncPipe],
  templateUrl: './get-all-dish-container.component.html',
  styles: ''
})
export class GetAllDishContainerComponent implements OnInit, OnDestroy {

  private readonly getAllDishesUsecase = inject(GetAllDishUseCase);
  private readonly _deleteUseCase = inject(DeleteDishUseCase);
  public dishes$: Observable<IDish[]>;


  items = ["Nombre", "ID", "Descripcion", "Precio", "Tipo", "Id Menu", "Acciones"];

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllDishesUsecase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this.getAllDishesUsecase.execute();

    this.dishes$ = this.getAllDishesUsecase.dishes$();
  }

  ngOnDestroy(): void {
    this.getAllDishesUsecase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleDeleteDish(id: number) {
    this._deleteUseCase.execute(id);
  }

  handleUpdateDish(id: number) {
    this.router.navigate(['platos/actualizar', id]);
  }
}
