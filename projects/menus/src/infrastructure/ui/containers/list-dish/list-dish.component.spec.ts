import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDishComponent } from './list-dish.component';
import { HttpClientModule } from '@angular/common/http';

describe('ListDishComponent', () => {
  let component: ListDishComponent;
  let fixture: ComponentFixture<ListDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDishComponent,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
