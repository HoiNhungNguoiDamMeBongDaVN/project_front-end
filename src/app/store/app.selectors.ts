import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductCart } from './appState/app.state';

//Get the general state of the application
export const selectAppState = createFeatureSelector<ProductCart>('cart');

export let selectItems = createSelector(
    selectAppState,
    (state: ProductCart) => {
        return state.cart
    }
)