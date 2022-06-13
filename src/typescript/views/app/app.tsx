

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authentication, Network } from "../../admin/network";
import { Modal } from "../../components/modal";
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
    const [cartItems, addToCart] = React.useReducer((items: CartProduct[], info: { product: Product, count: number }) => 
    {

        const productIndex = items.findIndex((item) => item.id === info.product.id);
        if (productIndex === -1)
        {
            const item = new CartProduct(info.product); 
            items.push(item);
        }

        const product = items.find((productInfo) => productInfo.id === info.product.id); 
        const total = product.quantity + info.count; 

        product.quantity = total; 
        product.stock = product.stock - total; 

        return [...items]; 

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

            const client = new Client(user); 
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

    // #region Authenticate 
    React.useEffect(() => 
    {
        console.log(client); 


    }, [client]); 
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
            <Route path="/store/:id" element={ <Store cats={ categories } /> } />
            <Route path="/:id/:id" element={ <Vendible addProductToCart={ addToCart } cats={ categories } /> } />
        </Routes>

        <Modal
            ct={ client }
            page={ page }
            cartItems={ cartItems }
            modalActive={ activeModal }
            setModalActive={ setActiveModal } 
        />
    </>
    )
    // #endregion
}


export { App, modalPage }





