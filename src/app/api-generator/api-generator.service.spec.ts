import { TestBed } from '@angular/core/testing';

import { ApiGeneratorService } from './api-generator.service';

describe('ApiGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGeneratorService = TestBed.get(ApiGeneratorService);
    expect(service).toBeTruthy();
  });
});
