import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../services/dialog.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'lib-dialog-container',
  imports: [DialogComponent],
  templateUrl: './dialog-container.component.html',
})
export class DialogContainerComponent implements OnInit, OnDestroy {
  private readonly _dialogService = inject(DialogService);
  private subscription: Subscription | undefined;

  statusDialog = null;
  message = '';

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this._dialogService.status$.subscribe((status) => {
        this.statusDialog = status;
      })
    );

    this.subscription.add(
      this._dialogService.dialogMessage$.subscribe((message) => {
        this.message = message;
      })
    );
  }

  hide() {
    this._dialogService.setDialogMessage('');
    this._dialogService.setDialog(null);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
