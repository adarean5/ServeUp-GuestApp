export interface Restaurant {
  id: number;
  name: string;
  rating: string;
  type: string;
  street: string;
  houseNumber: number;
  zipCode: string;
  city: string;
  image: string; // Base64 encoded restaurant image
}
