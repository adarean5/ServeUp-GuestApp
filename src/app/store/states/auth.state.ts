import {User} from '../models/user.model';

export interface IAuthState {
  user: User;
}

export const initialAuthState: IAuthState = {
  user: null
};
