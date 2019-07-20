import { TestBed } from '@angular/core/testing';

import { ProjectGeneratorService } from './project-generator.service';

describe('ProjectGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectGeneratorService = TestBed.get(ProjectGeneratorService);
    expect(service).toBeTruthy();
  });
});
