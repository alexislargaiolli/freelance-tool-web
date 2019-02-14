import { inject, TestBed } from '@angular/core/testing';
import { InvoicesService } from './invoices.service';

describe('Service: Invoices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicesService]
    });
  });

  it('should ...', inject([InvoicesService], (service: InvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
