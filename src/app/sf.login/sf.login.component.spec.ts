import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf.LoginComponent } from './sf.login.component';

describe('Sf.LoginComponent', () => {
  let component: Sf.LoginComponent;
  let fixture: ComponentFixture<Sf.LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf.LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf.LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
