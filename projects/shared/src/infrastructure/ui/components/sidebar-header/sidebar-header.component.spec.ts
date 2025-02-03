import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHeaderComponent } from './sidebar-header.component';

describe('SidebarHeaderComponent', () => {
  let component: SidebarHeaderComponent;
  let fixture: ComponentFixture<SidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header element', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(headerElement).toBeTruthy();
  });
  
  it('should contain the h2 element with the title "La espinaca feliz"', () => {
    const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2.header__title');
    expect(h2Element).toBeTruthy();
    expect(h2Element.textContent).toBe('La espinaca feliz');
  });
  
  it('should contain an anchor tag with a link to the home page', () => {
    const anchorElement: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(anchorElement).toBeTruthy();
    expect(anchorElement.getAttribute('href')).toBe('#');
  });
  
});
