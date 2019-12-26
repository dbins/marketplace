export const Types = {
    // NAMESPACE - Nome do tipo de action
    GET_REQUEST: "mapas/GET_REQUEST",
    GET_SUCCESS: "mapas/GET_SUCCESS",
    GET_FAILURE: "mapas/GET_FAILURE"
  };
  
  const initialState = {
    data: [],
    loading: false,
   error: null
  };
  
  export default function mapas(state = initialState, action) {
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
    getMapasRequest: () => ({
      type: Types.GET_REQUEST
    }),
  
    getMapasSuccess: data => ({
      type: Types.GET_SUCCESS,
      payload: {
        data
      }
    }),
  
    getMapasFailure: error => ({
      type: Types.GET_FAILURE,
      payload: {
        error
      }
    })
  };