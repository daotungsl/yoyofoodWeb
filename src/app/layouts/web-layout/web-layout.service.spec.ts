import { TestBed } from '@angular/core/testing';

import { WebLayoutService } from './web-layout.service';

describe('WebLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebLayoutService = TestBed.get(WebLayoutService);
    expect(service).toBeTruthy();
  });
});
