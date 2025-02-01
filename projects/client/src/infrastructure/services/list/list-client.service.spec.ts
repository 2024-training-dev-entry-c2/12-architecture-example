import { TestBed } from '@angular/core/testing';

import { ListClientService } from './list-client.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListClientService', () => {
  let service: ListClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // ✅ Agrega HttpClientModule aquí
    });
    service = TestBed.inject(ListClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
