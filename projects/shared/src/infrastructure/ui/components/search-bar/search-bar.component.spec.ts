import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent<any>;
  let componentRef;
  let fixture: ComponentFixture<SearchBarComponent<any>>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    componentRef = fixture.componentRef;
    fixture.detectChanges();
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtered data on input', () => {
    const spy = spyOn(component.onFilteredData, 'emit');

    componentRef.setInput('data', [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);

    fixture.detectChanges();

    inputEl.nativeElement.value = 'John';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith([{ name: 'John', age: 30 }]);
  });

  it('should emit all data if search term is empty', () => {
    const spy = spyOn(component.onFilteredData, 'emit');
    
    componentRef.setInput('data', [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);

    fixture.detectChanges();

    inputEl.nativeElement.value = '';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith(component.data());
  });

});
