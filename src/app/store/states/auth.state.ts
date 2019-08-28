import {User} from '../models/user.model';

export interface IAuthState {
  user: User;
  loading: boolean;
}

export const initialAuthState: IAuthState = {
  user: null,
  loading: false
};
