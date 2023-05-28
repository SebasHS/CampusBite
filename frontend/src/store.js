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
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload],
                },
            };
        default:
             return state;
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}