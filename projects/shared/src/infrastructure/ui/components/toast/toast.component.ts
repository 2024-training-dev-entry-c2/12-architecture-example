import { Component, input } from '@angular/core';
import { IToast } from '../../containers/toast-container/toast-container.component';




@Component({
  selector: 'lib-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toastData = input<IToast | undefined>(undefined);
  show = input<boolean>(false);

}