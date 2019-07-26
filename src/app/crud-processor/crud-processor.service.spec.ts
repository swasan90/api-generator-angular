import { TestBed } from '@angular/core/testing';

import { CrudProcessorService } from './crud-processor.service';

describe('CrudProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudProcessorService = TestBed.get(CrudProcessorService);
    expect(service).toBeTruthy();
  });
});
