import { TestBed } from '@angular/core/testing';

import { RegisterStoreService } from './register-store.service';

describe('RegisterStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterStoreService = TestBed.get(RegisterStoreService);
    expect(service).toBeTruthy();
  });
});
