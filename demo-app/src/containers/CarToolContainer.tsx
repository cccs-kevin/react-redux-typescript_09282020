import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import * as CarToolActions from '../actions/carToolActions';

import { Car, CarsOrder } from '../models/car';
import { CarToolState } from '../models/carToolStore';
import { CarTool } from '../components/CarTool';
import { carsSelector } from '../selectors/carToolSelectors';

export function CarToolContainer() {
  const stateData = {
    cars: useSelector<CarToolState, Car[]>(carsSelector),
    editCarId: useSelector<CarToolState, number>((state) => state.editCarId),
    isLoading: useSelector<CarToolState, boolean>((state) => state.isLoading),
    carsOrder: useSelector<CarToolState, CarsOrder>((state) => state.carsOrder),
  };

  const dispatch = useDispatch();

  const boundActions = bindActionCreators(
    {
      onAddCar: CarToolActions.createAppendCarAction,
      onSaveCar: CarToolActions.createReplaceCarAction,
      onDeleteCar: CarToolActions.createRemoveCarAction,
      onEditCar: CarToolActions.createEditCarAction,
      onCancelCar: CarToolActions.createCancelCarAction,
      onSortCars: CarToolActions.createSortCarsAction,
    },
    dispatch,
  );

  useEffect(() => {
    dispatch(CarToolActions.refreshCars());
  }, [dispatch]);

  return <CarTool {...stateData} {...boundActions} />;
}
