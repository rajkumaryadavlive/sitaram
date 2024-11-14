
const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    token:null,
  };
  
  // Action types
  const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
  };
  
  // Reducer function
  const authReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_REQUEST:
      case actionTypes.REGISTER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case actionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          isAuthenticated: true,
          token: action.payload.token,
         };
      case actionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          isAuthenticated: true,
          token: action.payload.token,
        };
      case actionTypes.LOGIN_FAILURE:
      case actionTypes.REGISTER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case actionTypes.LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export { initialState, actionTypes, authReducer };
  