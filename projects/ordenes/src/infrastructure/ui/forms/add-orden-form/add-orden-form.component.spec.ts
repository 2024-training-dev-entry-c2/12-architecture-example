import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenFormComponent } from './add-orden-form.component';

describe('AddOrdenFormComponent', () => {
  let component: AddOrdenFormComponent;
  let fixture: ComponentFixture<AddOrdenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrdenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrdenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
