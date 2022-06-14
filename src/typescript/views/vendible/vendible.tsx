








import * as React from "react"; 
import { Axis, Scrollview } from "../../components/scrollview";
import { Stepper } from "../../components/stepper";
import { Category } from "../../models/category";
import { CartProduct, Product } from "../../models/product";
import { getIDfromURL } from "../../utilities/getId";


interface IVendibleProperties 
{
    cats: Category[]; 

    addProductToCart: React.Dispatch<{
        dispatchArray?: CartProduct[];
        product: CartProduct;
        count: number;
    }>; 
}



function Vendible(props: IVendibleProperties) 
{

    const [adding, setAdding] = React.useState(false); 
    const [count, setCount] = React.useState<number>(1); 

    // #region Product
    const product = React.useMemo<Product>(() => 
    {

        const parts = window.location.pathname.split(`/`).slice(1); 
        const [categoryID, id] = [parts[0], parts[1]]; 

        if (props.cats.length === 0) { return undefined }

        const value = props.cats.find((cat) => cat.id === categoryID).items.find((prod) => prod.id === id); 
        return value; 

    }, [props.cats]); 
    // #endregion

    // #region Add To Cart
    const addToCart = React.useCallback(() => 
    {
        setAdding(true); 
        setTimeout(() => {
            setAdding(false);
        }, 750);

        const value = new CartProduct(product); 

        props.addProductToCart({
            product: value,
            count: count
        }); 

        setCount(1);

    }, [product, count]); 
    // #endregion

    return (

    <main id="vendible">
    {
        product && 
        <>
        <section id="inspector">
        <p id="product-title" className="subtitle">{ product.title }</p>
        <h1>{ product.name }</h1>
        </section>

        <section id="showcase">
        <div className="image">
            <img src={ product.imageURL } alt={ `${ product.title } ${ product.title }` } />
            { adding && <img className="atc" src={ product.imageURL } alt={ `${ product.title } ${ product.title }` } /> }
        </div>

        <div className="cast-shadow"></div>
        </section>

        <section id="pricing">
        <div className="leading">
            <p id="price-point" className="label">${ (product.price * count).toFixed(2) }</p>
        </div>

        <div id="cta">
            <button
            onClick={() => 
            {
                addToCart();  
            }}
            className={ adding ? `success` : `` }
            id="buy">{ (adding) ? `Added to cart` : `Add to cart` }</button>
        </div>

        <div className="trailing">
            <Stepper
                min={ 1 }
                value={ count }
                max={ 10 }
                onStepperChange={ setCount }
            />
        </div>
        </section>
        </>
    }
    </main>

    )

}



export { Vendible }






