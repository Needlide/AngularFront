import { TestBed } from '@angular/core/testing';

import { ErorService } from './eror.service';

describe('ErorService', () => {
  let service: ErorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
