import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveModalComponent } from './remove-modal.component';

fdescribe('RemoveModalComponent', () => {
  let component: RemoveModalComponent;
  let fixture: ComponentFixture<RemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RemoveModalComponent 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveModalComponent);
    component = fixture.componentInstance;
    
    component.orderName = 123;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct order ID', () => {
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('123');
  });

  it('should emit deleteOrder event when clicking Confirm button', () => {
    spyOn(component.deleteOrder, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    
    confirmButton.click();
    
    expect(component.deleteOrder.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when clicking Cancel button', () => {
    spyOn(component.closeModal, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    
    cancelButton.click();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit deleteOrder event when onDelete is called', () => {
    spyOn(component.deleteOrder, 'emit');
    
    component.onDelete();
    
    expect(component.deleteOrder.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when onCloseModal is called', () => {
    spyOn(component.closeModal, 'emit');
    
    component.onCloseModal();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should have the correct button text content', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.modal__btn');
    
    expect(buttons[0].textContent.trim()).toBe('Confirm');
    expect(buttons[1].textContent.trim()).toBe('Cancel');
  });

  it('should have the correct number of buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.modal__btn');
    expect(buttons.length).toBe(2);
  });

  it('should handle null orderName gracefully', () => {
    component.orderName = null;
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).not.toContain('null');
  });


  it('should update displayed order ID when input changes', () => {
    component.orderName = 67890;
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('67890');
  });


  it('should have properly styled action buttons', () => {
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    
    expect(confirmButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(confirmButton.classList.contains('modal__btn--confirm')).toBeTrue();
    expect(cancelButton.classList.contains('modal__btn--cancel')).toBeTrue();
  });
});