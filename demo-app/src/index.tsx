import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, createStore, bindActionCreators, AnyAction } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

const ADD_ACTION = 'ADD';
const SUBTRACT_ACTION = 'SUBTRACT';
const MULTIPLY_ACTION = 'MULTIPLY';
const DIVIDE_ACTION = 'DIVIDE';
const CLEAR_ACTION = 'CLEAR';
const SET_VALIDATION_MESSAGE_ACTION = 'SET_VALIDATION_MESSAGE';

interface AddAction extends Action<typeof ADD_ACTION> {
  payload: {
    num: number;
  };
}

type CreateAddAction = (value: number) => AddAction;

function isAddAction(action: any): action is AddAction {
  return action?.type === ADD_ACTION;
}

const createAddAction: CreateAddAction = (value: number) => ({
  type: ADD_ACTION,
  payload: { num: value },
});

interface SubtractAction extends Action<typeof SUBTRACT_ACTION> {
  payload: {
    value: number;
  };
}

type CreateSubtractAction = (value: number) => SubtractAction;

function isSubtractAction(action: any): action is SubtractAction {
  return action?.type === SUBTRACT_ACTION;
}

const createSubtractAction: CreateSubtractAction = (value: number) => ({
  type: SUBTRACT_ACTION,
  payload: { value },
});

interface MultiplyAction extends Action<typeof MULTIPLY_ACTION> {
  payload: {
    value: number;
  };
}

type CreateMultiplyAction = (value: number) => MultiplyAction;

function isMultiplyAction(action: any): action is MultiplyAction {
  return action?.type === MULTIPLY_ACTION;
}

const createMultiplyAction: CreateMultiplyAction = (value: number) => ({
  type: MULTIPLY_ACTION,
  payload: { value },
});

interface DivideAction extends Action<typeof DIVIDE_ACTION> {
  payload: {
    value: number;
  };
}

type CreateDivideAction = (
  value: number,
) => DivideAction | SetValidationMessageAction;

function isDivideAction(action: any): action is DivideAction {
  return action?.type === DIVIDE_ACTION;
}

const createDivideAction: CreateDivideAction = (value: number) => {
  if (value === 0) {
    return createSetValidationMessageAction('Division by zero is not allowed');
  } else {
    return {
      type: DIVIDE_ACTION,
      payload: { value },
    };
  }
};

interface ClearAction extends Action<typeof CLEAR_ACTION> {}

type CreateClearAction = () => ClearAction;

function isClearAction(action: any): action is ClearAction {
  return action?.type === CLEAR_ACTION;
}

const createClearAction: CreateClearAction = () => ({
  type: CLEAR_ACTION,
});

interface SetValidationMessageAction
  extends Action<typeof SET_VALIDATION_MESSAGE_ACTION> {
  payload: { validationMessage: string };
}

type CreateSetValidationMessageAction = (
  validationMessage: string,
) => SetValidationMessageAction;

function isSetValidationMessageAction(
  action: any,
): action is SetValidationMessageAction {
  return action?.type === SET_VALIDATION_MESSAGE_ACTION;
}

const createSetValidationMessageAction: CreateSetValidationMessageAction = (
  validationMessage: string,
) => ({
  type: SET_VALIDATION_MESSAGE_ACTION,
  payload: { validationMessage },
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
  | DivideAction
  | ClearAction
  | SetValidationMessageAction;

const resultReducer: Reducer<number, AnyAction> = (
  result = 0,
  action,
) => {
  if (isAddAction(action)) {
    return result + action.payload.num;
  }

  if (isSubtractAction(action)) {
    return result - action.payload.value;
  }

  if (isMultiplyAction(action)) {
    return result * action.payload.value;
  }

  if (isDivideAction(action)) {
    return result / action.payload.value;
  }

  if (isClearAction(action)) {
    return 0;
  }

  return result;
};

const historyReducer: Reducer<HistoryEntry[], AnyAction> = (
  history = [],
  action,
) => {
  if (isClearAction(action)) {
    return [];
  }

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
        value: isAddAction(action) ? action.payload.num : action.payload.value,
      },
    ];
  }
  return history;
};

const validationMessageReducer: Reducer<string, AnyAction> = (_, action) => {
  // if (isDivideAction(action) && action.payload.value === 0) {
  //   return 'Division by zero is not allowed';
  // }

  if (isSetValidationMessageAction(action)) {
    return action.payload.validationMessage;
  }

  return '';
};

const calcToolReducer: Reducer<CalcToolAppState, AnyAction> = (
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
  onClear: () => void;
};

const CalcTool = ({
  result,
  history,
  validationMessage,
  onAdd: add,
  onSubtract: subtract,
  onMultiply: multiply,
  onDivide: divide,
  onClear,
}: CalcToolProps) => {
  const [numInput, setNumInput] = useState(0);

  const clear = () => {
    setNumInput(0);
    onClear();
  };

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
          <button type="button" onClick={clear}>
            Clear
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
      onClear: createClearAction,
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
