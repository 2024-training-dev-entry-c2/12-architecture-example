import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCardComponent } from './sales-card.component';
import { By } from '@angular/platform-browser';

describe('SalesCardComponent', () => {
  let component: SalesCardComponent;
  let fixture: ComponentFixture<SalesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesCardComponent);
    component = fixture.componentInstance;
    component.ticksData = [
      { day: 'MON', thisWeek: 24, prevWeek: 20 },
      { day: 'TUE', thisWeek: 18, prevWeek: 22 },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render chart', () => {
    const canvas = fixture.debugElement.query(By.css('canvas'));
    expect(canvas).toBeTruthy();
  });
  it('should log ticksData in ngOnInit', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith(component.ticksData);
  });
  it('should set default values input', () => {
    expect(component.title).toBe('');
    expect(component.subTitle).toBe('');
    expect(component.description).toBe('');
    expect(component.ticksData.length).toBe(2);
  });
  it('should render ticksData labels', () => {
    const tickElements = fixture.debugElement.queryAll(By.css('.tick'));
    expect(tickElements.length).toBe(2);
    expect(tickElements[0].nativeElement.textContent).toContain('MON');
    expect(tickElements[1].nativeElement.textContent).toContain('TUE');
  });
});
