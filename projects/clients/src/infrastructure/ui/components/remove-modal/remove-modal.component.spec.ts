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
    
    component.clientName = 'Juan Perez';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the correct client name', () => {
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('Juan Perez');
  });


  it('should emit deleteClient event when clicking Confirm button', () => {
    spyOn(component.deleteClient, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    
    confirmButton.click();
    
    expect(component.deleteClient.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when clicking Cancel button', () => {
    spyOn(component.closeModal, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    
    cancelButton.click();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit deleteClient event when onDelete is called', () => {
    spyOn(component.deleteClient, 'emit');
    
    component.onDelete();
    
    expect(component.deleteClient.emit).toHaveBeenCalled();
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

  it('should update displayed client name when input changes', () => {
    component.clientName = 'Juan Sanchez';
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('Juan Sanchez');
  });

 

  it('should have properly styled action buttons', () => {
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    
    expect(confirmButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(confirmButton.classList.contains('modal__btn--confirm')).toBeTrue();
    expect(cancelButton.classList.contains('modal__btn--cancel')).toBeTrue();
  });

  it('should display the confirmation message with the correct format', () => {
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent.trim()).toBe('Are you sure you want to delete Juan Perez?');
  });

  it('should have the correct modal structure', () => {
    const modal = fixture.nativeElement.querySelector('.modal');
    const title = modal.querySelector('.modal__title');
    const buttonContainer = modal.querySelector('.modal__btn-container');
    
    expect(modal).toBeTruthy();
    expect(title).toBeTruthy();
    expect(buttonContainer).toBeTruthy();
    expect(title.querySelector('strong')).toBeTruthy();
  });
});