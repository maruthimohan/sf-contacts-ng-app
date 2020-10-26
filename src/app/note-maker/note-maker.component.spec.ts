import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMakerComponent } from './note-maker.component';

describe('NoteMakerComponent', () => {
  let component: NoteMakerComponent;
  let fixture: ComponentFixture<NoteMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
