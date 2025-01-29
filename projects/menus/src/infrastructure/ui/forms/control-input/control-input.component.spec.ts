import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInputComponent } from './control-input.component';

describe('ControlInputComponent', () => {
  let component: ControlInputComponent;
  let fixture: ComponentFixture<ControlInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
