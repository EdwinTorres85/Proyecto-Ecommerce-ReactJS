import React, { useContext, useState } from 'react'

export const CartContext = React.createContext([])

export const useCartContext = () => useContext(CartContext);

//High order component
export const CartProvider = ({ children, defaultValue, initialValue }) => {
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [itemsInCart, setItemsInCart] = useState(defaultValue);
    const [cartTotal, setCartTotal] = useState(0);

    function add(item, quantity) {
        const newCart = [...itemsInCart];

        const itemWithQuantity = { ...item, quantity: quantity };

        const i= newCart.findIndex(itemInCart => itemInCart.id == item.id);

        if (i > -1) {
            newCart[i] = itemWithQuantity;
        } else {
            newCart.push(itemWithQuantity);
        }

        setItemsInCart(newCart);
        updateCounters(newCart);
    }

    function remove(itemId) {
        if (itemsInCart.length > 0) {
            const newCart = itemsInCart.filter(item => item.id != itemId);
            setItemsInCart(newCart);
            updateCounters(newCart);
        }
    }

    function flushCart(){
        setItemsInCart([]);
        setTotalItemCount(0);
        setCartTotal(0);
    }

    //Actualizar cantidad total al modificar el carrito
    function updateCounters(items) {
        let countTotal = 0;
        let costTotal = 0;
        for (let i = 0; i < items.length; i++) {
            countTotal += items[i].quantity;
            costTotal += items[i].price * items[i].quantity;
        }
        setTotalItemCount(countTotal);
        setCartTotal(costTotal);
    }

    //Nuestro almacen de estado de la compra
    //Funciona como nuestra propia API
    return <CartContext.Provider value={{ itemsInCart, totalItemCount, cartTotal, add, remove, flushCart }}>
        {children}
    </CartContext.Provider>
}