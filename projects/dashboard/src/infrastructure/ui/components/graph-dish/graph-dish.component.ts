import { Component, Input } from '@angular/core';
import { ThemeService } from 'shared';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'lib-graph-dish',
  imports: [],
  templateUrl: './graph-dish.component.html',
  styleUrl: './graph-dish.component.css',
})
export class GraphDishComponent {
  constructor(private themeService: ThemeService) {}
  @Input() menu: any[] = [];
  darkTheme = false;
  background_color = ' #d6d6d6';
  color_text = '#272727';
  topDishes: any[] = [];

  ngOnInit(): void {
    this.themeService.themeState$.subscribe((isDark) => {
      this.darkTheme = isDark;
      this.background_color = isDark ? '#3b3b3b' : '#d6d6d6';
      this.color_text = isDark ? '#d6d6d6' : '#272727';
    });
    this.getTop5Dish();
    this.renderTopDishesChart();
  }
  getTop5Dish(): void {
    const allDishes = this.menu.flatMap((menu) => menu.dishfoods);

    const dishesMap = new Map<string, { name: string; totalVentas: number }>();

    allDishes.forEach((dish) => {
      const dishName = dish.name;
      const salesCount = dish.orderList.length;

      if (dishesMap.has(dishName)) {
        dishesMap.get(dishName)!.totalVentas += salesCount;
      } else {
        dishesMap.set(dishName, { name: dishName, totalVentas: salesCount });
      }
    });

    const sortedDishes = Array.from(dishesMap.values()).sort(
      (a, b) => b.totalVentas - a.totalVentas
    );

    const top5Dishes = sortedDishes.slice(0, 5);

    this.topDishes = top5Dishes;
    console.log('Top 5 platos más vendidos:', top5Dishes);
  }

  renderTopDishesChart() {
    const ctx = document.getElementById('topDishesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topDishes.map((dish) => dish.name),
        datasets: [
          {
            label: 'Ventas',
            data: this.topDishes.map((dish) => dish.totalVentas),
            backgroundColor: '#ef4044',
            borderColor: '#ef4044',
            borderWidth: 1,
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
