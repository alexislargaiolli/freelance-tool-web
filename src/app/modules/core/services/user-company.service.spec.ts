import { TestBed } from '@angular/core/testing';

import { UserCompanyService } from './user-company.service';

describe('UserCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCompanyService = TestBed.get(UserCompanyService);
    expect(service).toBeTruthy();
  });
});
