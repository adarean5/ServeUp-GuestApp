import {Meal} from './meal.model';

export class Order {
  constructor(
    public arrivalTime: string,
    public submittedTime: string,
    public restaurantId: number,
    public userId: string,
    public items: Meal[]
  ) {}

  static toApi(order: Order) {
    return {
      cas_prevzema: order.arrivalTime,
      cas_narocila: order.submittedTime,
      /*status: null,
      checked_in: false,
      id_miza: '',*/
      id_restavracija: order.restaurantId,
      id_uporabnik: order.userId,
      jedi: order.items.map((meal: Meal) => Meal.toApi(meal))
    };
  }
}
