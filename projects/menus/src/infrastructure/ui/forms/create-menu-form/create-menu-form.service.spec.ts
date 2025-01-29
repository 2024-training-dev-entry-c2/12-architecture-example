import { TestBed } from '@angular/core/testing';
import { CreateMenuFormService } from './create-menu-form.service';


describe('CreateMenuFormService', () => {
  let service: CreateMenuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMenuFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
