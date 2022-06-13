




import * as React from "react"
import { Link } from "react-router-dom";
import { Grid } from "../../components/grid";
import { Axis, Scrollview } from "../../components/scrollview";
import { Stepper } from "../../components/stepper";
import { Textfield, textfieldType } from "../../components/textfield";
import { Toggle } from "../../components/toggle";
import { CartProduct } from "../../models/product";



interface ICheckoutProperties 
{
    products: CartProduct[]; 
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Checkout(props: ICheckoutProperties)
{

    const [anonymousCheckout, setAnonymousCheckout] = React.useState(false); 

    // #region Total 
    const total = React.useMemo(() => 
    {

        if (!props.products || props.products.length === 0) { return 0; }

        const sum = props.products.map((prod) => (prod.price * prod.quantity)).reduce((a, b) => (a + b)); 
        return sum; 

    }, [props.products]); 
    // #endregion


    return (

    <div id="checkout">

        <section className="inspector">
        <p className="subtitle">Cart</p>
        <p className="inspector-information"><span className="price">{ `$${ total.toFixed(2) }` }</span> · <span className="item-count">{ `${ props.products.length } item${ props.products.length === 1 ? `` : `s` }` }</span></p>
        </section>



        <Scrollview axes={ Axis.vertical } content=
        {
        <>
            <section className="bag-items">
            {
                 
                props.products.length > 0 ?
                <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 300 } contentItems=
                {
                    (props.products.map((ctProduct, ctProductIndex) => 
                
                    <CartItem key={ ctProductIndex } product={ ctProduct } />

                    ))

                    
                }/>

                : 

                <div className="empty-state">
                <Link 
                onClick={ () => 
                {
                    props.setModal(false); 
                }}
                to={ `/store/chewies` }
                children=
                {
                    <button className="secondary">Checkout store</button>
                }/>
                </div>

            }
            </section>


            <section className="authentication">
                <div className="header">
                <p className="label">Anonymous purchase</p>

                <Toggle
                value={ anonymousCheckout }
                setValue={ setAnonymousCheckout }
                />
                </div>

                { !anonymousCheckout && 
                <form
                onSubmit={() => 
                {
                    console.log(`submit`); 
                }}
                className="body">
                <Textfield
                    leadIcon=
                    {
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17158 9.17158C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17158 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12ZM16 12V13.5C16 14.163 16.2634 14.7989 16.7322 15.2678C17.2011 15.7366 17.837 16 18.5 16C19.163 16 19.7989 15.7366 20.2678 15.2678C20.7366 14.7989 21 14.163 21 13.5V12C21 10.22 20.4722 8.47991 19.4832 6.99987C18.4943 5.51983 17.0887 4.36628 15.4442 3.68509C13.7996 3.0039 11.99 2.82567 10.2442 3.17294C8.49836 3.5202 6.89472 4.37737 5.63604 5.63604C4.37737 6.89472 3.5202 8.49836 3.17294 10.2442C2.82567 11.99 3.0039 13.7996 3.68509 15.4442C4.36628 17.0887 5.51983 18.4943 6.99987 19.4832C8.47991 20.4722 10.22 21 12 21C13.5802 21.0016 15.1327 20.5862 16.5 19.794" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }
                    placeholder="Enter email address"
                    type={ textfieldType.email }
                    id="email"
                    class="grid-item"
                />

                <Textfield
                    leadIcon={
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4917 14.4416C16.775 16.1499 14.3167 16.6749 12.1584 15.9999L8.23337 19.9166C7.95004 20.2083 7.39171 20.3833 6.99171 20.3249L5.17504 20.0749C4.57504 19.9916 4.01671 19.4249 3.92504 18.8249L3.67504 17.0083C3.61671 16.6083 3.80837 16.0499 4.08337 15.7666L8.00004 11.8499C7.33337 9.68327 7.85004 7.22494 9.56671 5.5166C12.025 3.05827 16.0167 3.05827 18.4834 5.5166C20.95 7.97494 20.95 11.9833 18.4917 14.4416Z" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.7417 16.575L9.65837 18.4916" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.0833 11.1666C14.7737 11.1666 15.3333 10.607 15.3333 9.91663C15.3333 9.22627 14.7737 8.66663 14.0833 8.66663C13.393 8.66663 12.8333 9.22627 12.8333 9.91663C12.8333 10.607 13.393 11.1666 14.0833 11.1666Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }
                    placeholder="Create a password"
                    type={ textfieldType.password }
                    id="password"
                    class="grid-item"
                    trailIcon={
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        // <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        // <path d="M14.53 9.47004L9.47004 14.53C8.82004 13.88 8.42004 12.99 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C12.99 8.42004 13.88 8.82004 14.53 9.47004Z" strokeLinecap="round" strokeLinejoin="round"/>
                        // <path d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.46997 3.72998 5.17997 5.80998 2.88997 9.40998C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77" strokeLinecap="round" strokeLinejoin="round"/>
                        // <path d="M8.42004 19.5301C9.56004 20.0101 10.77 20.2701 12 20.2701C15.53 20.2701 18.82 18.1901 21.11 14.5901C22.01 13.1801 22.01 10.8101 21.11 9.40005C20.78 8.88005 20.42 8.39005 20.05 7.93005" strokeLinecap="round" strokeLinejoin="round"/>
                        // <path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" strokeLinecap="round" strokeLinejoin="round"/>
                        // <path d="M9.47 14.53L2 22" strokeLinecap="round" strokeLinejoin="round"/>
                        // <path d="M22 2L14.53 9.47" strokeLinecap="round" strokeLinejoin="round"/>
                        // </svg>
                    }
                />
                </form> }
            </section>


            <section id="submit">
                <button
                disabled={ props.products.length === 0 }
                >Set Order</button>
            </section>


        </>
        }/>

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
                    <p className="label truncated">{ `${props.product.title} ${ props.product.name }` }</p>
                    <p>1 oz</p>
                </div>

                <div className="pricing">
                    <p className="label product-price">{ `$ ${( props.product.price * props.product.quantity).toFixed(2)}` }</p>

                    <Stepper
                        min={ 1 }
                        value={ count }
                        max={ props.product.stock }
                        onStepperChange={ (value) => 
                        {
                            console.log(value); 

                            setCount(value); 
                        }}
                    />
                </div>

            </div>
        </div>

    )

}
// #endregion


export { Checkout }


