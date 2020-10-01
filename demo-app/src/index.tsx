import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';

interface AddAction extends Action<string> {
  payload: {
    num: number;
  };
}

type CreateAddAction = (value: number) => AddAction;

// typeguard
function isAddAction(action: any): action is AddAction {
  return action?.type === ADD_ACTION;
}

const createAddAction: CreateAddAction = (value: number) => ({
  type: ADD_ACTION,
  payload: { num: value },
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

type HistoryEntry = {
  id: number;
  operation: string;
  value: number;
};

type CalcToolAppState = {
  result: number;
  validationMessage: string;
  history: HistoryEntry[];
};

type CalcToolActions =
  | AddAction
  | SubtractAction
  | MultiplyAction
  | DivideAction;

const resultReducer: Reducer<number, CalcToolActions> = (
  result = 0,
  action,
) => {

  if (isAddAction(action)) {
    return result + action.payload.num;
  }

  switch (action.type) {
    case SUBTRACT_ACTION:
      return result - action.payload.value;
    case MULTIPLY_ACTION:
      return result * action.payload.value;
    case DIVIDE_ACTION:
      if (action.payload.value !== 0) {
        return result / action.payload.value;
      } else {
        return result;
      }
    default:
      return result;
  }
};

const historyReducer: Reducer<HistoryEntry[], CalcToolActions> = (
  history = [],
  action,
) => {
  if (
    [ADD_ACTION, SUBTRACT_ACTION, MULTIPLY_ACTION, DIVIDE_ACTION].includes(
      action.type,
    )
  ) {
    return [
      ...history,
      {
        id: Math.max(...history.map((h) => h.id), 0) + 1,
        operation: action.type,
        value: action.payload.value,
      },
    ];
  }
  return history;
};

const validationMessageReducer: Reducer<string, CalcToolActions> = (
  _,
  action,
) => {
  if (action.type === DIVIDE_ACTION && action.payload.value === 0) {
    return 'Division by zero is not allowed';
  }

  return '';
};

const calcToolReducer: Reducer<CalcToolAppState, CalcToolActions> = (
  state = {} as CalcToolAppState,
  action,
) => {
  return {
    ...state,
    // feature state, combineReducers
    result: resultReducer(state.result, action),
    validationMessage: validationMessageReducer(
      state.validationMessage,
      action,
    ),
    history: historyReducer(state.history, action),
  };
};

const calcToolStore = createStore(calcToolReducer);

type CalcToolProps = {
  result: number;
  history: HistoryEntry[];
  validationMessage: string;
  onAdd: (value: number) => void;
  onSubtract: (value: number) => void;
  onMultiply: (value: number) => void;
  onDivide: (value: number) => void;
};

const CalcTool = ({
  result,
  history,
  validationMessage,
  onAdd: add,
  onSubtract: subtract,
  onMultiply: multiply,
  onDivide: divide,
}: CalcToolProps) => {
  const [numInput, setNumInput] = useState(0);
  return (
    <>
      <form>
        {validationMessage && <div>Error: {validationMessage}</div>}
        <div>Result: {result}</div>
        <div>
          Num Input:{' '}
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
      <ul>
        {history.map((historyEntry) => (
          <li key={historyEntry.id}>
            {historyEntry.operation} - {historyEntry.value}
          </li>
        ))}
      </ul>
    </>
  );
};

const CalcToolContainer = () => {
  const stateData = {
    result: useSelector<CalcToolAppState, number>((state) => state.result),
    validationMessage: useSelector<CalcToolAppState, string>(
      (state) => state.validationMessage,
    ),
    history: useSelector<CalcToolAppState, HistoryEntry[]>(
      (state) => state.history,
    ),
  };

  const boundActions = bindActionCreators(
    {
      onAdd: createAddAction,
      onSubtract: createSubtractAction,
      onMultiply: createMultiplyAction,
      onDivide: createDivideAction,
    },
    useDispatch(),
  );

  return <CalcTool {...stateData} {...boundActions} />;
};

ReactDOM.render(
  <Provider store={calcToolStore}>
    <CalcToolContainer />
  </Provider>,
  document.querySelector('#root'),
);
