import { Component, Input } from '@angular/core';
import { ThemeService } from 'shared';

@Component({
  selector: 'lib-table-client',
  imports: [],
  templateUrl: './table-client.component.html',
  styleUrl: './table-client.component.scss',
})
export class TableClientComponent {
  @Input() order: any[] = [];
  constructor(private themeService: ThemeService) {}
  darkTheme = false;
  background_color = ' #d6d6d6';
  color_text = '#272727';
  topClientes: any[] = [];

  ngOnInit(): void {
    this.themeService.themeState$.subscribe((isDark) => {
      this.darkTheme = isDark;
      this.background_color = isDark ? '#3b3b3b' : '#d6d6d6';
      this.color_text = isDark ? '#d6d6d6' : '#272727';
    });

    this.getTopClients();
    setTimeout(() => {}, 1000);
  }
  getTopClients(): void {
    const clientsMap = new Map<
      number,
      { id: number; name: string; orderCount: number; totalPrice: number }
    >();
    this.order.forEach((order) => {
      const clientId = order.client.id;
      const clientName = order.client.name;
      const orderTotal = order.totalPrice;

      if (clientsMap.has(clientId)) {
        const client = clientsMap.get(clientId)!;
        client.totalPrice += orderTotal;
        client.orderCount += 1;
      } else {
        clientsMap.set(clientId, {
          id: clientId,
          name: clientName,
          orderCount: 1,
          totalPrice: orderTotal,
        });
      }
    });

    const sortedClients = Array.from(clientsMap.values()).sort(
      (a, b) => b.totalPrice - a.totalPrice
    );

    const topClients = sortedClients.slice(0, 10).map((client) => ({
      ...client,
      totalPrice: parseFloat(client.totalPrice.toFixed(2)),
    }));

    this.topClientes = topClients;
    console.log(topClients);
  }
}
