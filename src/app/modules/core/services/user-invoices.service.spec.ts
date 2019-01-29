/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserInvoicesService } from './user-invoices.service';

describe('Service: UserInvoices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInvoicesService]
    });
  });

  it('should ...', inject([UserInvoicesService], (service: UserInvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
