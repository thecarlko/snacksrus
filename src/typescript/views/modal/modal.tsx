










import * as React from "react"; 
import { Link, NavLink } from "react-router-dom";
import { Client } from "../../models/client";
import { CartProduct } from "../../models/product";
import { modalPage } from "../app/app";
import { Checkout } from "./checkout";
import { Profile } from "./profile";
import { Axis, Scrollview } from "../../components/scrollview";
import { Stepper } from "../../components/stepper";




interface IModalProperties
{
    ct: Client; 
    cartItems: CartProduct[];
    setCartItems: React.Dispatch<{ product: CartProduct; count: number; }>;  

    page: modalPage; 
    modalActive: boolean; 
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

let dismissCount : number = 0; 


function Modal(props: IModalProperties)
{


    return (
    

        <div
        onClick={(event) => 
        {

            if ((event.target as HTMLDivElement).id === `modal`)
            {
                props.setModalActive(false); 
                dismissCount ++; 
            }
        }}
        id="modal"
        className={ `${ (dismissCount > 0) ? `dismissed` : "" }${ (props.modalActive) ? ` active` : ``}` }>
        {
        <>

            {
                (props.page === modalPage.cart) &&
                <Checkout
                currentClient={ props.ct }
                setProducts={ props.setCartItems }
                products={ props.cartItems }
                setModal={ props.setModalActive }
                />
            }
            
            {
                (props.page === modalPage.profile) &&
                <Profile
                client={ props.ct }
                setModal={ props.setModalActive }
                />
            }
            

        </>   
        }


        </div>


    )


}



export { Modal }












