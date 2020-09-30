import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Action, Reducer, createStore, bindActionCreators } from "redux";
import { useSelector, useDispatch, Provider } from "react-redux";

const ADD_ACTION = "ADD";
const SUBTRACT_ACTION = "SUBTRACT";
const MULTIPLY_ACTION = "MULTIPLY";
const DIVIDE_ACTION = "DIVIDE";

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

interface MultiplyAction extends Action<string> {
  payload: {
    value: number;
  };
}

type CreateMultiplyAction = (value: number) => MultiplyAction;

const createMultiplyAction: CreateMultiplyAction = (value: number) => ({
  type: MULTIPLY_ACTION,
  payload: { value },
});

interface DivideAction extends Action<string> {
  payload: {
    value: number;
  };
}

type CreateDivideAction = (value: number) => DivideAction;

const createDivideAction: CreateDivideAction = (value: number) => ({
  type: DIVIDE_ACTION,
  payload: { value },
});

type CalcToolAppState = {
  result: number;
};

type CalcToolActions =
  | AddAction
  | SubtractAction
  | MultiplyAction
  | DivideAction;

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
    case MULTIPLY_ACTION:
      return {
        ...state,
        result: state.result * action.payload.value,
      };
    case DIVIDE_ACTION:
      return {
        ...state,
        result: state.result / action.payload.value,
      };
    default:
      return state;
  }
};

const calcToolStore = createStore(calcToolReducer);

type CalcToolProps = {
  result: number;
  onAdd: (value: number) => void;
  onSubtract: (value: number) => void;
  onMultiply: (value: number) => void;
  onDivide: (value: number) => void;
};

const CalcTool = ({
  result,
  onAdd: add,
  onSubtract: subtract,
  onMultiply: multiply,
  onDivide: divide,
}: CalcToolProps) => {
  const [numInput, setNumInput] = useState(0);
  return (
    <form>
      <div>Result: {result}</div>
      <div>
        Num Input:{" "}
        <input
          type="number"
          value={numInput}
          onChange={(e) => setNumInput(Number(e.target.value))}
        />
      </div>
      <fieldset>
        <button type="button" onClick={() => add(numInput)}>
          +
        </button>
        <button type="button" onClick={() => subtract(numInput)}>
          -
        </button>
        <button type="button" onClick={() => multiply(numInput)}>
          *
        </button>
        <button type="button" onClick={() => divide(numInput)}>
          /
        </button>
      </fieldset>
    </form>
  );
};

const CalcToolContainer = () => {
  const result = useSelector<CalcToolAppState, number>((state) => state.result);

  // boundActions.onAdd: (value: number) => dispatch(createAddAction(value)),
  // boundActions.onSubtract: (value: number) => dispatch(createSubtractAction(value)),

  const boundActions = bindActionCreators(
    {
      onAdd: createAddAction,
      onSubtract: createSubtractAction,
      onMultiply: createMultiplyAction,
      onDivide: createDivideAction,
    },
    useDispatch() // return a dispatch function
  );

  return <CalcTool result={result} {...boundActions} />;
};

ReactDOM.render(
  <Provider store={calcToolStore}>
    <CalcToolContainer />
  </Provider>,
  document.querySelector("#root")
);
