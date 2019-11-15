import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderDetailsComponent } from './dialog-order-details.component';

describe('DialogOrderDetailsComponent', () => {
  let component: DialogOrderDetailsComponent;
  let fixture: ComponentFixture<DialogOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
