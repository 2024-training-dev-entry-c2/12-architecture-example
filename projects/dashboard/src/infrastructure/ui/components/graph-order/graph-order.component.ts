import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'shared';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'lib-graph-order',
  imports: [],
  templateUrl: './graph-order.component.html',
 
})
export class GraphOrderComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  darkTheme = false;
  background_color = ' #d6d6d6';
  color_text = '#272727';
  @Input() ordersPerMonth: any[] = [];

  ngOnInit(): void {
    this.themeService.themeState$.subscribe((isDark) => {
      this.darkTheme = isDark;
      this.background_color = isDark ? '#3b3b3b' : '#d6d6d6';
      this.color_text = isDark ? '#d6d6d6' : '#272727';
    });
    this.getOrdersPerWeekOfMonth(this.ordersPerMonth);
    setTimeout(() => {
      this.renderOrdersPerMonthChart();
    });
  }
  getOrdersPerWeekOfMonth(orders: any[]): void {
    const ordersByMonth: { [key: string]: number } = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.localDate);
      const monthKey = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;
      ordersByMonth[monthKey] = (ordersByMonth[monthKey] || 0) + 1;
    });

    this.ordersPerMonth = Object.entries(ordersByMonth).map(
      ([month, totalOrder]) => ({ month, totalOrder })
    );

    console.log('Órdenes por mes:', this.ordersPerMonth);
    this.renderOrdersPerMonthChart();
  }

  renderOrdersPerMonthChart() {
    const existingChart = (window as any).chartInstance;
    if (existingChart) {
      existingChart.destroy();
    }
    console.log(this.ordersPerMonth);

    const ctx = document.getElementById(
      'ordersPerMonthChart'
    ) as HTMLCanvasElement;
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ordersPerMonth.map((order) => order.month),
        datasets: [
          {
            label: 'Orders',
            data: this.ordersPerMonth.map((order) => order.totalOrder),
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
    (window as any).chartInstance = newChart;
  }
  
}
