import { SET_THEME } from '../types';

const initialState = {
  mode: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
}
