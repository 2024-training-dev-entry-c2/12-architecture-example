import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionMenusComponent } from './section-menus.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddModalComponent } from '../../forms/add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';
import { IMenu } from '../../../../domain/model/menus.model';
import { ModalComponent } from 'shared';


fdescribe('SectionMenusComponent', () => {
  let component: SectionMenusComponent;
  let fixture: ComponentFixture<SectionMenusComponent>;
  let formBuilder: FormBuilder;

  const mockMenus: IMenu[] = [
    {
      id: 1,
      name: 'Italian Menu',
      description: 'Traditional Italian dishes',
      dishes: [
        {
          id: 1,
          name: 'Pizza',
          price: 25000,
          totalOrdered: 10,
          menuId: 1,
          menuName: 'Italian Menu',
          dishType: 'Main Course'
        },
        {
          id: 2,
          name: 'Pasta',
          price: 20000,
          totalOrdered: 15,
          menuId: 1,
          menuName: 'Italian Menu',
          dishType: 'Main Course'
        }
      ]
    },
    {
      id: 2,
      name: 'Mexican Menu',
      description: 'Authentic Mexican cuisine',
      dishes: [
        {
          id: 3,
          name: 'Tacos',
          price: 15000,
          totalOrdered: 20,
          menuId: 2,
          menuName: 'Mexican Menu',
          dishType: 'Main Course'
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SectionMenusComponent,
        ModalComponent,
        AddModalComponent,
        RemoveModalComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(SectionMenusComponent);
    component = fixture.componentInstance;

    component.menuForm = formBuilder.group({
      name: [''],
      description: ['']
    });

    component.menus = mockMenus;
    component.formData = [
      { labelName: 'Name', valueLabel: 'name' },
      { labelName: 'Description', valueLabel: 'description' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(component.tableHeaders.length);
  });

  it('should display correct header titles', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    component.tableHeaders.forEach((header, index) => {
      expect(headers[index].textContent.trim()).toBe(header);
    });
  });

  it('should display correct number of menus', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockMenus.length);
  });

  it('should display correct menu information', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const columns = firstRow.querySelectorAll('td');
    
    expect(columns[0].textContent.trim()).toBe(mockMenus[0].id.toString());
    expect(columns[1].textContent.trim()).toBe(mockMenus[0].name);
    expect(columns[2].textContent.trim()).toBe(mockMenus[0].description);
  });

  it('should emit addMenu event when clicking Add Menu button', () => {
    spyOn(component.addMenu, 'emit');
    const addButton = fixture.nativeElement.querySelector('.container__content-btn--add');
    
    addButton.click();
    
    expect(component.addMenu.emit).toHaveBeenCalled();
  });

  it('should emit editMenu event with menu data when clicking Edit button', () => {
    spyOn(component.editMenu, 'emit');
    const editButton = fixture.nativeElement.querySelector('.container__content-btn--edit');
    
    editButton.click();
    
    expect(component.editMenu.emit).toHaveBeenCalledWith(mockMenus[0]);
  });

  it('should emit deleteMenu event with menu data when clicking Delete button', () => {
    spyOn(component.deleteMenu, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.container__content-btn--delete');
    
    deleteButton.click();
    
    expect(component.deleteMenu.emit).toHaveBeenCalledWith(mockMenus[0]);
  });

  it('should emit saveMenu event when onSave is called', () => {
    spyOn(component.saveMenu, 'emit');
    component.onSave({'name': 'Pastas', 'description': 'Las mejores pastas'});
    expect(component.saveMenu.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when onCloseModal is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onCloseModal();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit confirmDelete event when onDelete is called', () => {
    spyOn(component.confirmDelete, 'emit');
    component.onDelete();
    expect(component.confirmDelete.emit).toHaveBeenCalled();
  });

  it('should display correct number of dishes for each menu', () => {
    const dishesLists = fixture.nativeElement.querySelectorAll('.container__content-dishes--list');
    
    dishesLists.forEach((list: HTMLElement, index: number) => {
      const dishes = list.querySelectorAll('.container__content-dishes--items');
      expect(dishes.length).toBe(mockMenus[index].dishes.length);
    });
  });

  it('should display the correct page title', () => {
    const title = fixture.nativeElement.querySelector('.container__content-title');
    expect(title.textContent.trim()).toBe("Gusteau's Menus Details");
  });
});