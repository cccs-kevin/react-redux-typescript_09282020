export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

export type CarKeys = keyof Car;

export type NewCar = Omit<Car, "id">;

export type NewCarKeys = keyof NewCar;
