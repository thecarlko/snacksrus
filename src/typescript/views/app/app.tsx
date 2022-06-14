

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authentication, Network } from "../../admin/network";
import { Modal } from "../modal/modal";
import { Category } from "../../models/category";
import { CartProduct, Product } from "../../models/product";
import { Checkout } from "../modal/checkout";
import { Home } from "../home/home";
import { NavBar } from "../nav/navbar";
import { Store } from "../store/store";
import { Vendible } from "../vendible/vendible";
import { Profile } from "../modal/profile";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { Client } from "../../models/client";
import { toASCII } from "punycode";
import { cli } from "webpack-dev-server";



enum modalPage
{
    cart = 0, 
    profile = 1
}


interface IAppProperties 
{

}


function App(props: IAppProperties)
{

    // #region Dependencies
    const [client, setClient] = React.useState<Client>(undefined); 

    const [page, setPage] = React.useState(modalPage.cart); 
    const [activeModal, setActiveModal] = React.useState(false); 

    const [categories, setCategories] = React.useState<Category[]>([]); 
    const [cartItems, addToCart] = React.useReducer((items: CartProduct[], info: { product: CartProduct, count: number }) => 
    {
        if (info.product === undefined && info.count === 0) { return [] };
        let values = [...items]

        const productIndex = values.findIndex((product) => product.id === info.product.id); 
        if (productIndex === -1) 
        {
            values.push(info.product); 
        }

        const item = values.find((product) => product.id === info.product.id); 
        const total = item.quantity + info.count; 

        if (total === 0)
        {
            values = values.filter((itm) => itm.id !== info.product.id); 
        }
        else { item.quantity = total;  }

        return values; 

    }, []);
    // #endregion


    React.useEffect(() => 
    {
        setupPage(); 

        onAuthStateChanged(authentication, async (user) => 
        {
            if (!user)
            {
                const credential = await signInAnonymously(authentication);
                await Network.createCartForUser(credential.user.uid); 
                return; 
            }

            const client = await Network.fetchClient(user); 
            setClient(client); 

        });

    }, []); 

    // #region Setup Page 
    const setupPage = React.useCallback( async () => 
    {

        const values  = await Network.fetchCategories(); 
        for (const cat of values)
        {
            await cat.setProducts();    
        }

        setCategories(values); 

    }, []); 
    // #endregion

    // #region Component
    return (
    <>
        <NavBar
            client={ client }
            cartCount={ cartItems.length }
            setModal={ setActiveModal }
            setModalPage={ setPage }
        />

        <Routes>
            <Route index element={ <Home cats={ categories } />  } />
            <Route path="/store/*" element={ <Store cats={ categories } /> } />
            <Route path="/:id/:id" element={ <Vendible addProductToCart={ addToCart } cats={ categories } /> } />
        </Routes>

        <Modal
            ct={ client }
            page={ page }
            cartItems={ cartItems }
            setCartItems={ addToCart }
            modalActive={ activeModal }
            setModalActive={ setActiveModal } 
        />
    </>
    )
    // #endregion
}


export { App, modalPage }





