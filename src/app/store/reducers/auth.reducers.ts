import * as AuthActions from '../actions/auth.actions';
import { initialAuthState } from '../states/auth.state';
import {createReducer, on} from '@ngrx/store';

export const authReducers = createReducer(
  initialAuthState,
  on(AuthActions.getUser, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.authenticated, (state, {user}) => ({
    ...state,
    user,
    signedIn: true
  })),
  on(AuthActions.notAuthenticated, state => ({
    ...state,
    user: null,
    signedIn: false
  })),
  on(AuthActions.gSignIn, state => ({
    ...state,
    user: null
  })),
  on(AuthActions.bRegisterSuccess, state => ({
    ...state,
    registered: true,
    loading: false
  })),
  on(AuthActions.bRegisterErr, state => ({
    ...state,
    user: null,
    signedIn: false,
    registered: false,
    loading: false
  }))

);

/*export const authReducers = (
  state = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case EAuthActions.GET_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case EAuthActions.G_SIGN_IN: {
      return {
        ...state,
        user: null
      };
    }
    case EAuthActions.AUTHENTICATED: {
     return {
       ...state,
       user: action.payload,
       signedIn: true
     };
    }
    case EAuthActions.NOT_AUTHENTICATED: {
      return {
        ...state,
        user: action.payload,
        signedIn: false
      };
    }
    case EAuthActions.B_REGISTER_SUCCES: {
      return {
        ...state,
        registered: true,
        loading: false
      };
    }
    case EAuthActions.B_REGISTER_ERR: {
      return {
        ...state,
        user: null,
        signedIn: false,
        registered: false,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};*/
