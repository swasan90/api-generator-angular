import { TestBed } from '@angular/core/testing';

import { AddCrudService } from './add-crud.service';

describe('AddCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCrudService = TestBed.get(AddCrudService);
    expect(service).toBeTruthy();
  });
});
