import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-share',
  imports: [FormsModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent {
  searchQuery: string = ''; 

  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchQueryChange.emit(this.searchQuery); 
  }
}
