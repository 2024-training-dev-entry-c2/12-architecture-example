import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent<T> implements OnInit, OnChanges{
  public data = input<T[]>();  
  public onFilteredData = output<T[]>();
  
  ngOnInit(): void {
    this.onFilteredData.emit(this.data());
    console.log(this.data());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.onFilteredData.emit(this.data());
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    let filtered = this.data();

    if (searchTerm.length > 0) {
      filtered = this.data().filter((row) =>
        this.filterRow(row, searchTerm)
      );
    }

    this.onFilteredData.emit(filtered);
  }

  private filterRow(row: T, searchTerm: string): boolean {
    return Object.values(row as object).some((cell) =>
      String(cell).toString().toLowerCase().includes(searchTerm)
    );
  }
}
