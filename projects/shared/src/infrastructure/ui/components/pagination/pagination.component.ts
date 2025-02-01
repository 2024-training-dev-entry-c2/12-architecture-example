import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'lib-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() tabs: { title: string; tabContent: string; link:string }[] = [];
  @Input() title: string = '';
  @Input() activeTab: number = 0;

  ngOnInit(){
    console.log(this.tabs);
    
  }
  images = [
    'assets/icons/form-svgrepo-com.svg#icon-twitter',
    'assets/icons/form-svgrepo-com.svg#icon-list',
  ];


  selectTab(index: number): void {
    this.activeTab = index;

  }
  show(value: string): void {
    console.log(value);
  }
}
