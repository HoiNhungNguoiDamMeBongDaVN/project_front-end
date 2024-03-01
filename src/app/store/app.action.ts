import { createAction, props } from '@ngrx/store';
import { Product } from './appState/product.state';
import { User } from './appState/user.state';

export const addItemCart = createAction('Add cart', props<{ item: Product }>());
export const deleteItemCart = createAction('Delete cart', props<{ item: Product }>());

export const doLoginManage = createAction('Login user manager', props<{ user: User }>());
export const doGetAccountnManage = createAction('Get account user manager', props<{ user: User }>());
export const doLogoutManage = createAction('Logout user manager', props<{ user: User }>());