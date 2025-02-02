import { Component, inject } from '@angular/core';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'lib-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alert = inject(AlertService).alert;
}
