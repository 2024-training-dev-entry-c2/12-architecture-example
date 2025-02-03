import { Component, inject, OnInit } from '@angular/core';
import { LayoutComponent } from '../../layouts/layout/layout.component';
import { GetDishesUseCase, Idish } from 'dish';
import { GetMenuUseCase, Imenu } from 'menu';
import { GetOrdersUsecase, Iorder } from 'orders';
import { GetClientUseCase, Iclient } from 'clients';
import { concatMap, map, mergeMap, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-shared-container',
  imports: [LayoutComponent, AsyncPipe],
  templateUrl: './shared-container.component.html',
})
export class SharedContainerComponent implements OnInit {
  private readonly _getClienteUseCase = inject(GetClientUseCase);
  private readonly _getMenuUseCase = inject(GetMenuUseCase);
  private readonly _getOrdersUseCase = inject(GetOrdersUsecase);
  private readonly _getDishUseCase = inject(GetDishesUseCase);

  public dihes$: Observable<Idish[]>;
  public menus$: Observable<Imenu[]>;
  public orders$: Observable<Iorder[]>;
  public clientes$: Observable<Iclient[]>;
  public menusByDish: Observable<Imenu[]>;

  public posicion = of(1, 2, 3);

  public favoritesClients$: Observable<Iclient[]>;
  public porcentajePedidos$: Observable<number>;
  public mejoresPlatos$: Observable<Idish[]>;

  ngOnInit(): void {
    this._getClienteUseCase.initSubscriptions();
    this._getMenuUseCase.initSubscriptions();
    this._getOrdersUseCase.initSubscriptions();
    this._getDishUseCase.initSubscriptions();

    this._getClienteUseCase.execute();
    this._getMenuUseCase.execute();
    this._getOrdersUseCase.execute();
    this._getDishUseCase.execute();

    this.clientes$ = this._getClienteUseCase.client$();
    this.menus$ = this._getMenuUseCase.menus$();
    this.menusByDish = this._getMenuUseCase
      .menus$()
      .pipe(map((menus) => menus.filter((m) => m.dishes.length > 2)));

    this.favoritesClients$ = this._getClienteUseCase
      .client$()
      .pipe(concatMap((clients) => of(clients.filter((c) => c.name))));
    this.porcentajePedidos$ = this._getOrdersUseCase
      .orders$()
      .pipe(map((orders) => orders.length / 100));

    this.mejoresPlatos$ = this.posicion.pipe(
      mergeMap((pos) => {
        return this._getDishUseCase
          .dishes$()
          .pipe(map((dishes) => dishes.filter((d) => d.name === 'Pizza')));
      })
    );

    this.orders$ = this._getOrdersUseCase.orders$();
    this.dihes$ = this._getDishUseCase.dishes$();
  }

  ngOnDestroy(): void {
    this._getClienteUseCase.destroySubscriptions();
    this._getMenuUseCase.destroySubscriptions();
    this._getOrdersUseCase.destroySubscriptions();
    this._getDishUseCase.destroySubscriptions();
  }
}
