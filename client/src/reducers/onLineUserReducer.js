const initialState = {};

export function onlineUsersReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_ONLINE":
      return {
        ...state,
        [action.payload.userId]: true,
      };
    case "USER_OFFLINE":
      // Create a copy of the state without the user that went offline
      const { [action.payload.userId]: _, ...rest } = state;
      return rest;
    default:
      return state;
  }
}
