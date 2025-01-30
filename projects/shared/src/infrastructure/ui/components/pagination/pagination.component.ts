import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-pagination',
  imports: [RouterLink],
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

constructor(private router: Router) {}
  selectTab(index: number): void {
    this.activeTab = index;
    this.router.navigate([this.tabs[index].link]);
  }
  show(value: string): void {
    console.log(value);
  }
}
