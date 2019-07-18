import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGeneratorComponent } from './api-generator.component';

describe('ApiGeneratorComponent', () => {
  let component: ApiGeneratorComponent;
  let fixture: ComponentFixture<ApiGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
