import {Meal} from './meal.model';

export class Order {
  constructor(
    public arrivalTime: string,
    public submittedTime: string,
    public items: Meal[],
    public optional?: {
      orderId?: number,
      userId?: string,
      restaurantId?: number,
      restaurantName?: string,
      status?: number,
      checkedIn?: boolean,
      tableId?: string,
    }
  ) {}

  static toApi(order: Order) {
    return {
      cas_prevzema: order.arrivalTime,
      cas_narocila: order.submittedTime,
      id_restavracija: order.optional.restaurantId,
      id_uporabnik: order.optional.userId,
      jedi: order.items.map((meal: Meal) => Meal.toApi(meal))
    };
  }

  static fromApi(apiOrder: any) {
    return new this(
      apiOrder.cas_prevzema,
      apiOrder.cas_narocila,
      apiOrder.jedi.map((apiMeal: any) => Meal.fromApi(apiMeal)),
      {
        orderId: apiOrder.id_narocila,
        userId: apiOrder.id_uporabnik,
        restaurantId: apiOrder.id_restavracije,
        status: apiOrder.status,
        checkedIn: apiOrder.checked_in,
        tableId: apiOrder.id_miza,
        restaurantName: apiOrder.ime_restavracije
      }
    );
  }
}
