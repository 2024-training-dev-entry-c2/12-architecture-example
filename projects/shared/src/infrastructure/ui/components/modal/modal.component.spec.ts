import { TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance
    expect(component).toBeTruthy();
  });

  it('should render modal', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('open', true);

    fixture.detectChanges();
    expect(component.open()).toBe(true);
    expect(compiled.querySelector('.modal')).toBeTruthy();
  });


  it('should close modal', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance
    const compiled = fixture.nativeElement as HTMLElement;
    spyOn(component.close, 'emit');
    component.closeModal();

    expect(component.close.emit).toHaveBeenCalled();
  });
});
