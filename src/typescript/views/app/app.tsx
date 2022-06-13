

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Network } from "../../admin/network";
import { Modal } from "../../components/modal";
import { Category } from "../../models/category";
import { CartProduct, Product } from "../../models/product";
import { Checkout } from "../modal/checkout";
import { Home } from "../home/home";
import { NavBar } from "../nav/navbar";
import { Store } from "../store/store";
import { Vendible } from "../vendible/vendible";


interface IAppProperties 
{

}


function App(props: IAppProperties)
{

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


    React.useEffect(() => 
    {
        setupPage(); 

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

    return (
    <>
        <NavBar cartCount={ cartItems.length } setModal={ setActiveModal } />

        <Routes>
            <Route index element={ <Home cats={ categories } />  } />
            <Route path="/store/:id" element={ <Store cats={ categories } /> } />
            <Route path="/:id/:id" element={ <Vendible addProductToCart={ addToCart } cats={ categories } /> } />
        </Routes>

        <Modal cartItems={ cartItems } modalActive={ activeModal } setModalActive={ setActiveModal } />
    </>
    )
}


export { App }





