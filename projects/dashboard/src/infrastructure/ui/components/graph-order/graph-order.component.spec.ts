import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOrderComponent } from './graph-order.component';

describe('GraphOrderComponent', () => {
  let component: GraphOrderComponent;
  let fixture: ComponentFixture<GraphOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
