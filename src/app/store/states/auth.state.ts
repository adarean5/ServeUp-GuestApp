import {User} from '../models/user.model';

export interface IAuthState {
  user: User;
  signedIn: boolean;
  loading: boolean;
}

export const initialAuthState: IAuthState = {
  user: undefined,
  signedIn: undefined,
  loading: false
};
