










import * as React from "react"; 
import { Link, NavLink } from "react-router-dom";
import { CartProduct } from "../models/product";
import { Checkout } from "../views/checkout/checkout";
import { Axis, Scrollview } from "./scrollview";
import { Stepper } from "./stepper";


interface IModalProperties
{
    cartItems: CartProduct[]
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

        <Checkout
            products={ props.cartItems }
            setModal={ props.setModalActive }
        />

        </div>


    )


}



export { Modal }












