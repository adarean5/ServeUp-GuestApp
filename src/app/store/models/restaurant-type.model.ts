export class RestaurantType {
  constructor(
    public typeId: number,
    public typeName: string
  ) {}

  static fromApi(apiResponse: any) {
    return new this(
      apiResponse.id_tip_restavracije,
      apiResponse.tip
    );
  }
}
