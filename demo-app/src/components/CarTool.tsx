import React from "react";

import { ToolHeader } from "./ToolHeader";
import { CarTable } from "./CarTable";
import { CarForm } from "./CarForm";

import { useCarToolStoreConsumer } from "../contexts/carToolStoreContext";

export function CarTool() {
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
  } = useCarToolStoreConsumer();
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
