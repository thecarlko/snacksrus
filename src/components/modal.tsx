










import * as React from "react"; 
import { CartProduct } from "../models/product";
import { Axis, Scrollview } from "./scrollview";
import { Stepper } from "./stepper";


const root = document.getElementById(`root`); 


interface IModalProperties
{
    cartItems: CartProduct[]
    modalActive: boolean; 
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal(props: IModalProperties)
{

    // #region Total 
    const total = React.useMemo(() => 
    {

        let price = 0; 

        for (const item of props.cartItems)
        {
            price += (item.price * item.quantity);     
        }

        return price;

    }, [props.cartItems]); 
    // #endregion

    return (
    

        <div
        onClick={(event) => 
        {
            // const target 
            if (!(event.target as HTMLDivElement).classList.contains(`content`)) { return; }

            props.setModalActive(false); 
        }}
        id="modal"
        className={ `scrollview${ props.modalActive ? ` active` : `` }` }>
        <div className="viewport">
        <div className="content">

        <div id="checkout">
            <section className="inspector">
            <p className="subtitle">Cart</p>
            <p className="inspector-information"><span className="price">{ `$${ total.toFixed(2) }` }</span> · <span className="item-count">{ `${ props.cartItems.length } item${ props.cartItems.length === 1 ? `` : `s` }` }</span></p>
            </section>

            {
                props.cartItems &&
                <section className="bag-items">
                {
                    (props.cartItems.map((ctProduct, ctProductIndex) => 
                    
                    <CartItem key={ ctProductIndex } product={ ctProduct } />
    
                    ))
                }
                </section>
            }

            <section id="cta">
                <button
                disabled={ props.cartItems.length === 0 }
                >Set Order</button>
            </section>
        </div>


        </div>
        </div>
        </div>


    )


}


// #region Cart Item Properties
interface ICartItemProperties 
{
    product: CartProduct; 
}

function CartItem(props: ICartItemProperties)
{

    const [count, setCount] = React.useState(props.product.quantity);


    return (

        <div className="cart-item">
            <div className="image"><img src={ props.product.imageURL } alt={ props.product.name } /></div>
            
            <div className="details">
                <div className="name">
                    <p className="label">{ `${props.product.title} ${ props.product.name }` }</p>
                    <p>1 oz</p>
                </div>

                <div className="pricing">
                    <p className="label product-price">{ `$ ${( props.product.price * props.product.quantity).toFixed(2)}` }</p>

                    <Stepper
                        min={ 1 }
                        value={ count }
                        max={ props.product.stock }
                        onStepperChange={ setCount }
                    />
                </div>

            </div>
        </div>

    )

}
// #endregion



export { Modal }












