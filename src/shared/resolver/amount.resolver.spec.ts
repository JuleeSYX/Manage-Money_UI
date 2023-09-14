import { TestBed } from '@angular/core/testing';

import { AmountResolver } from './amount.resolver';

describe('AmountResolver', () => {
  let resolver: AmountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AmountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
