

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
import { resolve } from "node:path/win32";

let dismissCount : number = 0; 


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
    const [activeModal, setActiveModal] = React.useReducer((_currentState : boolean, newState: boolean) => 
    {
        if (newState) { dismissCount ++ }
        return newState; 

    }, false);

 

    const [categories, setCategories] = React.useState<Category[]>([]); 
    const [cartItems, addToCart] = React.useReducer((items: CartProduct[], info: { dispatchArray?: CartProduct[], product: CartProduct, count: number }) => 
    {
        if (info.dispatchArray) { return info.dispatchArray };
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
            console.log(`authentication changed`); 
    
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

        const categories  = await Network.fetchCategories(); 
        const productPromises = categories.map((cat) => Network.fetchCategoryProducts(cat.id));
        const products = await Promise.all(productPromises); 

        const mappedCategories = categories.map((cat, index) => 
        {
            cat.items = products[index]; 
            return cat; 
        })

        setCategories(mappedCategories); 
        
    }, []); 
    // #endregion

    // #region Item Total 
    const itemTotal = React.useMemo<number>(() => 
    {
        let total : number = 0; 
        if (!cartItems || cartItems.length <= 0) { return total }

        total = (cartItems.map((itm) => itm.quantity)).reduce((a, b) => a + b);
        return total; 

    }, [cartItems]);
    // #endregion

    // #region Component
    return (
    <>
        <NavBar
            client={ client }
            cartCount={ itemTotal }
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
            setApplicationClient={ setClient }
            dismissedCount={ dismissCount }
        />

    </>
    )
    // #endregion
}


export { App, modalPage }





