import { TestBed } from '@angular/core/testing';

import { UserCompaniesService } from './user-companies.service';

describe('UserCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCompaniesService = TestBed.get(UserCompaniesService);
    expect(service).toBeTruthy();
  });
});
