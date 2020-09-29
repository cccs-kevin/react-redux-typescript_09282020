import React from "react";

import { Car, CarsOrder, CarKeys } from "../models/car";

import { CarViewRow } from "./CarViewRow";

export type CarTableProps = {
  cars: Car[];
  carsOrder: CarsOrder;
  onDeleteCar: (carId: number) => void;
  onSortCars: (carProp: CarKeys) => void;
};

export function CarTable(props: CarTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => props.onSortCars("id")}>
            Id
            {props.carsOrder.column === "id" &&
              "(" + props.carsOrder.direction + ")"}
          </th>
          <th>
            <button type="button" onClick={() => props.onSortCars("make")}>
              Make
              {props.carsOrder.column === "make" &&
                "(" + props.carsOrder.direction + ")"}
            </button>
          </th>
          <th>
            <button type="button" onClick={() => props.onSortCars("model")}>
              Model
              {props.carsOrder.column === "model" &&
                "(" + props.carsOrder.direction + ")"}
            </button>
          </th>
          <th>
            <button type="button" onClick={() => props.onSortCars("year")}>
              Year
              {props.carsOrder.column === "year" &&
                "(" + props.carsOrder.direction + ")"}
            </button>
          </th>
          <th>
            <button type="button" onClick={() => props.onSortCars("color")}>
              Color
              {props.carsOrder.column === "color" &&
                "(" + props.carsOrder.direction + ")"}
            </button>
          </th>
          <th>
            <button type="button" onClick={() => props.onSortCars("price")}>
              Price
              {props.carsOrder.column === "price" &&
                "(" + props.carsOrder.direction + ")"}
            </button>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.cars.map((car) => (
          <CarViewRow key={car.id} car={car} onDeleteCar={props.onDeleteCar} />
        ))}
      </tbody>
    </table>
  );
}
