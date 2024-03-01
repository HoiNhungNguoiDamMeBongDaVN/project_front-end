import { createReducer, on } from '@ngrx/store';
import { addItemCart, deleteItemCart } from './app.action';
import { doGetAccountnManage } from './app.action';
import { ProductCart } from './appState/product.state';
import { UserManage } from './appState/user.state';

const savedState = sessionStorage.getItem('cart');
const savedStateUserManage = sessionStorage.getItem('savedStateUserManage');

const initialState: ProductCart = savedState ? JSON.parse(savedState) : { cart: [] };
const initialStateUser: UserManage = savedStateUserManage ? JSON.parse(savedStateUserManage) : {};
// const initialStateUser: ReadonlyArray<UserManage> = [];



export const itemsReducerCart = createReducer(
    initialState,
    on(addItemCart, (state, { item }) => {
        const existingItem = state.cart.find(existing => existing.color === item.color && existing.size === item.size);
        const existingColorSameItem = state.cart.find(existing => existing.color === item.color && existing.size !== item.size);
        const existingSizeSameItem = state.cart.find(existing => existing.color !== item.color && existing.size === item.size);
        if (existingItem) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.color === item.color && cartItem.size === item.size ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );

            const newState = { ...state, cart: updatedCart };

            sessionStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        else if (existingColorSameItem) {
            const newState = { ...state, cart: [...state.cart, item] };
            sessionStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        else if (existingSizeSameItem) {
            const newState = { ...state, cart: [...state.cart, item] };
            sessionStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        else {
            const newState = { ...state, cart: [...state.cart, item] };
            sessionStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
    }),
    on(deleteItemCart, (state, { item }) => {
        const existingItem = state.cart.find(existing => existing.idpro === item.idpro);

        if (existingItem) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.color === item.color && cartItem.size === item.size ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );

            const newState = { ...state, cart: updatedCart.filter(item => item.quantity > 0) };
            sessionStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        return state;
    }),
);

export const userManager = createReducer(
    initialStateUser,
    on(doGetAccountnManage, (state, { user }) => {

        // const newState = { ...state, userInfor: [...state.userInfor, user] };
        const newState = { ...state, user };

        // sessionStorage.setItem('savedStateUserManage', JSON.stringify(newState));
        return newState;
    })
);

