import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host',
  template: `
    <lib-modal [isOpen]="isModalOpen" [title]="modalTitle" (closeModal)="onCloseModal()">
      <div class="test-content">Test Content</div>
    </lib-modal>
  `,
  standalone: true, 
  imports: [ModalComponent] 
})
class TestHostComponent {
  isModalOpen = true;
  modalTitle = 'Test Modal';

  onCloseModal(): void {
    this.isModalOpen = false;
  }
}

fdescribe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalComponent,
        TestHostComponent 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.isOpen).toBeFalse();
    expect(component.title).toBe('');
  });


  it('should not show modal when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    
    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement).toBeNull();
  });

  it('should show modal when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.isOpen = true;
    component.title = 'Test Modal Title';
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__header h2');
    expect(titleElement.textContent).toBe('Test Modal Title');
  });

  it('should emit closeModal event when clicking close button', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    spyOn(component.closeModal, 'emit');
    const closeButton = fixture.nativeElement.querySelector('.modal__close-btn');
    
    closeButton.click();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });


  it('should have correct modal structure', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('.modal');
    const container = modal.querySelector('.modal__container');
    const header = container.querySelector('.modal__header');
    const body = container.querySelector('.modal__body');
    
    expect(modal).toBeTruthy();
    expect(container).toBeTruthy();
    expect(header).toBeTruthy();
    expect(body).toBeTruthy();
  });

  it('should project content correctly', () => {
    hostFixture.detectChanges();
    
    const testContent = hostFixture.nativeElement.querySelector('.test-content');
    expect(testContent).toBeTruthy();
    expect(testContent.textContent).toBe('Test Content');
  });

  it('should close modal when close button is clicked in host component', () => {
    hostFixture.detectChanges();
    
    const closeButton = hostFixture.nativeElement.querySelector('.modal__close-btn');
    closeButton.click();
    hostFixture.detectChanges();
    
    const modalElement = hostFixture.nativeElement.querySelector('.modal');
    expect(hostComponent.isModalOpen).toBeFalse();
    expect(modalElement).toBeNull();
  });

  it('should update title when input changes', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    component.title = 'New Title';
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('.modal__header h2');
    expect(titleElement.textContent).toBe('New Title');
  });

  it('should have correct CSS classes', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('.modal');
    const container = modal.querySelector('.modal__container');
    const header = container.querySelector('.modal__header');
    const body = container.querySelector('.modal__body');
    
    expect(modal.classList.contains('modal')).toBeTrue();
    expect(container.classList.contains('modal__container')).toBeTrue();
    expect(header.classList.contains('modal__header')).toBeTrue();
    expect(body.classList.contains('modal__body')).toBeTrue();
  });

  it('should have close button with correct text', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const closeButton = fixture.nativeElement.querySelector('.modal__close-btn');
    expect(closeButton.textContent).toBe('✖');
  });


  it('should handle multiple open/close transitions', () => {

    expect(fixture.nativeElement.querySelector('.modal')).toBeNull();

    component.isOpen = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).toBeTruthy();

    component.isOpen = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).toBeNull();

    component.isOpen = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).toBeTruthy();
  });
});