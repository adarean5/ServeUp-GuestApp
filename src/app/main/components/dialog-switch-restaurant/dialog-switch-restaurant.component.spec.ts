import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSwitchRestaurantComponent } from './dialog-switch-restaurant.component';

describe('DialogSwitchRestaurantComponent', () => {
  let component: DialogSwitchRestaurantComponent;
  let fixture: ComponentFixture<DialogSwitchRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSwitchRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSwitchRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
