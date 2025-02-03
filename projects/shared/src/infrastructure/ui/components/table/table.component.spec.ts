import { TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('header')).toBeTruthy();
  });

  it('should render the button', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('lib-button')).toBeTruthy();
  });

  it('should render the table', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should render the head', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('thead')).toBeTruthy();
  });

  it('should render the body', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tbody')).toBeTruthy();
  });

  it('should render the modal', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('lib-modal')).toBeTruthy();
  });

  it('should render the confirmAction', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('lib-confirm-action')).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('title', 'Orders');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.title()).toBe('Orders');
    expect(compiled.querySelector('.data__title').textContent).toBe('Lista de Orders');
  });

  it('should render the data', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name' }]);

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.data()).toBeTruthy();
    expect(compiled.querySelector('.data__table-row')).toBeTruthy();

  });

  it('should render the columns', () => {
    const fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name' }]);

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.columns()).toBeTruthy();
    expect(compiled.querySelector('th')).toBeTruthy();
  });

  it('should render the idDelete', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name' }]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const deleteButton = compiled.querySelector('.data__table-action--trash') as HTMLElement;
    expect(deleteButton).not.toBeNull();

    spyOn(component.idDelete, 'emit');
    spyOn(component, 'openConfirmation');

    deleteButton.click();
    component.selectedId = 1;
    expect(component.openConfirmation).toHaveBeenCalledWith(1);
    expect(component.selectedId).toBe(1);

    component.confirmDelete();
    expect(component.idDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should render the idUpdate', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name' }]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const editButton = compiled.querySelector('.data__table-action--edit') as HTMLElement;
    expect(editButton).not.toBeNull();

    spyOn(component.idUpdate, 'emit');
    spyOn(component, 'openForm');

    editButton.click();
    component.selectedId = 1;
    expect(component.openForm).toHaveBeenCalledWith();
    expect(component.selectedId).toBe(1);

    component.sendUpdate(1);
    expect(component.idUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should render the openModal', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name', type: 'text' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name', clientName: 'clientName' }]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const editButton = compiled.querySelector('.data__table-action--edit') as HTMLElement;
    const addButton = compiled.querySelector('.data__button') as HTMLElement;

    spyOn(component.openModal, 'emit');

    addButton.click();
    component.openForm();
    expect(component.openModal.emit).toHaveBeenCalledWith(true);

    editButton.click();
    component.openForm();
    expect(component.openModal.emit).toHaveBeenCalledWith(true);
  });

  it('should render the openDetailsModal', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name', type: 'text' }, { header: 'Cliente', field: 'clientName', type: 'text' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name', clientName: 'clientName' }]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const openButton = compiled.querySelector('.data__table-action--download') as HTMLElement;

    spyOn(component.openDetailsModal, 'emit');

    openButton.click();
    component.openDetails(1);
    expect(component.openDetailsModal.emit).toHaveBeenCalledWith(1);
  });

  it('should render the cancelDelete', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name', type: 'text' }, { header: 'Cliente', field: 'clientName', type: 'text' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name', clientName: 'clientName' }]);

    fixture.detectChanges();

    component.isOpen = true;
    spyOn(component.openModal, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const cancelButton = compiled.querySelector('lib-confirm-action') as HTMLElement;

    cancelButton.click();
    component.cancelDelete();

    expect(component.isOpen).toBeFalse();
    expect(component.openModal.emit).toHaveBeenCalledWith(false);
  });

  it('should render the openConfirmation', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('columns', [{ header: 'Name', field: 'name', type: 'text' }, { header: 'Cliente', field: 'clientName', type: 'text' }]);
    fixture.componentRef.setInput('data', [{ id: 1, name: 'name', clientName: 'clientName' }]);
    
    component.openConfirmation(1);

    expect(component.selectedId).toBe(1);
    expect(component.isOpen).toBeTrue();
  });
});
