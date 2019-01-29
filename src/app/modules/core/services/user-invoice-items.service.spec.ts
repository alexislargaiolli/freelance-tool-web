/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserInvoiceItemsService } from './user-invoice-items.service';

describe('Service: UserInvoiceItems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInvoiceItemsService]
    });
  });

  it('should ...', inject([UserInvoiceItemsService], (service: UserInvoiceItemsService) => {
    expect(service).toBeTruthy();
  }));
});
