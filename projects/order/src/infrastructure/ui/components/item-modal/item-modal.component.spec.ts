import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemModalComponent } from './item-modal.component';

describe('ItemModalComponent', () => {
  let component: ItemModalComponent;
  let fixture: ComponentFixture<ItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ItemModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit submit event when form is invalid', () => {
    spyOn(component.submit, 'emit');
    component.form.controls['name'].setValue('');
    component.onSubmit();
    expect(component.submit.emit).not.toHaveBeenCalled();
  });

  it('should have default values for modalTitle and modalButton', () => {
    expect(component.modalTitle).toBe('Add Item');
    expect(component.modalButton).toBe('Submit');
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should disable the submit button when form is invalid', () => {
    component.form.controls['name'].setValue('');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display the modal when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });

  it('should not display the modal when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeFalsy();
  });

  it('should emit submit event when form is valid and submitted', () => {
    spyOn(component.submit, 'emit');
    component.form.controls['name'].setValue('Valid Item');
    component.form.controls['description'].setValue('Valid Description');
    component.onSubmit();
    expect(component.submit.emit).toHaveBeenCalled();
  });
});
