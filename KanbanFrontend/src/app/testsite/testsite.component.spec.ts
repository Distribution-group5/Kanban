import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsiteComponent } from './testsite.component';

describe('TestsiteComponent', () => {
  let component: TestsiteComponent;
  let fixture: ComponentFixture<TestsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
