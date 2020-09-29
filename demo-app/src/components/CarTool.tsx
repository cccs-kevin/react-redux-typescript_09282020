import React, { useState } from "react";

import { Car, NewCar, CarKeys } from "../models/car";

import { ToolHeader } from "./ToolHeader";
import { CarTable } from "./CarTable";
import { CarForm } from "./CarForm";

export interface CarToolProps {
  cars: Car[];
}

export function CarTool(props: CarToolProps) {
  const [cars, setCars] = useState<Car[]>([...props.cars]);

  const addCar = (newCar: NewCar) => {
    // setCars(
    //   cars.concat({
    //     ...newCar,
    //     id: Math.max(...(cars.map((c) => c.id) as []), 0) + 1,
    //   })
    // );
  };

  const deleteCar = (carId: number) => {
    setCars(cars.filter((c) => c.id !== carId));
  };

  const car: Car = {
    id: 1,
    make: "Ford",
    model: "T",
    year: 1920,
    color: "black",
    price: 400,
  };

  type CarCol = {
    id: number;
    name: CarKeys;
  };

  const cols: CarCol[] = [{ id: 1, name: "make" }];

  cols.forEach((col) => {
    console.log(car[col.name]);
  });

  (Object.keys(car) as CarKeys[]).forEach((key) => {
    console.log(car[key]);
  });

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable cars={cars} onDeleteCar={deleteCar} />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
