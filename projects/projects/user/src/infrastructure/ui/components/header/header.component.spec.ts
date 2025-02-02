// Ejemplo del HeaderComponent con Jasmine
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit logout event when logout button is clicked', () => {
    // Jasmine spy
    spyOn(component.logoutRequested, 'emit');
    component.onLogout();
    expect(component.logoutRequested.emit).toHaveBeenCalled();
  });
  
});