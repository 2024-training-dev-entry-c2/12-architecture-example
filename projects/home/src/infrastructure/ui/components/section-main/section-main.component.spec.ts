import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionMainComponent } from './section-main.component';
import { CommonModule } from '@angular/common';

fdescribe('SectionMainComponent', () => {
  let component: SectionMainComponent;
  let fixture: ComponentFixture<SectionMainComponent>;

  const mockDashboardData = {
    orders: [{ id: 1 }, { id: 2 }, { id: 3 }],
    menus: [{ id: 1 }, { id: 2 }],
    clients: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    dishes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SectionMainComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionMainComponent);
    component = fixture.componentInstance;
    component.dashboardData = mockDashboardData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toBe('Gusteaus Management System');
  });

  it('should display correct number of stat articles', () => {
    const statArticles = fixture.nativeElement.querySelectorAll('.dashboard__stat');
    expect(statArticles.length).toBe(4);
  });

  it('should display correct clients count', () => {
    const clientsValue = fixture.nativeElement.querySelector('#total-clients + .dashboard__stat-value');
    expect(clientsValue.textContent.trim()).toBe('4');
  });

  it('should display correct orders count', () => {
    const ordersValue = fixture.nativeElement.querySelector('#total-orders + .dashboard__stat-value');
    expect(ordersValue.textContent.trim()).toBe('3');
  });

  it('should display correct dishes count', () => {
    const dishesValue = fixture.nativeElement.querySelector('#total-dishes + .dashboard__stat-value');
    expect(dishesValue.textContent.trim()).toBe('5');
  });

  it('should display correct menus count', () => {
    const menusValue = fixture.nativeElement.querySelector('#total-menus + .dashboard__stat-value');
    expect(menusValue.textContent.trim()).toBe('2');
  });

  // Test de las gráficas
  it('should calculate correct percentage styles for clients', () => {
    const clientsGraph = fixture.nativeElement.querySelector('#total-clients + .dashboard__stat-value + .dashboard__stat-graph');
    const style = clientsGraph.getAttribute('style');
    expect(style).toContain('--percentage: 40%'); // (4/10) * 100
  });

  it('should calculate correct percentage styles for orders', () => {
    const ordersGraph = fixture.nativeElement.querySelector('#total-orders + .dashboard__stat-value + .dashboard__stat-graph');
    const style = ordersGraph.getAttribute('style');
    expect(style).toContain('--percentage: 2.727272727272727%'); // (3/110) * 100
  });

  it('should calculate correct percentage styles for dishes', () => {
    const dishesGraph = fixture.nativeElement.querySelector('#total-dishes + .dashboard__stat-value + .dashboard__stat-graph');
    const style = dishesGraph.getAttribute('style');
    expect(style).toContain('--percentage: 25%'); // (5/20) * 100
  });

  it('should calculate correct percentage styles for menus', () => {
    const menusGraph = fixture.nativeElement.querySelector('#total-menus + .dashboard__stat-value + .dashboard__stat-graph');
    const style = menusGraph.getAttribute('style');
    expect(style).toContain('--percentage: 50%'); // (2/4) * 100
  });



  it('should display the mascot image with correct alt text', () => {
    const img = fixture.nativeElement.querySelector('.dashboard__image img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toContain('Rattatouille');
    expect(img.getAttribute('src')).toContain('chefcito.png');
  });
});