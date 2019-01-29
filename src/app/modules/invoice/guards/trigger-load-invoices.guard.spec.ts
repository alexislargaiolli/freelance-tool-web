import { TestBed, async, inject } from '@angular/core/testing';

import { TriggerLoadInvoicesGuard } from './trigger-load-invoices.guard';

describe('TriggerLoadInvoicesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggerLoadInvoicesGuard]
    });
  });

  it('should ...', inject([TriggerLoadInvoicesGuard], (guard: TriggerLoadInvoicesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
