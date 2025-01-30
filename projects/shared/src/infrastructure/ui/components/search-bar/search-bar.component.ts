import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  public data = input<string[][]>();
  public onFilteredData = output<string[][]>();

  onInput(event: Event): void{
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    const filtered = this.data().filter(
      row => row.some(cell => cell.includes(searchTerm))
    );

    this.onFilteredData.emit(filtered);
  }
}
