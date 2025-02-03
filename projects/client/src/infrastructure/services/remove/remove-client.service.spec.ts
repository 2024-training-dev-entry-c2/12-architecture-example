import { TestBed } from '@angular/core/testing';

import { RemoveClientService } from './remove-client.service';
import { HttpClientModule } from '@angular/common/http';

describe('RemoveClientService', () => {
  let service: RemoveClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // ✅ Agrega HttpClientModule aquí
    });
    service = TestBed.inject(RemoveClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
