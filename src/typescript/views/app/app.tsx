

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Network } from "../../admin/network";
import { Category } from "../../models/category";
import { CartProduct, Product } from "../../models/product";
import { Home } from "../home/home";
import { NavBar } from "../nav/navbar";
import { Store } from "../store/store";
import { Vendible } from "../vendible/vendible";


interface IAppProperties 
{

}


function App(props: IAppProperties)
{

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
        <NavBar cartCount={ cartItems.length } />

        <Routes>
            <Route index element={ <Vendible addProductToCart={ addToCart } cats={ categories } />  } />
            <Route path="/store/:id" element={ <Store cats={ categories } /> } />
            {/* <Route path="/:id/:id" element={ <Vendible cats={ categories } /> } /> */}
        </Routes>
    </>
    )
}


export { App }





