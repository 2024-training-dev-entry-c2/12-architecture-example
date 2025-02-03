import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-general-metrics',
  imports: [DatePipe],
  templateUrl: './general-metrics.component.html',
  styleUrl: './general-metrics.component.scss',
})
export class GeneralMetricsComponent {
  public clientes = input<Iclient[]>([])
}
