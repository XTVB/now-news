import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/reducer';
import { RootState } from './interfaces';

export const rootReducer: ActionReducerMap<RootState> = {
    authState: authReducer
};
