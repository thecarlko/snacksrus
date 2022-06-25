










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
    setCartItems: React.Dispatch<{
        dispatchArray?: CartProduct[];
        product: CartProduct;
        count: number;
    }>;  

    dismissedCount: number; 

    page: modalPage; 
    modalActive: boolean; 
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    setApplicationClient: React.Dispatch<React.SetStateAction<Client>>;
}


function Modal(props: IModalProperties)
{


    return (
    

        <div
        onClick={(event) => 
        {

            if ((event.target as HTMLDivElement).id === `modal`)
            {
                props.setModalActive(false); 
            }
        }}
        id="modal"
        className={ `${ (props.dismissedCount > 0) ? `dismissed` : "" }${ (props.modalActive) ? ` active` : ``}` }>
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
                setAppClient={ props.setApplicationClient }
                />
            }
            

        </>   
        }


        </div>


    )


}



export { Modal }












