import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-share',
  imports: [ReactiveFormsModule],
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
