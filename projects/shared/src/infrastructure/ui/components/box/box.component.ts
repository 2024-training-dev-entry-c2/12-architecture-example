import { Component, OnInit } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { ClientService } from '../../core/services/client.service';
// import { tap } from 'rxjs';
// import { DishService } from '../../core/services/dish.service';
// import { MenuService } from '../../core/services/menu.service';
// import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'lib-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  public clientes: number = 0;
  public platos: number = 0;
  public menu: number = 0;
  public pedidos: number = 0;

  constructor(
    // private clientService: ClientService,
    // private dishService: DishService,
    // private menuService: MenuService,
    // private orderService: OrderService
  ) {}
  ngOnInit(): void {
    // this.dishService.dishes
    //   .pipe(tap((dishes) => (this.platos = dishes.length)))
    //   .subscribe();
    // this.dishService.getDishes();

    // this.clientService.clientes
    //   .pipe(tap((users) => (this.clientes = users.length)))
    //   .subscribe();
    // this.clientService.getClients();

    // this.menuService.menuList
    //   .pipe(tap((menus) => (this.menu = menus.length)))
    //   .subscribe();
    // this.menuService.getMenus();

    // this.orderService.orders
    //   .pipe(tap((orders) => (this.pedidos = orders.length)))
    //   .subscribe();
    // this.orderService.getOrders();
  }
}
