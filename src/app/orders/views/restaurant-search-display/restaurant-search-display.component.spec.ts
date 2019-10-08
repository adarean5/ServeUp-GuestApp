import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchDisplayComponent } from './restaurant-search-display.component';

describe('RestaurantSearchDisplayComponent', () => {
  let component: RestaurantSearchDisplayComponent;
  let fixture: ComponentFixture<RestaurantSearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
