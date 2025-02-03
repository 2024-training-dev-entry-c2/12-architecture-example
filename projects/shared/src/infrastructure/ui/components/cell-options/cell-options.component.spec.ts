import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellOptionsComponent } from './cell-options.component';

describe('CellOptionsComponent', () => {
  let fixture: ComponentFixture<CellOptionsComponent>;
  let componentRef;
  let component: CellOptionsComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellOptionsComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('idItem', 1);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render update and delete buttons', () => {
    const updateButton = compiled.querySelector('a.cell__button--update');
    const deleteButton = compiled.querySelector('a.cell__button--delete');
  
    expect(updateButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('should call onSelectUpdate when update button is clicked', () => {
    const spyUpdate = spyOn(component.onSelectUpdate, 'emit');
  
    const updateButton = compiled.querySelector('a.cell__button--update') as HTMLButtonElement;
    updateButton?.click();
  
    expect(spyUpdate).toHaveBeenCalledWith(1);
  });

  it('should call onSelectDelete when delete button is clicked', () => {
    const spyDelete = spyOn(component.onSelectDelete, 'emit');
  
    const deleteButton = compiled.querySelector('a.cell__button--delete') as HTMLButtonElement;
    deleteButton?.click();

    expect(spyDelete).toHaveBeenCalledWith(1);
  });    

  it('should have correct aria attributes for update button', () => {
    const updateButton = compiled.querySelector('a.cell__button--update') as HTMLElement;
    
    expect(updateButton?.getAttribute('aria-label')).toBe('Actualizar columna');
    expect(updateButton?.getAttribute('aria-posinset')).toBe('1');
    expect(updateButton?.getAttribute('aria-setsize')).toBe('2');
    expect(updateButton?.getAttribute('aria-haspopup')).toBe('true');
  });

  it('should have correct aria attributes for delete button', () => {
    const deleteButton = compiled.querySelector('a.cell__button--delete');
    
    expect(deleteButton?.getAttribute('aria-label')).toBe('Eliminar columna');
    expect(deleteButton?.getAttribute('aria-posinset')).toBe('1');
    expect(deleteButton?.getAttribute('aria-setsize')).toBe('2');
    expect(deleteButton?.getAttribute('aria-haspopup')).toBe('true');
  });
});
