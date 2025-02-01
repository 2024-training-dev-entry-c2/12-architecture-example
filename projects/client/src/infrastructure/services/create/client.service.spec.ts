import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpClientModule } from '@angular/common/http';



describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // ✅ Agrega HttpClientModule aquí
    });
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
