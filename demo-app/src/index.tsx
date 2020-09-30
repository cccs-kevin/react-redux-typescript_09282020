import React  from "react";
import ReactDOM from "react-dom";
import { Action, Reducer } from "redux";

const ADD_ACTION = "ADD";
const SUBTRACT_ACTION = "SUBTRACT";

interface AddAction extends Action<string> {
  payload: {
    value: number;
  };
}

type CreateAddAction = (value: number) => AddAction;

const createAddAction: CreateAddAction = (value: number) => ({
  type: ADD_ACTION,
  payload: { value },
});

interface SubtractAction extends Action<string> {
  payload: {
    value: number;
  };
}

type CreateSubtractAction = (value: number) => SubtractAction;

const createSubtractAction: CreateSubtractAction = (value: number) => ({
  type: SUBTRACT_ACTION,
  payload: { value },
});

type CalcToolAppState = {
  result: number;
};

type CalcToolActions = AddAction | SubtractAction;

// reducers are pure functions
// 1. 
const calcToolReducer: Reducer<CalcToolAppState, CalcToolActions> = (
  state = { result: 0 },
  action
) => {
  return state;
};
