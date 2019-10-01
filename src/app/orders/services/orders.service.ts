import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  public restaurantsHome() {
    const url = environment.baseUrlBackend + '/restaurant/home/';
    const body = {
      location: 'Ljubljana' // TODO Get actual location
    };

    return this.http.post(url, body);
  }
}
