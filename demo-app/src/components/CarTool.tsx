import React, { useState } from "react";

import {
  Car,
  NewCar,
  CarKeys,
  CarsOrder,
  ORDER_ASC,
  ORDER_DESC,
} from "../models/car";

import { ToolHeader } from "./ToolHeader";
import { CarTable } from "./CarTable";
import { CarForm } from "./CarForm";

export interface CarToolProps {
  cars: Car[];
}

export function CarTool(props: CarToolProps) {
  const [cars, setCars] = useState<Car[]>([...props.cars]);
  const [carsOrder, setCarsOrder] = useState<CarsOrder>({
    column: "id",
    direction: ORDER_ASC,
  });

  const addCar = (newCar: NewCar) => {
    setCars(
      cars.concat({
        ...newCar,
        id: Math.max(...(cars.map((c) => c.id) as []), 0) + 1,
      })
    );
  };

  const deleteCar = (carId: number) => {
    setCars(cars.filter((c) => c.id !== carId));
  };

  const sortCars = (column: CarKeys) => {
    setCarsOrder({
      column,
      direction:
        column !== carsOrder.column
          ? ORDER_ASC
          : carsOrder.direction === ORDER_DESC
          ? ORDER_ASC
          : ORDER_DESC,
    });
  };

  const orderCars = (cars: Car[], carsOrder: CarsOrder) => {
    return cars.concat().sort((a: Car, b: Car) => {
      const left = String(a[carsOrder.column]).toUpperCase();
      const right = String(b[carsOrder.column]).toUpperCase();

      if (left < right) {
        return carsOrder.direction === ORDER_ASC ? -1 : 1;
      } else if (left > right) {
        return carsOrder.direction === ORDER_ASC ? 1 : -1;
      } else {
        return 0;
      }
    });
  };

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={orderCars(cars, carsOrder)}
        carsOrder={carsOrder}
        onDeleteCar={deleteCar}
        onSortCars={sortCars}
      />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
