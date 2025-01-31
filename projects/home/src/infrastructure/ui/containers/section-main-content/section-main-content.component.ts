import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionMainComponent } from '../../components/section-main/section-main.component';
import { catchError, forkJoin, of, Subscription } from 'rxjs';
import { GetOrdersService } from 'orders';
import { GetMenusService } from 'menus';
import { GetDishesService } from 'dishes';
import { GetClientService } from 'clients';

interface DashboardData {
  orders: any[];
  menus: any[];
  clients: any[];
  dishes: any[];
}

@Component({
  selector: 'lib-section-main-content',
  standalone: true,
  imports: [SectionMainComponent],
  templateUrl: './section-main-content.component.html',
})
export class SectionMainContentComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public dashboardData: DashboardData = {
    orders: [],
    menus: [],
    clients: [],
    dishes: [],
  };

  constructor(
    private ordersService: GetOrdersService,
    private menusService: GetMenusService,
    private dishesService: GetDishesService,
    private clientsService: GetClientService
  ) {}

  ngOnInit(): void {
    const requests = forkJoin({
      orders: this.ordersService.getOrders().pipe(catchError(() => of([]))),
      menus: this.menusService.getMenus().pipe(catchError(() => of([]))),
      clients: this.clientsService.getClients().pipe(catchError(() => of([]))),
      dishes: this.dishesService.getDishes().pipe(catchError(() => of([]))),
    });

    this.subscription = requests.subscribe({
      next: (response) => {
        this.dashboardData = response;
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
