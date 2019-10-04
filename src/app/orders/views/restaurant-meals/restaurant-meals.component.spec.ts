import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMealsComponent } from './restaurant-meals.component';

describe('RestaurantMealsComponent', () => {
  let component: RestaurantMealsComponent;
  let fixture: ComponentFixture<RestaurantMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
