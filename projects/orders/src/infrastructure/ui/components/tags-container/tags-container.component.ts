import { Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'lib-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrl: './tags-container.component.scss',
  imports: [CommonModule, CurrencyPipe],
})
export class TagsContainerComponent {
  public selectedTags = input<{ value: any; label: string }[]>([]);
  public totalPrice = input<number>(0);
  public removeTagEvent = output<any>();

  removeTag(value: any): void {
    this.removeTagEvent.emit(value);
  }
}