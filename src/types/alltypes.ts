import data from "../data.json";

export type Job = (typeof data)[0];

export interface State {
  data: Job[];
}
export type Action = 
| {type: 'FETCH_INIT'}
| {type: 'FETCH_SUCESS'; payload: Job[]}
| {type: 'FETCH_FAILURE'; payload: string}

export const initialState: State = {
    data: data
}

export function Reducer(state: State, action: Action) {
    switch (action.type) {
      case "FETCH_INIT":
        return { ...state };
      case "FETCH_SUCESS":
        return { ...state, data: action.payload };
      case "FETCH_FAILURE":
        return { ...state, error: action.payload };
      default:
        throw new Error();
    }
}

