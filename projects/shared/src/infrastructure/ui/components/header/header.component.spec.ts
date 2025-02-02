import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let componentRef;
  let component: HeaderComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {} } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('iconUrl', 'images/example.png');
    componentRef.setInput('items', [
      {url: 'enlace 1', text: 'opción 1'},
      {url: 'enlace 2', text: 'opción 2'},
    ]);

    componentRef.setInput('user', 'userNameExample');

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();
  });
  
  it('should render brand name "CHEFLY"', () => {
    const brandText = compiled.querySelector('span');
    expect(brandText?.textContent).toBe('CHEFLY'); 
  });
  
  it('should pass menu items to lib-menu component', () => {
    const menu = fixture.debugElement.query(By.css('lib-menu'));
    const menuItems = component.items();  
    expect(menu).toBeTruthy();  
    expect(menu.componentInstance.items()).toEqual(menuItems);
  });

  it('should pass user data to lib-user component', () => {
    const userComponent = fixture.debugElement.query(By.css('lib-user'));
    const user = component.user();  
    expect(userComponent).toBeTruthy(); 
    expect(userComponent.componentInstance.user()).toBe(user); 
  });
    
});
