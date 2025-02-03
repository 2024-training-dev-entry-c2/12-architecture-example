import { TestBed } from '@angular/core/testing';

import { GetClientService } from './get-client.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetClientService', () => {
  let service: GetClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // ✅ Agrega HttpClientModule aquí
    });
    service = TestBed.inject(GetClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
