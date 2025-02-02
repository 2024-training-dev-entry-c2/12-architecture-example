import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicSelectorComponent } from './form-dynamic-selector.component';

describe('FormDynamicSelectorComponent', () => {
  let component: FormDynamicSelectorComponent;
  let fixture: ComponentFixture<FormDynamicSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDynamicSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDynamicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
