import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let fixture: ComponentFixture<DeleteModalComponent>;
  let componentRef;
  let component: DeleteModalComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('item', 'plato');

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open delete modal on openDeleteModal()', () => {
    spyOn(component.modal(), 'toggle');
    
    const idToDelete = 1;
    component.openDeleteModal(idToDelete);
    
    expect(component.modal().toggle).toHaveBeenCalled();
    expect(component['id']).toBe(idToDelete);
  });

  it('should emit id on delete', () => {
    const spyOnDelete = spyOn(component.onDelete, 'emit'); 
    const idToDelete = 2;

    const spyOnToggle = spyOn(component.modal(), 'toggle');

    component.openDeleteModal(idToDelete);
    component.onClickDelete();
    
    expect(spyOnDelete).toHaveBeenCalledWith(idToDelete);
    
    expect(spyOnToggle).toHaveBeenCalledTimes(2); 
  });

  it('should close modal and reset id on cancel', () => {
    spyOn(component.modal(), 'toggle');
    
    const idToCancel = 3;
    component.openDeleteModal(idToCancel);
    component.onClickCancel(); 
    
    expect(component.modal().toggle).toHaveBeenCalled();
    expect(component['id']).toBeNull();
  });
});
