export const Types = {
    // NAMESPACE - Nome do tipo de action
    GET_REQUEST: "favoritos/GET_REQUEST",
    GET_SUCCESS: "favoritos/GET_SUCCESS",
    GET_FAILURE: "favoritos/GET_FAILURE"
  };
  
  const initialState = {
    data: [],
    loading: false,
   error: null
  };
  
  export default function favoritos(state = initialState, action) {
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
    getFavoritosRequest: () => ({
      type: Types.GET_REQUEST
    }),
  
    getFavoritosSuccess: data => ({
      type: Types.GET_SUCCESS,
      payload: {
        data
      }
    }),
  
    getFavoritosFailure: error => ({
      type: Types.GET_FAILURE,
      payload: {
        error
      }
    })
  };