import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainOverviewComponent } from './main-overview.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('MainOverviewComponent', () => {
  let component: MainOverviewComponent;
  let fixture: ComponentFixture<MainOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOverviewComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of bento items', () => {
    const bentoItems = fixture.debugElement.queryAll(By.css('.bento__item'));
    expect(bentoItems.length).toBe(component.bentoItems.length);
  });

  it('should display the correct content for each bento item', () => {
    const bentoItems = fixture.debugElement.queryAll(By.css('.bento__item'));

    bentoItems.forEach((item, index) => {
      const title = item.query(By.css('h3')).nativeElement.textContent;
      const count = item.query(By.css('h2')).nativeElement.textContent;
      const icon = item.query(By.css('use')).nativeElement.getAttribute('xlink:href');

      expect(title).toBe(component.bentoItems[index].title);
      expect(count).toBe(component.bentoItems[index].count);
      expect(icon).toBe(component.bentoItems[index].icon);
    });
  });
  
  it('should display the correct list of clients', () => {
    const clientItems = fixture.debugElement.queryAll(By.css('.client__list li'));
    const clients = ['Maria', 'Carmen', 'Fabian'];

    clientItems.forEach((clientItem, index) => {
      expect(clientItem.nativeElement.textContent).toBe(clients[index]);
    });
  });
});
