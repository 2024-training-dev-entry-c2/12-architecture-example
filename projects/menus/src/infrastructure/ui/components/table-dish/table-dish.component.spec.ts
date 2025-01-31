import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDishComponent } from './table-dish.component';

describe('TableDishComponent', () => {
  let component: TableDishComponent;
  let fixture: ComponentFixture<TableDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
