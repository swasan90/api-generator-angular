import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainFieldGeneratorComponent } from './domain-field-generator.component';

describe('DomainFieldGeneratorComponent', () => {
  let component: DomainFieldGeneratorComponent;
  let fixture: ComponentFixture<DomainFieldGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainFieldGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainFieldGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
