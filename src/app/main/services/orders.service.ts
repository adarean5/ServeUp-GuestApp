import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Order} from '../../store/models/order.model';
import {Meal} from '../../store/models/meal.model';

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

  public newOrderByUser(orderData) {
    const url = environment.baseUrlBackend + '/orders/new_order/';
    const body = {
      cas_prevzema: orderData.arrivalTime,
      cas_narocila: orderData.submittedTime,
      id_restavracija: orderData.restaurantId,
      id_uporabnik: orderData.userId,
      jedi: orderData.items.map((meal: Meal) => Meal.toApi(meal))
    };

    return this.http.post(url, body);
  }

  public getAllOrders(userId: string) {
    const url = environment.baseUrlBackend + '/user/get_orders/';
    const body = {
      id_uporabnik: userId
    };

    return this.http.post(url, body);
  }

  public checkIn(orderId: number, qrCode: string) {
    const url = environment.baseUrlBackend + '/user/check_in/';
    const body = {
      id_narocilo: orderId,
      qr: qrCode
    };

    return this.http.post(url, body);
  }
}
