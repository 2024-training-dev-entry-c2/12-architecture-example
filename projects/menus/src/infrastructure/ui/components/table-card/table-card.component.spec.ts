import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardComponent } from './table-card.component';

describe('TableCardComponent', () => {
  let component: TableCardComponent;
  let fixture: ComponentFixture<TableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('menu', [
      { id: 1, name: 'Menu 1' },
      { id: 2, name: 'Menu 2' },
    ]); // Provide an empty array or mocked data

    fixture.detectChanges();
  });
  it('should render menu tabs correctly', () => {
    const compiled = fixture.nativeElement;
    const tabs = compiled.querySelectorAll('.tab-button');
    expect(tabs.length).toBe(2);
    expect(tabs[0].textContent).toContain('Menu 1');
    expect(tabs[1].textContent).toContain('Menu 2');
  });
  it('should set active tab on selectTab call', () => {
    component.selectTab(1, { id: 2, name: 'Menu 2' });
    expect(component.activeTab).toBe(1);
  });
  it('should emit deleteMenu event on deleteMenu call', () => {
    spyOn(component.deleteMenuData, 'emit');
    component.deleteMenu(1);
    expect(component.deleteMenuData.emit).toHaveBeenCalledWith(1);
  });
  it('should open create menu modal', () => {
    component.redirectToMenu();
    expect(component.showModal).toBeTrue();
  });
  it('should close modals on closeModal call', () => {
    component.showModal = true;
    component.showModalUpdate = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.showModalUpdate).toBeFalse();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
