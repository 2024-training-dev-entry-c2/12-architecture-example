import { TestBed } from '@angular/core/testing';

import { UpdateClientService } from './update-client.service';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateClientService', () => {
  let service: UpdateClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // ✅ Agrega HttpClientModule aquí
    });
    service = TestBed.inject(UpdateClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
