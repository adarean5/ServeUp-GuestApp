import {Meal} from './meal.model';

export class Order {
  constructor(
    public arrivalTime: string,
    public submittedTime: string,
    public items: Meal[],
    public total: number,
    public orderId?: number,
    public userId?: string,
    public restaurantId?: number,
    public restaurantName?: string,
    public status?: number,
    public checkedIn?: boolean,
    public tableId?: string,
  ) {}

  static fromApi(apiOrder: any) {
    return new this(
      apiOrder.cas_prevzema,
      apiOrder.cas_narocila,
      apiOrder.jedi.map((apiMeal: any) => Meal.fromApi(apiMeal)),
      apiOrder.cena,
      apiOrder.id_narocila,
      apiOrder.id_uporabnik,
      apiOrder.id_restavracije,
      apiOrder.ime_restavracije,
      apiOrder.status,
      apiOrder.checked_in,
      apiOrder.id_miza,
    );
  }
}
