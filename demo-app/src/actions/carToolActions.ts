import { Action, AnyAction } from 'redux';

import { Car, NewCar, CarKeys } from '../models/car';

export const APPEND_CAR_ACTION = 'APPEND_CAR';
export const REPLACE_CAR_ACTION = 'REPLACE_CAR';
export const REMOVE_CAR_ACTION = 'REMOVE_CAR';
export const EDIT_CAR_ACTION = 'EDIT_CAR';
export const CANCEL_CAR_ACTION = 'CANCEL_CAR';
export const SORT_CARS_ACTION = 'SORT_CARS';

// New Car Action

export interface AppendCarAction extends Action<typeof APPEND_CAR_ACTION> {
  payload: { car: NewCar };
}

export type CreateAppendCarAction = (car: NewCar) => AppendCarAction;

export function isAppendCarAction(
  action: AnyAction,
): action is AppendCarAction {
  return action?.type === APPEND_CAR_ACTION;
}

export const createAppendCarAction: CreateAppendCarAction = (car) => ({
  type: APPEND_CAR_ACTION,
  payload: { car },
});

// End New Car Action

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
