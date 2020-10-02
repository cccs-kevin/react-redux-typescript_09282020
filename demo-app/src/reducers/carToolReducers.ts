import { Reducer, combineReducers, AnyAction, Action } from 'redux';

import { Car, CarsOrder, ORDER_ASC, ORDER_DESC } from '../models/car';
import { CarToolState } from '../models/carToolStore';

import {
  isAppendCarAction,
  isReplaceCarAction,
  isRemoveCarAction,
  isSortCarsAction,
  isEditCarAction,
  isCancelCarAction,
  isRefreshCarsDoneCarAction,
} from '../actions/carToolActions';

export const carsOrderReducer: Reducer<CarsOrder, AnyAction> = (
  carsOrder = { column: 'id', direction: ORDER_ASC },
  action,
) => {
  if (isSortCarsAction(action)) {
    if (action.payload.col === carsOrder.column) {
      return {
        ...carsOrder,
        direction: carsOrder.direction === ORDER_ASC ? ORDER_DESC : ORDER_ASC,
      };
    } else {
      return {
        column: action.payload.col,
        direction: ORDER_ASC,
      };
    }
  }

  return carsOrder;
};

export const editCarIdReducer: Reducer<number, AnyAction> = (
  editCarId = -1,
  action,
) => {
  if (isEditCarAction(action)) {
    return action.payload.carId;
  }

  if (
    isAppendCarAction(action) ||
    isReplaceCarAction(action) ||
    isRemoveCarAction(action) ||
    isCancelCarAction(action)
  ) {
    return -1;
  }

  return editCarId;
};

// const initialCars: Car[] = [
//   {
//     id: 1,
//     make: 'Ford',
//     model: 'Fusion Hybrid',
//     year: 2020,
//     color: 'blue',
//     price: 45000,
//   },
//   { id: 2, make: 'Tesla', model: 'S', year: 2019, color: 'red', price: 120000 },
// ];

export const carsReducer: Reducer<Car[], AnyAction> = (cars = [], action) => {
  if (isRefreshCarsDoneCarAction(action)) {
    return action.payload.cars;
  }

  if (isAppendCarAction(action)) {
    return [
      ...cars,
      {
        ...action.payload.car,
        id: Math.max(...cars.map((c) => c.id), 0) + 1,
      },
    ];
  }

  if (isReplaceCarAction(action)) {
    const { car } = action.payload;
    const carIndex = cars.findIndex((c) => c.id === car.id);
    const newCars = [...cars];
    newCars[carIndex] = car;
    return newCars;
  }

  if (isRemoveCarAction(action)) {
    return cars.filter((c) => c.id !== action.payload.carId);
  }

  return cars;
};

export const isLoadingReducer: Reducer<boolean, Action<string>> = (
  isLoading = false,
  action,
) => {
  if (action.type.includes('REQUEST')) {
    return true;
  }

  if (action.type.includes('DONE')) {
    return false;
  }

  return isLoading;
};

export const carToolReducer: Reducer<CarToolState, AnyAction> = combineReducers(
  {
    carsOrder: carsOrderReducer,
    editCarId: editCarIdReducer,
    cars: carsReducer,
    isLoading: isLoadingReducer,
  },
);
