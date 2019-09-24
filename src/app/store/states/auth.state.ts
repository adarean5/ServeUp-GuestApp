import {User} from '../models/user.model';

export interface IAuthState {
  user: User;
  signedIn: boolean;
  registered: boolean;
  loading: boolean;
}

export const initialAuthState: IAuthState = {
  user: undefined,
  signedIn: undefined,
  registered: undefined,
  loading: false
};
