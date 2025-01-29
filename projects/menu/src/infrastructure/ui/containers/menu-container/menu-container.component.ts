import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-menu-container',
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _usecase = inject(CreateMenuUseCase);
  public menu$: Observable<IMenu>;

  ngOnInit(): void {
    this._usecase.initSubscriptions();
    this.menu$ = this._usecase.menu$();
  }
  ngOnDestroy(): void {
    this._usecase.destroySubscriptions();
  }
 
}
