import { Component, inject } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';


export interface IToast {
  title: string;
  message: string;
  type: string;
  duration: number | 3000;
  close: boolean | true;
}

@Component({
  selector: 'lib-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
  toastData: IToast | undefined;
  toastService = inject(ToastService);

  private destroy$ = new Subject<void>();
  show: boolean = false;

  constructor() {
    this.toastService.$toastData
      .pipe(takeUntil(this.destroy$))
      .subscribe((toastData) => {
        this.toastData = toastData;
        this.show = true;
        this.startTimer();
      });
  }

  startTimer(): void {
    timer(this.toastData?.duration as number)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.closeToast();
      });
  }

  closeToast(): void {
    this.show = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
