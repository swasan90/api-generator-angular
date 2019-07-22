import { TestBed } from '@angular/core/testing';

import { DomainFieldGeneratorService } from './domain-field-generator.service';

describe('DomainFieldGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainFieldGeneratorService = TestBed.get(DomainFieldGeneratorService);
    expect(service).toBeTruthy();
  });
});
