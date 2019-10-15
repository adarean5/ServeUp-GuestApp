export class Meal {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public quantity: number
  ) {}

  // Use to cast api response to meal
  static fromApi(apiResponse: any) {
    return new this (
      apiResponse.id_jed,
      apiResponse.ime_jedi,
      apiResponse.opis_jedi,
      apiResponse.cena,
      apiResponse.kolicina
    );
  }

  // Use for changing meal quantity
  static withQuantity(meal: Meal, quantity: number) {
    return new this (
      meal.id,
      meal.name,
      meal.description,
      meal.price,
      quantity
    );
  }
}
