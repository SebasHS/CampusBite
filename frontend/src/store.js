import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

    cart:{
        cartItems: [],
    },
};

function reducer(state, action){
    switch(action.type) {
        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload };
        case 'USER_LOGOUT':
            return { ...state, userInfo: null };
        case 'CART_ADD_ITEM':
            // caso para añadir al carrito de compras
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
            ? state.cart.cartItems.map((item) =>
                item._id === existItem._id ? newItem : item
            )
            : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems}};

            default:

            return state;
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}