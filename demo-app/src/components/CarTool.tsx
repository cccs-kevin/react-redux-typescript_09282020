import React from "react";

import { Car } from "../models/car";

import { ToolHeader } from "./ToolHeader";
import { CarTable } from "./CarTable";
import { CarForm } from "./CarForm";

import { useCarToolStore } from "../hooks/useCarToolStore";

export interface CarToolProps {
  cars: Car[];
}

export function CarTool(props: CarToolProps) {
  const {
    sortedCars,
    editCarId,
    carsOrder,
    addCar,
    saveCar,
    deleteCar,
    sortCars,
    editCar,
    cancelCar,
  } = useCarToolStore([...props.cars]);
  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={sortedCars}
        editCarId={editCarId}
        carsOrder={carsOrder}
        onEditCar={editCar}
        onDeleteCar={deleteCar}
        onSaveCar={saveCar}
        onCancelCar={cancelCar}
        onSortCars={sortCars}
      />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
