import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveModalComponent } from './remove-modal.component';

fdescribe('RemoveModalComponent', () => {
  let component: RemoveModalComponent;
  let fixture: ComponentFixture<RemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveModalComponent);
    component = fixture.componentInstance;
    component.dishName = 'Test Dish';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct dish name', () => {
    const testDishName = 'Pizza Margherita';
    component.dishName = testDishName;
    fixture.detectChanges();
    
    const strongElement = fixture.nativeElement.querySelector('strong');
    expect(strongElement.textContent).toBe(testDishName);
  });

  it('should emit deleteDish event when clicking confirm button', () => {
    spyOn(component.deleteDish, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    confirmButton.click();
    expect(component.deleteDish.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when clicking cancel button', () => {
    spyOn(component.closeModal, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    cancelButton.click();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should have the correct button text', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.modal__btn');
    expect(buttons[0].textContent.trim()).toBe('Confirm');
    expect(buttons[1].textContent.trim()).toBe('Cancel');
  });

  it('should have the correct modal title text', () => {
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('Are you sure you want to delete');
  });
});