import React from "react";

import { Car, CarsOrder, CarKeys } from "../models/car";

import { CarViewRow } from "./CarViewRow";
import { CarEditRow } from "./CarEditRow";

export type CarTableCol = {
  id: number;
  caption: string;
  column: CarKeys;
};

export type CarTableProps = {
  cars: Car[];
  editCarId: number;
  carsOrder: CarsOrder;
  onEditCar: (carId: number) => void;
  onDeleteCar: (carId: number) => void;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
  onSortCars: (carProp: CarKeys) => void;
};

const carTableCols: CarTableCol[] = [
  { id: 1, caption: "Id", column: "id" },
  { id: 2, caption: "Make", column: "make" },
  { id: 3, caption: "Model", column: "model" },
  { id: 4, caption: "Year", column: "year" },
  { id: 5, caption: "Body Color", column: "color" },
  { id: 6, caption: "Price", column: "price" },
];

export function CarTable(props: CarTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {carTableCols.map((carTableCol) => (
            <th key={carTableCol.id}>
              <button
                type="button"
                onClick={() => props.onSortCars(carTableCol.column)}
              >
                {carTableCol.caption}
                {props.carsOrder.column === carTableCol.column &&
                  "(" + props.carsOrder.direction + ")"}
              </button>
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.cars.map((car) =>
          car.id === props.editCarId ? (
            <CarEditRow
              key={car.id}
              car={car}
              onSaveCar={props.onSaveCar}
              onCancelCar={props.onCancelCar}
            />
          ) : (
            <CarViewRow
              key={car.id}
              car={car}
              onEditCar={props.onEditCar}
              onDeleteCar={props.onDeleteCar}
            />
          )
        )}
      </tbody>
    </table>
  );
}
