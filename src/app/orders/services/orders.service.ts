import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private currentLocation = 'Ljubljana'; // TODO: Replace with actual location

  constructor(
    private http: HttpClient
  ) { }

  public restaurantsHome() {
    const url = environment.baseUrlBackend + '/restaurant/home/';
    const body = {
      location: this.currentLocation
    };

    return this.http.post(url, body);
  }

  public getRestaurantTypes() {
    const url = environment.baseUrlBackend + '/restaurant_type/';

    return this.http.get(url);
  }

  public searchRestaurants(location: string) {
    const url = environment.baseUrlBackend + '/restaurant/home/';
    const body = {
      location: !location ? this.currentLocation : location
    };

    return this.http.post(url, body);
  }
}
