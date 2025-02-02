import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'lib-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  type = input<'error' | 'success'>();
  message = input<string>();
  hideDialog = output();

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide(): void {
    this.hideDialog.emit();
  }
}
