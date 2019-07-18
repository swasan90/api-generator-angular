import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiListGeneratorComponent } from './api-list-generator.component';

describe('ApiListGeneratorComponent', () => {
  let component: ApiListGeneratorComponent;
  let fixture: ComponentFixture<ApiListGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiListGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiListGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
