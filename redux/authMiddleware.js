import { setAuthenticated } from './authSlice'; // Import your action

const authMiddleware = (storeAPI) => (next) => (action) => {
  // Avoid middleware loop by not acting on the same actions it dispatches
  if (action.type !== setAuthenticated.type) {
    const token = localStorage.getItem('access_token');
  
    if (token) {
      storeAPI.dispatch(setAuthenticated(true));
    } else {
      storeAPI.dispatch(setAuthenticated(false));
    }
  }

  // Pass action to the next middleware or reducer
  return next(action);
};

export default authMiddleware;
