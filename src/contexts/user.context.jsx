import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER:'SET_CURRENT_USER'
}

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,  // this means keep all the values of current state and just overwrite the one which is in payload
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type}`); 
  }
};

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;

  const setCurrentUser = (user) => {
    dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER, payload:user });
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
