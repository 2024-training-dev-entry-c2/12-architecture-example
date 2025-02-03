import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set active tab when selectTab is called', () => {
    component.selectTab(1);
    expect(component.activeTab).toBe(1);
  });

  it('should render the correct number of tabs', () => {
    component.tabs = [
      { title: 'Tab 1', tabContent: 'Content 1', link: 'link1' },
      { title: 'Tab 2', tabContent: 'Content 2', link: 'link2' }
    ];
    fixture.detectChanges();
    const tabs = fixture.debugElement.queryAll(By.css('.tab-button'));
    expect(tabs.length).toBe(2);
  });

  
  it('should change activeTab on tab click', () => {
    component.tabs = [
      { title: 'Tab 1', tabContent: 'Content 1', link: 'link1' },
      { title: 'Tab 2', tabContent: 'Content 2', link: 'link2' }
    ];
    fixture.detectChanges();
    const tabButtons = fixture.debugElement.queryAll(By.css('.tab-button'));
    tabButtons[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.activeTab).toBe(1);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
