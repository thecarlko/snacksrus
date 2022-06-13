










import * as React from "react"; 
import { Link, NavLink } from "react-router-dom";
import { Client } from "../models/client";
import { CartProduct } from "../models/product";
import { modalPage } from "../views/app/app";
import { Checkout } from "../views/modal/checkout";
import { Profile } from "../views/modal/profile";
import { Axis, Scrollview } from "./scrollview";
import { Stepper } from "./stepper";




interface IModalProperties
{
    ct: Client; 
    cartItems: CartProduct[]; 

    page: modalPage; 
    modalActive: boolean; 
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}


function Modal(props: IModalProperties)
{


    return (
    

        <div
        onClick={(event) => 
        {
            // const target 
            if ((event.target as HTMLDivElement).id === `modal`)
            {
                props.setModalActive(false); 

            }
        }}
        id="modal"
        className={ (props.modalActive) ? ` active` : `` }>
        {
        <>

            {
                (props.page === modalPage.cart) &&
                <Checkout
                products={ props.cartItems }
                setModal={ props.setModalActive }
                />
            }
            
            {
                (props.page === modalPage.profile) &&
                <Profile
                client={ props.ct }
                />
            }
            

        </>   
        }


        </div>


    )


}



export { Modal }












