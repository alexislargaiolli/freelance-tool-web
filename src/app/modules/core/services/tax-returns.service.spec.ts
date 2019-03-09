/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaxReturnsService } from './tax-returns.service';

describe('Service: TaxReturns', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxReturnsService]
    });
  });

  it('should ...', inject([TaxReturnsService], (service: TaxReturnsService) => {
    expect(service).toBeTruthy();
  }));
});
