import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSelectComponent } from './control-select.component';

describe('ControlSelectComponent', () => {
  let component: ControlSelectComponent;
  let fixture: ComponentFixture<ControlSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
