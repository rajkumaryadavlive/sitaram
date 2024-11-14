const initialState = {
    postId: null,
    postContent: null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  };
  
  const postReducer = (state, action) => {
    switch (action.type) {
      case 'SET_POST_ID':
        return { ...state, postId: action.payload };
      case 'SET_POST_CONTENT':
        return { ...state, postContent: action.payload, status: 'succeeded' };
      case 'SET_STATUS':
        return { ...state, status: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload, status: 'failed' };
      default:
        return state;
    }
  };
  
  export { initialState, postReducer };
  