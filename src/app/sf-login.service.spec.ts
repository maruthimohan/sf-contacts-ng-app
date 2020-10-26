import { TestBed } from '@angular/core/testing';

import { SfLoginService } from './sf-login.service';

describe('SfLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SfLoginService = TestBed.get(SfLoginService);
    expect(service).toBeTruthy();
  });
});
