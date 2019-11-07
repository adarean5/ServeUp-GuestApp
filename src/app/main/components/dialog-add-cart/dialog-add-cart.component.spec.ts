import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogAddCartComponent} from './dialog-add-cart.component';

describe('DialogAddCartComponent', () => {
  let component: DialogAddCartComponent;
  let fixture: ComponentFixture<DialogAddCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
