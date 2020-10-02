import React from 'react';

import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';
import { CarToolState } from '../models/carToolStore';
import { Car, CarKeys, NewCar } from '../models/car';

export type CarToolProps = CarToolState & {
  onAddCar: (car: NewCar) => void;
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: number) => void;
  onEditCar: (carId: number) => void;
  onCancelCar: () => void;
  onSortCars: (col: CarKeys) => void;
};

export function CarTool(props: CarToolProps) {
  const {
    cars,
    editCarId,
    carsOrder,
    onAddCar: addCar,
    onSaveCar: saveCar,
    onDeleteCar: deleteCar,
    onEditCar: editCar,
    onCancelCar: cancelCar,
    onSortCars: sortCars,
  } = props;
  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={cars}
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
