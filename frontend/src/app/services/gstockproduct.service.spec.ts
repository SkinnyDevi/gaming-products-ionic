import { TestBed } from '@angular/core/testing';

import { GStockProductService } from './gstockproduct.service';

describe('GstockproductService', () => {
  let service: GStockProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GStockProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
