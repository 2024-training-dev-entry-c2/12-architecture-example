import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GeneralMetricsComponent } from "../general-metrics/general-metrics.component";
import { SlideComponent } from "../slide/slide.component";
import { ActionsComponent } from "../actions/actions.component";
import { Iclient } from 'clients';

@Component({
  selector: 'lib-home',
  imports: [GeneralMetricsComponent, SlideComponent, ActionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  clientes = input<Iclient[]>([])

}
