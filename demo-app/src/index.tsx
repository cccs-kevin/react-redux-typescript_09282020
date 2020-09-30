import React from "react";
import ReactDOM from "react-dom";
import { Action, Reducer, createStore } from "redux";

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
// 1. the only data which be used must come in through the parameters
// 2. parameters are immutable
// 3. no side effects (no ajax calls)
// 4. the only output is the return value
const calcToolReducer: Reducer<CalcToolAppState, CalcToolActions> = (
  state = { result: 0 },
  action
) => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        result: state.result + action.payload.value,
      };
    case SUBTRACT_ACTION:
      return {
        ...state,
        result: state.result - action.payload.value,
      };
    default:
      return state;
  }
};

const calcToolStore = createStore(calcToolReducer);
