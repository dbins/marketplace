export const Types = {
  // NAMESPACE - Nome do tipo de action
  GET_REQUEST: "clientes/GET_REQUEST",
  GET_SUCCESS: "clientes/GET_SUCCESS",
  GET_FAILURE: "clientes/GET_FAILURE"
};

const initialState = {
  data: [],
  loading: false,
 error: null
};

export default function clientes(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST: // Roda junto com o Middleware
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { data: action.payload.data, loading: false, error: null };
    case Types.GET_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return state;
  }
}

// Action Creator
export const Creators = {
  getClientesRequest: data => ({
    type: Types.GET_REQUEST,
	payload: {
      data
    }
  }),

  getClientesSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {
      data
    }
  }),

  getClientesFailure: error => ({
    type: Types.GET_FAILURE,
    payload: {
      error
    }
  })
};