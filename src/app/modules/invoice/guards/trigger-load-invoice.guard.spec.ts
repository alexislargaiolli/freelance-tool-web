import { TestBed, async, inject } from '@angular/core/testing';

import { TriggerLoadInvoiceGuard } from './trigger-load-invoice.guard';

describe('TriggerLoadInvoiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggerLoadInvoiceGuard]
    });
  });

  it('should ...', inject([TriggerLoadInvoiceGuard], (guard: TriggerLoadInvoiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
