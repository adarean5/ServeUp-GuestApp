import { EAuthActions } from '../actions/auth.actions';
import { AuthActions } from '../actions/auth.actions';
import { IAuthState, initialAuthState} from '../states/auth.state';

export const authReducers = (
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
       loading: false,
       signedIn: true
     };
    }
    case EAuthActions.NOT_AUTHENTICATED: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        signedIn: false
      };
    }
    default: {
      return state;
    }
  }
};
