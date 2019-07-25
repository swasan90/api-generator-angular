import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProcessorComponent } from './crud-processor.component';

describe('CrudProcessorComponent', () => {
  let component: CrudProcessorComponent;
  let fixture: ComponentFixture<CrudProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
