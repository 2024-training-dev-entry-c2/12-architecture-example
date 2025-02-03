import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.label = 'Nombre';
    component.placeholder = 'Ingrese su nombre';
    component.type = 'text';
    component.id = 'name';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recive the label', () => {
    fixture.componentRef.setInput('label', 'Plato');
    fixture.detectChanges();
    expect(component.label).toBe('Plato');
  });

  it('should recive the placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Nombre del plato');
    fixture.detectChanges();
    expect(component.placeholder).toBe('Nombre del plato');
  });
});
