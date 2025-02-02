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
    
    component.menuName = 'Test Menu';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct menu name', () => {
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('Test Menu');
  });

  it('should emit deleteMenu event when clicking Confirm button', () => {
    spyOn(component.deleteMenu, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.modal__btn--confirm');
    
    confirmButton.click();
    
    expect(component.deleteMenu.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when clicking Cancel button', () => {
    spyOn(component.closeModal, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.modal__btn--cancel');
    
    cancelButton.click();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit deleteMenu event when onDelete is called', () => {
    spyOn(component.deleteMenu, 'emit');
    
    component.onDelete();
    
    expect(component.deleteMenu.emit).toHaveBeenCalled();
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

  it('should update displayed menu name when input changes', () => {
    component.menuName = 'New Menu Name';
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__title');
    expect(titleElement.textContent).toContain('New Menu Name');
  });
});