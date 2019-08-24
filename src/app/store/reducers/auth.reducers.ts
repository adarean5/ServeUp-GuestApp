import { EAuthActions } from '../actions/auth.actions';
import { AuthActions } from '../actions/auth.actions';
import { IAuthState, initialAuthState} from '../states/auth.state';

export const authReducers = (
  state = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case EAuthActions.GSignInSuccess: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
