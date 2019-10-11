export class Meal {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public quantity: number
  ) {}

  static fromApi(apiResponse: any) {
    return new this (
      apiResponse.id_jed,
      apiResponse.ime_jedi,
      apiResponse.opis_jedi,
      apiResponse.cena,
      apiResponse.kolicina
    );
  }
}
