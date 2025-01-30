import { Component } from '@angular/core';

@Component({
  selector: 'lib-sales-card',
  imports: [],
  templateUrl: './sales-card.component.html',
  styleUrl: './sales-card.component.css'
})
export class SalesCardComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() description: string = '';
  @Input() chartId: string = `chart-${Math.random().toString(36).substr(2, 9)}`; // ID único dinámico
  @Input() ticksData: any[] = [];
  private chartInstance: Chart | null = null;

  ngOnInit(): void {
    console.log(this.ticksData);
  }
}
