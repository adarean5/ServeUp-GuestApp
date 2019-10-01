export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public rating: string,
    public type: string,
    public street: string,
    public houseNumber: number,
    public zipCode: string,
    public city: string,
    public image: string // Base64 encoded restaurant image
  ) {}

  static fromApi(apiResponse: any) {
    return new this(
      apiResponse.id_restavracija,
      apiResponse.ime_restavracije,
      apiResponse.ocena,
      apiResponse.tip,
      apiResponse.ulica,
      apiResponse.hisna_stevilka,
      apiResponse.postna_stevilka,
      apiResponse.kraj,
      apiResponse.slika
    );
  }
}
