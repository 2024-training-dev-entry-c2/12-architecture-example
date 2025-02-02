import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformativeModalComponent } from './informative-modal.component';
import { By } from '@angular/platform-browser';


describe('InformativeModalComponent', () => {
  let component: InformativeModalComponent;
  let fixture: ComponentFixture<InformativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformativeModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InformativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible by default', () => {
    component.showModal = false;
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
    expect(modalElement.nativeElement.style.display).toBe('none');
  });

  it('should be visible when showModal input is true', () => {
    component.showModal = true;
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
    expect(modalElement.nativeElement.style.display).toBe('flex');
  });

  it('should emit closeModalEvent when close button is clicked', () => {
    spyOn(component.closeModalEvent, 'emit');
    component.showModal = true;
    fixture.detectChanges();
    
    const closeButton = fixture.debugElement.query(By.css('.modal__close'));
    closeButton.nativeElement.click();
    
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

  it('should hide the modal when closeModal is called', () => {
    component.showModal = true;
    fixture.detectChanges();
    
    component.closeModal(); 
    component.showModal = false; 
    fixture.detectChanges();
    
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy()
    expect(modalElement.nativeElement.style.display).toBe('none');
});

});