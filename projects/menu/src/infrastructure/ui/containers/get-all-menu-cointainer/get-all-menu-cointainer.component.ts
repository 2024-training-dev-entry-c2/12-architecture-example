import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllMenuUseCase } from '../../../../application/get-all-menu.useCase';
import { IMenu } from '../../../../domain/model/menu.model';
import { GetAllMenuCompComponent } from '../../components/get-all-menu-comp/get-all-menu-comp.component';
import { AsyncPipe } from '@angular/common';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.useCase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-get-all-menu-cointainer',
  imports: [GetAllMenuCompComponent, AsyncPipe],
  templateUrl: './get-all-menu-cointainer.component.html',
  styles: ''
})
export class GetAllMenuCointainerComponent implements OnInit, OnDestroy {
  private readonly getAllMenusUsecase = inject(GetAllMenuUseCase);
  private readonly _deleteUseCase = inject(DeleteMenuUseCase);
  public menus$: Observable<IMenu[]>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllMenusUsecase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this.getAllMenusUsecase.execute();

    this.menus$ = this.getAllMenusUsecase.menus$();
  }

  ngOnDestroy(): void {
    this.getAllMenusUsecase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
 
  handleDeleteMenu(id: number) {
    this._deleteUseCase.execute(id);
  }

  handleUpdateMenu(id: number) {
    this.router.navigate(['menus/actualizar', id]);
  }
}
