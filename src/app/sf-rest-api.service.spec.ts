import { TestBed } from '@angular/core/testing';

import { SfRestApiService } from './sf-rest-api.service';

describe('SfRestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SfRestApiService = TestBed.get(SfRestApiService);
    expect(service).toBeTruthy();
  });
});
