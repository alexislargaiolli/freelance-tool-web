import { TestBed, async, inject } from '@angular/core/testing';

import { TriggerLoadCompaniesGuard } from './trigger-load-companies.guard';

describe('TriggerLoadCompaniesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggerLoadCompaniesGuard]
    });
  });

  it('should ...', inject([TriggerLoadCompaniesGuard], (guard: TriggerLoadCompaniesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
