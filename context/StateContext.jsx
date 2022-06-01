import React, { createContex, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContex();



export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState();


    return (
        <>
        </>
    )
}