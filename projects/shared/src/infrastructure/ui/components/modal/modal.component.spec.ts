import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { FormGroup } from '@angular/forms';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({}); //inicializar con un FormGroup vacío
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoud  emit closeModal event when close is called', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
  it('should generate form fields from data', () => {
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      isActive: true,
    };
    component.data = testData;
    component.ngOnInit();

    expect(component.fields.length).toBe(3);
    expect(component.fields[0].name).toBe('name');
    expect(component.fields[1].name).toBe('email');

  });
});
