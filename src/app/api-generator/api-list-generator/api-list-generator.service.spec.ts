import { TestBed } from '@angular/core/testing';

import { ApiListGeneratorService } from './api-list-generator.service';

describe('ApiListGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiListGeneratorService = TestBed.get(ApiListGeneratorService);
    expect(service).toBeTruthy();
  });
});
