import { DishModalComponent } from './dish-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('DishModalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule, 
        DishModalComponent 
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DishModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal is called', () => {
    const fixture = TestBed.createComponent(DishModalComponent);
    const component = fixture.componentInstance;
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should initialize the form with empty values in add mode', () => {
    const fixture = TestBed.createComponent(DishModalComponent);
    const component = fixture.componentInstance;
    component.isEditMode = false;
    fixture.detectChanges();
    expect(component.form.value).toEqual({ dishName: '', price: null, description: '' });
  });
});
