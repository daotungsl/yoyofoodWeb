import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';


describe('TrasactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionService = TestBed.get(TransactionService);
    expect(service).toBeTruthy();
  });
});
