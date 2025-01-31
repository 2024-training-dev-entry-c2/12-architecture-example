import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'shared';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'lib-graph-order',
  imports: [],
  templateUrl: './graph-order.component.html',
  styleUrl: './graph-order.component.css',
})
export class GraphOrderComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  darkTheme = false;
  background_color = ' #d6d6d6';
  color_text = '#272727';
  @Input() ordersPerWeek: any[] = [];

  ngOnInit(): void {
    this.themeService.themeState$.subscribe((isDark) => {
      this.darkTheme = isDark;
      this.background_color = isDark ? '#3b3b3b' : '#d6d6d6';
      this.color_text = isDark ? '#d6d6d6' : '#272727';
    });
    this.getOrdersPerWeekOfMonth(this.ordersPerWeek);
    setTimeout(() => {
      this.renderOrdersPerMonthChart();
    });
  }
  getOrdersPerWeekOfMonth(orders: any[]): void {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.localDate);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const ordersByWeek: { [key: number]: number } = {};

    filteredOrders.forEach((order) => {
      const orderDate = new Date(order.localDate);
      const week = Math.ceil(orderDate.getDate() / 7);
      ordersByWeek[week] = (ordersByWeek[week] || 0) + 1;
    });

    const ordersPerWeek = Object.entries(ordersByWeek).map(
      ([week, totalOrder]) => ({
        week: Number(week),
        totalOrder,
      })
    );

    console.log('Órdenes por semana del mes actual:', ordersPerWeek);
    this.ordersPerWeek = ordersPerWeek;
    this.renderOrdersPerMonthChart();
  }

  renderOrdersPerMonthChart() {
    console.log(this.ordersPerWeek);

    const ctx = document.getElementById(
      'ordersPerMonthChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ordersPerWeek.map((order) => `Week ${order.week}`),
        datasets: [
          {
            label: 'Orders',
            data: this.ordersPerWeek.map((order) => order.totalOrder),
            backgroundColor: 'rgb(83, 81, 199)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: this.color_text,
            },
          },
          y: {
            ticks: {
              color: this.color_text,
            },
          },
        },
        responsive: true,

        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  }
}
