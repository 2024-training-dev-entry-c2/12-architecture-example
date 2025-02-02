import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionDishesComponent } from './section-dishes.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

fdescribe('SectionDishesComponent', () => {
  let component: SectionDishesComponent;
  let fixture: ComponentFixture<SectionDishesComponent>;
  let formBuilder: FormBuilder;

  const mockDishes = [
    {
      id: 1,
      name: 'Pizza',
      price: 25000,
      menuName: 'Pizzas Italianas',
      dishType: 'REGULAR',
      totalOrdered: 5,
      menuId: 1
    },
    {
      id: 2,
      name: 'Pasta',
      price: 20000,
      menuName: 'Pastas Italianas',
      dishType: 'POPULAR',
      totalOrdered: 100,
      menuId: 1
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SectionDishesComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(SectionDishesComponent);
    component = fixture.componentInstance;
 

    component.dishes = mockDishes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(component.tableHeaders.length);
  });

  it('should display correct number of dishes', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockDishes.length);
  });


  it('should emit addDish event when clicking Add button', () => {
    spyOn(component.addDish, 'emit');
    const addButton = fixture.nativeElement.querySelector('.container__content-btn--add');
    addButton.click();
    expect(component.addDish.emit).toHaveBeenCalled();
  });

  it('should emit editDish event with dish data when clicking Edit button', () => {
    spyOn(component.editDish, 'emit');
    const editButton = fixture.nativeElement.querySelector('.container__content-btn--edit');
    editButton.click();
    expect(component.editDish.emit).toHaveBeenCalledWith(mockDishes[0]);
  });

  it('should emit deleteDish event with dish data when clicking Delete button', () => {
    spyOn(component.deleteDish, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.container__content-btn--delete');
    deleteButton.click();
    expect(component.deleteDish.emit).toHaveBeenCalledWith(mockDishes[0]);
  });

  it('should emit closeModal event when onCloseModal is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onCloseModal();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit saveDish event when onSave is called', () => {
    spyOn(component.saveDish, 'emit');
    component.onSave({});
    expect(component.saveDish.emit).toHaveBeenCalled();
  });

  it('should emit confirmDelete event when onDelete is called', () => {
    spyOn(component.confirmDelete, 'emit');
    component.onDelete();
    expect(component.confirmDelete.emit).toHaveBeenCalled();
  });
});