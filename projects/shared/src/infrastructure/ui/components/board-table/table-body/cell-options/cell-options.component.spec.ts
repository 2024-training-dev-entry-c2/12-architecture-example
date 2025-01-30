import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellOptionsComponent } from './cell-options.component';

describe('CellOptionsComponent', () => {
  let component: CellOptionsComponent;
  let fixture: ComponentFixture<CellOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
