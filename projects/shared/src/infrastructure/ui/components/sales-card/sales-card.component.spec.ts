import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCardComponent } from './sales-card.component';

describe('SalesCardComponent', () => {
  let component: SalesCardComponent;
  let fixture: ComponentFixture<SalesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
