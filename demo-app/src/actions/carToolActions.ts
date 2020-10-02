import { Action, AnyAction, Dispatch } from 'redux';

import { Car, NewCar, CarKeys } from '../models/car';

export const REFRESH_CARS_REQUEST_ACTION = 'REFRESH_CARS_REQUEST_ACTION';
export const REFRESH_CARS_DONE_ACTION = 'REFRESH_CARS_DONE_ACTION';
export const APPEND_CAR_REQUEST_ACTION = 'APPEND_REQUEST_CAR';
export const REPLACE_CAR_ACTION = 'REPLACE_CAR';
export const REMOVE_CAR_ACTION = 'REMOVE_CAR';
export const EDIT_CAR_ACTION = 'EDIT_CAR';
export const CANCEL_CAR_ACTION = 'CANCEL_CAR';
export const SORT_CARS_ACTION = 'SORT_CARS';

// Refresh Cars Request Action

export interface RefreshCarsRequestCarAction
  extends Action<typeof REFRESH_CARS_REQUEST_ACTION> {}

export type CreateRefreshCarsRequestCarAction = () => RefreshCarsRequestCarAction;

export function isRefreshCarsRequestCarAction(
  action: AnyAction,
): action is RefreshCarsRequestCarAction {
  return action?.type === REFRESH_CARS_REQUEST_ACTION;
}

export const createRefreshCarsRequestCarAction: CreateRefreshCarsRequestCarAction = () => ({
  type: REFRESH_CARS_REQUEST_ACTION,
});

// Refresh Cars Done Action

export interface RefreshCarsDoneCarAction
  extends Action<typeof REFRESH_CARS_DONE_ACTION> {
  payload: {
    cars: Car[];
  };
}

export type CreateRefreshCarsDoneCarAction = (
  cars: Car[],
) => RefreshCarsDoneCarAction;

export function isRefreshCarsDoneCarAction(
  action: AnyAction,
): action is RefreshCarsDoneCarAction {
  return action?.type === REFRESH_CARS_DONE_ACTION;
}

export const createRefreshCarsDoneCarAction: CreateRefreshCarsDoneCarAction = (
  cars: Car[],
) => ({
  type: REFRESH_CARS_DONE_ACTION,
  payload: { cars },
});

// Refresh Cars Thunk Function

// thunk creator
export const refreshCars = () => {
  // thunk function
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshCarsRequestCarAction());
    const res = await fetch('http://localhost:3060/cars');
    const cars = await res.json();
    dispatch(createRefreshCarsDoneCarAction(cars));
  };
};

// Append Car Request Action

export interface AppendCarRequestAction
  extends Action<typeof APPEND_CAR_REQUEST_ACTION> {
  payload: { car: NewCar };
}

export type CreateAppendCarRequestAction = (
  car: NewCar,
) => AppendCarRequestAction;

export function isAppendCarRequestAction(
  action: AnyAction,
): action is AppendCarRequestAction {
  return action?.type === APPEND_CAR_REQUEST_ACTION;
}

export const createAppendCarRequestAction: CreateAppendCarRequestAction = (
  car,
) => ({
  type: APPEND_CAR_REQUEST_ACTION,
  payload: { car },
});

// End Append Car Request Action

// Append Car Thunk Function

export const appendCar = (car: NewCar) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(createAppendCarRequestAction(car));

    await fetch('http://localhost:3060/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    const refreshCarsThunk = refreshCars();
    refreshCarsThunk(dispatch);

    //dispatch(refreshCars());
  };
};

// Existing Car Action

export interface ReplaceCarAction extends Action<typeof REPLACE_CAR_ACTION> {
  payload: { car: Car };
}

export type CreateReplaceCarAction = (car: Car) => ReplaceCarAction;

export function isReplaceCarAction(
  action: AnyAction,
): action is ReplaceCarAction {
  return action?.type === REPLACE_CAR_ACTION;
}

export const createReplaceCarAction: CreateReplaceCarAction = (car) => ({
  type: REPLACE_CAR_ACTION,
  payload: { car },
});

// End Existing Car Action

// Remove Car Action

export interface RemoveCarAction extends Action<typeof REMOVE_CAR_ACTION> {
  payload: { carId: number };
}

export type CreateRemoveCarAction = (carId: number) => RemoveCarAction;

export function isRemoveCarAction(
  action: AnyAction,
): action is RemoveCarAction {
  return action.type === REMOVE_CAR_ACTION;
}

export const createRemoveCarAction: CreateRemoveCarAction = (carId) => ({
  type: REMOVE_CAR_ACTION,
  payload: { carId },
});

// End Remove Action

// Edit Car Action

export interface EditCarAction extends Action<typeof EDIT_CAR_ACTION> {
  payload: { carId: number };
}

export type CreateEditCarAction = (carId: number) => EditCarAction;

export function isEditCarAction(action: AnyAction): action is EditCarAction {
  return action.type === EDIT_CAR_ACTION;
}

export const createEditCarAction: CreateEditCarAction = (carId) => ({
  type: EDIT_CAR_ACTION,
  payload: { carId },
});

// End Edit Car Car

// Car Action

export type CancelCarAction = Action<typeof CANCEL_CAR_ACTION>;

export type CreateCancelCarAction = () => CancelCarAction;

export function isCancelCarAction(
  action: AnyAction,
): action is CancelCarAction {
  return action.type === CANCEL_CAR_ACTION;
}

export const createCancelCarAction: CreateCancelCarAction = () => ({
  type: CANCEL_CAR_ACTION,
});

// End Car Action

// Sort Cars Action

export interface SortCarsAction extends Action<typeof SORT_CARS_ACTION> {
  payload: { col: CarKeys };
}

export type CreateSortCarsAction = (col: CarKeys) => SortCarsAction;

export function isSortCarsAction(action: AnyAction): action is SortCarsAction {
  return action.type === SORT_CARS_ACTION;
}

export const createSortCarsAction: CreateSortCarsAction = (col: CarKeys) => ({
  type: SORT_CARS_ACTION,
  payload: { col },
});

// End Sort Cars Action
