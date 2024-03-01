import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductCart } from './appState/product.state';
import { UserManage } from './appState/user.state';

//Get the general state of the application
//cart và user cần đặt giống với tên trong file app.module.ts
export const selectAppState = createFeatureSelector<ProductCart>('cart');
export const selectAppStateAccountManage = createFeatureSelector<UserManage>('user');



export let selectItems = createSelector(
    selectAppState,
    (state: ProductCart) => {
        return state.cart
    }
);



export const getAccountManager = createSelector(
    selectAppStateAccountManage, (state: UserManage) => {
        return state
    });