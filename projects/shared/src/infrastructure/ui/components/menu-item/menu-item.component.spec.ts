import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { MenuItemComponent } from './menu-item.component';
import { ToastService } from '../../../services/toast.service';
import { usersRoutes } from 'users';

 describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemComponent],
      providers: [
        LoaderService,
        ToastService,
        provideRouter(usersRoutes)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('imageSrc', 'https://example.com/image.png');
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.componentRef.setInput('title', 'Menu Item');

    fixture.detectChanges();
  });

  it('should create MenuItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct image', () => {


    compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');

    expect(img?.src).toContain('https://example.com/image.png');
  });

  it('should display correct title', () => {
   

    compiled = fixture.nativeElement;
    const span = compiled.querySelector('span');

    expect(span?.textContent).toBe('Menu Item');
  });

  it('should call href() function correctly', () => {
    

    fixture.detectChanges();

    compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');

    expect(link?.getAttribute('href')).toBe('/https:/example.com');
  });
});

