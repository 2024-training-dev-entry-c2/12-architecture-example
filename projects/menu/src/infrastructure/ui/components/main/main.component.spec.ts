import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have modalTitle as "Agregar plato" by default', () => {
    expect(component.modalTitle).toBe('Agregar plato');
  });

  it('should have isEditMode as false by default', () => {
    expect(component.isEditMode).toBeFalse();
  });

  it('should have isModalVisible as false by default', () => {
    expect(component.isModalVisible).toBeFalse();
  });

  it('should have modalButton as "Agregar" by default', () => {
    expect(component.modalButton).toBe('Agregar');
  });
});
