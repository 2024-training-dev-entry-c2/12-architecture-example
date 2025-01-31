import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDishComponent } from './graph-dish.component';

describe('GraphDishComponent', () => {
  let component: GraphDishComponent;
  let fixture: ComponentFixture<GraphDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
