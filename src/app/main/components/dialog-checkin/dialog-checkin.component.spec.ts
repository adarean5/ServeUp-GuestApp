import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckinComponent } from './dialog-checkin.component';

describe('DialogCheckinComponent', () => {
  let component: DialogCheckinComponent;
  let fixture: ComponentFixture<DialogCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
