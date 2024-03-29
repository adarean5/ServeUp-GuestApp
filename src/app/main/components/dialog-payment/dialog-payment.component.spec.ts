import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogPaymentComponent} from './dialog-payment.component';

describe('DialogPaymentComponent', () => {
  let component: DialogPaymentComponent;
  let fixture: ComponentFixture<DialogPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
