import { TestBed } from '@angular/core/testing';

import { ListMenuService } from './list-menu.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListMenuService', () => {
  let service: ListMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule,HttpClientTestingModule], 
    });
    service = TestBed.inject(ListMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
