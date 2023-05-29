import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'


//Actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }
        default :
            throw new Error(`Unhandled Type ${type} in userReducer`);
    }
}

export const UserProvider = ({children}) => {
    //const [currentUser, setCurrentUser] = useState(null); Use this when using Context with useState hook
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // Use this when using Redux
    const { currentUser } = state;
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    };
    
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user); //might need await if Post error causes problems
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}