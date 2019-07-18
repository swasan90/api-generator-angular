import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGeneratorComponent } from './project-generator.component';

describe('ProjectGeneratorComponent', () => {
  let component: ProjectGeneratorComponent;
  let fixture: ComponentFixture<ProjectGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
