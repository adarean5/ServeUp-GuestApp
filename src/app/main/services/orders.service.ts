import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Order} from '../../store/models/order.model';

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

  public getMealsForRestaurant(restaurantId: number) {
    const url = environment.baseUrlBackend + '/meals/?id_restavracija=' + restaurantId;

    return this.http.get(url);
  }

  public newOrderByUser(order: Order) {
    const url = environment.baseUrlBackend + '/orders/new_order/';
    const body = Order.toApi(order);
    console.log('newOrderByUser body:', body);

    return this.http.post(url, body);
  }

  public getAllOrders(userId: string) {
    const url = environment.baseUrlBackend + '/user/get_orders/';
    const body = {
      id_uporabnik: userId
    };

    console.log(body);

    return this.http.post(url, body);
  }
}
