import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCardComponent } from './box-card.component';

describe('BoxCardComponent', () => {
  let component: BoxCardComponent;
  let fixture: ComponentFixture<BoxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
