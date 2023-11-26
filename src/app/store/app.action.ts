import { createAction, props } from '@ngrx/store';
import { Product } from './appState/app.state';

export const addItemCart = createAction('Add cart', props<{ item: Product }>());
export const deleteItemCart = createAction('Delete cart', props<{ item: Product }>());