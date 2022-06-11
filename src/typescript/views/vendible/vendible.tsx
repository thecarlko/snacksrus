








import * as React from "react"; 
import { Axis, Scrollview } from "../../components/scrollview";
import { Stepper } from "../../components/stepper";
import { Category } from "../../models/category";
import { Product } from "../../models/product";


interface IVendibleProperties 
{
    cats: Category[]; 

    addProductToCart: React.Dispatch<{ product: Product; count: number; }>; 
}



function Vendible(props: IVendibleProperties) 
{

    const [count, setCount] = React.useState<number>(1); 

    // #region Product
    const product = React.useMemo<Product>(() => 
    {
        if (props.cats.length == 0) { return undefined; }
        if (props.cats[2].items.length == 0) { return undefined; }

        return props.cats[2].items[2]; 

    }, [props.cats]); 
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
                props.addProductToCart({ product, count }); 
                setCount(1); 
            }}
            id="buy">Add to Cart</button>
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






