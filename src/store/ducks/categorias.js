export const Types = {
    // NAMESPACE - Nome do tipo de action
    GET_REQUEST: "categorias/GET_REQUEST",
    GET_SUCCESS: "categorias/GET_SUCCESS",
    GET_FAILURE: "categorias/GET_FAILURE"
  };
  
  const initialState = {
    data: [],
    loading: false,
   error: null
  };
  
  export default function categorias(state = initialState, action) {
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
    getCategoriasRequest: () => ({
      type: Types.GET_REQUEST
    }),
  
    getCategoriasSuccess: data => ({
      type: Types.GET_SUCCESS,
      payload: {
        data
      }
    }),
  
    getCategoriasFailure: error => ({
      type: Types.GET_FAILURE,
      payload: {
        error
      }
    })
  };